import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { locationData, getCityLabel, getCountryLabel, isValidLocation, getAllCountries } from "@/data/locationData";
import { services, getServiceBySlug } from "@/data/services";
import { parseSlugSafe, createSlug } from "@/lib/slugUtils";
import { generatePageContent, generateFAQs } from "@/lib/contentGenerator";
import { siteConfig } from "@/lib/site";

interface SlugPageProps {
    params: Promise<{ slug: string }>;
}

/* ─────────────────────────────────────────────────────────────
   Static params — runs at build time to enumerate all pages
───────────────────────────────────────────────────────────── */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const params: { slug: string }[] = [];

    for (const [countrySlug, countryData] of Object.entries(locationData)) {
        for (const city of countryData.cities) {
            for (const serviceSlug of Object.keys(services)) {
                params.push({
                    slug: createSlug(serviceSlug, city.slug, countrySlug),
                });
            }
        }
    }

    console.log(`\n✅ Restrova SEO: Generated ${params.length} programmatic pages\n`);
    return params;
}

/* ─────────────────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
    const { slug } = await params;
    const knownCountries = getAllCountries();
    const parsed = parseSlugSafe(slug, knownCountries);

    if (!parsed) return { title: "Not Found" };

    const service = getServiceBySlug(parsed.service);
    if (!service) return { title: "Not Found" };

    if (!isValidLocation(parsed.country, parsed.city)) return { title: "Not Found" };

    const cityLabel = getCityLabel(parsed.country, parsed.city);
    const countryLabel = getCountryLabel(parsed.country);
    const canonicalUrl = `${siteConfig.url}/${slug}`;

    const title = `Best ${service.name} for Restaurants in ${cityLabel} | Restrova`;
    const description = `Looking for a ${service.name.toLowerCase()} in ${cityLabel}, ${countryLabel}? Restrova provides cloud-based POS, online ordering, analytics, and complete restaurant management solutions — trusted by 500+ restaurants across ${countryLabel}.`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Restrova",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/* ─────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────── */
export default async function SlugPage({ params }: SlugPageProps) {
    const { slug } = await params;
    const knownCountries = getAllCountries();
    const parsed = parseSlugSafe(slug, knownCountries);

    if (!parsed) notFound();

    const service = getServiceBySlug(parsed.service);
    if (!service) notFound();

    if (!isValidLocation(parsed.country, parsed.city)) notFound();

    const cityLabel = getCityLabel(parsed.country, parsed.city);
    const countryLabel = getCountryLabel(parsed.country);
    const content = generatePageContent(service, cityLabel, countryLabel);
    const faqs = generateFAQs(service, cityLabel, countryLabel);

    /* JSON-LD: SoftwareApplication */
    const softwareJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `Restrova ${service.name}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description: `${service.name} for restaurants in ${cityLabel}, ${countryLabel}`,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Contact for pricing",
        },
        provider: {
            "@type": "Organization",
            name: "Restrova",
            url: siteConfig.url,
        },
    };

    /* JSON-LD: FAQ */
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    /* JSON-LD: Local Business */
    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Restrova",
        description: `Restaurant technology solutions in ${cityLabel}`,
        url: siteConfig.url,
        areaServed: {
            "@type": "City",
            name: cityLabel,
        },
        serviceType: service.name,
        telephone: "+92-300-0000000",
        email: siteConfig.contact.email,
    };

    return (
        <main className="bg-white">
            {/* JSON-LD Scripts */}
            <Script
                id="ld-software"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
            />
            <Script
                id="ld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Script
                id="ld-local"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />

            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-28">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-[#F4A261]/15 blur-3xl" />
                </div>

                <div className="mx-auto max-w-5xl px-6 text-center">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#FF6B6B] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-[#FF6B6B] transition-colors">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-gray-800">{service.name}</span>
                    </nav>

                    {/* Icon + Badge */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <span className="text-5xl" role="img" aria-label={service.name}>
                            {service.icon}
                        </span>
                        <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-5 py-2 text-sm font-semibold text-white shadow-lg">
                            {cityLabel}, {countryLabel}
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        {content.headline}
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 leading-relaxed">
                        {content.subheadline}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="inline-flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            Get Free Demo
                        </Link>
                        <Link
                            href="/#contact"
                            className="inline-flex h-13 items-center justify-center rounded-full border-2 border-[#FF6B6B] px-8 py-3.5 text-base font-semibold text-[#FF6B6B] transition-all hover:bg-[#FF6B6B] hover:text-white"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats Row ── */}
            <section className="border-y border-gray-100 bg-white py-10">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {content.statsRow.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-extrabold text-[#FF6B6B]">{stat.value}</p>
                                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Intro ── */}
            <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
                <div className="rounded-3xl border border-[#F4A261]/20 bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] p-8 sm:p-12">
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        {service.name} for Restaurants in {cityLabel}
                    </h2>
                    <p className="mt-6 text-gray-700 leading-relaxed text-lg">{content.intro}</p>
                </div>
            </section>

            {/* ── Benefits + Features ── */}
            <section className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Why Restaurants in {cityLabel} Choose Restrova
                            </h2>
                            <p className="mt-4 text-gray-600">
                                Our {service.name.toLowerCase()} is built specifically for the challenges your restaurant faces every day.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {service.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] text-white text-xs font-bold">
                                            ✓
                                        </span>
                                        <span className="text-gray-700 leading-relaxed">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Key Features</h2>
                            <p className="mt-4 text-gray-600">
                                Everything you need to run your restaurant smarter — in one platform.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {service.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gradient-to-r from-[#FFF5E6] to-white p-4 shadow-sm"
                                    >
                                        <span className="text-[#FF6B6B] text-lg">◆</span>
                                        <span className="text-gray-800 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Restrova ── */}
            <section className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-16 sm:py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Why Restrova is the Top Choice in {countryLabel}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
                        {content.whyRestrova}
                    </p>
                    <div className="mt-12 grid gap-6 sm:grid-cols-3">
                        {[
                            {
                                icon: "⚡",
                                title: "Fast Onboarding",
                                desc: "Up and running in 24–48 hours with full support from our team",
                            },
                            {
                                icon: "🔒",
                                title: "Secure & Reliable",
                                desc: "99.9% uptime SLA with enterprise-grade data security",
                            },
                            {
                                icon: "💬",
                                title: "Local Support",
                                desc: `Dedicated support team serving restaurants across ${countryLabel}`,
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-[#F4A261]/20 bg-white p-6 shadow-sm"
                            >
                                <span className="text-4xl">{card.icon}</span>
                                <h3 className="mt-4 font-bold text-slate-900">{card.title}</h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="mt-10 space-y-6">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-gray-100 bg-gradient-to-br from-[#FFF5E6] to-white p-6 shadow-sm"
                            >
                                <h3 className="font-semibold text-slate-900 text-lg">{faq.question}</h3>
                                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] py-16 sm:py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        {content.ctaTitle}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                        {content.ctaSubtitle}
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="inline-flex h-13 items-center justify-center rounded-full bg-white px-10 py-3.5 text-base font-bold text-[#FF6B6B] shadow-xl transition-all hover:scale-105"
                        >
                            Get Free Demo Today
                        </Link>
                        <Link
                            href="/#contact"
                            className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white px-10 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
                        >
                            Talk to an Expert
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-white/70">
                        No commitment required · Free setup assistance · Local support in {countryLabel}
                    </p>
                </div>
            </section>

            {/* ── Related Services ── */}
            <section className="border-t border-gray-100 bg-white py-16">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        Explore More Restrova Solutions in {cityLabel}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {Object.values(services)
                            .filter((s) => s.slug !== service.slug)
                            .slice(0, 4)
                            .map((s) => (
                                <Link
                                    key={s.slug}
                                    href={`/restaurant-${s.slug}-software-in-${parsed.city}-${parsed.country}`}
                                    className="group rounded-2xl border border-gray-100 bg-[#FFF5E6] p-4 text-center transition-all hover:border-[#F4A261] hover:shadow-md"
                                >
                                    <span className="text-3xl">{s.icon}</span>
                                    <p className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-[#FF6B6B] transition-colors">
                                        {s.name}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
