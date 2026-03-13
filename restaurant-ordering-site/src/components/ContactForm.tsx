"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    restaurant: "",
    city: "",
    email: "",
    phone: "",
    message: "",
  });

  const canSubmit = useMemo(() => {
    const hasContact = form.email.trim() || form.phone.trim();
    return Boolean(form.name.trim() && hasContact && form.message.trim());
  }, [form]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please fill name, message, and at least email or phone.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Failed to submit.");
      }

      setStatus("success");
      setForm({
        name: "",
        restaurant: "",
        city: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          placeholder="e.g. Ali"
          required
        />
        <Field
          label="Restaurant name"
          value={form.restaurant}
          onChange={(v) => setForm((s) => ({ ...s, restaurant: v }))}
          placeholder="e.g. Cheezious"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="City"
          value={form.city}
          onChange={(v) => setForm((s) => ({ ...s, city: v }))}
          placeholder="e.g. Islamabad"
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((s) => ({ ...s, email: v }))}
          placeholder="you@company.com"
        />
      </div>

      <Field
        label="Phone / WhatsApp"
        value={form.phone}
        onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
        placeholder="+92..."
      />

      <div>
        <label className="text-sm font-semibold text-gray-700">Message</label>
        <textarea
          className="mt-2 h-32 w-full resize-none rounded-2xl border-2 border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Tell us what you need (online ordering, apps, POS workflows, analytics, etc.)"
          required
        />
      </div>

      {error ? (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700 font-medium" role="alert">
            {error}
          </p>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
          <p className="text-sm text-emerald-700 font-medium" role="status">
            ✓ Thanks! Your message has been sent. We'll contact you shortly.
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending…
          </span>
        ) : (
          "Send message"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form you agree that we may contact you about your
        request.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        className="mt-2 h-12 w-full rounded-full border-2 border-gray-200 bg-white px-5 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </div>
  );
}
