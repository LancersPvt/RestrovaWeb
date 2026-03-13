import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import { locationData } from "@/data/locationData";
import { services } from "@/data/services";
import { createSlug } from "@/lib/slugUtils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* ── Blog pages ── */
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* ── Programmatic SEO pages ── */
  const seoPages: MetadataRoute.Sitemap = [];

  for (const [countrySlug, countryData] of Object.entries(locationData)) {
    for (const city of countryData.cities) {
      for (const serviceSlug of Object.keys(services)) {
        const slug = createSlug(serviceSlug, city.slug, countrySlug);
        seoPages.push({
          url: `${siteConfig.url}/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }
    }
  }

  return [...staticPages, ...blogPages, ...seoPages];
}
