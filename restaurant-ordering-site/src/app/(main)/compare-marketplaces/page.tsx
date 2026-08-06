import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Search, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Direct Ordering vs Restaurant Marketplaces",
  description:
    "See how restaurant marketplaces and Restrova serve different roles—and how a branded direct ordering channel can strengthen repeat business.",
};

const comparisons = [
  {
    feature: "Primary role",
    marketplace: "Help new customers discover restaurants in a shared marketplace.",
    restrova: "Give customers a direct, branded way to order from your restaurant.",
  },
  {
    feature: "Brand experience",
    marketplace: "Your menu appears inside the marketplace’s customer journey.",
    restrova: "Your restaurant shapes the website, apps, offers, and ordering flow.",
  },
  {
    feature: "Customer relationship",
    marketplace: "The relationship is managed through the marketplace platform.",
    restrova: "Your team manages the direct relationship and repeat-order experience.",
  },
  {
    feature: "Menu and promotions",
    marketplace: "Configured within the tools and rules offered by the marketplace.",
    restrova: "Managed from your Restrova admin around your branches and campaigns.",
  },
  {
    feature: "Restaurant operations",
    marketplace: "Often adds a separate order channel to the team’s workflow.",
    restrova: "Can connect ordering, menus, branches, delivery, and reporting workflows.",
  },
];

export default function CompareMarketplacesPage() {
  return (
    <main className="bg-[#fffaf4] text-[#171816]">
      <section className="border-b border-black/5 bg-[#171816] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[#ff8d75]">Use each channel for what it does best</p>
          <h1 className="mx-auto mt-4 max-w-5xl text-balance text-4xl font-black leading-tight tracking-[-0.05em] sm:text-6xl">
            Marketplaces help with discovery. Restrova helps with the next order.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            You do not have to choose one or the other. Build a direct channel
            for regular customers while keeping the discovery channels that work for your restaurant.
          </p>
          <Link href="/#contact" className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#ff6247] px-7 font-black text-white transition hover:bg-[#ff735b]">
            Plan my direct channel
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-[1.75rem] border border-black/8 bg-white p-7">
              <Search className="h-7 w-7 text-black/45" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black">Marketplaces are useful for reach.</h2>
              <p className="mt-3 leading-7 text-black/60">They put your restaurant in front of people deciding where to order. That can make them a useful customer-acquisition channel.</p>
            </article>
            <article className="rounded-[1.75rem] bg-[#ffebe4] p-7">
              <Store className="h-7 w-7 text-[#e45239]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black">Restrova is built for the relationship.</h2>
              <p className="mt-3 leading-7 text-black/60">It gives customers who already know your food a direct place to return, reorder, and stay connected to your brand.</p>
            </article>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_20px_70px_rgba(30,24,18,.07)]">
            <div className="hidden grid-cols-[.7fr_1fr_1fr] bg-[#f3ede4] text-xs font-black uppercase tracking-[.16em] text-black/45 md:grid">
              <div className="p-5">What changes</div>
              <div className="p-5">Marketplace channel</div>
              <div className="p-5 text-[#e45239]">Restrova direct channel</div>
            </div>
            <div className="divide-y divide-black/8">
              {comparisons.map((item) => (
                <article key={item.feature} className="grid gap-4 p-6 md:grid-cols-[.7fr_1fr_1fr] md:gap-0 md:p-0">
                  <h2 className="font-black md:p-6">{item.feature}</h2>
                  <div className="md:border-l md:border-black/8 md:p-6">
                    <p className="mb-1 text-xs font-black uppercase tracking-[.14em] text-black/35 md:hidden">Marketplace</p>
                    <p className="leading-7 text-black/60">{item.marketplace}</p>
                  </div>
                  <div className="rounded-xl bg-[#fff7f3] p-4 md:rounded-none md:border-l md:border-black/8 md:p-6">
                    <p className="mb-1 text-xs font-black uppercase tracking-[.14em] text-[#e45239] md:hidden">Restrova</p>
                    <p className="flex gap-3 font-semibold leading-7">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#e45239]" aria-hidden="true" />
                      {item.restrova}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ede4] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Turn marketplace discovery into a direct relationship.</h2>
          <p className="mt-4 text-lg leading-8 text-black/60">We’ll show you how Restrova can fit alongside your current order channels and give regulars a better way back.</p>
          <Link href="/#contact" className="mt-7 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#171816] px-7 font-black text-white transition hover:bg-[#e45239]">
            Request a free walkthrough
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
