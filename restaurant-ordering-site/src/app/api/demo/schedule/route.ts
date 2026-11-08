import { NextRequest, NextResponse } from "next/server";
import { isEligible, parseSchedule } from "@/lib/restrova-demo";
import { DRAFT_COOKIE, decryptDraft } from "@/lib/restrova-demo-session";
import { writeToCRM } from "@/lib/restrova-sheets";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  const draft = decryptDraft(req.cookies.get(DRAFT_COOKIE)?.value);
  if (!draft || !isEligible(draft.intake.qualification)) {
    return NextResponse.json({ ok: false, error: "Please complete your restaurant and contact details again before requesting a demo." }, { status: 401, headers });
  }
  const schedule = parseSchedule(await req.json().catch(() => null));
  if (!schedule) {
    return NextResponse.json({ ok: false, error: "Please choose a future day and time in Pakistan Time and complete your meeting platform." }, { status: 400, headers });
  }
  try {
    // The encrypted draft supplies the identity and qualification, never the browser body.
    // Reuse its ID so a retry after an uncertain network response cannot add a second row.
    await writeToCRM(draft.intake, "qualified_demo", draft.id, schedule);
    const response = NextResponse.json({ ok: true, eventId: draft.id }, { headers });
    response.cookies.set({ name: DRAFT_COOKIE, value: "", path: "/api/demo", maxAge: 0,
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    return response;
  } catch (err) {
    console.error("[restrova-schedule] submission failed", err instanceof Error ? err.message : "unknown");
    // Keep the draft on failure so the user can retry without re-entering their details.
    return NextResponse.json({ ok: false, error: "We couldn't save your demo request. Please try again." }, { status: 502, headers });
  }
}
