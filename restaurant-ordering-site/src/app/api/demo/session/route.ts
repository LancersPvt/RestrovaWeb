import { NextRequest, NextResponse } from "next/server";
import { DRAFT_COOKIE, decryptDraft } from "@/lib/restrova-demo-session";
import { isEligible } from "@/lib/restrova-demo";

export const runtime = "nodejs";
export async function GET(req: NextRequest) {
  const draft = decryptDraft(req.cookies.get(DRAFT_COOKIE)?.value);
  const valid = Boolean(draft && isEligible(draft.intake.qualification));
  return NextResponse.json({ ok: valid }, {
    status: valid ? 200 : 401,
    headers: { "Cache-Control": "no-store" },
  });
}
