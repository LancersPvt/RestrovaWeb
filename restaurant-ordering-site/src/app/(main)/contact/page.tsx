import { staticMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/MarketingPage";
import { Check } from "lucide-react";
import Link from "next/link";

import CompanyInformation from "@/components/CompanyInformation";
import ContactForm from "@/components/ContactForm";

export const metadata = staticMetadata("/contact");

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-[#fffaf4] text-[#171816]">
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <Breadcrumbs items={[{ label: "Free demo", href: "/contact" }]} />
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#b83d29]">
              Talk to the Restrova team
            </p>

            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
              Book a free restaurant software demo.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
              Tell us a little about your restaurant. We’ll show you the most
              useful starting point for your ordering experience and operations—without a hard sell.
            </p>

            <a href="#demo-request" className="seo-button mt-6">Start my demo request</a>
            <p className="mt-4 text-sm leading-6 text-black/70">We ask about your restaurant, branches and setup needs to prepare a relevant walkthrough. Bring your menu and any printer or integration requirements. Review the <Link className="font-bold underline" href="/pricing">pricing examples</Link> first if you are comparing budgets.</p>

            <div className="mt-8 rounded-2xl border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(30,24,18,.06)]">
              <p className="font-black">What you’ll get from the walkthrough</p>
              <ul className="mt-4 space-y-3 text-sm text-black/60">
                {[
                  "A recommendation shaped around your restaurant",
                  "A live look at the customer and admin experience",
                  "A clear scope, cost, and next step",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffebe4] text-[#b83d29]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="demo-request" className="scroll-mt-28 rounded-[2rem] border border-black/8 bg-white p-6 shadow-2xl sm:p-9">
            <div className="mb-7">
              <h2 className="text-2xl font-black tracking-tight">Request your free demo</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Complete the qualification and contact details. Eligible requests can select a preferred future time in Pakistan Time. A saved preference still needs confirmation from the team.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24"><CompanyInformation /></div>
    </main>
  );
}
