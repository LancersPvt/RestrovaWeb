import Link from "next/link";
import ProgrammaticPage,{programmaticMetadata} from "@/components/ProgrammaticPage";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { businessTypes, getBusinessType } from "@/data/businessTypes";
import { getSolution } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return businessTypes.map(({ slug }) => ({ businessType: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ businessType: string }> }) {
  const item = getBusinessType((await params).businessType);
  if (!item) return programmaticMetadata(`/solutions/${(await params).businessType}`);
  return pageMetadata(`/solutions/${item.slug}`, item.title, item.description);
}

export default async function BusinessTypePage({ params }: { params: Promise<{ businessType: string }> }) {
  const item = getBusinessType((await params).businessType);
  if (!item) return <ProgrammaticPage path={`/solutions/${(await params).businessType}`}/>;
  return <MarketingPage path={`/solutions/${item.slug}`} label={item.label} title={item.title} intro={item.intro} parent={{ label: "Solutions", href: "/services" }}>
    <div className="grid gap-6 md:grid-cols-2">{item.sections.map((section) => <section className="seo-card" key={section.title}><h2>{section.title}</h2><p className="mt-4">{section.text}</p></section>)}</div>
    <section><h2>Bring these examples to your demo</h2><ul className="mt-5 list-disc space-y-3 pl-6">{item.checklist.map((point) => <li key={point}>{point}</li>)}</ul></section>
    <section><h2>Explore the relevant tools</h2><ul className="mt-5 space-y-3">{item.services.map((slug) => <li key={slug}><Link href={`/services/${slug}`}>{getSolution(slug)!.label}</Link></li>)}</ul>
      <p className="mt-5"><Link href={`/blog/${item.guide.slug}`}>{item.guide.label}</Link>.</p>
      <p className="mt-4">Compare <Link href="/services#buyer-topics">the connected restaurant workflows</Link> and read the <Link href="/faq">English and Roman Urdu buyer questions</Link> when preparing your team&apos;s requirements.</p>
    </section>
    <section><h2>Questions before you choose</h2><div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white px-6">{item.faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer py-1 font-bold">{faq.question}</summary><p className="mt-4 pb-2">{faq.answer}</p></details>)}</div></section>
    <section><h2>Review the complete cost and scope</h2><p className="mt-4">Restrova publishes PKR 10,000 one-time onboarding and a monthly fee equal to the higher of PKR 5,000 or 1% of sales processed through Restrova. Confirm branches, taxes, hardware, payment-provider charges and other exclusions in your proposal. Use the <Link href="/pricing">pricing calculator</Link> and <Link href="/blog/restaurant-software-pricing-pakistan-guide">software cost checklist</Link>.</p></section>
    <DemoCta />
  </MarketingPage>;
}
