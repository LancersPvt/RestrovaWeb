import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { getTenantBySlug, fetchActiveTenants } from "@/data/tenantsData";
import { fetchBranches, fetchMenuCategories, Branch, Category } from "@/lib/restrovaApi";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600; // Revalidate cache every hour

interface BranchPageProps {
    params: Promise<{ tenantSlug: string; branchSlug: string }>;
}

function cleanSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

/* ─────────────────────────────────────────────────────────────
   Static Params — Runs at build time to pre-generate all branch pages
   ───────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
    const tenants = await fetchActiveTenants();
    const paths: { tenantSlug: string; branchSlug: string }[] = [];

    for (const tenant of tenants) {
        try {
            const branches = await fetchBranches(tenant.id);
            for (const branch of branches) {
                if (branch.isActive) {
                    paths.push({
                        tenantSlug: tenant.slug,
                        branchSlug: cleanSlug(branch.name),
                    });
                }
            }
        } catch (err) {
            console.error(`[SEO Params] Error generating params for tenant ${tenant.slug}:`, err);
        }
    }

    return paths;
}

/* ─────────────────────────────────────────────────────────────
   Metadata Generation
   ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: BranchPageProps): Promise<Metadata> {
    const { tenantSlug, branchSlug } = await params;
    const tenant = await getTenantBySlug(tenantSlug);

    if (!tenant) {
        return { title: "Restaurant Not Found | Restrova" };
    }

    const branches = await fetchBranches(tenant.id);
    const branch = branches.filter((b) => b.isActive).find((b) => cleanSlug(b.name) === branchSlug);

    if (!branch) {
        return { title: `Branch Not Found | ${tenant.name} | Restrova` };
    }

    const canonicalUrl = `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}`;
    const title = `${tenant.name} (${branch.name}) | Menu & Contact Details | Restrova`;
    const description = `Order online from ${tenant.name} at ${branch.name}, located at ${branch.address}. View food menu, phone number (${branch.phone}), open timings, and get driving directions.`;

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
export default async function BranchPage({ params }: BranchPageProps) {
    const { tenantSlug, branchSlug } = await params;
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
    const branch = activeBranches.find((b) => cleanSlug(b.name) === branchSlug);

    if (!branch) {
        notFound();
    }

    const activeCategories = categories.filter((c) => c.isActive && c.items && c.items.length > 0);
    const cuisineTags = activeCategories.slice(0, 3).map((c) => c.name).join(", ") || "Fast Food, Cafe";

    /* ── JSON-LD: Restaurant Structured Data ── */
    const restaurantJsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}#restaurant`,
        "name": `${tenant.name} - ${branch.name}`,
        "image": activeCategories[0]?.imageUrl || siteConfig.url + "/flogo.png",
        "telephone": branch.phone,
        "email": branch.email,
        "url": `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}`,
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
    };

    /* ── JSON-LD: Food Menu Schema ── */
    const foodMenuJsonLd = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}#menu`,
        "name": `${tenant.name} (${branch.name}) Food Menu`,
        "mainEntityOfPage": `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}`,
        "hasMenuSection": activeCategories.map((category) => ({
            "@type": "MenuSection",
            "name": category.name,
            "description": category.description || `Delicious ${category.name} options at ${branch.name}`,
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
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": branch.name,
                "item": `${siteConfig.url}/restaurants/${tenantSlug}/${branchSlug}`
            }
        ]
    };

    return (
        <main className="bg-slate-50 min-h-screen text-slate-800 pb-20">
            {/* SEO JSON-LD Scripts */}
            <Script
                id="ld-branch-restaurant"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
            />
            <Script
                id="ld-branch-menu"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(foodMenuJsonLd) }}
            />
            <Script
                id="ld-branch-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* ── Hero Section ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-20 border-b border-orange-100">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-[#F4A261]/15 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#FF6B6B] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={`/restaurants/${tenantSlug}`} className="hover:text-[#FF6B6B] transition-colors">{tenant.name}</Link>
                        <span>/</span>
                        <span className="text-gray-800">{branch.name} Branch</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                                    Local Outlet
                                </span>
                                <span className="text-xs font-medium bg-white/80 border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                                    📍 {branch.address.split(",").slice(-2, -1)[0]?.trim() || "Pakistan"}
                                </span>
                            </div>
                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                {tenant.name} - {branch.name}
                            </h1>
                            <p className="mt-3 text-base text-gray-600 font-medium max-w-2xl">
                                Serving: <span className="text-slate-800">{cuisineTags}</span> at {branch.name} branch.
                            </p>
                        </div>

                        {/* Status Card */}
                        <div className="rounded-2xl border border-[#F4A261]/20 bg-white/80 p-5 shadow-lg backdrop-blur-md max-w-xs">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-semibold text-emerald-600">Open for Ordering</span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Order from the {branch.name} outlet for instant delivery or pick-up.
                            </p>
                            <Link
                                href={`tel:${branch.phone}`}
                                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                            >
                                📞 Call {branch.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Layout ── */}
            <div className="mx-auto max-w-6xl px-6 mt-12 grid gap-8 lg:grid-cols-3">
                {/* Menu list */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="border-b border-gray-200 bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Menu Available at {branch.name}</h2>
                        {activeCategories.length === 0 ? (
                            <p className="text-gray-500 italic">No menu items listed yet.</p>
                        ) : (
                            <div className="space-y-10">
                                {activeCategories.map((category) => (
                                    <div key={category.id} className="scroll-mt-24" id={`cat-${category.id}`}>
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                                            <h3 className="text-lg font-bold text-slate-800">{category.name}</h3>
                                            <span className="text-xs bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full border border-orange-100">
                                                {category.items?.length || 0} Options
                                            </span>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {category.items?.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-orange-200 hover:shadow"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between gap-3">
                                                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#FF6B6B] transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <span className="shrink-0 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                                                                {formatPrice(item.basePrice)}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                            {item.description || "Made using premium ingredients, freshly cooked."}
                                                        </p>
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

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Branch NAP & Maps card */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-900">Branch details</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</h4>
                                <p className="mt-1 text-sm text-slate-700 font-medium leading-relaxed">{branch.address}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</h4>
                                    <p className="mt-1 text-sm text-slate-700 font-medium">
                                        <Link href={`tel:${branch.phone}`} className="hover:underline">{branch.phone}</Link>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</h4>
                                    <p className="mt-1 text-sm text-slate-700 font-medium break-all">
                                        <Link href={`mailto:${branch.email}`} className="hover:underline">{branch.email}</Link>
                                    </p>
                                </div>
                            </div>

                            {branch.deliveryRadiusKm > 0 && (
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Coverage</h4>
                                    <p className="mt-1 text-sm text-emerald-600 font-semibold">
                                        🚀 Within {branch.deliveryRadiusKm} KM radius
                                    </p>
                                </div>
                            )}

                            {/* Timings */}
                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⏱ Operating Hours</h4>
                                <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-gray-500 space-y-1.5 border border-slate-100">
                                    {Object.entries(branch.openingHours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between">
                                            <span className="capitalize">{day}:</span>
                                            <span className="font-semibold text-slate-700">{hours || "Closed"}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Maps Link */}
                        <div className="pt-2 border-t border-gray-100">
                            <Link
                                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 border border-orange-200 py-3 text-xs font-bold text-orange-600 transition-all hover:bg-orange-100 hover:text-orange-700"
                            >
                                📍 Open in Google Maps
                            </Link>
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="text-center">
                        <Link
                            href={`/restaurants/${tenantSlug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#FF6B6B] transition-colors"
                        >
                            ← Back to all {tenant.name} branches
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
