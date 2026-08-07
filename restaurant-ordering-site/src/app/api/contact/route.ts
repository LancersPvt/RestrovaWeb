import { NextResponse } from "next/server";

const DELIVERY_TIMEOUT_MS = 12_000;

type ContactPayload = {
  name?: string;
  restaurant?: string;
  city?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isTrustedGoogleRedirect(location: string | null) {
  if (!location) return false;

  try {
    const url = new URL(location);
    return (
      url.protocol === "https:" &&
      (url.hostname === "script.googleusercontent.com" ||
        url.hostname.endsWith(".script.googleusercontent.com"))
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const name = body.name?.trim() ?? "";
  const restaurant = body.restaurant?.trim() ?? "";
  const city = body.city?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please include name, message, and at least email or phone.",
      },
      { status: 400 }
    );
  }

  const lead = {
    name,
    restaurant,
    city,
    email,
    phone,
    message,
    at: new Date().toISOString(),
  };

  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.error("[contact] GOOGLE_SHEETS_URL is missing");

    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your request right now. Please try again or email us directly.",
      },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const sheetsResponse = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        // The Apps Script integration was built for JSON. Sending text/plain
        // can make strict doPost handlers reject an otherwise valid lead.
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(lead),
      // Google Apps Script commonly confirms a successful doPost with a
      // redirect to script.googleusercontent.com. Keep that response visible
      // so a failing redirected GET cannot turn a successful POST into a 500.
      redirect: "manual",
      cache: "no-store",
      signal: controller.signal,
    });

    const acceptedRedirect =
      sheetsResponse.status >= 300 &&
      sheetsResponse.status < 400 &&
      isTrustedGoogleRedirect(sheetsResponse.headers.get("location"));

    if (!sheetsResponse.ok && !acceptedRedirect) {
      const responseText = (await sheetsResponse.text()).slice(0, 500);
      console.error("[contact] Lead delivery rejected", {
        status: sheetsResponse.status,
        response: responseText,
      });

      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send your request right now. Please try again or email us directly.",
        },
        { status: 502 }
      );
    }

    console.log("[contact] Lead delivered", {
      status: sheetsResponse.status,
      viaRedirect: acceptedRedirect,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Lead delivery failed", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your request right now. Please try again or email us directly.",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
