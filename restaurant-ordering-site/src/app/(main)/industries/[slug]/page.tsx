import { notFound } from "next/navigation";
import Link from "next/link";
import { getIndustryBySlug, getAllIndustrySlugs } from "@/data/industryData";
import { siteConfig } from "@/lib/site";

interface IndustryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllIndustrySlugs().map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);

    if (!industry) return { title: "Not Found" };

    return {
        title: `${industry.name} Ordering System | Boost ${industry.roiMetric.value} Performance | Restrova`,
        description: industry.subheadline,
    };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);

    if (!industry) notFound();

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-28">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="text-6xl mb-6 inline-block" role="img" aria-label={industry.name}>
                        {industry.icon}
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        {industry.headline}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
                        {industry.subheadline}
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/#contact" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-10 text-lg font-bold text-white shadow-xl hover:scale-105 transition-all">
                            Get Your {industry.name} Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* ROI Stat Section */}
            <section className="bg-white py-12 border-y border-gray-100">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{industry.roiMetric.label}</p>
                        <p className="mt-2 text-6xl font-black text-[#FF6B6B]">{industry.roiMetric.value}</p>
                        <p className="mt-2 text-gray-600">Expected improvement with Restrova's specialized industry module.</p>
                    </div>
                </div>
            </section>

            {/* Benefits & Features */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Why {industry.name} Establishments Choose Us</h2>
                            <ul className="mt-8 space-y-4">
                                {industry.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] text-white text-xs font-bold">✓</span>
                                        <span className="text-gray-700 leading-relaxed">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Tailored Features</h2>
                            <div className="mt-8 grid gap-4">
                                {industry.features.map((feature) => (
                                    <div key={feature} className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#FFF5E6] to-white p-5 shadow-sm">
                                        <p className="font-bold text-slate-900">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] py-16 sm:py-24 text-center">
                <div className="mx-auto max-w-3xl px-6 text-white">
                    <h2 className="text-4xl font-extrabold">Ready to take your {industry.name.toLowerCase()} business to the next level?</h2>
                    <p className="mt-6 text-lg opacity-90 leading-relaxed">
                        Join 500+ restaurants that have boosted their revenue and brand control with Restrova.
                    </p>
                    <div className="mt-10">
                        <Link href="/#contact" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-[#FF6B6B] shadow-2xl hover:scale-110 transition-all">
                            Start Your Journey
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
