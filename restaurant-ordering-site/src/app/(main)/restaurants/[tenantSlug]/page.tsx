import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { getTenantBySlug, fetchActiveTenants } from "@/data/tenantsData";
import { fetchBranches, fetchMenuCategories, Branch, Category } from "@/lib/restrovaApi";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600; // Revalidate cache every hour

interface RestaurantPageProps {
    params: Promise<{ tenantSlug: string }>;
}

/* ─────────────────────────────────────────────────────────────
   Static Params — Runs at build time to pre-generate all tenants
   ───────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
    const tenants = await fetchActiveTenants();
    return tenants.map((tenant) => ({
        tenantSlug: tenant.slug,
    }));
}

/* ─────────────────────────────────────────────────────────────
   Metadata Generation
   ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
    const { tenantSlug } = await params;
    const tenant = await getTenantBySlug(tenantSlug);

    if (!tenant) {
        return { title: "Restaurant Not Found | Restrova" };
    }

    const branches = await fetchBranches(tenant.id);
    const primaryBranch = branches[0];
    const cityText = primaryBranch ? `in ${primaryBranch.address.split(",").slice(-2, -1)[0]?.trim() || ""}` : "";
    const canonicalUrl = `${siteConfig.url}/restaurants/${tenantSlug}`;

    const title = `${tenant.name} ${cityText} | Order Online | Restrova`;
    const description = `Order online from ${tenant.name} ${cityText}. Check out their latest food menu, active branches, ratings, contact details, and timings. Fast delivery and premium service.`;

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
   Helper: Format Price
   ───────────────────────────────────────────────────────────── */
function formatPrice(price: number | null): string {
    if (price === null || price === undefined) return "N/A";
    return `Rs. ${price.toLocaleString()}`;
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────────────────────── */
export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { tenantSlug } = await params;
    const tenant = await getTenantBySlug(tenantSlug);

    if (!tenant) {
        notFound();
    }

    // Fetch branches and menu categories in parallel
    const [branches, categories] = await Promise.all([
        fetchBranches(tenant.id),
        fetchMenuCategories(tenant.id),
    ]);

    const activeBranches = branches.filter((b) => b.isActive);
    const activeCategories = categories.filter((c) => c.isActive && c.items && c.items.length > 0);
    const primaryBranch = activeBranches[0];

    // Cuisines extraction for metadata / page copy
    const cuisineTags = activeCategories.slice(0, 3).map((c) => c.name).join(", ") || "Fast Food, Cafe";

    /* ── JSON-LD: Restaurant Structured Data ── */
    const localBusinessJsonLd = activeBranches.map((branch, index) => ({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": `${siteConfig.url}/restaurants/${tenantSlug}#branch-${index}`,
        "name": `${tenant.name} - ${branch.name}`,
        "image": activeCategories[0]?.imageUrl || siteConfig.url + "/flogo.png",
        "telephone": branch.phone,
        "email": branch.email,
        "url": `${siteConfig.url}/restaurants/${tenantSlug}`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": branch.address,
            "addressLocality": branch.address.split(",").slice(-2, -1)[0]?.trim() || "Local",
            "addressCountry": "PK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": branch.latitude,
            "longitude": branch.longitude
        },
        "priceRange": "$$",
        "servesCuisine": cuisineTags,
        "openingHoursSpecification": Object.entries(branch.openingHours).map(([day, hours]) => ({
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
            "opens": hours?.split("-")[0]?.trim() || "11:00",
            "closes": hours?.split("-")[1]?.trim() || "23:00"
        }))
    }));

    /* ── JSON-LD: Food Menu Schema ── */
    const foodMenuJsonLd = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${siteConfig.url}/restaurants/${tenantSlug}#menu`,
        "name": `${tenant.name} Food Menu`,
        "mainEntityOfPage": `${siteConfig.url}/restaurants/${tenantSlug}`,
        "hasMenuSection": activeCategories.map((category) => ({
            "@type": "MenuSection",
            "name": category.name,
            "description": category.description || `Delicious ${category.name} options`,
            "hasMenuItem": category.items?.map((item) => ({
                "@type": "MenuItem",
                "name": item.name,
                "description": item.description || item.name,
                "offers": {
                    "@type": "Offer",
                    "price": item.basePrice ? item.basePrice.toString() : "0.00",
                    "priceCurrency": "PKR"
                }
            }))
        }))
    };

    /* ── JSON-LD: Breadcrumb Trail ── */
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
                "name": "Restaurants",
                "item": `${siteConfig.url}/restaurants`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": tenant.name,
                "item": `${siteConfig.url}/restaurants/${tenantSlug}`
            }
        ]
    };

    return (
        <main className="bg-slate-50 min-h-screen text-slate-800 pb-20">
            {/* SEO JSON-LD Scripts */}
            <Script
                id="ld-local-business"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <Script
                id="ld-food-menu"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(foodMenuJsonLd) }}
            />
            <Script
                id="ld-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* ── Page Hero ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-24 border-b border-orange-100">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[#F4A261]/15 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#FF6B6B] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-800">{tenant.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                                    Restaurant Partner
                                </span>
                                <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
                                    ★ 5.0 (120+ ratings)
                                </span>
                            </div>
                            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                {tenant.name}
                            </h1>
                            <p className="mt-3 text-lg text-gray-600 font-medium max-w-2xl">
                                Serving: <span className="text-slate-800">{cuisineTags}</span>
                            </p>
                        </div>

                        {/* Fast Status Card */}
                        <div className="rounded-2xl border border-[#F4A261]/20 bg-white/80 p-5 shadow-lg backdrop-blur-md max-w-xs">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-semibold text-emerald-600">Open & Accepting Orders</span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Place your order directly and get super fast home delivery at your doorstep.
                            </p>
                            {primaryBranch && (
                                <Link
                                    href={`tel:${primaryBranch.phone}`}
                                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                                >
                                    Call Restaurant
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Layout (Menu + Sidebar) ── */}
            <div className="mx-auto max-w-6xl px-6 mt-12 grid gap-8 lg:grid-cols-3">
                {/* Menu Section */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="border-b border-gray-200 bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore the Food Menu</h2>
                        {activeCategories.length === 0 ? (
                            <p className="text-gray-500 italic">No menu items listed yet.</p>
                        ) : (
                            <div className="space-y-12">
                                {activeCategories.map((category) => (
                                    <div key={category.id} className="scroll-mt-24" id={`cat-${category.id}`}>
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
                                            <div>
                                                <h3 className="text-xl font-extrabold text-slate-900">{category.name}</h3>
                                                {category.description && (
                                                    <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                                                )}
                                            </div>
                                            <span className="text-xs font-semibold bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-100">
                                                {category.items?.length || 0} Items
                                            </span>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {category.items?.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between gap-3">
                                                            <h4 className="font-bold text-slate-800 group-hover:text-[#FF6B6B] transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <span className="shrink-0 text-sm font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">
                                                                {formatPrice(item.basePrice)}
                                                            </span>
                                                        </div>
                                                        <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                            {item.description || "Freshly prepared with pure, quality ingredients."}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-between">
                                                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                            ✓ Fresh
                                                        </span>
                                                        <button className="text-xs font-bold text-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                                                            Order Online →
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar (Branches, Info, NAP details) */}
                <div className="space-y-6">
                    {/* Branch Locations card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Our Branches</h3>
                        {activeBranches.length === 0 ? (
                            <p className="text-gray-500 italic">No locations found.</p>
                        ) : (
                            <div className="space-y-6">
                                {activeBranches.map((branch) => (
                                    <div
                                        key={branch.id}
                                        className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                                    >
                                        <h4 className="font-bold text-slate-800 text-base">{branch.name}</h4>
                                        <p className="mt-2 text-xs text-gray-600 leading-relaxed">{branch.address}</p>
                                        
                                        <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <span role="img" aria-label="phone">📞</span>
                                                <Link href={`tel:${branch.phone}`} className="hover:underline">{branch.phone}</Link>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span role="img" aria-label="email">✉️</span>
                                                <Link href={`mailto:${branch.email}`} className="hover:underline">{branch.email}</Link>
                                            </div>
                                        </div>

                                        {/* Opening Hours list */}
                                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px] text-gray-500 space-y-1 border border-slate-100">
                                            <p className="font-bold text-slate-700 mb-1">⏱ Opening Hours:</p>
                                            {Object.entries(branch.openingHours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between">
                                                    <span className="capitalize">{day}:</span>
                                                    <span className="font-semibold text-slate-700">{hours || "Closed"}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Map Direction URL */}
                                        <Link
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
                                        >
                                            <span>📍</span> Get Directions (Google Maps)
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Call to Action Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] p-6 text-white text-center shadow-lg">
                        <h4 className="text-xl font-bold">Have Any Questions?</h4>
                        <p className="mt-2 text-xs text-white/80 leading-relaxed">
                            Our partner support and restaurant assistance lines are available to resolve order discrepancies instantly.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white py-2.5 text-sm font-bold text-orange-600 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
