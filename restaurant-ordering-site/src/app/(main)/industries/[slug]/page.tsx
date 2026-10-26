import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { industryGuides } from "@/data/industryGuides";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() { return Object.keys(industryGuides).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = industryGuides[slug]; if (!guide) notFound();
  return pageMetadata(`/industries/${slug}`, guide.title, guide.intro, false);
}
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = industryGuides[slug]; if (!guide) notFound();
  return <MarketingPage path={`/industries/${slug}`} label={guide.label} title={guide.title} intro={guide.intro} parent={{ label: "Solutions", href: "/services" }}>
    <section><h2>Use your own menu in the demo</h2><p className="mt-4">{guide.workflow}</p></section>
    <section><h2>Review the complete operating setup</h2><p className="mt-4">Explore <Link href="/services/restaurant-pos">POS and order management</Link>, <Link href="/services/inventory-management">inventory</Link> and <Link href="/services/restaurant-ordering-websites">ordering websites</Link>. Bring branch and device requirements, then confirm the proposed scope and <Link href="/pricing">pricing</Link>.</p></section>
    <DemoCta />
  </MarketingPage>;
}
