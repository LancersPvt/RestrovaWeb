import Image from "next/image";
import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { staticMetadata } from "@/lib/seo";
import CustomerAppExamples from "@/components/CustomerAppExamples";
export const metadata = staticMetadata("/apps");

export default function AppsPage() {
  return <MarketingPage path="/apps" label="Apps" title="The right app for each restaurant role." intro="Customer ordering apps, restaurant administration and rider operations serve different users. Choose the right product before downloading or requesting access.">
    <section className="grid gap-6 md:grid-cols-2">
      <div className="seo-card"><h2>Restrova Admin</h2><p className="mt-4">For authorized restaurant owners and staff managing orders, menus and branches. The Android and iOS listings are public; using the administration tools requires an authorized account and the appropriate role. Check device and regional availability in each store.</p><p className="mt-4"><a href="https://play.google.com/store/apps/details?id=com.restrova.admin">View Restrova Admin on Google Play</a></p><p className="mt-3"><a href="https://apps.apple.com/us/app/restrova-admin/id6814471120">View Restrova Admin on the Apple App Store</a></p><p className="mt-3"><Link href="/download">Download desktop Admin for Windows or Mac</Link></p></div>
      <div className="seo-card"><h2>Restrova Fleet</h2><p className="mt-4">For restaurant delivery and rider workflows. Ask Restrova to confirm device setup and access for your team during onboarding.</p><p className="mt-4"><Link href="/services/delivery-management">Explore Fleet delivery and rider management</Link></p></div>
    </section>
    <CustomerAppExamples />
    <p><Link href="/services/restaurant-ordering-apps">Plan your own branded Android and iOS ordering app</Link>.</p>
    <figure><Image src="/hero-mockup.png" width={1536} height={1024} sizes="(max-width: 1152px) 100vw, 1104px" alt="Illustrative Restrova product overview on mobile and tablet" className="h-auto w-full rounded-3xl" /><figcaption className="mt-3 text-sm">Illustrative product overview. Request a live walkthrough to see the current screens for your role.</figcaption></figure>
    <DemoCta title="See the customer and staff experiences together" />
  </MarketingPage>;
}
