import Image from "next/image";
import { customerApps } from "@/data/customerApps";

export default function CustomerAppExamples() {
  return <section aria-labelledby="customer-app-examples">
    <h2 id="customer-app-examples">Explore published restaurant apps</h2>
    <p className="mt-4">These public listings are examples of client-branded customer apps. Review the store screenshots and descriptions before downloading. Features and availability depend on the restaurant, device and region.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-3">{customerApps.map((app) => <article className="seo-card" key={app.name}>
      {app.logo && <Image src={app.logo} width={64} height={64} sizes="64px" alt={`${app.name} restaurant logo`} className="mb-5 h-16 w-16 rounded-xl object-contain" />}
      <h3>{app.name}</h3>
      <ul className="mt-4 space-y-4"><li><a href={app.android}>{app.name} on Google Play</a></li>{app.ios && <li><a href={app.ios}>{app.name} on the Apple App Store</a></li>}</ul>
    </article>)}</div>
  </section>;
}
