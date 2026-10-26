import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { faqs } from "@/data/faqs";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/faq");
export default function FaqPage() {
  return <MarketingPage path="/faq" label="FAQ" title="Answers before you choose restaurant software." intro="Practical questions about Restrova for restaurant owners and managers in Pakistan.">
    <section className="space-y-4" aria-label="Frequently asked questions">{faqs.map((faq) => <details className="seo-card" key={faq.question}>
      <summary className="cursor-pointer text-xl font-bold">{faq.question}</summary><p className="mt-4">{faq.answer}</p>
    </details>)}</section>
    <p>Explore the <Link href="/services">restaurant software solutions</Link>, try the <Link href="/pricing">pricing calculator</Link>, or read the <Link href="/blog">restaurant owner guides</Link>.</p>
    <DemoCta />
  </MarketingPage>;
}
