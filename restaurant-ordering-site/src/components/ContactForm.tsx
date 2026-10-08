"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const interests = [
  "I want to grow direct online orders",
  "I need a branded website and app",
  "I need better order management",
  "I want to discuss a complete restaurant system",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    restaurant: "",
    phone: "",
    city: "",
    message: interests[0],
  });

  const canSubmit = useMemo(
    () => Boolean(form.name.trim() && form.restaurant.trim() && form.phone.trim()),
    [form],
  );

  const fallbackEmailHref = useMemo(() => {
    const subject = `Demo request from ${form.restaurant || form.name || "a restaurant"}`;
    const body = [
      `Name: ${form.name}`,
      `Restaurant: ${form.restaurant}`,
      `Phone / WhatsApp: ${form.phone}`,
      `City: ${form.city}`,
      `Interested in: ${form.message}`,
    ].join("\n");

    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please add your name, restaurant, and phone number.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: "" }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error ?? "We could not send your request.");
      }

      // Count a lead only after our backend has acknowledged the submission.
      // Do not send names, phone numbers, or restaurant details to Pixel.
      setStatus("success");
      try {
        const metaWindow = window as Window & {
          fbq?: (action: string, eventName: string) => void;
        };
        metaWindow.fbq?.("track", "Lead");
      } catch {
        // A blocked/failed tracking script must not fail a successful form.
      }

      setForm({
        name: "",
        restaurant: "",
        phone: "",
        city: "",
        message: interests[0],
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <p className="mt-4 text-xl font-black text-emerald-950">Your demo request is in.</p>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          Thanks—we’ll contact you shortly to arrange a convenient time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-bold text-emerald-800 underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Your name"
          value={form.name}
          onChange={(value) => setForm((current) => ({ ...current, name: value }))}
          placeholder="Ali Khan"
          autoComplete="name"
          required
        />
        <Field
          id="contact-restaurant"
          name="restaurant"
          label="Restaurant name"
          value={form.restaurant}
          onChange={(value) =>
            setForm((current) => ({ ...current, restaurant: value }))
          }
          placeholder="Your restaurant"
          autoComplete="organization"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-phone"
          name="phone"
          label="Phone / WhatsApp"
          value={form.phone}
          onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
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
          value={form.city}
          onChange={(value) => setForm((current) => ({ ...current, city: value }))}
          placeholder="Lahore"
          autoComplete="address-level2"
        />
      </div>

      <div>
        <label htmlFor="contact-interest" className="text-sm font-bold text-black/70">
          What would help most?
        </label>
        <select
          id="contact-interest"
          name="interest"
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          className="mt-2 h-13 w-full rounded-xl border border-black/15 bg-white px-4 text-sm font-medium text-[#171816] outline-none transition focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10"
        >
          {interests.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
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

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-7 text-base font-black text-white shadow-[0_12px_30px_rgba(255,98,71,.24)] transition hover:-translate-y-0.5 hover:bg-[#e45239] focus:outline-none focus:ring-4 focus:ring-[#ff6247]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending your request…" : "Request my free demo"}
        {status !== "submitting" ? (
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        ) : null}
      </button>

      <p className="text-center text-xs leading-5 text-black/45">
        No pressure. We’ll only use your details to follow up about your request.
      </p>
    </form>
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
