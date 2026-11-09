import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import { approvedCustomers } from "@/data/customers";
import { solutions } from "@/data/solutions";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/customers");
const faqs = [
  ["Can customers use branded apps and a website?", "Restrova supports Android and iOS ordering apps alongside a browser-based ordering website. Agree the configured menu, fulfilment options and account responsibilities before launch."],
  ["How do administration, inventory and delivery connect?", "Customer orders connect with restaurant administration. Staff review orders, manage stock and availability responsibilities, and use Fleet for delivery operations. Test the complete handoff in a demonstration."],
  ["What should we prepare for onboarding?", "Bring your approved brand assets, menu or product list, prices, branch structure, devices and delivery areas. Identify the staff responsible for receiving orders and closing the shift."],
  ["What does Restrova cost?", "Onboarding is PKR 10,000 once. Each month the fee is the higher of PKR 5,000 or 1% of sales processed through Restrova. The two monthly amounts are not added together. Confirm taxes, hardware, payment charges and branch scope separately."],
  ["Who owns the app-store accounts?", "Agree developer-account ownership, publishing access, renewals and maintenance in writing. A branded app listing alone does not establish account ownership or the terms of a new setup."],
  ["Can we see our workflow before deciding?", "Yes. Request a free demo with a sample order, stock question and delivery scenario. Confirm specialist integrations, devices and support arrangements for your own operation."]
];
export default function CustomersPage() {
 return <MarketingPage path="/customers" label="Customer implementations" title="Restaurants Building Their Digital Ordering Experience With Restrova" intro="Explore how food businesses connect branded customer ordering experiences with the tools their teams use for everyday operations.">
  <JsonLd data={{ "@context":"https://schema.org", "@type":"CollectionPage", "@id":"https://www.restrova.com/customers#collection", url:"https://www.restrova.com/customers", name:"Restrova customer implementations", description:"Approved examples of connected ordering and operations using Restrova.", publisher:{"@id":"https://www.restrova.com/#organization"}, hasPart:approvedCustomers.map(c=>({"@type":"WebPage",url:`https://www.restrova.com/customers/${c.slug}`,name:`${c.name} implementation`})) }} />
  <section><h2>Real brands. Connected ordering and operations.</h2><p className="mt-4">Explore the confirmed services used in each implementation, then compare the workflow with your own business.</p><p className="mt-4"><Link href="/services">Explore Restrova solutions</Link></p></section>
  <section><h2>Customer portfolio</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{approvedCustomers.map(c=><article key={c.slug} className="seo-card"><h3>{c.name}</h3><p className="mt-4">{c.summary}</p><ul className="mt-4 list-disc pl-5">{c.services.map(s=><li key={s.href}>{s.label}</li>)}</ul><p className="mt-5"><Link href={`/customers/${c.slug}`}>Explore {c.name}&apos;s Restrova implementation</Link></p>{c.links.map(l=><p className="mt-3" key={l.href}><a href={l.href}>{l.label}</a></p>)}</article>)}</div></section>
  <section><h2>How the tools connect</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{solutions.map(s=><article key={s.slug} className="seo-card"><h3><Link href={`/services/${s.slug}`}>{s.label}</Link></h3><p className="mt-3">{s.description}</p></article>)}</div></section>
  <section><h2>Plan your implementation</h2><ol className="mt-5 list-decimal space-y-4 pl-6"><li>Review requirements: channels, branches, devices and staff responsibilities.</li><li>Prepare approved branding, menus, prices and availability information.</li><li>Configure the agreed ordering and fulfilment workflow.</li><li>Onboard the people who receive orders, maintain stock and dispatch deliveries.</li><li>Test a normal order, an unavailable item and a correction before launch.</li><li>Agree launch readiness, support contacts and ongoing maintenance responsibilities.</li></ol></section>
  <section><h2>Read the implementation story</h2>{approvedCustomers.map(c=><p className="mt-4" key={c.slug}><Link href={`/customers/${c.slug}`}>{c.name}: customer ordering and operational tools in one setup</Link></p>)}</section>
  <section><h2>Questions about your restaurant setup</h2><div className="mt-6 divide-y rounded-2xl border border-black/10 bg-white px-6">{faqs.map(([q,a])=><details className="py-5" key={q}><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-4">{a}</p></details>)}</div><p className="mt-5">Review <Link href="/pricing">pricing and examples</Link>, <Link href="/faq">the full FAQ</Link> and <Link href="/apps">customer and staff apps</Link>.</p></section>
  <DemoCta title="See how Restrova could work for your restaurant" />
 </MarketingPage>;
}
