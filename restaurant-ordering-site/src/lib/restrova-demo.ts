/**
 * Restrova restaurant assessment: shared types, values, and CRM field labels.
 * There is no customer-visible classification message.
 */
export type Qualification = {
  businessType: string;
  branches: string;
  dailyOrders: string;
  role: string;
  completeSystem: string;
  onboardingBudget: string;
  timeline: string;
};

export type ContactDetails = {
  name: string;
  restaurant: string;
  phone: string;
  city: string;
};

export type Intake = {
  qualification: Qualification;
  contact: ContactDetails;
  attribution?: string;
};

export const meetingPlatforms = ["WhatsApp", "Zoom Meeting", "Google Meet", "Phone Call", "Other"] as const;
export type RequestedDemo = { day: string; time: string; platform: string };

/** Validate the actual calendar date and future time in Pakistan, on the server. */
export function parseSchedule(payload: unknown, now = Date.now()): RequestedDemo | null {
  if (!isRecord(payload)) return null;
  const { day, time, platform, otherPlatform } = payload;
  if (typeof day !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day) ||
      typeof time !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) ||
      typeof platform !== "string" || !meetingPlatforms.some((option) => option === platform)) return null;
  const calendarDay = new Date(`${day}T00:00:00Z`);
  if (!Number.isFinite(calendarDay.getTime()) || calendarDay.toISOString().slice(0, 10) !== day ||
      new Date(`${day}T${time}:00+05:00`).getTime() <= now) return null;
  if (platform === "Other" && (!requiredText(otherPlatform, 70) || /[\r\n]/.test(otherPlatform))) return null;
  return { day, time, platform: platform === "Other" ? `Other: ${(otherPlatform as string).trim()}` : platform };
}

export const businessTypes = [
  { value: "established", label: "Restaurant / dine-in" },
  { value: "takeaway", label: "Takeaway / fast food" },
  { value: "chain", label: "Restaurant with multiple branches" },
  { value: "home", label: "Home-based food business" },
] as const;

export const allBranches = [
  { value: "1", label: "1 branch" },
  { value: "2", label: "2 branches" },
  { value: "3_5", label: "3–5 branches" },
  { value: "6_plus", label: "6+ branches" },
] as const;

export const dailyOrders = [
  { value: "under_10", label: "Under 10 orders" },
  { value: "10_29", label: "10–29 orders" },
  { value: "30_99", label: "30–99 orders" },
  { value: "100_plus", label: "100+ orders" },
] as const;

export const roles = [
  { value: "owner", label: "Owner / Founder" },
  { value: "partner", label: "Partner / Director" },
  { value: "manager", label: "Restaurant / Operations Manager" },
  { value: "other", label: "Other / Not involved in purchasing" },
] as const;

export const pricingOptions = [
  { value: "ready", label: "Yes, I can pay the onboarding and monthly fees" },
  { value: "discuss", label: "I understand the pricing, but want to discuss it first" },
  { value: "no", label: "No, the onboarding and monthly fees are outside my budget" },
] as const;

export const timelines = [
  { value: "immediately", label: "Immediately" },
  { value: "10_days", label: "Within 10 days" },
  { value: "1_month", label: "Within 1 month" },
  { value: "researching", label: "Only researching / no buying plan yet" },
] as const;

export const includedFeatures = [
  "Client Application (iOS & Android)",
  "Admin Application",
  "Rider Application",
  "Restaurant Website",
  "Inventory Management System",
];

const optionExists = (options: readonly { value: string }[], value: string) =>
  options.some((option) => option.value === value);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function requiredText(value: unknown, limit: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= limit;
}

export function parseIntake(payload: unknown): Intake | null {
  if (!isRecord(payload) || !isRecord(payload.qualification) || !isRecord(payload.contact)) return null;
  const q = payload.qualification;
  const c = payload.contact;
  const choices = [
    [businessTypes, q.businessType],
    [allBranches, q.branches],
    [dailyOrders, q.dailyOrders],
    [roles, q.role],
    [pricingOptions, q.onboardingBudget],
    [timelines, q.timeline],
  ] as const;
  if (!choices.every(([options, answer]) => typeof answer === "string" && optionExists(options, answer))) return null;
  if (q.completeSystem !== "yes" && q.completeSystem !== "no") return null;
  if (q.businessType === "chain" && q.branches === "1") return null;
  if (!requiredText(c.name, 120) || !requiredText(c.restaurant, 160) ||
      !requiredText(c.phone, 35) || !requiredText(c.city, 100)) return null;
  const digits = c.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 16) return null;
  const attribution = typeof payload.attribution === "string"
    ? payload.attribution.replace(/[\r\n]/g, " ").slice(0, 1000)
    : "";
  return {
    qualification: {
      businessType: q.businessType as string, branches: q.branches as string,
      dailyOrders: q.dailyOrders as string, role: q.role as string,
      completeSystem: q.completeSystem as string, onboardingBudget: q.onboardingBudget as string,
      timeline: q.timeline as string,
    },
    contact: {
      name: c.name.trim(), restaurant: c.restaurant.trim(),
      phone: c.phone.trim(), city: c.city.trim(),
    },
    attribution,
  };
}

/** Business screening is enforced in the server-side intake handler. */
export function isEligible(q: Qualification): boolean {
  const operating = ["established", "takeaway", "chain"].includes(q.businessType);
  const scale = q.branches !== "1" || q.dailyOrders !== "under_10";
  const buyer = ["owner", "partner", "manager"].includes(q.role);
  const understandsPrice = ["ready", "discuss"].includes(q.onboardingBudget);
  return operating && scale && buyer && understandsPrice &&
    q.completeSystem === "yes" && q.timeline !== "researching" &&
    !(q.businessType === "chain" && q.branches === "1");
}

export function isHighPriority(q: Qualification): boolean {
  const scale = q.branches !== "1" || ["30_99", "100_plus"].includes(q.dailyOrders);
  return isEligible(q) && scale && q.onboardingBudget === "ready";
}

function label(options: readonly { value: string; label: string }[], value: string) {
  return options.find((item) => item.value === value)?.label ?? value;
}

export function buildCRMMessage(intake: Intake, schedule?: { day: string; time: string; platform: string }, leadId?: string): string {
  const q = intake.qualification;
  const lines = [
    "REQUIRED PRODUCT: Restrova complete restaurant system (one package)",
    `ONBOARDING PACKAGE INCLUDES: ${includedFeatures.join(", ")}`,
    "ONE-TIME ONBOARDING: PKR 10,000",
    "MONTHLY SERVICE: PKR 5,000 minimum OR 1% of monthly sales through Restrova (whichever is higher); excludes other channels",
    `BUSINESS TYPE: ${label(businessTypes, q.businessType)}`,
    `NUMBER OF BRANCHES: ${label(allBranches, q.branches)}`,
    `DAILY ORDER VOLUME: ${label(dailyOrders, q.dailyOrders)}`,
    `BUYER ROLE: ${label(roles, q.role)}`,
    `COMPLETE SYSTEM INTENT: ${q.completeSystem === "yes" ? "Yes" : "No"}`,
    `PRICING READINESS (ONBOARDING + MONTHLY): ${label(pricingOptions, q.onboardingBudget)}`,
    `PURCHASE TIMELINE: ${label(timelines, q.timeline)}`,
    `AUTOMATED SCREEN: ${isEligible(q) ? (isHighPriority(q) ? "HIGH PRIORITY (VERIFY WITH SALES)" : "POTENTIAL FIT (VERIFY WITH SALES)") : "OTHER ENQUIRY"}`,
    `QUALIFICATION STATUS: ${schedule ? "QUALIFIED - DEMO REQUESTED" : "OTHER ENQUIRY"}`,
  ];
  if (schedule) {
    lines.push(`PREFERRED DAY: ${schedule.day}`, `PREFERRED TIME: ${schedule.time}`,
      `PREFERRED PLATFORM: ${schedule.platform}`);
  }
  if (leadId) lines.push(`LEAD ID: ${leadId}`);
  if (intake.attribution) lines.push(`AD ATTRIBUTION: ${intake.attribution}`);
  return lines.join("\n");
}
