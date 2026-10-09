/** Server-side Apps Script forwarding; never expose the secret to the browser. */
import type { Intake } from "@/lib/restrova-demo";
import { buildCRMMessage } from "@/lib/restrova-demo";

const TIMEOUT_MS = 15000;

export type RequestedDemo = {
  day: string;
  time: string;
  platform: string;
};

function configuredUrl(): { url: string; secret: string } {
  const url = process.env.GOOGLE_SHEETS_URL;
  const secret = process.env.RESTROVA_SHEETS_SHARED_SECRET;
  if (!url || !secret) throw new Error("Missing Sheets environment variables");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== "script.google.com" ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(parsed.pathname)) {
    throw new Error("Unexpected Google Apps Script URL");
  }
  return { url, secret };
}

export async function writeToCRM(
  intake: Intake,
  type: "other_enquiry" | "qualified_demo",
  submissionId: string,
  schedule?: RequestedDemo,
): Promise<void> {
  const { url, secret } = configuredUrl();
  const c = intake.contact;
  const payload = {
    type, submissionId,
    name: c.name, restaurant: c.restaurant, phone: c.phone, city: c.city,
    email: "", at: new Date().toISOString(),
    message: buildCRMMessage(intake, schedule, submissionId),
    secret,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload), redirect: "follow", cache: "no-store",
      signal: controller.signal,
    });
    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; stored?: boolean } | null;
    if (!response.ok || result?.ok !== true || result.stored !== true) {
      throw new Error("Apps Script did not acknowledge storage");
    }
  } finally {
    clearTimeout(timeout);
  }
}
