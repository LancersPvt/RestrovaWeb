import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Boxes,
  Check,
  Gift,
  Globe2,
  MapPin,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant Ordering and Operations Services",
  description:
    "Explore Restrova’s online and POS ordering, inventory, live rider tracking, rider reconciliation, loyalty, discounts, and branded admin tools.",
};

const services = [
  {
    icon: Globe2,
    value: "Open more ways to order",
    title: "Direct and POS ordering",
    description: "Serve customers online, in your apps, and at the counter through a connected ordering setup.",
    points: ["Branded website and customer apps", "POS ordering for walk-ins and phone orders", "Delivery, pickup, and dine-in flows"],
  },
  {
    icon: Boxes,
    value: "Reduce stock surprises",
    title: "Inventory and menu control",
    description: "Manage what is available and keep your menu operation aligned with the stock your team can actually sell.",
    points: ["Inventory and stock management", "Items, modifiers, pricing, and availability", "Branch-specific menu operations"],
  },
  {
    icon: MapPin,
    value: "Fewer where-is-my-order calls",
    title: "Live rider tracking",
    description: "Keep dispatch informed and give customers the visibility they expect once an order leaves the restaurant.",
    points: ["Live rider tracking for admins", "Customer-facing delivery tracking", "Rider assignment and status updates"],
  },
  {
    icon: Bike,
    value: "Run a more accountable fleet",
    title: "Rider performance and payments",
    description: "Turn delivery activity into a clear record your team can review, compare, and settle.",
    points: ["Rider performance statistics", "Rider payment reconciliation", "Delivery operations reporting"],
  },
  {
    icon: Gift,
    value: "Give regulars a reason to return",
    title: "Loyalty and promotions",
    description: "Build repeat ordering into your direct channel with rewards and flexible ways to run an offer.",
    points: ["Customer loyalty program", "Discounts and coupon codes", "Offers, rewards, and quick reorder"],
  },
  {
    icon: Palette,
    value: "Make the workspace your own",
    title: "Branded admin operations",
    description: "Give your team a clear control center that can match your brand and support the rhythm of busy service.",
    points: ["Custom admin colors and fonts", "Order and preparation statuses", "Orders, branches, riders, and reporting"],
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
            Take orders online and at POS, manage stock, coordinate riders, and
            bring customers back—all through a setup shaped around your team.
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffebe4] text-[#e45239]">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-black uppercase tracking-[.17em] text-[#e45239]">{service.value}</p>
              <h2 className="mt-2 text-xl font-black tracking-tight">{service.title}</h2>
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
