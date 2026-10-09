"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Stage = "qualification" | "contact";

type Qualification = {
  businessType: string;
  completeSystem: string;
  branches: string;
  dailyOrders: string;
  role: string;
  onboardingBudget: string;
  timeline: string;
};

const initialQualification: Qualification = {
  businessType: "",
  completeSystem: "",
  branches: "",
  dailyOrders: "",
  role: "",
  onboardingBudget: "",
  timeline: "",
};

const initialContact = {
  name: "",
  restaurant: "",
  phone: "",
  city: "",
};

const businessTypes = [
  { value: "established", label: "Restaurant / dine-in" },
  { value: "takeaway", label: "Takeaway / fast food" },
  { value: "chain", label: "Restaurant with multiple branches" },
  { value: "home", label: "Home-based food business" },
  { value: "not_started", label: "Not started yet" },
];

const branches = [
  { value: "1", label: "1 branch" },
  { value: "2", label: "2 branches" },
  { value: "3_5", label: "3–5 branches" },
  { value: "6_plus", label: "6+ branches" },
];

const dailyOrders = [
  { value: "under_10", label: "Under 10 orders" },
  { value: "10_29", label: "10–29 orders" },
  { value: "30_99", label: "30–99 orders" },
  { value: "100_plus", label: "100+ orders" },
];

const roles = [
  { value: "owner", label: "Owner / Founder" },
  { value: "partner", label: "Partner / Director" },
  { value: "manager", label: "Restaurant / Operations Manager" },
  { value: "other", label: "Other / Not involved in purchasing" },
];

const budgetOptions = [
  { value: "ready", label: "Yes, I can pay the onboarding and monthly fees" },
  { value: "discuss", label: "I understand the pricing, but want to discuss it first" },
  { value: "no", label: "No, the onboarding and monthly fees are outside my budget" },
];

const timelines = [
  { value: "immediately", label: "Immediately" },
  { value: "10_days", label: "Within 10 days" },
  { value: "1_month", label: "Within 1 month" },
  { value: "researching", label: "Only researching / no buying plan yet" },
];

const styles = {
  select:
    "mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 text-sm font-medium text-[#171816] outline-none transition focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10",
};

// One complete package. Keep pricing details consistent across form stages.
// Monthly fee = max(PKR 5,000, 1% of monthly sales made through Restrova).
const includedFeatures = [
  "Client Application (iOS & Android)",
  "Admin Application",
  "Rider Application",
  "Restaurant Website",
  "Inventory Management System",
];

function PricingSummary({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-[#ff6247]/35 bg-[#ff6247]/5 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-[#c84931]">
        Restrova Complete Restaurant System
      </p>
      <h3 className="mt-2 text-xl font-black text-[#171816]">
        Your entire restaurant system in one package
      </h3>
      {!compact && (
        <>
          <p className="mt-3 text-sm font-bold text-[#171816]">
            Included with your PKR 10,000 onboarding:
          </p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-[#171816] sm:grid-cols-2">
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {compact && (
        <p className="mt-3 text-xs leading-5 text-black/75">
          Includes Client App (iOS & Android), Admin App, Rider App,
          Restaurant Website, and Inventory Management.
        </p>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase tracking-wide text-black/60">
            One-time onboarding
          </p>
          <p className="mt-1 text-2xl font-black text-[#171816]">PKR 10,000</p>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase tracking-wide text-black/60">
            Monthly service fee
          </p>
          <p className="mt-1 text-lg font-black text-[#171816]">
            PKR 5,000 minimum OR 1% of sales through Restrova
          </p>
          <p className="mt-1 text-xs font-bold text-[#c84931]">
            Whichever is higher
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#171816]">
        Only sales made through the Restrova system count. If 1% of those
        monthly sales is PKR 5,000 or less, your monthly fee is PKR 5,000.
        If 1% is higher than PKR 5,000, you pay the full 1% of sales through
        Restrova. This fee is separate from onboarding.
      </p>
      {!compact && (
        <p className="mt-2 text-xs text-black/65">
          For example: PKR 300,000 in Restrova sales = PKR 5,000/month;
          PKR 800,000 in Restrova sales = PKR 8,000/month.
        </p>
      )}
    </div>
  );
}

function selectionLabel(options: { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function isEligible(q: Qualification) {
  const operating = ["established", "takeaway", "chain"].includes(q.businessType);
  const hasScale = q.branches !== "1" || q.dailyOrders !== "under_10";
  const buyer = ["owner", "partner", "manager"].includes(q.role);
  const budgetPossible = q.onboardingBudget === "ready" || q.onboardingBudget === "discuss";
  const purchasePlan = q.timeline !== "researching";

  return operating && hasScale && buyer && budgetPossible && purchasePlan && q.completeSystem === "yes";
}

function isHighPriority(q: Qualification) {
  const hasScale = q.branches !== "1" || ["30_99", "100_plus"].includes(q.dailyOrders);
  const buyingSoon = ["immediately", "10_days", "1_month"].includes(q.timeline);
  return isEligible(q) && hasScale && q.onboardingBudget === "ready" && buyingSoon;
}

function buildMessage(q: Qualification, campaignParams: string) {
  return [
    "REQUIRED PRODUCT: Restrova complete restaurant system (one package)",
    `ONBOARDING PACKAGE INCLUDES: ${includedFeatures.join(", ")}`,
    "ONE-TIME ONBOARDING: PKR 10,000",
    "MONTHLY SERVICE: PKR 5,000 minimum OR 1% of monthly sales through Restrova (whichever is higher); excludes sales made outside Restrova",
    `BUSINESS TYPE: ${selectionLabel(businessTypes, q.businessType)}`,
    `NUMBER OF BRANCHES: ${selectionLabel(branches, q.branches)}`,
    `DAILY ORDER VOLUME: ${selectionLabel(dailyOrders, q.dailyOrders)}`,
    `BUYER ROLE: ${selectionLabel(roles, q.role)}`,
    `COMPLETE SYSTEM INTENT: ${q.completeSystem === "yes" ? "Yes" : "No"}`,
    `PRICING READINESS (ONBOARDING + MONTHLY): ${selectionLabel(budgetOptions, q.onboardingBudget)}`,
    `PURCHASE TIMELINE: ${selectionLabel(timelines, q.timeline)}`,
    `AUTOMATED SCREEN: ${isHighPriority(q) ? "HIGH PRIORITY (VERIFY WITH SALES)" : "POTENTIAL FIT (VERIFY WITH SALES)"}`,
    campaignParams ? `AD ATTRIBUTION: ${campaignParams}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function ContactForm() {
  const [stage, setStage] = useState<Stage>("qualification");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [qualification, setQualification] = useState<Qualification>(initialQualification);
  const [contact, setContact] = useState(initialContact);
  const [campaignParams, setCampaignParams] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id", "adset_id", "ad_id"];
    const attribution = keys
      .filter((key) => params.has(key))
      .map((key) => `${key}=${params.get(key) ?? ""}`)
      .join("; ");
    setCampaignParams(attribution.slice(0, 1000));
  }, []);

  const qualificationComplete = Object.values(qualification).every((answer) => answer.trim() !== "");
  const eligible = qualificationComplete && isEligible(qualification);
  const canSubmit = Boolean(
    eligible && contact.name.trim() && contact.restaurant.trim() && contact.phone.trim(),
  );

  const leadMessage = useMemo(
    () => buildMessage(qualification, campaignParams),
    [qualification, campaignParams],
  );

  const fallbackEmailHref = useMemo(() => {
    const subject = `Restrova complete system demo: ${contact.restaurant || contact.name || "restaurant"}`;
    const body = [
      `Name: ${contact.name}`,
      `Restaurant: ${contact.restaurant}`,
      `Phone / WhatsApp: ${contact.phone}`,
      `City: ${contact.city}`,
      leadMessage,
    ].join("\n");
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [contact, leadMessage]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please complete the qualification questions and contact details.");
      return;
    }

    setStatus("submitting");

    try {
      // Keep the exact data structure expected by the existing /api/contact
      // and Google Sheets integration. Qualification goes into "message".
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          email: "",
          message: leadMessage,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error ?? "We could not send your request.");
      }

      // Only a successfully accepted, pre-screened demo enquiry counts as a
      // Lead. Sales must still verify whether it is a real qualified prospect.
      try {
        const metaWindow = window as Window & {
          fbq?: (action: string, eventName: string) => void;
        };
        metaWindow.fbq?.("track", "Lead");
      } catch {
        // An ad blocker must not prevent the confirmation UI.
      }

      setStatus("success");
      setContact(initialContact);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-black text-emerald-950">Your Restrova demo request is in.</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          Thanks. Our team will review your restaurant details and contact you about a complete-system demo.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStage("qualification");
            setQualification(initialQualification);
            setError(null);
          }}
          className="mt-5 text-sm font-bold text-emerald-800 underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  if (stage === "qualification") {
    return (
      <section className="space-y-5" aria-label="Restrova restaurant qualification">
        <PricingSummary />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="restaurant-type"
            label="What type of food business do you operate?"
            value={qualification.businessType}
            options={businessTypes}
            onChange={(value) => setQualification((current) => ({ ...current, businessType: value }))}
          />
          <SelectField
            id="restaurant-branches"
            label="How many operating branches?"
            value={qualification.branches}
            options={branches}
            onChange={(value) => setQualification((current) => ({ ...current, branches: value }))}
          />
          <SelectField
            id="restaurant-orders"
            label="Approximately how many orders per day?"
            value={qualification.dailyOrders}
            options={dailyOrders}
            onChange={(value) => setQualification((current) => ({ ...current, dailyOrders: value }))}
          />
          <SelectField
            id="restaurant-role"
            label="What is your role in the business?"
            value={qualification.role}
            options={roles}
            onChange={(value) => setQualification((current) => ({ ...current, role: value }))}
          />
          <SelectField
            id="restaurant-system"
            label="Are you considering the complete Restrova system?"
            value={qualification.completeSystem}
            options={[
              { value: "yes", label: "Yes, I need the complete system" },
              { value: "no", label: "No, I am only researching individual tools" },
            ]}
            onChange={(value) => setQualification((current) => ({ ...current, completeSystem: value }))}
          />
          <SelectField
            id="restaurant-budget"
            label="Are you comfortable with the onboarding and monthly fees?"
            value={qualification.onboardingBudget}
            options={budgetOptions}
            onChange={(value) => setQualification((current) => ({ ...current, onboardingBudget: value }))}
          />
        </div>
        <SelectField
          id="restaurant-timeline"
          label="When are you planning to implement a new system?"
          value={qualification.timeline}
          options={timelines}
          onChange={(value) => setQualification((current) => ({ ...current, timeline: value }))}
        />

        {qualificationComplete && !eligible ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950" role="status">
            Based on your answers, our personalized demos may not be the best fit right now.
            Restrova currently prioritizes operating restaurants evaluating a complete system with
            an implementation plan, the PKR 10,000 onboarding fee, and the monthly service fee (minimum PKR 5,000 or 1% of sales through Restrova).
            You can review your answers or explore the website meanwhile.
          </div>
        ) : null}

        <button
          type="button"
          disabled={!eligible}
          onClick={() => {
            setError(null);
            setStage("contact");
          }}
          className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-7 text-base font-black text-white transition hover:bg-[#e45239] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Demo Request
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <PricingSummary compact />
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        Thanks — your restaurant appears to fit our initial criteria. Our team will confirm your business needs during the demo process.
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Your name"
          value={contact.name}
          onChange={(value) => setContact((current) => ({ ...current, name: value }))}
          placeholder="Ali Khan"
          autoComplete="name"
          required
        />
        <Field
          id="contact-restaurant"
          name="restaurant"
          label="Restaurant name"
          value={contact.restaurant}
          onChange={(value) => setContact((current) => ({ ...current, restaurant: value }))}
          placeholder="Your restaurant"
          autoComplete="organization"
          required
        />
        <Field
          id="contact-phone"
          name="phone"
          label="Phone / WhatsApp"
          value={contact.phone}
          onChange={(value) => setContact((current) => ({ ...current, phone: value }))}
          placeholder="+92 3XX XXXXXXX"
          autoComplete="tel"
          type="tel"
          inputMode="tel"
          required
        />
        <Field
          id="contact-city"
          name="city"
          label="City"
          value={contact.city}
          onChange={(value) => setContact((current) => ({ ...current, city: value }))}
          placeholder="Lahore"
          autoComplete="address-level2"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          <p className="font-semibold">{error}</p>
          <a
            href={fallbackEmailHref}
            className="mt-2 inline-flex font-black underline underline-offset-4 transition hover:text-red-950"
          >
            Email {siteConfig.contact.email} instead
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setStage("qualification");
            setStatus("idle");
            setError(null);
          }}
          className="text-sm font-bold text-[#171816] underline underline-offset-4"
        >
          Edit restaurant details
        </button>
        <span className="text-xs text-black/60">
          PKR 10,000 onboarding + monthly fee (PKR 5,000 minimum or 1% of Restrova sales, whichever is higher)
        </span>
      </div>

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-7 text-base font-black text-white shadow-[0_12px_30px_rgba(255,98,71,.24)] transition hover:-translate-y-0.5 hover:bg-[#e45239] focus:outline-none focus:ring-4 focus:ring-[#ff6247]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending your request…" : "Request My Restrova Demo"}
        {status !== "submitting" ? (
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
        ) : null}
      </button>
      <p className="text-center text-xs leading-5 text-black/45">
        We’ll use your submitted details to respond to your Restrova demo enquiry.
      </p>
    </form>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/70">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.select}
        required
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  required,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "tel";
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/70">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 text-sm font-medium text-[#171816] outline-none transition placeholder:text-black/30 focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}
