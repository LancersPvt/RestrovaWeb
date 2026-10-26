import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { staticSeoPages } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/lib/blog-data";

// Curated B2B pages only. No guessed geographies, API fan-out or fake fresh timestamps.
// Legacy, consumer discovery, draft policy and session pages stay out of this sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticSeoPages.map(({ path }) => ({ url: new URL(path, siteConfig.url).toString() })),
    ...solutions.map(({ slug }) => ({ url: `${siteConfig.url}/services/${slug}` })),
    ...blogPosts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(post.updated || post.date) })),
  ];
}
