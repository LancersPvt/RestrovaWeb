import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import { locationData } from "@/data/locationData";
import { services } from "@/data/services";
import { createSlug } from "@/lib/slugUtils";
import { fetchActiveTenants } from "@/data/tenantsData";
import { fetchBranches, fetchMenuCategories } from "@/lib/restrovaApi";

export const revalidate = 3600; // Revalidate sitemap cache every hour

function cleanSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
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

  /* ── Programmatic Marketing SEO pages ── */
  const marketingSeoPages: MetadataRoute.Sitemap = [];

  for (const [countrySlug, countryData] of Object.entries(locationData)) {
    for (const city of countryData.cities) {
      for (const serviceSlug of Object.keys(services)) {
        const slug = createSlug(serviceSlug, city.slug, countrySlug);
        marketingSeoPages.push({
          url: `${siteConfig.url}/${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }
    }
  }

  /* ── Dynamic Tenant & Restaurant SEO Pages ── */
  const dynamicSeoPages: MetadataRoute.Sitemap = [];
  const visitedUrls = new Set<string>();

  try {
    const tenants = await fetchActiveTenants();

    for (const tenant of tenants) {
      // 1. Restaurant Detail Page
      const tenantUrl = `${siteConfig.url}/restaurants/${tenant.slug}`;
      if (!visitedUrls.has(tenantUrl)) {
        visitedUrls.add(tenantUrl);
        dynamicSeoPages.push({
          url: tenantUrl,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.9,
        });
      }

      // Fetch branches and menu categories in parallel
      const [branches, categories] = await Promise.all([
        fetchBranches(tenant.id),
        fetchMenuCategories(tenant.id),
      ]);

      for (const branch of branches) {
        if (!branch.isActive) continue;

        // 2. Branch-Level SEO Page (URL format: /restaurants/[tenantSlug]/[branchSlug])
        const branchSlug = cleanSlug(branch.name);
        const branchUrl = `${siteConfig.url}/restaurants/${tenant.slug}/${branchSlug}`;
        if (!visitedUrls.has(branchUrl)) {
          visitedUrls.add(branchUrl);
          dynamicSeoPages.push({
            url: branchUrl,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.8,
          });
        }

        // Determine city and area for listing page generation
        const addressLower = branch.address.toLowerCase();
        const nameLower = branch.name.toLowerCase();

        // City detection
        let city = "rawalpindi";
        const cities = ["lahore", "karachi", "rawalpindi", "islamabad", "singapore", "central"];
        for (const c of cities) {
          if (addressLower.includes(c) || nameLower.includes(c)) {
            city = c;
            break;
          }
        }

        // Area detection
        let area = "commercial-market";
        const areas = ["gulberg", "clifton", "dha", "johar-town", "bahria-town", "commercial-market", "range-road"];
        for (const a of areas) {
          const normArea = a.replace("-", " ");
          if (addressLower.includes(a) || addressLower.includes(normArea) || nameLower.includes(a) || nameLower.includes(normArea)) {
            area = a;
            break;
          }
        }

        // 3. Area Listing Page (e.g. /[city]/best-restaurants-in-[area])
        const areaUrl = `${siteConfig.url}/${city}/best-restaurants-in-${area}`;
        if (!visitedUrls.has(areaUrl)) {
          visitedUrls.add(areaUrl);
          dynamicSeoPages.push({
            url: areaUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }

        // 4. Cuisine/Category Area Pages (e.g. /[city]/best-[cuisine]-restaurants-in-[area])
        for (const cat of categories) {
          if (cat.isActive && cat.items && cat.items.length > 0) {
            const cuisine = cleanSlug(cat.name);
            const cuisineAreaUrl = `${siteConfig.url}/${city}/best-${cuisine}-restaurants-in-${area}`;
            if (!visitedUrls.has(cuisineAreaUrl)) {
              visitedUrls.add(cuisineAreaUrl);
              dynamicSeoPages.push({
                url: cuisineAreaUrl,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.7,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("[SEO Engine] Error generating dynamic sitemap routes:", error);
  }

  return [...staticPages, ...blogPages, ...marketingSeoPages, ...dynamicSeoPages];
}

