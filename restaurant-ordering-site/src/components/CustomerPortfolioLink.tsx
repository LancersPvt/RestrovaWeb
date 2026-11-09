import Link from "next/link";
import { approvedCustomers } from "@/data/customers";
export default function CustomerPortfolioLink({ service }: { service?: string }) {
 const examples = approvedCustomers.filter(c => !service || c.services.some(s => s.href === `/services/${service}`)).slice(0, 3);
 return <section className="seo-card"><h2>Explore real Restrova implementations</h2><p className="mt-4">Review customer ordering channels, confirmed operational tools and public product references.</p><ul className="mt-4 space-y-3">{examples.map(c=><li key={c.slug}><Link href={`/customers/${c.slug}`}>{c.name}: confirmed Restrova implementation</Link></li>)}</ul><p className="mt-4"><Link href="/customers">Explore all customer profiles</Link></p></section>;
}
