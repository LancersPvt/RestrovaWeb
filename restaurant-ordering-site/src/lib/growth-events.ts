import { trackingPaths } from "@/lib/tracking-paths";
const publicPaths = new Set<string>(trackingPaths);
export type GrowthEvent = "calculator_use" | "resource_download" | "demo_cta_click" | "demo_form_start" | "generate_lead" | "pricing_view" | "customer_case_study_view";
export type GrowthLocation = "header" | "footer" | "content" | "intake" | "schedule";
export type GrowthPayload = { page_path: string; cta_location?: GrowthLocation };
type Sender = (name: GrowthEvent, payload: GrowthPayload) => void;
let sender: Sender | undefined;
const seen = new Set<string>();
const events = new Set(["calculator_use", "resource_download", "demo_cta_click", "demo_form_start", "generate_lead", "pricing_view", "customer_case_study_view"]);
const locations = new Set(["header", "footer", "content", "intake", "schedule"]);
// Explicit adapter configuration only. No scripts, cookies, queue or default network transport.
export function configureGrowthAnalytics(config: { consent: boolean; send?: Sender }) {
  sender = config.consent ? config.send : undefined;
  if (!config.consent) seen.clear();
}
export function safeGrowthPath(raw: string) {
  const path = raw.split(/[?#]/)[0];
  return publicPaths.has(path) ? path : "/other";
}
export function trackGrowthEvent(name: GrowthEvent, input: { pagePath: string; location?: GrowthLocation }, dedupeKey?: string): boolean {
  if (!sender || !events.has(name)) return false;
  const key = dedupeKey ? `${name}:${dedupeKey}` : undefined;
  if (key && seen.has(key)) return false;
  const payload: GrowthPayload = { page_path: safeGrowthPath(input.pagePath) };
  if (input.location && locations.has(input.location)) payload.cta_location = input.location;
  try {
    sender(name, payload);
    if (key) { if (seen.size >= 500) seen.delete(seen.values().next().value!); seen.add(key); }
    return true;
  } catch { return false; } // Measurement must never interrupt the lead flow.
}
