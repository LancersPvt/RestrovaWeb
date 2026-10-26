import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import PricingCalculator from "@/components/PricingCalculator";
import { formatPKR, monthlyFee, ONBOARDING_FEE } from "@/lib/pricing";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/pricing");

export default function PricingPage() {
  return <MarketingPage path="/pricing" label="Pricing" title="Restaurant software pricing, explained." intro="One-time onboarding of PKR 10,000. Each month, pay PKR 5,000 or 1% of sales processed through Restrova, whichever is higher.">
    <section className="grid gap-6 md:grid-cols-2">
      <div className="seo-card"><h2>PKR 10,000 to onboard</h2><p className="mt-4">This one-time fee is separate from your monthly service fee. Review the menu, branding, branch setup and rollout scope during your demo.</p></div>
      <div className="seo-card"><h2>PKR 5,000 minimum per month</h2><p className="mt-4">Calculate 1% of monthly sales processed through Restrova and compare it with PKR 5,000. You pay the higher amount. The two amounts are not added together.</p></div>
    </section>
    <section><h2>How the monthly fee works</h2><p className="mt-4">Monthly fee = the higher of PKR 5,000 and (Restrova-processed monthly sales × 1%). The minimum applies even when those sales are zero. At PKR 500,000 of processed sales, 1% equals the minimum.</p>
      <div role="region" aria-labelledby="pricing-examples" tabIndex={0} className="mt-6 overflow-x-auto rounded-2xl border border-black/15"><table className="w-full min-w-[36rem] border-collapse bg-white text-left">
        <caption id="pricing-examples" className="p-4 text-left font-bold">Illustrative fees in PKR, before any unconfirmed additional charges</caption>
        <thead className="bg-[#fff0e8]"><tr>{["Monthly Restrova sales", "1% of sales", "Monthly fee", "Onboarding + one month"].map((heading) => <th scope="col" className="p-4" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{[0, 200000, 500000, 800000, 1500000].map((sales) => <tr className="border-t border-black/10" key={sales}><th scope="row" className="p-4 font-medium">{formatPKR(sales)}</th><td className="p-4">{formatPKR(sales * .01)}</td><td className="p-4 font-bold">{formatPKR(monthlyFee(sales))}</td><td className="p-4">{formatPKR(ONBOARDING_FEE + monthlyFee(sales))}</td></tr>)}</tbody>
      </table></div>
    </section>
    <PricingCalculator />
    <section><h2>Review what your restaurant needs</h2><p className="mt-4">The Restrova system includes customer applications, Admin, Fleet rider management, a restaurant ordering website and inventory management. Explore the <Link href="/services">solutions</Link> and agree how they will be configured for your restaurant.</p>
      <p className="mt-4">Taxes, payment gateway or transaction charges, app-store account charges, hardware, custom work and other exclusions need confirmation. Ask how returns, cancellations and refunds affect processed sales, whether pricing covers your planned branches and when billing begins. These terms must be agreed in writing before onboarding.</p>
      <p className="mt-4" lang="ur-Latn">Mahina ki fee PKR 5,000 ya Restrova se process honay wali sales ka 1%, jo zyada ho. Onboarding PKR 10,000 aik dafa hai.</p>
    </section>
    <DemoCta title="Review pricing against your restaurant workflow" />
  </MarketingPage>;
}
