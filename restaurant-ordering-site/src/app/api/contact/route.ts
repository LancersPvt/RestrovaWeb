import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  restaurant?: string;
  city?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const name = body.name?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please include name, message, and at least email or phone.",
      },
      { status: 400 }
    );
  }

  // Log the lead on the server
  console.log("[contact] lead", {
    name,
    restaurant: body.restaurant?.trim() ?? "",
    city: body.city?.trim() ?? "",
    email,
    phone,
    message,
    at: new Date().toISOString(),
  });

  // Send to Google Sheets
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (sheetsUrl) {
    try {
      const sheetsResponse = await fetch(sheetsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          restaurant: body.restaurant?.trim() ?? "",
          city: body.city?.trim() ?? "",
          email,
          phone,
          message,
        }),
      });

      if (!sheetsResponse.ok) {
        console.error("[contact] Failed to save to Google Sheets:", await sheetsResponse.text());
      } else {
        console.log("[contact] Successfully saved to Google Sheets");
      }
    } catch (error) {
      console.error("[contact] Error sending to Google Sheets:", error);
      // Don't fail the request if Google Sheets fails
    }
  } else {
    console.warn("[contact] GOOGLE_SHEETS_URL not configured");
  }

  return NextResponse.json({ ok: true });
}
