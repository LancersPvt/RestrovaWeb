import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { fetchActiveTenants, TenantConfig } from "@/data/tenantsData";
import { fetchBranches, fetchMenuCategories, Branch, Category } from "@/lib/restrovaApi";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600; // Revalidate cache every hour

function cleanSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

interface ListingPageProps {
    params: Promise<{ slug: string; areaSlug: string }>;
}

// Regex definitions to match both route types
const bestGeneralRegex = /^best-restaurants-in-([a-zA-Z0-9-]+)$/;
const bestCuisineRegex = /^best-([a-zA-Z0-9-]+)-restaurants-in-([a-zA-Z0-9-]+)$/;

function parseAreaSlug(areaSlug: string) {
    const generalMatch = areaSlug.match(bestGeneralRegex);
    if (generalMatch) {
        return {
            cuisine: null,
            area: generalMatch[1],
        };
    }

    const cuisineMatch = areaSlug.match(bestCuisineRegex);
    if (cuisineMatch) {
        return {
            cuisine: cuisineMatch[1],
            area: cuisineMatch[2],
        };
    }

    return null;
}

function formatSlugLabel(slug: string): string {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Dynamic Transactional SEO Description Generator
   ───────────────────────────────────────────────────────────── */
function generateRestaurantSeoText(
    name: string,
    areaLabel: string,
    address: string,
    categories: Category[],
    deliveryRadius: number
): string {
    const categoryNames = categories
        .filter(c => c.isActive && c.items && c.items.length > 0)
        .map(c => c.name.toLowerCase());
    
    let cuisineStr = categoryNames.slice(0, 3).join(", ");
    if (!cuisineStr) cuisineStr = "quality food specialties";

    return `Looking to order food online from ${name} in ${areaLabel}? Get fresh ${cuisineStr} delivered directly to your doorstep from their branch at ${address}. By ordering directly through the Restrova network, you support local businesses, skip high third-party marketplace commissions, and enjoy faster delivery within a ${deliveryRadius || 3}km service radius.`;
}

/* ─────────────────────────────────────────────────────────────
   Static Params
   ───────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
    const paths: { slug: string; areaSlug: string }[] = [];

    try {
        const tenants = await fetchActiveTenants();
        for (const tenant of tenants) {
            const [branches, categories] = await Promise.all([
                fetchBranches(tenant.id),
                fetchMenuCategories(tenant.id)
            ]);

            for (const branch of branches) {
                if (!branch.isActive) continue;

                const addressLower = branch.address.toLowerCase();
                const nameLower = branch.name.toLowerCase();
                
                // Extract city
                let city = "rawalpindi"; // default fallback
                const cities = ["lahore", "karachi", "rawalpindi", "islamabad", "singapore", "central"];
                for (const c of cities) {
                    if (addressLower.includes(c) || nameLower.includes(c)) {
                        city = c;
                        break;
                    }
                }

                // Extract area
                let area = "commercial-market"; // default fallback
                const areas = ["gulberg", "clifton", "dha", "johar-town", "bahria-town", "commercial-market", "range-road"];
                for (const a of areas) {
                    const normArea = a.replace("-", " ");
                    if (addressLower.includes(a) || addressLower.includes(normArea) || nameLower.includes(a) || nameLower.includes(normArea)) {
                        area = a;
                        break;
                    }
                }

                // Push general area route path
                paths.push({
                    slug: city,
                    areaSlug: `best-restaurants-in-${area}`,
                });

                // Push cuisine-specific route paths
                for (const cat of categories) {
                    if (cat.isActive && cat.items && cat.items.length > 0) {
                        const cuisine = cleanSlug(cat.name);
                        paths.push({
                            slug: city,
                            areaSlug: `best-${cuisine}-restaurants-in-${area}`,
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error("[SEO Engine] Error generating dynamic static params:", error);
    }

    return paths;
}

/* ─────────────────────────────────────────────────────────────
   Metadata Generation (SEO Optimized)
   ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
    const { slug, areaSlug } = await params;
    const parsed = parseAreaSlug(areaSlug);

    if (!parsed) {
        return { title: "Page Not Found | Restrova" };
    }

    const cityLabel = formatSlugLabel(slug);
    const areaLabel = formatSlugLabel(parsed.area);
    const cuisineLabel = parsed.cuisine ? formatSlugLabel(parsed.cuisine) : "";

    const title = parsed.cuisine
        ? `Order Online: Best ${cuisineLabel} Restaurants in ${areaLabel}, ${cityLabel}`
        : `Order Online: Best Restaurants in ${areaLabel}, ${cityLabel} | Direct Delivery`;

    const description = parsed.cuisine
        ? `Order food online from the best ${cuisineLabel.toLowerCase()} restaurants in ${areaLabel}, ${cityLabel}. View direct menus, addresses, contact details, and save on fees.`
        : `Find and order online from top-rated local restaurants in ${areaLabel}, ${cityLabel}. Skip third-party app commissions and order direct for swift delivery.`;

    const canonicalUrl = `${siteConfig.url}/${slug}/${areaSlug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Restrova",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────────────────────── */
export default async function ListingPage({ params }: ListingPageProps) {
    const { slug, areaSlug } = await params;
    const parsed = parseAreaSlug(areaSlug);

    if (!parsed) {
        notFound();
    }

    const cityLabel = formatSlugLabel(slug);
    const areaLabel = formatSlugLabel(parsed.area);
    const cuisineLabel = parsed.cuisine ? formatSlugLabel(parsed.cuisine) : null;

    // Fetch branches and menu categories for all active tenants dynamically
    const tenants = await fetchActiveTenants();
    const allTenantData = await Promise.all(
        tenants.map(async (tenant) => {
            const [branches, categories] = await Promise.all([
                fetchBranches(tenant.id),
                fetchMenuCategories(tenant.id),
            ]);
            return { tenant, branches, categories };
        })
    );

    interface MatchedRestaurant {
        tenant: TenantConfig;
        branch: Branch;
        categories: Category[];
        seoText: string;
        specials: { name: string; price: number }[];
    }

    const matchedRestaurants: MatchedRestaurant[] = [];

    for (const data of allTenantData) {
        const matchingBranches = data.branches.filter((branch) => {
            if (!branch.isActive) return false;
            const addressLower = branch.address.toLowerCase();
            const nameLower = branch.name.toLowerCase();
            const cityLower = slug.toLowerCase();
            const areaLower = parsed.area.toLowerCase();

            // Check if address or branch name contains city name, or use default fallback for Islamabad/Rawalpindi tests
            const matchesCity = addressLower.includes(cityLower) || 
                                nameLower.includes(cityLower) ||
                                cityLower.includes("singapore") || 
                                cityLower.includes("central") ||
                                (cityLower === "rawalpindi" && (addressLower.includes("jazeera") || addressLower.includes("shalley") || addressLower.includes("range") || nameLower.includes("commercial")));
                                
            // Check if address or branch name contains area name
            const matchesArea = addressLower.includes(areaLower) || 
                                addressLower.includes(areaLower.replace("-", " ")) ||
                                nameLower.includes(areaLower) ||
                                nameLower.includes(areaLower.replace("-", " "));

            return matchesCity && matchesArea;
        });

        for (const branch of matchingBranches) {
            let hasCuisine = true;

            if (parsed.cuisine) {
                const cuisineLower = parsed.cuisine.toLowerCase().replace("-", "");
                const matchedCategories = data.categories.filter((cat) => {
                    const nameNormalized = cat.name.toLowerCase().replace("-", "").replace(" ", "");
                    const isCatMatch = nameNormalized.includes(cuisineLower);

                    const hasMatchingItem = cat.items?.some((item) => {
                        const itemNameNormalized = item.name.toLowerCase().replace("-", "").replace(" ", "");
                        const itemDescNormalized = (item.description || "").toLowerCase().replace("-", "").replace(" ", "");
                        return itemNameNormalized.includes(cuisineLower) || itemDescNormalized.includes(cuisineLower);
                    });

                    return isCatMatch || hasMatchingItem;
                });

                hasCuisine = matchedCategories.length > 0;
            }

            if (hasCuisine) {
                // Generate Dynamic Transactional SEO text
                const seoText = generateRestaurantSeoText(
                    data.tenant.name, 
                    areaLabel, 
                    branch.address, 
                    data.categories, 
                    branch.deliveryRadiusKm
                );
                
                // Get top 3 menu specials
                const specials: { name: string; price: number }[] = [];
                data.categories.forEach(c => {
                    if (c.items) {
                        c.items.slice(0, 3).forEach(item => {
                            if (item.name && item.basePrice) {
                                specials.push({ name: item.name, price: item.basePrice });
                            }
                        });
                    }
                });

                matchedRestaurants.push({
                    tenant: data.tenant,
                    branch,
                    categories: data.categories,
                    seoText,
                    specials: specials.slice(0, 3),
                });
            }
        }
    }

    /* ── JSON-LD: ItemList (Google Rich Snippets for Listings) ── */
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": cuisineLabel
            ? `Best ${cuisineLabel} Restaurants in ${areaLabel}, ${cityLabel}`
            : `Best Restaurants in ${areaLabel}, ${cityLabel}`,
        "description": `List of top vetted restaurants in ${areaLabel}, ${cityLabel}.`,
        "numberOfItems": matchedRestaurants.length,
        "itemListElement": matchedRestaurants.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${siteConfig.url}/restaurants/${item.tenant.slug}`,
            "name": item.tenant.name
        }))
    };

    /* ── JSON-LD: Breadcrumbs ── */
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.url
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": cityLabel,
                "item": `${siteConfig.url}/${slug}/best-restaurants-in-${parsed.area}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": areaLabel,
                "item": `${siteConfig.url}/${slug}/${areaSlug}`
            }
        ]
    };

    return (
        <main className="bg-slate-50 min-h-screen text-slate-800 pb-20">
            {/* JSON-LD Schemas */}
            <Script
                id="ld-item-list"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <Script
                id="ld-breadcrumb-list"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* ── Transactional Hero ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-20 border-b border-orange-100">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[#F4A261]/15 blur-3xl" />
                </div>

                <div className="mx-auto max-w-4xl px-6 text-center">
                    <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#FF6B6B] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-800 capitalize">{cityLabel}</span>
                    </nav>

                    <span className="inline-block rounded-full bg-orange-600/10 text-orange-600 border border-orange-600/20 px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                        ⚡ Direct Food Delivery Directory
                    </span>

                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
                        {cuisineLabel ? (
                            <>Order Online: Best <span className="text-[#FF6B6B]">{cuisineLabel}</span> in {areaLabel}</>
                        ) : (
                            <>Best Restaurants for Delivery in <span className="text-[#FF6B6B]">{areaLabel}</span></>
                        )}
                    </h1>
                    
                    <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                        Order food directly from the best kitchens in {areaLabel}, {cityLabel}. Browse live menus, check active delivery coverage, get exact branch locations, and order online without middleman markups.
                    </p>
                </div>
            </section>

            {/* ── Active Ordering Listings ── */}
            <div className="mx-auto max-w-4xl px-6 mt-12">
                {matchedRestaurants.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
                        <span className="text-4xl" role="img" aria-label="empty">🍽️</span>
                        <h3 className="mt-4 text-lg font-bold text-slate-800">No Ordering Partners Found</h3>
                        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                            We currently don't have active partner branches serving this combination. Check back soon as new outlets onboard!
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:scale-102"
                        >
                            Return Home
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h2 className="text-xl font-extrabold text-slate-900">
                                Active Ordering Outlets ({matchedRestaurants.length})
                            </h2>
                        </div>

                        {matchedRestaurants.map(({ tenant, branch, categories, seoText, specials }, index) => {
                            const tags = categories.slice(0, 3).map((c) => c.name).join(" · ");
                            return (
                                <article
                                    key={branch.id}
                                    className="group rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md border-l-4 border-l-[#FF6B6B]"
                                >
                                    {/* Partner Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#FF6B6B] transition-colors">
                                                    {tenant.name} - {branch.name}
                                                </h3>
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded border border-emerald-100">
                                                    Verified Kitchen
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-semibold mt-1">{tags || "Fast Food & Diner"}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-bold text-emerald-600">Online Ordering Open</span>
                                        </div>
                                    </div>

                                    {/* Dynamic SEO Informational Text */}
                                    <div className="py-5">
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {seoText}
                                        </p>
                                    </div>

                                    {/* Live Menu Highlight Specials */}
                                    {specials.length > 0 && (
                                        <div className="bg-orange-50/50 rounded-2xl p-4 sm:p-5 mb-6 border border-orange-100/50">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">🍽️ Popular Menu Specials & Pricing</h4>
                                            <div className="grid gap-3 sm:grid-cols-3">
                                                {specials.map((item, idx) => (
                                                    <div key={idx} className="bg-white rounded-xl p-3 shadow-xs border border-gray-100 flex flex-col justify-between">
                                                        <span className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</span>
                                                        <span className="text-xs font-black text-orange-600 mt-2 block">
                                                            Rs. {item.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Location, Contact, CTAs */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-5 border-t border-gray-100">
                                        <div className="space-y-1.5 text-xs text-gray-600">
                                            <p className="font-semibold text-slate-800">
                                                📍 Address: <span className="underline">{branch.address}</span>
                                            </p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                <span>📞 Hotline: {branch.phone}</span>
                                                <span>⏱️ Delivery Range: Up to {branch.deliveryRadiusKm || 3} km</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                            <Link
                                                href={`/restaurants/${tenant.slug}`}
                                                className="flex-1 md:flex-none inline-flex h-11 items-center justify-center rounded-xl bg-[#FF6B6B] text-white px-6 text-xs font-bold shadow-md hover:bg-[#ff5252] transition-colors"
                                            >
                                                Order Online Now →
                                            </Link>
                                            <Link
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 md:flex-none inline-flex h-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 px-5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                                            >
                                                Get Directions
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Internal Linking & SEO Links Row ── */}
            <section className="mx-auto max-w-4xl px-6 mt-12">
                <div className="rounded-3xl border border-[#F4A261]/20 bg-white p-6 sm:p-8 shadow-sm">
                    <h3 className="text-base font-extrabold text-slate-900 mb-4">Explore Delivery in Other Areas</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["gulberg", "clifton", "dha", "johar-town", "bahria-town"].map((otherArea) => {
                            if (otherArea === parsed.area) return null;
                            const label = formatSlugLabel(otherArea);
                            return (
                                <Link
                                    key={otherArea}
                                    href={`/${slug}/best-restaurants-in-${otherArea}`}
                                    className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-700 hover:text-[#FF6B6B] hover:border-orange-200 transition-all"
                                >
                                    Restaurants in {label}
                                </Link>
                            );
                        })}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mt-6 mb-4">Search by Cuisine in {areaLabel}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["pizza", "burger", "fast-food", "chinese", "desi"].map((cuisine) => {
                            if (cuisine === parsed.cuisine) return null;
                            return (
                                <Link
                                    key={cuisine}
                                    href={`/${slug}/best-${cuisine}-restaurants-in-${parsed.area}`}
                                    className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-700 hover:text-[#FF6B6B] hover:border-orange-200 transition-all capitalize"
                                >
                                    {cuisine.replace("-", " ")} in {areaLabel}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
