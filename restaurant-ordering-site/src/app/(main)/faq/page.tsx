import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { faqs } from "@/data/faqs";
import { staticMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
export const metadata = staticMetadata("/faq");
export default function FaqPage() {
  return <MarketingPage path="/faq" label="FAQ" title="Answers before you choose restaurant software." intro="Practical questions about Restrova for restaurant owners and managers in Pakistan.">
    <section className="space-y-4" aria-label="Frequently asked questions">{faqs.map((faq) => <details className="seo-card" key={faq.question}>
      <summary className="cursor-pointer text-xl font-bold">{faq.question}</summary><p className="mt-4">{faq.answer}</p>
    </details>)}</section>
    <section><h2>Questions about a specific workflow?</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{solutions.map((solution) => <li key={solution.slug}><Link href={`/services/${solution.slug}#solution-faq`}>{solution.label}: setup questions and scope</Link></li>)}</ul></section>
    <p>Learn <Link href="/about">about Restrova</Link>, explore the <Link href="/services">restaurant software solutions</Link>, try the <Link href="/pricing">pricing calculator</Link>, or read the <Link href="/blog">restaurant owner guides</Link>.</p>
    <DemoCta />
  </MarketingPage>;
}
