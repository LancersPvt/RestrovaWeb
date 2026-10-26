import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { blogPosts } from "@/lib/blog-data";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/blog");
export default function BlogPage() {
  return <MarketingPage path="/blog" label="Guides" title="Practical guides for restaurant owners in Pakistan." intro="Use these guides to ask better questions about direct ordering, restaurant apps and day-to-day operations. Start with your own menu, costs and team workflow.">
    <section className="grid gap-6 md:grid-cols-3" aria-label="Restaurant guides">{blogPosts.map((post) => <article className="seo-card" key={post.slug}>
      <p className="text-sm font-bold text-[#a73524]">{post.category}</p><h2 className="mt-4"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p className="mt-4">{post.excerpt}</p><p className="mt-5 text-sm">{post.readTime} · Updated <time dateTime={post.updated}>{post.updated}</time></p>
    </article>)}</section>
    <section><h2>Buying restaurant software?</h2><p className="mt-4">Explore the <Link href="/services">solutions</Link>, compare <Link href="/compare-marketplaces">direct ordering and marketplaces</Link>, and use the <Link href="/pricing">pricing calculator</Link> before arranging a walkthrough.</p></section>
    <DemoCta />
  </MarketingPage>;
}
