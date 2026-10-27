import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import { getSolution, solutions } from "@/data/solutions";
import { solutionGuides } from "@/data/solutionGuides";
import CustomerAppExamples from "@/components/CustomerAppExamples";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return solutions.map(({ slug }) => ({ service: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const solution = getSolution((await params).service);
  if (!solution) notFound();
  return pageMetadata(`/services/${solution.slug}`, solution.title, solution.description);
}
export default async function SolutionPage({ params }: { params: Promise<{ service: string }> }) {
  const solution = getSolution((await params).service);
  if (!solution) notFound();
  const guide = solutionGuides[solution.slug];
  return <MarketingPage path={`/services/${solution.slug}`} label={solution.label} title={solution.heading} intro={solution.intro} parent={{ label: "Solutions", href: "/services" }}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": `${siteConfig.url}/services/${solution.slug}#software`, name: `Restrova ${solution.label}`,
      url: `${siteConfig.url}/services/${solution.slug}`, description: solution.intro, applicationCategory: "BusinessApplication",
      provider: { "@id": `${siteConfig.url}/#organization` } }} />
    <nav aria-label="On this solution page" className="flex flex-wrap gap-x-6 gap-y-3 rounded-2xl border border-black/10 bg-white p-5 text-sm font-bold">
      <a href="#workflow">Workflow</a><a href="#buying-checklist">Buying checklist</a><a href="#solution-faq">Questions and answers</a><Link href="/pricing">Pricing</Link>
    </nav>
    <section id="workflow" className="scroll-mt-28">
      <h2>{guide.workflowTitle}</h2><p className="mt-4 max-w-3xl">{guide.workflowIntro}</p>
      <ol className="mt-7 grid gap-5 sm:grid-cols-2">{guide.steps.map((step, index) => <li className="seo-card" key={step.title}>
        <p className="text-sm font-bold text-[#a73524]">Step {index + 1}</p><h3 className="mt-2">{step.title}</h3><p className="mt-3">{step.text}</p>
      </li>)}</ol>
    </section>
    {solution.slug === "restaurant-ordering-apps" && <CustomerAppExamples />}
    <div className="grid gap-6 md:grid-cols-3">{solution.sections.map((section) => <section className="seo-card" key={section.heading}>
      <h2>{section.heading}</h2><p className="mt-4">{section.text}</p>
      {section.points && <ul className="mt-5 list-disc space-y-3 pl-5">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
    </section>)}</div>
    <section id="buying-checklist" className="seo-card scroll-mt-28"><h2>{guide.decisionTitle}</h2><ul className="mt-5 list-disc space-y-3 pl-5">{guide.decisions.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><h2>What to check in your demo</h2><ol className="mt-5 list-decimal space-y-3 pl-6">{solution.demo.map((step) => <li key={step}>{step}</li>)}</ol></section>
    <section><h2>One connected restaurant setup</h2><p className="mt-4">These capabilities are part of the Restrova restaurant system. Onboarding is PKR 10,000. The monthly fee is PKR 5,000 or 1% of sales processed through Restrova, whichever is higher. See <Link href="/pricing">pricing examples and scope questions</Link>.</p>
      <ul className="mt-5 flex flex-wrap gap-4">{solution.related.map((slug) => { const related = getSolution(slug)!; return <li key={slug}><Link href={`/services/${slug}`}>{related.label}</Link></li>; })}</ul>
    </section>
    <section id="solution-faq" className="scroll-mt-28"><h2>Questions about {solution.label.toLowerCase()}</h2>
      <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white px-6">{guide.faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer py-1 font-bold">{faq.question}</summary><p className="mt-4 pb-2">{faq.answer}</p></details>)}</div>
    </section>
    <section><h2>Continue planning your setup</h2><p className="mt-4">Read <Link href="/about">about Restrova</Link>, compare <Link href="/apps">the available apps</Link>, and use our <Link href="/blog/how-to-choose-restaurant-management-software-pakistan">software buyer’s guide</Link> and <Link href="/faq">general FAQ</Link> to prepare your questions.</p><ul className="mt-5 space-y-3">{guide.reading.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></section>
    <DemoCta />
  </MarketingPage>;
}
