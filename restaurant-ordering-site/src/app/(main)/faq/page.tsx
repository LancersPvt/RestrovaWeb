import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { faqs } from "@/data/faqs";
import { staticMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { romanUrduQuestions } from "@/data/romanUrduQuestions";
export const metadata = staticMetadata("/faq");
export default function FaqPage() {
  return <MarketingPage path="/faq" label="FAQ" title="Answers before you choose restaurant software." intro="Practical questions about Restrova for restaurant owners and managers in Pakistan.">
    <nav aria-label="FAQ sections" className="flex flex-wrap gap-5"><a href="#english-questions">English questions</a><a href="#roman-urdu">Roman Urdu mein sawalat</a><Link href="/services#buyer-topics">Explore by restaurant need</Link></nav>
    <section id="choose-order-channel" className="seo-card scroll-mt-28"><h2>Should I start with a website or a branded app?</h2><p className="mt-4">A <Link href="/services/restaurant-ordering-websites">restaurant ordering website</Link> lets customers order from a browser link. A <Link href="/services/restaurant-ordering-apps">branded mobile app</Link> gives customers who install it another route back. Review both customer journeys and the same order arriving in Admin; choose the launch sequence around your customers, staff and agreed scope. Compare <Link href="/pricing">pricing and publishing responsibilities</Link> before deciding.</p></section>
    <section id="english-questions" className="space-y-4 scroll-mt-28" aria-label="Frequently asked questions"><h2>Questions in English</h2>{faqs.map((faq) => <details className="seo-card" key={faq.question}>
      <summary className="cursor-pointer text-xl font-bold">{faq.question}</summary><p className="mt-4">{faq.answer}</p>
    </details>)}</section>
    <section id="roman-urdu" className="scroll-mt-28" aria-labelledby="roman-urdu-heading"><h2 id="roman-urdu-heading">Common questions in Roman Urdu</h2><div className="mt-6 space-y-4" lang="ur-Latn">{romanUrduQuestions.map(faq => <details id={`roman-urdu-${faq.id}`} className="seo-card scroll-mt-28" key={faq.id}><summary className="cursor-pointer text-xl font-bold">{faq.question}</summary><p className="mt-4">{faq.answer}</p><p className="mt-4"><Link href={faq.href}>{faq.label}</Link></p></details>)}</div></section>
    <section><h2>Questions about a specific workflow?</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2">{solutions.map((solution) => <li key={solution.slug}><Link href={`/services/${solution.slug}#solution-faq`}>{solution.label}: setup questions and scope</Link></li>)}</ul></section>
    <p>Learn <Link href="/about">about Restrova</Link>, explore the <Link href="/services">restaurant software solutions</Link>, try the <Link href="/pricing">pricing calculator</Link>, or read the <Link href="/blog">restaurant owner guides</Link>.</p>
    <DemoCta />
  </MarketingPage>;
}
