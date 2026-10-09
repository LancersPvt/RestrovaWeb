/** Server-side Apps Script forwarding; never expose the secret to the browser. */
import { buildCRMMessage, isEligible, type Intake, type RequestedDemo } from "@/lib/restrova-demo";

const TIMEOUT_MS = 15000;

function configuredUrl(): { url: string; secret: string } {
  const url = process.env.GOOGLE_SHEETS_URL;
  const secret = process.env.RESTROVA_SHEETS_SHARED_SECRET;
  if (!url || !secret || secret.length < 32) {
    throw new Error("Configure GOOGLE_SHEETS_URL and RESTROVA_SHEETS_SHARED_SECRET; see docs/demo-setup.md");
  }
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
  if (type === "qualified_demo" && (!isEligible(intake.qualification) || !schedule)) {
    throw new Error("A qualified lead requires completed demo scheduling");
  }
  if (type === "other_enquiry" && isEligible(intake.qualification)) {
    throw new Error("Qualified details must wait for demo scheduling");
  }
  const { url, secret } = configuredUrl();
  const c = intake.contact;
  const payload = {
    schemaVersion: 1, type, submissionId,
    qualification: intake.qualification,
    qualificationStatus: type === "qualified_demo" ? "QUALIFIED - DEMO REQUESTED" : "OTHER ENQUIRY",
    schedule, attribution: intake.attribution || "",
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
      | { ok?: boolean; stored?: boolean; schemaVersion?: number; submissionId?: string } | null;
    if (!response.ok || result?.ok !== true || result.stored !== true ||
        result.schemaVersion !== 1 || result.submissionId !== submissionId) {
      throw new Error("Apps Script did not acknowledge storage");
    }
  } finally {
    clearTimeout(timeout);
  }
}
