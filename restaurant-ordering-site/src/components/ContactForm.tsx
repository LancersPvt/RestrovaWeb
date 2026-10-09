"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Step = "restaurant" | "demo-invite" | "contact" | "thank-you" | "demo-success";
type RequestStatus = "idle" | "submitting" | "error";

type Qualification = {
  businessType: string;
  completeSystem: string;
  branches: string;
  dailyOrders: string;
  role: string;
  onboardingBudget: string;
  timeline: string;
};

type ContactDetails = {
  name: string;
  restaurant: string;
  phone: string;
  city: string;
};

const emptyQualification: Qualification = {
  businessType: "",
  completeSystem: "",
  branches: "",
  dailyOrders: "",
  role: "",
  onboardingBudget: "",
  timeline: "",
};

const emptyContact: ContactDetails = {
  name: "",
  restaurant: "",
  phone: "",
  city: "",
};

// Keep labels stable: Google Apps Script extracts these exact answers
// from the message field sent to /api/contact.
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

const includedFeatures = [
  "Client Application (iOS & Android)",
  "Admin Application",
  "Rider Application",
  "Restaurant Website",
  "Inventory Management System",
];

const selectClass =
  "mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 text-sm font-medium text-[#171816] outline-none transition focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10";
const buttonClass =
  "group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-7 text-base font-black text-white shadow-[0_12px_30px_rgba(255,98,71,.24)] transition hover:bg-[#e45239] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6247] disabled:cursor-not-allowed disabled:opacity-50";

function labelOf(options: { value: string; label: string }[], value: string) {
  return options.find((item) => item.value === value)?.label ?? value;
}

// This decision never appears in the visitor-facing UI.
function passesInitialScreen(q: Qualification) {
  const operating = ["established", "takeaway", "chain"].includes(q.businessType);
  const hasScale = q.branches !== "1" || q.dailyOrders !== "under_10";
  const decisionMaker = ["owner", "partner", "manager"].includes(q.role);
  const understandsPricing = ["ready", "discuss"].includes(q.onboardingBudget);
  const readyToConsider = q.timeline !== "researching";
  return (
    operating && hasScale && decisionMaker && understandsPricing &&
    readyToConsider && q.completeSystem === "yes"
  );
}

function highPriority(q: Qualification) {
  const scale = q.branches !== "1" || ["30_99", "100_plus"].includes(q.dailyOrders);
  return passesInitialScreen(q) && scale && q.onboardingBudget === "ready";
}

// Keep key/value lines identical to the current Google Apps Script's
// fieldFromMessage() parsing contract. No backend changes needed for this UI.
function buildMessage(q: Qualification, attribution: string) {
  return [
    "REQUIRED PRODUCT: Restrova complete restaurant system (one package)",
    `ONBOARDING PACKAGE INCLUDES: ${includedFeatures.join(", ")}`,
    "ONE-TIME ONBOARDING: PKR 10,000",
    "MONTHLY SERVICE: PKR 5,000 minimum OR 1% of monthly sales through Restrova (whichever is higher); excludes sales made outside Restrova",
    `BUSINESS TYPE: ${labelOf(businessTypes, q.businessType)}`,
    `NUMBER OF BRANCHES: ${labelOf(branches, q.branches)}`,
    `DAILY ORDER VOLUME: ${labelOf(dailyOrders, q.dailyOrders)}`,
    `BUYER ROLE: ${labelOf(roles, q.role)}`,
    `COMPLETE SYSTEM INTENT: ${q.completeSystem === "yes" ? "Yes" : "No"}`,
    `PRICING READINESS (ONBOARDING + MONTHLY): ${labelOf(budgetOptions, q.onboardingBudget)}`,
    `PURCHASE TIMELINE: ${labelOf(timelines, q.timeline)}`,
    `AUTOMATED SCREEN: ${highPriority(q) ? "HIGH PRIORITY (VERIFY WITH SALES)" : "POTENTIAL FIT (VERIFY WITH SALES)"}`,
    attribution ? `AD ATTRIBUTION: ${attribution}` : "",
  ].filter(Boolean).join("\n");
}

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
        <ul className="mt-4 grid gap-2 text-sm font-semibold text-[#171816] sm:grid-cols-2">
          {includedFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase tracking-wide text-black/60">One-time onboarding</p>
          <p className="mt-1 text-2xl font-black text-[#171816]">PKR 10,000</p>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase tracking-wide text-black/60">Monthly service fee</p>
          <p className="mt-1 text-base font-black text-[#171816]">
            PKR 5,000 minimum OR 1% of sales through Restrova
          </p>
          <p className="mt-1 text-xs font-bold text-[#c84931]">Whichever is higher</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-black/75">
        The 1% applies only to monthly sales made through Restrova, not your restaurant’s
        other sales. The monthly service fee is separate from onboarding.
      </p>
    </div>
  );
}

function SelectField({
  id, label, value, options, onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/70">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
        required
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function ContactField({
  id, label, name, value, onChange, placeholder, type = "text", autoComplete,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/70">{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 text-sm font-medium text-[#171816] outline-none transition placeholder:text-black/30 focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10"
        required
      />
    </div>
  );
}

function Confirmation({ heading, message }: { heading: string; message?: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center" role="status" aria-live="polite">
      <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-black text-emerald-950">{heading}</h3>
      {message && <p className="mt-2 text-sm leading-6 text-emerald-800">{message}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [step, setStep] = useState<Step>("restaurant");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [qualification, setQualification] = useState<Qualification>(emptyQualification);
  const [contact, setContact] = useState<ContactDetails>(emptyContact);
  const [attribution, setAttribution] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id", "adset_id", "ad_id"];
    const params = keys
      .filter((key) => url.searchParams.has(key))
      .map((key) => `${key}=${url.searchParams.get(key) ?? ""}`)
      .join("; ");
    setAttribution(params.slice(0, 1000));
  }, []);

  const answersComplete = Object.values(qualification).every((answer) => answer.trim() !== "");
  const contactComplete = Object.values(contact).every((answer) => answer.trim() !== "");
  const message = useMemo(() => buildMessage(qualification, attribution), [qualification, attribution]);
  const fallbackEmailHref = useMemo(() => {
    const subject = `Restrova demo request: ${contact.restaurant || contact.name || "restaurant"}`;
    const body = [
      `Full name: ${contact.name}`,
      `Restaurant: ${contact.restaurant}`,
      `Phone: ${contact.phone}`,
      `City: ${contact.city}`,
      message,
    ].join("\n");
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [contact, message]);

  function submitRestaurantDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answersComplete) return;

    // Only qualified prospects can open the demo invitation/contact screen.
    // Others see exactly the same neutral confirmation, without a rejection.
    // Neither a Google Sheet row nor a Meta Lead event is generated here.
    if (passesInitialScreen(qualification)) {
      setStep("demo-invite");
    } else {
      setStep("thank-you");
    }
  }

  async function submitDemoRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setError(null);
    if (!contactComplete || !answersComplete || !passesInitialScreen(qualification)) {
      setError("Please complete your restaurant and contact details.");
      return;
    }

    setStatus("submitting");
    try {
      // Same /api/contact payload as the deployed integration.
      // Qualified details are included in message for the existing Apps Script.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, email: "", message }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error ?? "Your request could not be submitted.");
      }

      // Fire ONE standard Meta Lead event only after API acknowledges a save.
      // Never include name, restaurant, phone or city as raw Pixel parameters.
      try {
        const pixelWindow = window as Window & {
          fbq?: (command: string, eventName: string) => void;
        };
        pixelWindow.fbq?.("track", "Lead");
      } catch {
        // An unavailable Pixel must never break the successful submission UI.
      }
      setStatus("idle");
      setStep("demo-success");
      setContact(emptyContact);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (step === "thank-you") {
    return <Confirmation heading="Thank you! Your form has been submitted successfully." />;
  }

  if (step === "demo-success") {
    return (
      <Confirmation
        heading="Thank you! Your demo request has been submitted successfully."
        message="Our team will contact you about your Restrova demo."
      />
    );
  }

  if (step === "demo-invite") {
    return (
      <section className="space-y-5" aria-label="Restrova demo invitation">
        <PricingSummary compact />
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-center">
          <h3 className="text-xl font-black text-[#171816]">Ready to see Restrova in action?</h3>
          <p className="mt-2 text-sm leading-6 text-black/65">
            See how the complete restaurant system can work for your business.
          </p>
          <button type="button" className={`${buttonClass} mt-5`} onClick={() => setStep("contact")}>
            Request a Demo <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-[#171816] underline underline-offset-4"
            onClick={() => setStep("restaurant")}
          >
            Edit restaurant details
          </button>
        </div>
      </section>
    );
  }

  if (step === "contact") {
    return (
      <form onSubmit={submitDemoRequest} className="space-y-5" aria-label="Request a Restrova demo">
        <h3 className="text-xl font-black text-[#171816]">Request a Demo</h3>
        <p className="text-sm leading-6 text-black/65">Tell us where we can reach you.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <ContactField
            id="contact-name" name="name" label="Full Name" value={contact.name}
            onChange={(value) => setContact((current) => ({ ...current, name: value }))}
            placeholder="Ali Khan" autoComplete="name"
          />
          <ContactField
            id="contact-restaurant" name="restaurant" label="Restaurant Name" value={contact.restaurant}
            onChange={(value) => setContact((current) => ({ ...current, restaurant: value }))}
            placeholder="Your restaurant" autoComplete="organization"
          />
          <ContactField
            id="contact-phone" name="phone" label="Phone Number" value={contact.phone}
            onChange={(value) => setContact((current) => ({ ...current, phone: value }))}
            placeholder="+92 3XX XXXXXXX" type="tel" autoComplete="tel"
          />
          <ContactField
            id="contact-city" name="city" label="City" value={contact.city}
            onChange={(value) => setContact((current) => ({ ...current, city: value }))}
            placeholder="Lahore" autoComplete="address-level2"
          />
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            <p>{error}</p>
            <a className="mt-2 inline-block font-bold underline" href={fallbackEmailHref}>
              Email {siteConfig.contact.email} instead
            </a>
          </div>
        )}
        <button type="submit" className={buttonClass} disabled={!contactComplete || status === "submitting"}>
          {status === "submitting" ? "Submitting your request…" : "Submit Request"}
          {status !== "submitting" && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="text-sm font-semibold text-[#171816] underline underline-offset-4"
          onClick={() => { setError(null); setStatus("idle"); setStep("restaurant"); }}
        >
          Edit restaurant details
        </button>
        <p className="text-center text-xs leading-5 text-black/55">
          We use your contact information only to follow up about your demo request.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={submitRestaurantDetails} className="space-y-6" aria-label="Tell us about your restaurant">
      <PricingSummary />
      <div className="space-y-1">
        <h3 className="text-lg font-black text-[#171816]">Tell Us About Your Restaurant</h3>
        <p className="text-sm leading-6 text-black/65">A few quick questions about your restaurant.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="restaurant-type" label="What type of food business do you operate?"
          value={qualification.businessType} options={businessTypes}
          onChange={(value) => setQualification((current) => ({ ...current, businessType: value }))}
        />
        <SelectField
          id="restaurant-branches" label="How many operating branches?"
          value={qualification.branches} options={branches}
          onChange={(value) => setQualification((current) => ({ ...current, branches: value }))}
        />
        <SelectField
          id="restaurant-orders" label="Approximately how many orders per day?"
          value={qualification.dailyOrders} options={dailyOrders}
          onChange={(value) => setQualification((current) => ({ ...current, dailyOrders: value }))}
        />
        <SelectField
          id="restaurant-role" label="What is your role in the business?"
          value={qualification.role} options={roles}
          onChange={(value) => setQualification((current) => ({ ...current, role: value }))}
        />
        <SelectField
          id="restaurant-system" label="Are you considering the complete Restrova system?"
          value={qualification.completeSystem}
          options={[
            { value: "yes", label: "Yes, I need the complete system" },
            { value: "no", label: "No, I am only researching individual tools" },
          ]}
          onChange={(value) => setQualification((current) => ({ ...current, completeSystem: value }))}
        />
        <SelectField
          id="restaurant-budget" label="Are you comfortable with the onboarding and monthly fees?"
          value={qualification.onboardingBudget} options={budgetOptions}
          onChange={(value) => setQualification((current) => ({ ...current, onboardingBudget: value }))}
        />
        <SelectField
          id="restaurant-timeline" label="When are you planning to implement a new system?"
          value={qualification.timeline} options={timelines}
          onChange={(value) => setQualification((current) => ({ ...current, timeline: value }))}
        />
      </div>
      <button type="submit" className={buttonClass} disabled={!answersComplete}>
        Submit Restaurant Details <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className="text-center text-xs leading-5 text-black/55">
        Your answers help us understand your restaurant’s needs.
      </p>
    </form>
  );
}
