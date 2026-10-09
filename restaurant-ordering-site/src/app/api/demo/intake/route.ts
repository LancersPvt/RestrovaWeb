import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isEligible, parseIntake } from "@/lib/restrova-demo";
import { DRAFT_COOKIE, DRAFT_TTL_SECONDS, encryptDraft } from "@/lib/restrova-demo-session";
import { writeToCRM } from "@/lib/restrova-sheets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }
  // Hidden anti-bot honeypot. Do not store or count bot submissions.
  if ("website" in body && body.website) {
    const response = NextResponse.json({ ok: true, next: "thank-you" }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set({ name: DRAFT_COOKIE, value: "", path: "/api/demo", maxAge: 0,
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    return response;
  }
  const intake = parseIntake(body);
  if (!intake) {
    return NextResponse.json({ ok: false, error: "Please complete all form fields." }, { status: 400 });
  }
  try {
    const eligible = isEligible(intake.qualification);
    if (!eligible) {
      // Collect these contacts in a *different* tab. Never create a qualified Lead.
      await writeToCRM(intake, "other_enquiry", randomUUID());
      const response = NextResponse.json({ ok: true, next: "thank-you" });
      response.cookies.set({ name: DRAFT_COOKIE, value: "", path: "/api/demo", maxAge: 0, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
    // Qualified contacts are NOT written to the qualified Leads tab yet.
    // Their encrypted, tamper-resistant details remain in a 20-minute HttpOnly cookie
    // until they finish the demo scheduling step.
    const token = encryptDraft(intake);
    const response = NextResponse.json({ ok: true, next: "schedule" });
    response.cookies.set({
      name: DRAFT_COOKIE, value: token, maxAge: DRAFT_TTL_SECONDS,
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
      path: "/api/demo",
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    // No personal information in server logs or error responses.
    console.error("[restrova-intake] submission failed", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "We couldn't process your request. Please try again." }, { status: 502 });
  }
}
