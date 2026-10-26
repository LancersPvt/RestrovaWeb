"use client";
import { useState } from "react";
import { formatPKR, monthlyFee, ONBOARDING_FEE } from "@/lib/pricing";

export default function PricingCalculator() {
  const [sales, setSales] = useState("500000");
  const amount = Number(sales);
  const valid = sales.trim() !== "" && Number.isFinite(amount) && amount >= 0;
  const fee = valid ? monthlyFee(amount) : null;
  return <section className="seo-card" aria-labelledby="calculator-heading">
    <h2 id="calculator-heading">Estimate your monthly service fee</h2>
    <label htmlFor="processed-sales" className="mt-6 block font-bold">Monthly sales processed through Restrova (PKR)</label>
    <p id="sales-help" className="mt-2 text-sm">Include only Restrova-processed sales, not your restaurant&apos;s total sales across other channels.</p>
    <input id="processed-sales" type="number" min="0" step="any" inputMode="decimal" value={sales}
      onChange={(event) => setSales(event.target.value)} aria-describedby={`sales-help${valid ? "" : " sales-error"}`} aria-invalid={!valid}
      className="mt-3 min-h-12 w-full rounded-xl border border-black/30 bg-white px-4 text-lg" />
    {!valid && <p id="sales-error" className="mt-2 text-red-800">Enter a sales amount of zero or more.</p>}
    <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 rounded-2xl bg-[#fff0e8] p-6">
      {fee === null ? <p>Your estimate will appear after a valid sales amount.</p> : <>
        <p>Estimated monthly service fee</p><p className="mt-2 text-4xl font-black">{formatPKR(fee)}</p>
        <p className="mt-3">1% of these sales is {formatPKR(amount * 0.01)}. The higher of this amount and PKR 5,000 applies.</p>
        <p className="mt-3">One-time onboarding: {formatPKR(ONBOARDING_FEE)}. Onboarding plus one month at this sales level: {formatPKR(ONBOARDING_FEE + fee)}.</p>
      </>}
    </div>
    <p className="mt-4 text-sm">This is a service-fee estimate. Confirm taxes, payment-provider fees, hardware, app-store account charges and any exclusions in your written proposal.</p>
  </section>;
}
