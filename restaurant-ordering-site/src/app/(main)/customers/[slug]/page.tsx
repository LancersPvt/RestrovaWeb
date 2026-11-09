import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import { approvedCustomers, getApprovedCustomer } from "@/data/customers";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return approvedCustomers.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const c=getApprovedCustomer((await params).slug);if(!c)notFound();
 return pageMetadata(`/customers/${c.slug}`,`${c.name} Technology Case Study`,c.summary);
}
export default async function CustomerPage({params}:{params:Promise<{slug:string}>}) {
 const c=getApprovedCustomer((await params).slug);if(!c)notFound();
 const url=`https://www.restrova.com/customers/${c.slug}`;
 return <MarketingPage path={`/customers/${c.slug}`} label={c.name} parent={{label:"Customer implementations",href:"/customers"}} title={`How ${c.name} Uses Restrova for Ordering & Operations`} intro={c.summary}>
  <JsonLd data={{"@context":"https://schema.org","@type":"Article","@id":`${url}#article`,headline:`How ${c.name} Uses Restrova for Ordering & Operations`,description:c.summary,mainEntityOfPage:url,author:{"@type":"Organization",name:"Restrova Team",url:"https://www.restrova.com/about"},publisher:{"@id":"https://www.restrova.com/#organization"}}} />
  <section><h2>Explore the published ordering experience</h2><p className="mt-4">The public listing provides the current description and store screenshots. Availability depends on the device and region.</p>{c.links.map(l=><p className="mt-4" key={l.href}><a href={l.href}>{l.label}</a></p>)}</section>
  {c.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p className="mt-4 max-w-3xl">{s.text}</p></section>)}
  <section><h2>Explore the solutions in this implementation</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{c.services.map(s=><li key={s.href} className="seo-card"><Link href={s.href}>{s.label}</Link></li>)}</ul></section>
  <p>Review <Link href="/pricing">Restrova pricing</Link>, learn <Link href="/about">about the team</Link>, or return to <Link href="/customers">customer implementations</Link>.</p>
  <DemoCta title="Bring your ordering workflow to a free demo" />
 </MarketingPage>;
}
