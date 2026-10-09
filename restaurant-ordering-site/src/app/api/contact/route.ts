import { NextResponse } from "next/server";

/**
 * Retire the previous contact form endpoint after the new funnel is live.
 * This prevents direct old-form submissions from creating CRM Lead rows
 * without first completing demo scheduling.
 *
 * If any OTHER form on your website still uses /api/contact, migrate it
 * before enabling this endpoint retirement.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Please use the updated Restrova request form." },
    { status: 410, headers: { "Cache-Control": "no-store" } },
  );
}
