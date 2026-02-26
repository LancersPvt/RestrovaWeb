import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact DigiAroma to build your restaurant ordering system, customer app, admin panel, and analytics dashboard.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact DigiAroma
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-secondary/70">
            Send your requirements and we’ll respond with a recommended setup and
            timeline.
          </p>

          <div className="mt-8 rounded-3xl border border-secondary/15 bg-muted p-6">
            <p className="text-sm font-semibold text-secondary">Tips</p>
            <ul className="mt-3 space-y-2 text-sm text-secondary/70">
              <li>• Mention your city and number of branches</li>
              <li>• Tell us if you need delivery, pickup, or dine-in</li>
              <li>• Share any POS workflows you already use</li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-secondary/15 bg-white p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
