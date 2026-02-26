import Image from "next/image";
import Script from "next/script";

import ContactForm from "@/components/ContactForm";
import CustomIcon from "@/components/CustomIcon";
import BlogCard from "@/components/BlogCard";
import ClientCard from "@/components/ClientCard";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import { clientTestimonials } from "@/lib/client-data";

const services = [
  {
    title: "Online Ordering System",
    description:
      "Branded online ordering for pickup, delivery, and dine‑in — optimized for fast ordering and repeat customers.",
    iconName: "ordering",
  },
  {
    title: "Customer App (Android & iOS)",
    description:
      "A modern customer app similar to leading restaurant brands (KFC/Cheezious style), fully customized for your restaurant.",
    iconName: "mobile",
  },
  {
    title: "Admin App + Order Management",
    description:
      "Receive orders, manage statuses, and run day-to-day operations with a simple admin dashboard/app.",
    iconName: "admin",
  },
  {
    title: "POS & RMS Modules",
    description:
      "Sales and operations modules (POS/RMS) that match your workflows — with optional integrations.",
    iconName: "pos",
  },
  {
    title: "Analytics & Reporting",
    description:
      "Track best sellers, peak hours, branch performance, and customer behavior — turn orders into insights.",
    iconName: "analytics",
  },
  {
    title: "Delivery Fleet Management",
    description:
      "Assign riders, track deliveries, and monitor performance with fleet tools designed for restaurant operations.",
    iconName: "delivery",
  },
  {
    title: "Loyalty & Engagement",
    description:
      "Coupons, rewards, and promotions to increase retention and repeat orders.",
    iconName: "loyalty",
  },
  {
    title: "Digital Menu Boards & Kiosk",
    description:
      "Optional add-ons like digital menu boards and self‑ordering kiosk workflows for dine‑in efficiency.",
    iconName: "kiosk",
  },
];

const benefits = [
  {
    title: "Easy to set up",
    description:
      "We help you launch the ordering system step-by-step — menu setup, branding, and operational flows.",
    iconName: "setup",
  },
  {
    title: "Management tools",
    description:
      "Update your menu, control availability, manage orders, and monitor day-to-day operations.",
    iconName: "tools",
  },
  {
    title: "Customer insights",
    description:
      "Access insights from orders, peak hours, and customer behavior to make smarter decisions.",
    iconName: "insights",
  },
  {
    title: "Dedicated support",
    description:
      "We stay available after launch to handle improvements, fixes, and ongoing enhancements.",
    iconName: "support",
  },
];

const faqs = [
  {
    q: "Are you a marketplace like Foodpanda?",
    a: "No. Restrova builds a branded ordering website/app for your customers plus an admin system for your team. You own the brand, customer data, and operations.",
  },
  {
    q: "Do you provide both customer app and admin app?",
    a: "Yes. We deliver a customer experience (web + mobile) and an admin app/panel for receiving orders and managing operations.",
  },
  {
    q: "Can you also provide POS and analytics?",
    a: "Yes. We can add POS/RMS modules and analytics dashboards depending on your requirements and operational setup.",
  },
  {
    q: "Is this customized for each restaurant?",
    a: "Yes. UI, order flow, modules, and operations are customized for each restaurant (single branch or multi-branch).",
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
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  };

  return (
    <main>
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9]">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/20 blur-3xl animate-float" />
          <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-[#F4A261]/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-[#8FBC8F]/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#F4A261]/30 bg-white/95 px-6 py-3 text-sm font-semibold text-[#FF6B6B] shadow-lg shadow-[#F4A261]/20 backdrop-blur animate-bounce-slow">
                ✨ Innovative solutions for restaurants
              </span>

              <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
                Build your own{" "}
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] bg-clip-text text-transparent">
                  restaurant ordering platform
                </span>{" "}
                that's branded, fast, and fully customized.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Restrova delivers a complete ordering system: customer app
                (Android/iOS), personalized website, and an admin app to
                receive orders and analyze performance. We're not a marketplace.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex h-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-10 text-lg font-bold text-white shadow-2xl shadow-[#FF6B6B]/30 transition-all hover:shadow-2xl hover:shadow-[#F4A261]/40 hover:scale-110"
                >
                  <span>Request a demo</span>
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#platform"
                  className="inline-flex h-16 items-center justify-center rounded-full border-2 border-[#FF6B6B] bg-white px-10 text-lg font-bold text-[#FF6B6B] shadow-lg transition-all hover:bg-[#FF6B6B] hover:text-white hover:scale-105 hover:shadow-xl"
                >
                  What we deliver
                </a>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                {[
                  { t: "No upfront cost", d: "Direct orders, your margins." },
                  { t: "Brand-owned", d: "Website + apps in your name." },
                  { t: "Operations-ready", d: "Admin + analytics included." },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="group rounded-2xl border-2 border-[#F4A261]/30 bg-white/95 p-5 backdrop-blur hover-lift hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all"
                  >
                    <dt className="font-bold text-slate-900 group-hover:text-[#FF6B6B] transition-colors">{item.t}</dt>
                    <dd className="mt-1 text-sm text-slate-600">{item.d}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative animate-fade-in lg:flex lg:justify-center" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] opacity-20 blur-2xl" />
              <div className="rounded-3xl border border-[#F4A261]/30 bg-white/95 p-8 shadow-2xl backdrop-blur">
                <Image
                  src="/hero-mockup.png"
                  alt="Restaurant ordering platform"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="border-y border-gray-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What we deliver
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A complete system your customers can use and your team can operate.
              Start with ordering and scale into POS, delivery management, loyalty,
              and analytics.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Customer App",
                d: "Android & iOS app for customers with a smooth, branded ordering experience.",
                iconName: "mobile",
                gradient: "from-[#FF6B6B] to-[#E07A5F]",
              },
              {
                t: "Personalized Website",
                d: "Branded personalized website for pickup/delivery/dine‑in, linked to your app.",
                iconName: "ordering",
                gradient: "from-[#F4A261] to-[#E07A5F]",
              },
              {
                t: "Admin App",
                d: "Order receiving, status management, and operations dashboards for your staff.",
                iconName: "admin",
                gradient: "from-[#E07A5F] to-[#F4A261]",
              },
            ].map((x, idx) => (
              <ScrollAnimationWrapper
                key={x.t}
                animation="fade"
                className={`stagger-${idx + 1}`}
              >
                <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover-glow card-3d">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${x.gradient} shadow-lg`}>
                    <CustomIcon name={x.iconName} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {x.t}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{x.d}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Built for restaurants — not marketplaces
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything is designed around your restaurant operations: ordering,
              order receiving, reporting, and scale.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-2 lg:grid-rows-1">
            {benefits.map((b, idx) => (
              <ScrollAnimationWrapper key={b.title} animation="fade" className={`stagger-${idx + 1} h-full`}>
                <div className="h-full flex flex-col rounded-3xl border border-[#F4A261]/30 bg-white p-7 shadow-lg hover-glow card-3d">
                  <CustomIcon name={b.iconName} className="h-14 w-14 text-[#FF6B6B] flex-shrink-0" />
                  <h3 className="mt-6 text-lg font-bold text-slate-900 flex-shrink-0">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 flex-grow">
                    {b.description}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="border-y border-gray-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Trusted by restaurant owners
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See what our clients say about their experience with Restrova.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {clientTestimonials.map((testimonial, idx) => (
              <ScrollAnimationWrapper
                key={testimonial.id}
                animation={idx % 2 === 0 ? "slide-left" : "slide-right"}
                className={`stagger-${idx + 1}`}
              >
                <ClientCard testimonial={testimonial} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>


      {/* Why Your Restaurant Needs an App Section */}
      <section id="why-app" className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Restaurants That Go <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] bg-clip-text text-transparent">Digital</span> Grow <span className="bg-gradient-to-r from-[#F4A261] to-[#E07A5F] bg-clip-text text-transparent">Faster.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Restaurants using branded ordering apps see measurable improvements in sales, loyalty, and operational efficiency — powered by real-time data and automation.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Dashboard Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#F4A261]/30 bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/grow-chart.png"
                  alt="Restaurant Analytics Dashboard showing growth metrics"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FF6B6B]/20 to-[#F4A261]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#F4A261]/20 to-[#E07A5F]/20 rounded-full blur-2xl" />
            </div>

            {/* Right: Key Stats */}
            <div className="space-y-6">
              {[
                {
                  stat: "+30%",
                  label: "Revenue Growth",
                  description: "Average revenue increase for restaurants with branded apps"
                },
                {
                  stat: "+25%",
                  label: "Higher Repeat Customers",
                  description: "Customer retention rate improvement with app loyalty programs"
                },
                {
                  stat: "40%",
                  label: "Faster Order Processing",
                  description: "Reduction in order processing time with integrated systems"
                },
                {
                  stat: "2x",
                  label: "Customer Data Insights",
                  description: "More actionable customer behavior data vs. third-party platforms"
                }
              ].map((item, idx) => (
                <ScrollAnimationWrapper
                  key={item.label}
                  animation="fade"
                  className={`stagger-${idx + 1}`}
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/80 backdrop-blur border border-[#F4A261]/20 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="text-3xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] bg-clip-text text-transparent">
                        {item.stat}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 mx-auto max-w-3xl rounded-3xl border border-[#F4A261]/30 bg-white p-8 sm:p-12 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                Ready to Transform Your Restaurant?
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Join hundreds of restaurants that have increased revenue, improved customer loyalty, and gained complete control over their ordering platform.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-8 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Start Growing Your Business
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Blog Section */}
      <section id="blog" className="border-y border-gray-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Latest insights
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tips, strategies, and industry insights to help you grow your restaurant business.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <ScrollAnimationWrapper
                key={post.id}
                animation="fade"
                className={`stagger-${idx + 1}`}
              >
                <BlogCard post={post} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                How we build your system
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We don't ship a one-size-fits-all SaaS. We design, build, and
                customize the ordering platform around your operations.
              </p>
            </div>

            <ol className="grid gap-6">
              {[
                {
                  t: "Discovery",
                  d: "We understand your menu, operations, delivery model, and brand goals.",
                },
                {
                  t: "Design & UX",
                  d: "We craft an ordering flow that's fast, simple, and conversion-focused.",
                },
                {
                  t: "Build & Integrate",
                  d: "Customer app + admin app + modules like POS, analytics, delivery tools.",
                },
                {
                  t: "Launch & Support",
                  d: "We help you go live, monitor performance, and ship improvements.",
                },
              ].map((step, idx) => (
                <li
                  key={step.t}
                  className="rounded-3xl border border-[#F4A261]/30 bg-white p-7 shadow-lg hover-lift animate-slide-in-right"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] text-lg font-bold text-white shadow-lg">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-lg font-bold text-slate-900">
                        {step.t}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {step.d}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-y border-gray-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            FAQs
          </h2>
          <div className="mt-16 grid gap-6">
            {faqs.map((f, idx) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <summary className="flex cursor-pointer items-center justify-between text-lg font-bold text-gray-900 list-none">
                  <span>{f.q}</span>
                  <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8E9D0] text-[#F4A261] transition-transform group-open:rotate-180">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-base leading-7 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Let's build your ordering platform
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Tell us about your restaurant and we'll respond with a recommended
                setup (ordering, apps, admin workflows, POS modules, and
                analytics).
              </p>

              <div className="mt-8 rounded-3xl border border-[#F4A261]/30 bg-white p-6 shadow-lg">
                <p className="text-sm font-bold text-slate-900">What you'll get</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F8E9D0] text-[#F4A261]">✓</span>
                    A tailored feature plan
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F8E9D0] text-[#F4A261]">✓</span>
                    Estimated timeline and cost range
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F8E9D0] text-[#F4A261]">✓</span>
                    Demo + next steps
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-[#F4A261]/30 bg-white p-8 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



