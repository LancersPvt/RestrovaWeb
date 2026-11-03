import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { blogPosts } from "@/lib/blog-data";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/blog");
export default function BlogPage() {
  return <MarketingPage path="/blog" label="Guides" title="Practical guides for restaurant owners in Pakistan." intro="Use these guides to ask better questions about direct ordering, restaurant apps and day-to-day operations. Start with your own menu, costs and team workflow.">
    <nav aria-label="Guide categories" className="flex flex-wrap gap-4">{[...new Set(blogPosts.map((post) => post.category))].map((category, index) => <a className="rounded-full border border-black/15 bg-white px-5 py-3 font-bold" href={`#category-${index}`} key={category}>{category}</a>)}</nav>
    {[...new Set(blogPosts.map((post) => post.category))].map((category, index) => <section id={`category-${index}`} className="scroll-mt-28" key={category}><h2>{category}</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{blogPosts.filter((post) => post.category === category).map((post) => <article className="seo-card" key={post.slug}>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p className="mt-4">{post.excerpt}</p><p className="mt-5 text-sm">{post.readTime} · Updated <time dateTime={post.updated || post.date}>{post.updated || post.date}</time></p>
    </article>)}</div></section>)}
    <section><h2>Buying restaurant software?</h2><p className="mt-4">Explore the <Link href="/services">solutions</Link>, compare <Link href="/compare-marketplaces">direct ordering and marketplaces</Link>, and use the <Link href="/pricing">pricing calculator</Link> before arranging a walkthrough.</p></section>
    <p>For product scope and practical demonstrations, <Link href="/services#buyer-topics">choose the restaurant workflow you need</Link>. The guides explain evaluation and planning; the service pages describe the Restrova offering.</p>
    <DemoCta />
  </MarketingPage>;
}
