import { NextResponse } from "next/server";

// This route runs on the server. Never put the shared secret in client-side code.
export const runtime = "nodejs";

const DELIVERY_TIMEOUT_MS = 12_000;

type ContactPayload = {
  name?: string;
  restaurant?: string;
  city?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isGoogleAppsScriptUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return (
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

/**
 * Verify the restaurant assessment again on the server.
 * Client-side navigation is for UX, not a security boundary.
 * Google Sheets receives only demo enquiries with acceptable answers.
 */
function qualifiesForDemo(message: string): boolean {
  const answers = new Map<string, string>();
  for (const line of message.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator <= 0) continue;
    answers.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
  }

  const business = answers.get("BUSINESS TYPE") ?? "";
  const branch = answers.get("NUMBER OF BRANCHES") ?? "";
  const orders = answers.get("DAILY ORDER VOLUME") ?? "";
  const role = answers.get("BUYER ROLE") ?? "";
  const completeSystem = answers.get("COMPLETE SYSTEM INTENT") ?? "";
  const pricing = answers.get("PRICING READINESS (ONBOARDING + MONTHLY)") ?? "";
  const timeline = answers.get("PURCHASE TIMELINE") ?? "";

  const validBusiness = [
    "Restaurant / dine-in", "Takeaway / fast food", "Restaurant with multiple branches",
  ].includes(business);
  const validBranch = ["1 branch", "2 branches", "3–5 branches", "6+ branches"].includes(branch);
  const validOrders = ["Under 10 orders", "10–29 orders", "30–99 orders", "100+ orders"].includes(orders);
  const sufficientActivity = branch !== "1 branch" || orders !== "Under 10 orders";
  const decisionMaker = ["Owner / Founder", "Partner / Director", "Restaurant / Operations Manager"].includes(role);
  const pricingReady = [
    "Yes, I can pay the onboarding and monthly fees",
    "I understand the pricing, but want to discuss it first",
  ].includes(pricing);
  const plannedTimeline = ["Immediately", "Within 10 days", "Within 1 month"].includes(timeline);

  return validBusiness && validBranch && validOrders && sufficientActivity &&
    decisionMaker && pricingReady && plannedTimeline && completeSystem === "Yes";
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const restaurant = typeof body.restaurant === "string" ? body.restaurant.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Restrova's qualification form requires a phone number and a restaurant.
  if (!name || !restaurant || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Please include your name, restaurant, phone and form answers." },
      { status: 400 },
    );
  }

  // Safeguard: reject submissions that do not match the current qualification
  // criteria, even if someone bypasses the client-side form.
  if (message.length > 10000 || !qualifiesForDemo(message)) {
    return NextResponse.json(
      { ok: false, error: "This demo request cannot be processed." },
      { status: 422 },
    );
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
  const secret = process.env.RESTROVA_SHEETS_SHARED_SECRET;
  if (!sheetsUrl || !isGoogleAppsScriptUrl(sheetsUrl) || !secret) {
    console.error("[contact] Google Sheets URL or secret missing/invalid");
    return NextResponse.json(
      { ok: false, error: "The demo form is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const sheetsResponse = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // This request happens on the Next.js server, not in the browser.
      body: JSON.stringify({
        name,
        restaurant,
        city,
        email,
        phone,
        message,
        at: new Date().toISOString(),
        secret,
      }),
      // Apps Script ContentService redirects to a Google-served JSON response.
      // Follow the redirect so we can read its explicit storage acknowledgement.
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    });

    const result = (await sheetsResponse.json().catch(() => null)) as
      | { ok?: boolean; stored?: boolean; error?: string }
      | null;

    if (!sheetsResponse.ok || result?.ok !== true || result?.stored !== true) {
      console.error("[contact] New CRM did not confirm saving the lead", {
        status: sheetsResponse.status,
      });
      return NextResponse.json(
        { ok: false, error: "We could not save your request. Please try again." },
        { status: 502 },
      );
    }

    // Your ContactForm.tsx fires Meta Pixel's Lead event only when ok=true.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "[contact] CRM request failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { ok: false, error: "We could not send your request. Please try again." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
