"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  allBranches, businessTypes, dailyOrders, includedFeatures, pricingOptions, roles, timelines,
  type ContactDetails, type Qualification,
} from "@/lib/restrova-demo";

const initialQualification: Qualification = {
  businessType: "", branches: "", dailyOrders: "", role: "", completeSystem: "",
  onboardingBudget: "", timeline: "",
};
const initialContact: ContactDetails = { name: "", restaurant: "", phone: "", city: "" };

const selectClass = "mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-medium text-[#171816] outline-none focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10";
const buttonClass = "flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-7 py-3 text-base font-black text-white transition hover:bg-[#e45239] disabled:cursor-not-allowed disabled:opacity-50";

type Option = { readonly value: string; readonly label: string };
function SelectField({ id, label, value, options, onChange }: {
  id: string; label: string; value: string; options: readonly Option[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/75">{label}</label>
      <select id={id} required value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
        <option value="" disabled>Select an option</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

function TextField({ id, name, label, value, onChange, placeholder, autoComplete, type = "text" }: {
  id: string; name: string; label: string; value: string; onChange: (v: string) => void;
  placeholder: string; autoComplete?: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-black/75">{label}</label>
      <input id={id} name={name} required type={type} autoComplete={autoComplete}
        value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder}
        className={selectClass} />
    </div>
  );
}

function PricingSummary() {
  return (
    <div className="rounded-2xl border-2 border-[#ff6247]/30 bg-[#ff6247]/5 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-[#c84931]">Restrova Complete Restaurant System</p>
      <h3 className="mt-2 text-xl font-black text-[#171816]">Everything your restaurant needs — one package</h3>
      <ul className="mt-4 grid gap-2 text-sm font-semibold text-[#171816] sm:grid-cols-2">
        {includedFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase text-black/60">One-time onboarding</p>
          <p className="mt-1 text-2xl font-black text-[#171816]">PKR 10,000</p>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase text-black/60">Monthly service fee</p>
          <p className="mt-1 text-base font-black text-[#171816]">PKR 5,000 minimum OR 1% of Restrova sales</p>
          <p className="mt-1 text-xs font-bold text-[#c84931]">Whichever is higher</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-black/70">
        The 1% applies only to monthly sales through Restrova, not other restaurant sales.
        Monthly fees are separate from the one-time onboarding fee.
      </p>
    </div>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [qualification, setQualification] = useState<Qualification>(initialQualification);
  const [contact, setContact] = useState<ContactDetails>(initialContact);
  const [attribution, setAttribution] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot; real users never see it.
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id", "adset_id", "ad_id", "fbclid"];
    const values = keys.filter((key) => params.has(key)).map((key) => `${key}=${params.get(key) ?? ""}`);
    setAttribution(values.join("; ").slice(0, 1000));
  }, []);

  const availableBranches = useMemo(
    () => qualification.businessType === "chain" ? allBranches.filter((item) => item.value !== "1") : allBranches,
    [qualification.businessType],
  );

  const setAnswer = (key: keyof Qualification, value: string) => {
    setQualification((current) => {
      const next = { ...current, [key]: value };
      if (key === "businessType" && value === "chain" && next.branches === "1") next.branches = "";
      return next;
    });
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/demo/intake", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qualification, contact, attribution, website }),
        credentials: "same-origin", cache: "no-store",
      });
      const result = await response.json().catch(() => null) as
        | { ok?: boolean; next?: "schedule" | "thank-you"; error?: string } | null;
      if (!response.ok || result?.ok !== true || !result.next) {
        throw new Error(result?.error || "We couldn't submit your information. Please try again.");
      }
      // No Meta Lead event here: all visitors submit this form.
      // Only the successful scheduling submission counts as a qualified Lead.
      router.push(result.next === "schedule" ? "/demo/schedule" : "/demo/thank-you");
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-7" aria-label="Restrova restaurant and contact information">
      <PricingSummary />
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-black text-[#171816]">Tell Us About Your Restaurant</h3>
          <p className="mt-1 text-sm text-black/65">A few quick details about your restaurant.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField id="restaurant-type" label="What type of food business do you operate?"
            value={qualification.businessType} options={businessTypes}
            onChange={(value) => setAnswer("businessType", value)} />
          <SelectField id="restaurant-branches" label="How many operating branches?"
            value={qualification.branches} options={availableBranches}
            onChange={(value) => setAnswer("branches", value)} />
          <SelectField id="restaurant-orders" label="Approximately how many orders per day?"
            value={qualification.dailyOrders} options={dailyOrders}
            onChange={(value) => setAnswer("dailyOrders", value)} />
          <SelectField id="restaurant-role" label="What is your role in the business?"
            value={qualification.role} options={roles}
            onChange={(value) => setAnswer("role", value)} />
          <SelectField id="restaurant-system" label="Are you considering the complete Restrova system?"
            value={qualification.completeSystem}
            options={[{ value: "yes", label: "Yes, I need the complete system" }, { value: "no", label: "No, I am only researching individual tools" }]}
            onChange={(value) => setAnswer("completeSystem", value)} />
          <SelectField id="restaurant-budget" label="Are you comfortable with the onboarding and monthly fees?"
            value={qualification.onboardingBudget} options={pricingOptions}
            onChange={(value) => setAnswer("onboardingBudget", value)} />
          <SelectField id="restaurant-timeline" label="When are you planning to implement a new system?"
            value={qualification.timeline} options={timelines}
            onChange={(value) => setAnswer("timeline", value)} />
        </div>
      </section>

      <section className="space-y-4 border-t border-black/10 pt-6">
        <div>
          <h3 className="text-xl font-black text-[#171816]">Your Contact Information</h3>
          <p className="mt-1 text-sm text-black/65">Tell us how to reach you.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="contact-name" name="name" label="Full Name"
            value={contact.name} onChange={(v) => setContact((c) => ({ ...c, name: v }))}
            placeholder="Ali Khan" autoComplete="name" />
          <TextField id="contact-restaurant" name="restaurant" label="Restaurant Name"
            value={contact.restaurant} onChange={(v) => setContact((c) => ({ ...c, restaurant: v }))}
            placeholder="Your restaurant" autoComplete="organization" />
          <TextField id="contact-phone" name="phone" label="Phone Number"
            value={contact.phone} onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
            placeholder="+92 3XX XXXXXXX" autoComplete="tel" type="tel" />
          <TextField id="contact-city" name="city" label="City"
            value={contact.city} onChange={(v) => setContact((c) => ({ ...c, city: v }))}
            placeholder="Lahore" autoComplete="address-level2" />
        </div>
      </section>
      <div aria-hidden="true" className="absolute -left-[9999px]" style={{ position: "absolute" }}>
        <label htmlFor="internal-website">Leave this field empty</label>
        <input id="internal-website" name="website" tabIndex={-1} autoComplete="off"
          value={website} onChange={(event) => setWebsite(event.target.value)} />
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      <button className={buttonClass} type="submit" disabled={busy}>
        {busy ? "Submitting…" : "Submit Details"}
        {!busy && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p className="text-center text-xs leading-5 text-black/55">
        We use your details to process your enquiry and contact you where appropriate.
      </p>
    </form>
  );
}
