import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import { getSolution, solutions } from "@/data/solutions";
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
  return <MarketingPage path={`/services/${solution.slug}`} label={solution.label} title={solution.heading} intro={solution.intro} parent={{ label: "Solutions", href: "/services" }}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: `Restrova ${solution.label}`,
      url: `${siteConfig.url}/services/${solution.slug}`, description: solution.intro, applicationCategory: "BusinessApplication",
      provider: { "@id": `${siteConfig.url}/#organization` } }} />
    <div className="grid gap-6 md:grid-cols-3">{solution.sections.map((section) => <section className="seo-card" key={section.heading}>
      <h2>{section.heading}</h2><p className="mt-4">{section.text}</p>
      {section.points && <ul className="mt-5 list-disc space-y-3 pl-5">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
    </section>)}</div>
    <section><h2>What to check in your demo</h2><ol className="mt-5 list-decimal space-y-3 pl-6">{solution.demo.map((step) => <li key={step}>{step}</li>)}</ol></section>
    <section><h2>One connected restaurant setup</h2><p className="mt-4">These capabilities are part of the Restrova restaurant system. Onboarding is PKR 10,000. The monthly fee is PKR 5,000 or 1% of sales processed through Restrova, whichever is higher. See <Link href="/pricing">pricing examples and scope questions</Link>.</p>
      <ul className="mt-5 flex flex-wrap gap-4">{solution.related.map((slug) => { const related = getSolution(slug)!; return <li key={slug}><Link href={`/services/${slug}`}>{related.label}</Link></li>; })}</ul>
    </section>
    <DemoCta />
  </MarketingPage>;
}
