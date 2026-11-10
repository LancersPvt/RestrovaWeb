import Link from "next/link";
import {blogPosts} from "@/lib/blog-data";
import {directory,taxonomySlug} from "@/lib/blog-navigation";
export default function BlogDirectory({base="/blog",query="",page=1,category,tag}:{base?:string;query?:string;page?:number;category?:string;tag?:string}){const result=directory(query,page,category,tag);const href=(n:number)=>`${base}?${new URLSearchParams({...query?{q:query}:{},page:String(n)})}`;return <>
 <form action={base} method="get" className="flex flex-wrap gap-3"><label htmlFor="guide-query" className="font-bold">Search guides</label><input id="guide-query" name="q" defaultValue={query} maxLength={120} type="search" className="rounded-xl border border-black/25 p-3"/><button className="seo-button">Search</button></form>
 <nav aria-label="Guide categories" className="flex flex-wrap gap-4">{[...new Set(blogPosts.map(p=>p.category))].map(c=><Link key={c} href={`/blog/category/${taxonomySlug(c)}`}>{c}</Link>)}</nav>
 <nav aria-label="Guide topics" className="flex flex-wrap gap-4">{[...new Set(blogPosts.map(p=>p.relatedSolution))].map(t=><Link key={t} href={`/blog/tag/${t}`}>{t.replaceAll("-"," ")}</Link>)}</nav>
 <p>{result.total} guides found.</p><div className="grid gap-6 md:grid-cols-2">{result.posts.map(p=><article key={p.slug} className="seo-card"><h2><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2><p className="mt-4">{p.excerpt}</p><p className="mt-4">{p.readTime} · <time dateTime={p.updated||p.date}>{p.updated||p.date}</time></p></article>)}</div>
 <nav aria-label="Guide pagination" className="flex flex-wrap gap-4">{Array.from({length:result.pages},(_,i)=><Link key={i} href={href(i+1)} aria-current={result.current===i+1?"page":undefined}>Page {i+1}</Link>)}</nav>
 </>;}
