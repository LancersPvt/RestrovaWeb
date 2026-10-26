import Image from "next/image";
import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/apps");

const examples = [
  { name: "Ash & Beans", android: "https://play.google.com/store/apps/details?id=com.restrova.ashandbeans", ios: "https://apps.apple.com/pk/app/ash-beans/id6759486466" },
  { name: "Yum Zone", android: "https://play.google.com/store/apps/details?id=com.restrova.yumzone" },
  { name: "Top Spice", android: "https://play.google.com/store/apps/details?id=com.restrova.topspice", ios: "https://apps.apple.com/pk/app/top-spice-pakistan/id6796204717" },
];
export default function AppsPage() {
  return <MarketingPage path="/apps" label="Apps" title="The right app for each restaurant role." intro="Customer ordering apps, restaurant administration and rider operations serve different users. Choose the right product before downloading or requesting access.">
    <section className="grid gap-6 md:grid-cols-2">
      <div className="seo-card"><h2>Restrova Admin</h2><p className="mt-4">For authorized restaurant owners and staff managing orders, menus and branches. The Android listing is public; using the administration tools requires an authorized account and the appropriate role.</p><p className="mt-4"><a href="https://play.google.com/store/apps/details?id=com.restrova.admin">View Restrova Admin on Google Play</a></p><p className="mt-3"><Link href="/download">Download desktop Admin for Windows or Mac</Link></p></div>
      <div className="seo-card"><h2>Restrova Fleet</h2><p className="mt-4">For restaurant delivery and rider workflows. Ask Restrova to confirm device setup and access for your team during onboarding.</p><p className="mt-4"><Link href="/services/delivery-management">Explore Fleet delivery and rider management</Link></p></div>
    </section>
    <section><h2>Client-branded customer ordering apps</h2><p className="mt-4">These apps belong to individual restaurant brands. They are examples of the customer experience, not Admin or Fleet downloads. Availability depends on the store, device and region.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">{examples.map((app) => <article className="seo-card" key={app.name}><h3>{app.name}</h3><ul className="mt-5 space-y-4"><li><a href={app.android}>{app.name} on Google Play</a></li>{app.ios && <li><a href={app.ios}>{app.name} on the Apple App Store</a></li>}</ul></article>)}</div>
      <p className="mt-5"><Link href="/services/restaurant-ordering-apps">Plan your own branded Android and iOS ordering app</Link>.</p>
    </section>
    <figure><Image src="/hero-mockup.png" width={1536} height={1024} sizes="(max-width: 1152px) 100vw, 1104px" alt="Restrova's existing product overview showing restaurant administration on mobile and tablet" className="h-auto w-full rounded-3xl" /><figcaption className="mt-3 text-sm">Product overview from the Restrova website. Ask for a live walkthrough of the current screens for your role.</figcaption></figure>
    <DemoCta title="See the customer and staff experiences together" />
  </MarketingPage>;
}
