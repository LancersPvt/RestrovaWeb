import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata = {
    title: "Restrova vs. Marketplaces | Save 20-30% Commission",
    description: "Compare Restrova with third-party marketplaces like Foodpanda and UberEats. See how much you can save with direct ordering.",
};

export default function CompareMarketplacesPage() {
    const comparisonPoints = [
        {
            feature: "Commission Fees",
            marketplace: "20% - 35% per order",
            restrova: "1% Commission (Fixed Monthly)",
            winner: "restrova",
        },
        {
            feature: "Customer Data",
            marketplace: "Owned by Marketplace",
            restrova: "100% Owned by You",
            winner: "restrova",
        },
        {
            feature: "Branding",
            marketplace: "Listed among competitors",
            restrova: "Your own branded App/Website",
            winner: "restrova",
        },
        {
            feature: "Payout Speed",
            marketplace: "Weekly or Bi-weekly",
            restrova: "Instant (Direct to your gateway)",
            winner: "restrova",
        },
        {
            feature: "Customer Loyalty",
            marketplace: "Limited / Marketplace points",
            restrova: "Custom integrated rewards",
            winner: "restrova",
        },
    ];

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-28">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        Stop Paying <span className="text-[#FF6B6B]">30%</span> to Marketplaces
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
                        Take control of your restaurant's profits. Compare how Restrova helps you scale without the high commissions of third-party platforms.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Feature</th>
                                    <th className="px-6 py-6 text-sm font-bold uppercase tracking-wider text-gray-500">Marketplaces</th>
                                    <th className="px-6 py-6 text-sm font-bold uppercase tracking-wider text-[#FF6B6B]">Restrova</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonPoints.map((point) => (
                                    <tr key={point.feature} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-6 font-semibold text-slate-900">{point.feature}</td>
                                        <td className="px-6 py-6 text-gray-600">{point.marketplace}</td>
                                        <td className="px-6 py-6 font-bold text-[#FF6B6B]">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B6B] text-[10px] text-white">✓</span>
                                                {point.restrova}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ROI Math Section */}
            <section className="bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-16 sm:py-24 text-center">
                <div className="mx-auto max-w-4xl px-6">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">The Real Math of Direct Ordering</h2>
                    <p className="mt-6 text-lg text-gray-700">
                        If your restaurant does $10,000/mo in online sales:
                    </p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                            <p className="text-gray-500 font-medium">On Marketplaces (30%)</p>
                            <p className="mt-2 text-4xl font-bold text-gray-900">$7,000</p>
                            <p className="mt-1 text-sm text-red-500">You lose $3,000 in fees</p>
                        </div>
                        <div className="rounded-3xl border-2 border-[#FF6B6B] bg-white p-8 shadow-lg">
                            <p className="text-[#FF6B6B] font-bold">On Restrova (Direct)</p>
                            <p className="mt-2 text-4xl font-bold text-gray-900">$9,900</p>
                            <p className="mt-1 text-sm text-green-600">You keep 99% of your revenue*</p>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-gray-500">*Exclusive of payment gateway charges and fixed monthly tier.</p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-16 sm:py-24 text-center">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-3xl font-bold text-slate-900">Ready to boost your margins?</h2>
                    <p className="mt-4 text-lg text-gray-600">Join 500+ restaurants that have taken back control of their brand.</p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/#contact" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-10 text-lg font-bold text-white shadow-xl hover:scale-105 transition-all">
                            Switch to Restrova Today
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
