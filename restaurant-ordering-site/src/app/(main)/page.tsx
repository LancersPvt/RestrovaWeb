import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  Bike,
  Boxes,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  Gift,
  HeartHandshake,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Palette,
  Repeat2,
  Rocket,
  ShoppingCart,
  Store,
  Zap,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { clientTestimonials } from "@/lib/client-data";
import { siteConfig } from "@/lib/site";

const outcomes = [
  {
    icon: Store,
    title: "Own the customer journey",
    description:
      "Give guests a fast ordering experience that looks and feels like your restaurant—not a crowded marketplace.",
  },
  {
    icon: Repeat2,
    title: "Give regulars a faster way back",
    description:
      "Make reordering, offers, and loyalty part of one direct relationship with your restaurant.",
  },
  {
    icon: LayoutDashboard,
    title: "Run the whole operation from one place",
    description:
      "Connect orders, POS, stock, riders, promotions, and performance without stitching together disconnected tools.",
  },
];

const platformFeatures = [
  {
    icon: ShoppingCart,
    eyebrow: "Sell everywhere",
    title: "Online, app, and POS ordering",
    description:
      "Let guests order through your branded website or apps, while staff can place walk-in and phone orders through POS.",
    features: [
      "Branded web and mobile ordering",
      "POS ordering for your team",
      "Menus, modifiers, and availability",
    ],
  },
  {
    icon: MapPin,
    eyebrow: "Deliver with confidence",
    title: "Live tracking for everyone",
    description:
      "Give admins a live view of active riders and let customers follow their delivery without calling the restaurant.",
    features: [
      "Live rider tracking for admins",
      "Customer delivery tracking",
      "Rider assignment and statuses",
    ],
  },
  {
    icon: Bike,
    eyebrow: "Improve every shift",
    title: "Rider stats and settlements",
    description:
      "Understand rider performance and reconcile rider payments from one clear operational record.",
    features: [
      "Rider performance statistics",
      "Rider payment reconciliation",
      "Delivery operations reporting",
    ],
  },
  {
    icon: Boxes,
    eyebrow: "Protect availability",
    title: "Inventory and stock control",
    description:
      "Keep a closer eye on ingredients and item stock so teams can act before availability becomes a customer problem.",
    features: [
      "Inventory and stock management",
      "Item availability controls",
      "Branch-ready menu operations",
    ],
  },
  {
    icon: Gift,
    eyebrow: "Turn buyers into regulars",
    title: "Loyalty, discounts, and coupons",
    description:
      "Give customers a reason to order direct again with rewards and flexible promotions built into their journey.",
    features: [
      "Customer loyalty program",
      "Discounts and coupon codes",
      "Offers and repeat-order paths",
    ],
  },
  {
    icon: Palette,
    eyebrow: "Make it feel familiar",
    title: "An admin app made for your brand",
    description:
      "Tailor admin colors and fonts while keeping orders, preparation, and daily restaurant controls easy to navigate.",
    features: [
      "Custom admin colors and fonts",
      "Order and preparation statuses",
      "One connected control center",
    ],
  },
];

const connectedJourney = [
  { label: "Order", detail: "Website, app, or POS", icon: ShoppingCart },
  { label: "Prepare", detail: "Orders and live stock", icon: ClipboardCheck },
  { label: "Deliver", detail: "Riders tracked live", icon: Bike },
  { label: "Settle", detail: "Payments reconciled", icon: CircleDollarSign },
  { label: "Retain", detail: "Loyalty and offers", icon: Repeat2 },
];

const restaurantPartners = clientTestimonials;

const faqs = [
  {
    question: "Is Restrova another food marketplace?",
    answer:
      "No. Restrova creates a direct ordering channel for your restaurant. Your brand stays front and center, and your team manages the experience.",
  },
  {
    question: "Do I need to stop using delivery marketplaces?",
    answer:
      "Not at all. Marketplaces can help with discovery. Restrova gives existing customers a direct way to return, order, and build a relationship with your restaurant.",
  },
  {
    question: "Can Restrova work for more than one branch?",
    answer:
      "Yes. Menus, pricing, availability, delivery areas, and operations can be configured for single-location and multi-branch restaurants.",
  },
  {
    question: "Will you help us set everything up?",
    answer:
      "Yes. We help plan the experience, organize your menu, apply your branding, configure operations, and support your team through launch.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The right setup depends on your branches, ordering flow, apps, and integrations. After a short demo, we will recommend a clear scope and cost for your restaurant.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.contact.email,
    },
  };

  return (
    <main className="bg-[#fffaf4] text-[#171816]">
      <Script
        id="restrova-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-black/5 bg-[#171816] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_15%_15%,rgba(255,98,71,.24),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(244,162,97,.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-[#ffd5c7] backdrop-blur">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Direct ordering for independent restaurants
            </div>

            <h1 className="mt-7 text-balance text-5xl font-black leading-[.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Make every direct order worth more.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">
              Restrova brings web, app, and POS orders into one admin hub—with
              stock control, live rider tracking, loyalty, and promotions built
              in to help you sell directly and serve with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#ff6247] px-7 text-base font-bold text-white shadow-[0_14px_40px_rgba(255,98,71,.3)] transition hover:-translate-y-0.5 hover:bg-[#ff735b] focus:outline-none focus:ring-4 focus:ring-[#ff6247]/30"
              >
                Book my free demo
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#restaurants"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-base font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/10"
              >
                See restaurant partners
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
              {["15-minute walkthrough", "No pressure", "Launch guidance included"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#ff8d75]" aria-hidden="true" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-[#ff6247]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#fff4e7] p-2 shadow-2xl shadow-black/30 sm:p-3">
              <Image
                src="/hero-mockup.png"
                alt="Restrova restaurant order management dashboard on mobile and tablet"
                width={1536}
                height={1024}
                className="h-auto w-full rounded-[1.55rem]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-5 rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#171816] shadow-xl sm:left-8">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e45239]">
                One platform
              </p>
              <p className="mt-1 text-sm font-bold sm:text-base">
                Orders, stock, riders, and growth—together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="restaurants" className="scroll-mt-24 border-b border-black/5 bg-white py-9" aria-label="Restaurant partners">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[.22em] text-black/45">
            Restaurant teams building direct with Restrova
          </p>
          <div className="mt-7 grid grid-cols-3 items-center gap-5 sm:grid-cols-6">
            {restaurantPartners.map((restaurant) => (
              <div
                key={restaurant.id}
                className="flex h-16 items-center justify-center rounded-xl border border-black/5 bg-[#fffaf4] p-3"
              >
                <Image
                  src={restaurant.logo}
                  alt={`${restaurant.company} logo`}
                  width={130}
                  height={60}
                  className="max-h-10 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="outcomes" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[#e45239]">
                Built for the order after the first order
              </p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                A better channel for customers who already love your food.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-black/60 lg:justify-self-end">
              Marketplaces are useful for discovery. But repeat customers should
              have a direct, branded way to order from you again. Restrova turns
              that relationship into a channel you can keep improving.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <article
                  key={outcome.title}
                  className="rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-[0_18px_60px_rgba(30,24,18,.07)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffebe4] text-[#e45239]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-black text-black/20">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-black tracking-tight">{outcome.title}</h3>
                  <p className="mt-3 leading-7 text-black/60">{outcome.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3ede4] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[2rem] bg-[#171816] text-white shadow-2xl">
            <div className="grid lg:grid-cols-[.8fr_1.2fr]">
              <div className="border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r">
                <p className="text-sm font-black uppercase tracking-[.2em] text-[#ff8d75]">
                  Discovery is not loyalty
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                  Keep marketplaces. Build your direct channel too.
                </h2>
                <p className="mt-6 leading-7 text-white/65">
                  Restrova complements the places customers discover you with a
                  better destination for the people ready to order from you again.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 font-bold text-[#ff9b84] transition hover:text-white"
                >
                  Plan my direct channel
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-[#20211f] p-8 sm:p-10">
                  <p className="text-sm font-bold text-white/45">A marketplace journey</p>
                  <ul className="mt-6 space-y-5 text-sm leading-6 text-white/60">
                    {["Your brand competes for attention", "The marketplace shapes the experience", "Regulars return through someone else’s channel"].map(
                      (item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="bg-[#fff4e7] p-8 text-[#171816] sm:p-10">
                  <p className="text-sm font-black text-[#e45239]">Your Restrova channel</p>
                  <ul className="mt-6 space-y-5 text-sm font-semibold leading-6">
                    {["Your restaurant stays front and center", "You shape the ordering experience", "Regulars get a direct way back"].map(
                      (item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e45239]" aria-hidden="true" />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#e45239]">
              From checkout to the next order
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              One connected system for service, delivery, and growth.
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              Take orders from every channel, keep stock visible, run your own
              riders, and bring customers back without switching between
              disconnected tools.
            </p>
          </div>

          <ol className="mt-12 grid overflow-hidden rounded-[1.75rem] bg-[#171816] text-white shadow-xl sm:grid-cols-5">
            {connectedJourney.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.label}
                  className="relative flex items-center gap-4 border-white/10 px-5 py-6 not-last:border-b sm:block sm:border-b-0 sm:not-last:border-r"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ff9b84]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="sm:mt-5">
                    <p className="text-xs font-black uppercase tracking-[.18em] text-white/35">
                      0{index + 1}
                    </p>
                    <p className="mt-1 font-black">{step.label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group flex flex-col rounded-[1.75rem] border border-black/8 bg-[#fffaf4] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_55px_rgba(30,24,18,.09)] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffebe4] text-[#e45239] transition group-hover:bg-[#ff6247] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <p className="pt-1 text-right text-[.68rem] font-black uppercase tracking-[.17em] text-[#e45239]">
                      {feature.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-7 text-xl font-black tracking-tight">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-black/60">{feature.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-black/8 pt-5 text-sm font-semibold text-black/65">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e45239]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[#fff0e9] p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-xl font-black tracking-tight">Choose what your restaurant needs now.</p>
              <p className="mt-2 max-w-2xl leading-7 text-black/60">
                We can shape the ordering, operations, rider, and retention tools around your branches and workflow.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#171816] px-6 text-sm font-black text-white transition hover:bg-[#e45239]"
            >
              See Restrova in action
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[.2em] text-[#e45239]">
                From demo to direct orders
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                We do the heavy lifting.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-black/60">
                You know your restaurant. We bring the product, design, and
                launch experience to turn that knowledge into a direct ordering channel.
              </p>
            </div>

            <ol className="space-y-4">
              {[
                {
                  icon: MessageCircle,
                  title: "A focused restaurant walkthrough",
                  description:
                    "We learn how you take orders today, where customers drop off, and what would make the biggest difference first.",
                },
                {
                  icon: HeartHandshake,
                  title: "Your brand and operations, mapped",
                  description:
                    "We shape the menu, ordering flow, delivery setup, apps, and admin tools around the way your team actually works.",
                },
                {
                  icon: Rocket,
                  title: "Launch with a team beside you",
                  description:
                    "We configure, test, and support the rollout—then keep improving the experience as your direct channel grows.",
                },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-black/8 bg-[#fffaf4] p-6 sm:p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171816] text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.18em] text-[#e45239]">Step {index + 1}</p>
                      <h3 className="mt-1 text-xl font-black">{step.title}</h3>
                      <p className="mt-2 leading-7 text-black/60">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-[#f3ede4] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#e45239]">Questions owners ask</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Clear answers before you commit.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-black/8 bg-white p-6 open:shadow-lg">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffebe4] text-[#e45239] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-7 text-black/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#171816] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#ff8d75]">Your direct channel starts here</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Let’s find the fastest route to more direct orders.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              In a short, free walkthrough, we’ll look at your restaurant and
              show you what a Restrova setup could look like—without a hard sell.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              {["A tailored recommendation", "A live product walkthrough", "A clear scope and next step"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff6247]/20 text-[#ff9b84]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-[#171816] shadow-2xl sm:p-9">
            <div className="mb-7">
              <p className="text-2xl font-black tracking-tight">Request your free demo</p>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Share a few details and we’ll get in touch to arrange a time.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </main>
  );
}
