import ArticleShare from "@/components/ArticleShare";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArticleBody, { articleSections } from "@/components/ArticleBody";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, DemoCta } from "@/components/MarketingPage";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPostBySlug((await params).slug); if (!post) notFound();
  const metadata = pageMetadata(`/blog/${post.slug}`, post.seoTitle || post.title, post.excerpt);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.updated || post.date, authors: [post.author], ...(post.image ? { images: [{ url: post.image, width: 800, height: 600, alt: post.title }] } : {}) } };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPostBySlug((await params).slug); if (!post) notFound();
  const blocks = post.content.split(/\n\s*\n/);
  const firstHeading = blocks.findIndex((block) => block.startsWith("## "));
  const introductionLength = firstHeading < 0 ? blocks.length : firstHeading;
  return <main id="main-content" className="bg-[#fffaf4] text-[#171816]">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${siteConfig.url}/blog/${post.slug}#article`, headline: post.title, description: post.excerpt, ...(post.image ? { image: post.image } : {}),
      datePublished: post.date, dateModified: post.updated || post.date, author: { "@type": "Organization", name: post.author, url: `${siteConfig.url}/about` },
      publisher: { "@id": `${siteConfig.url}/#organization` }, mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}` }} />
    <article className="seo-content mx-auto max-w-4xl px-6 py-12 sm:py-20">
      <Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
      <p className="font-bold text-[#a73524]">{post.category}</p><h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-sm">By {post.author} · Published <time dateTime={post.date}>{post.date}</time> · Updated <time dateTime={post.updated || post.date}>{post.updated || post.date}</time> · {post.readTime}</p>
      {post.image && <Image src={post.image} width={800} height={600} sizes="(max-width: 896px) 100vw, 848px" alt={post.title} className="my-10 aspect-[4/3] w-full rounded-3xl object-cover" />}
      <div className="mt-8"><ArticleBody content={blocks.slice(0, introductionLength).join("\n\n")} /></div>
      {firstHeading >= 0 && <><nav aria-label="In this guide" className="my-8 rounded-2xl border border-black/10 bg-white p-6"><p className="font-bold">In this guide</p><ul className="mt-4 space-y-3">{articleSections(post.content).map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul></nav>
      <ArticleBody content={blocks.slice(introductionLength).join("\n\n")} startIndex={introductionLength} /></>}
      <aside className="my-10 rounded-2xl border border-black/15 bg-white p-6"><h2>About the author</h2><p className="mt-3">{post.authorExpertise}</p><p className="mt-3">Learn <Link href="/about">about Restrova</Link> and explore <Link href={`/services/${post.relatedSolution}`}>the related Restrova solution</Link>.</p></aside>
      <section className="my-10"><h2>Compare the checklist with real implementations</h2><p className="mt-4">Explore <Link href="/customers">Restrova customer stories and public app references</Link>, then bring your own requirements to a demonstration. A customer implementation confirms its stated scope; it does not establish every feature for a new setup.</p></section>
      <ArticleShare url={`${siteConfig.url}/blog/${post.slug}`} title={post.title}/>
      <DemoCta />
      <section className="mt-12"><h2>Keep reading</h2><ul className="mt-5 space-y-4">{blogPosts.filter((item) => item.slug !== post.slug).sort((a, b) => Number(b.relatedSolution === post.relatedSolution) - Number(a.relatedSolution === post.relatedSolution) || Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 4).map((item) => <li key={item.slug}><Link href={`/blog/${item.slug}`}>{item.title}</Link></li>)}</ul><p className="mt-5"><Link href="/blog">Browse all restaurant guides</Link>.</p></section>
    </article>
  </main>;
}
