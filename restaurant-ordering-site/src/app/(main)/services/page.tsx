import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant Ordering and Operations Services",
  description:
    "Explore Restrova’s branded online ordering, customer apps, order management, POS integrations, delivery tools, analytics, and loyalty capabilities.",
};

const services = [
  {
    title: "Branded online ordering",
    description: "Give customers a fast, direct way to order from your restaurant on any device.",
    points: ["Delivery, pickup, and dine-in flows", "Menus, modifiers, deals, and checkout", "Your brand, domain, and customer journey"],
  },
  {
    title: "Customer apps",
    description: "Create an Android and iOS experience that makes returning and reordering easy.",
    points: ["Customer accounts and saved addresses", "Order history and quick reorder", "Offers, loyalty, and notifications"],
  },
  {
    title: "Order management",
    description: "Help your team receive and move orders through service with less friction.",
    points: ["Accept and update order statuses", "Preparation-time and kitchen workflows", "Clear screens built for busy shifts"],
  },
  {
    title: "POS and restaurant integrations",
    description: "Connect the systems your restaurant already depends on where the workflow requires it.",
    points: ["Sales and operational workflows", "Inventory and reporting modules", "Custom integrations based on scope"],
  },
  {
    title: "Delivery operations",
    description: "Coordinate zones, dispatch, riders, and customer updates from a connected workflow.",
    points: ["Delivery zones and fees", "Rider assignment and status updates", "Operational delivery reporting"],
  },
  {
    title: "Analytics and engagement",
    description: "Use direct-order data to understand demand and give customers a reason to return.",
    points: ["Sales and menu insights", "Branch and repeat-order trends", "Coupons, rewards, and campaigns"],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#fffaf4] text-[#171816]">
      <section className="border-b border-black/5 bg-[#171816] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[#ff8d75]">Restrova capabilities</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">
            Build the direct ordering system your restaurant actually needs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Start with a branded ordering experience, then connect the apps,
            operations, delivery, and customer tools that fit your team.
          </p>
          <Link href="/#contact" className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#ff6247] px-7 font-black text-white transition hover:bg-[#ff735b]">
            Plan my Restrova setup
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_16px_50px_rgba(30,24,18,.06)]">
              <h2 className="text-xl font-black tracking-tight">{service.title}</h2>
              <p className="mt-3 leading-7 text-black/60">{service.description}</p>
              <ul className="mt-6 space-y-3 border-t border-black/8 pt-5 text-sm text-black/60">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e45239]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3ede4] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Not sure where to start?</h2>
          <p className="mt-4 text-lg leading-8 text-black/60">A short restaurant walkthrough is enough for us to recommend the most useful first step.</p>
          <Link href="/#contact" className="mt-7 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#171816] px-7 font-black text-white transition hover:bg-[#e45239]">
            Request a free demo
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
