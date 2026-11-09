import Link from "next/link";
import { approvedCustomers } from "@/data/customers";
export default function CustomerAppExamples() { return <section aria-labelledby="customer-app-examples"><h2 id="customer-app-examples">Explore published customer ordering apps</h2><p className="mt-4">Compare the official listings with the confirmed implementation scope. App availability varies by platform and region.</p><ul className="mt-5 space-y-4">{approvedCustomers.map(c=><li key={c.slug}><Link href={`/customers/${c.slug}`}>{c.name} implementation and public references</Link></li>)}</ul></section>; }
