"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, ArrowRight } from "lucide-react";
import { meetingPlatforms } from "@/lib/restrova-demo";

function localToday(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const value = (key: string) => parts.find((p) => p.type === key)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

const fieldClass = "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#171816] outline-none focus:border-[#ff6247] focus:ring-4 focus:ring-[#ff6247]/10";

export default function RestrovaScheduleDemo() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [today, setToday] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [platform, setPlatform] = useState("");
  const [otherPlatform, setOtherPlatform] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/demo/session", { cache: "no-store", credentials: "same-origin" })
      .then((result) => { if (active) { setAvailable(result.ok); setToday(localToday()); } })
      .catch(() => { if (active) setAvailable(false); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/demo/schedule", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "same-origin", cache: "no-store",
        body: JSON.stringify({ day, time, platform, otherPlatform }),
      });
      const result = await response.json().catch(() => null) as
        | { ok?: boolean; error?: string; eventId?: string } | null;
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "We couldn't submit your request. Please try again.");
      }
      // One qualified Lead event, only AFTER the CRM reports that demo scheduling
      // data and contact details have been stored. No raw PII is sent to Pixel.
      try {
        const win = window as Window & {
          fbq?: (command: string, eventName: string, params?: Record<string, unknown>, options?: { eventID: string }) => void;
        };
        if (win.fbq) win.fbq("track", "Lead", {}, { eventID: result.eventId ?? "" });
      } catch { /* Pixel blockers must not interrupt the successful CRM submission. */ }
      router.replace("/demo/thank-you");
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (checking) return <p className="p-8 text-center text-sm text-black/60">Loading your demo request…</p>;
  if (!available) return (
    <div className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-white p-7 text-center">
      <h1 className="text-xl font-black text-[#171816]">Start your demo request</h1>
      <p className="mt-3 text-sm text-black/70">Please complete your restaurant details before selecting a demo time.</p>
      <Link href="/" className="mt-5 inline-flex rounded-full bg-[#ff6247] px-6 py-3 font-bold text-white">Return to Restrova</Link>
    </div>
  );

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <CalendarDays className="h-9 w-9 text-[#ff6247]" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-black text-[#171816]">Request Your Restrova Demo</h1>
        <p className="mt-2 text-sm leading-6 text-black/65">
          Choose your preferred day, time and meeting platform. Our team will confirm availability with you.
        </p>
      </div>
      <div>
        <label htmlFor="demo-day" className="text-sm font-bold text-[#171816]">Preferred Day</label>
        <input id="demo-day" type="date" required min={today || undefined} value={day}
          onChange={(event) => setDay(event.target.value)} className={fieldClass} />
      </div>
      <div>
        <label htmlFor="demo-time" className="text-sm font-bold text-[#171816]">Preferred Time (Pakistan Time)</label>
        <input id="demo-time" type="time" required value={time}
          onChange={(event) => setTime(event.target.value)} className={fieldClass} />
      </div>
      <div>
        <label htmlFor="demo-platform" className="text-sm font-bold text-[#171816]">Preferred Meeting Platform</label>
        <select id="demo-platform" required value={platform} onChange={(event) => setPlatform(event.target.value)} className={fieldClass}>
          <option value="" disabled>Select your meeting platform</option>
          {meetingPlatforms.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      {platform === "Other" && (
        <div>
          <label htmlFor="other-platform" className="text-sm font-bold text-[#171816]">Which platform do you prefer?</label>
          <input id="other-platform" required maxLength={70} value={otherPlatform}
            onChange={(event) => setOtherPlatform(event.target.value)} className={fieldClass} placeholder="Enter preferred platform" />
        </div>
      )}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={busy}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6247] px-6 py-3 font-black text-white hover:bg-[#e45239] disabled:opacity-60">
        {busy ? "Submitting…" : "Submit Demo Request"}
        {!busy && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p className="text-center text-xs text-black/55">This is a request for a preferred time, not a confirmed meeting booking.</p>
    </form>
  );
}
