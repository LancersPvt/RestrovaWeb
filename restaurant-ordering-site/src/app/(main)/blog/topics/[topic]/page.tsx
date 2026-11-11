import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import { blogTopics, getBlogTopic, getTopicArticles } from "@/lib/blog-topics";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
type Props = {params: Promise<{topic: string}>};
export function generateStaticParams() { return blogTopics.map(topic => ({topic: topic.slug})); }
export async function generateMetadata({params}: Props) {
  const topic = getBlogTopic((await params).topic); if (!topic) notFound();
  return pageMetadata(`/blog/topics/${topic.slug}`, `${topic.title}: restaurant guides`, topic.description, false);
}
export default async function BlogTopicPage({params}: Props) {
  const topic = getBlogTopic((await params).topic); if (!topic) notFound();
  const posts = getTopicArticles(topic.id);
  const path = `/blog/topics/${topic.slug}`;
  return <MarketingPage path={path} label={topic.title} title={topic.title} intro={topic.description} parent={{label: "Blog", href: "/blog"}}>
    <JsonLd data={{"@context":"https://schema.org", "@type":"CollectionPage", name:topic.title, description:topic.description, url:siteConfig.url+path,
      mainEntity:{"@type":"ItemList", numberOfItems:posts.length, itemListElement:posts.map((post,i)=>({"@type":"ListItem",position:i+1,name:post.title,url:`${siteConfig.url}/blog/${post.slug}`}))}}}/>
    <section aria-labelledby="topic-articles-heading">
      <h2 id="topic-articles-heading">{posts.length} articles in this topic</h2>
      <ol className="mt-7 grid gap-5 md:grid-cols-2">
        {posts.map((post,i) => <li key={post.slug} className="rounded-2xl border border-black/15 bg-white p-6">
          <p className="text-sm text-black/65">Article {i+1} · {post.readTime}</p>
          <h3 className="mt-3 text-xl font-bold"><Link href={`/blog/${post.slug}`} className="underline underline-offset-4">{post.title}</Link></h3>
          <p className="mt-4 leading-7 text-black/75">{post.excerpt}</p>
        </li>)}
      </ol>
    </section>
    <p><Link href={topic.serviceHref}>Explore the related Restrova offering</Link> or <Link href="/blog#blog-topics">browse all 10 topics</Link>.</p>
    <DemoCta/>
  </MarketingPage>;
}
