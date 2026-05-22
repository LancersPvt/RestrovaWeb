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

  console.log("[contact] lead", lead);
  console.log("GOOGLE_SHEETS_URL exists:", Boolean(process.env.GOOGLE_SHEETS_URL));
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.error("[contact] GOOGLE_SHEETS_URL is missing");

    return NextResponse.json(
      {
        ok: false,
        error: "Google Sheets URL is not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const sheetsResponse = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(lead),
      redirect: "follow",
    });

    const responseText = await sheetsResponse.text();

    if (!sheetsResponse.ok) {
      console.error("[contact] Failed to save to Google Sheets:", responseText);

      return NextResponse.json(
        {
          ok: false,
          error: "Failed to save form data.",
        },
        { status: 500 }
      );
    }

    console.log("[contact] Successfully saved to Google Sheets:", responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Error sending to Google Sheets:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong while saving the form.",
      },
      { status: 500 }
    );
  }
}