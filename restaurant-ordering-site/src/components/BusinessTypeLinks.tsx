import Link from "next/link";
import { businessTypes } from "@/data/businessTypes";

export default function BusinessTypeLinks() {
  return <section aria-labelledby="business-type-heading" className="seo-content mx-auto max-w-7xl px-6 py-12">
    <h2 id="business-type-heading" className="text-3xl font-black">Plan around your restaurant type</h2>
    <p className="mt-4 max-w-3xl">Choose a practical workflow and bring your own menu, staff responsibilities and service requirements to the demo.</p>
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{businessTypes.map((item) => <li key={item.slug}>
      <Link className="block rounded-2xl border border-black/15 bg-white p-6 font-bold underline underline-offset-4" href={`/solutions/${item.slug}`}>{item.label}</Link>
    </li>)}</ul>
  </section>;
}
