import type { Metadata } from "next";
import { Check } from "lucide-react";

import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free Restrova demo and get a tailored recommendation for your restaurant’s direct ordering website, apps, and operations tools.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#fffaf4] text-[#171816]">
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#e45239]">
              Talk to the Restrova team
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
              Let’s plan a better direct ordering channel.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
              Tell us a little about your restaurant. We’ll show you the most
              useful starting point for your ordering experience and operations—without a hard sell.
            </p>

            <div className="mt-8 rounded-2xl border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(30,24,18,.06)]">
              <p className="font-black">What you’ll get from the walkthrough</p>
              <ul className="mt-4 space-y-3 text-sm text-black/60">
                {[
                  "A recommendation shaped around your restaurant",
                  "A live look at the customer and admin experience",
                  "A clear scope, cost, and next step",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffebe4] text-[#e45239]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-2xl sm:p-9">
            <div className="mb-7">
              <p className="text-2xl font-black tracking-tight">Request your free demo</p>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Share a few details and we’ll get in touch to arrange a convenient time.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
