/**
 * Internal Linking Strategy for SEO
 * This file contains logic to strategically link related services and pages
 * to improve SEO and distribute link juice across the site.
 */

import { services } from "@/data/services";
import { createSlug } from "./slugUtils";

export interface RelatedService {
    title: string;
    slug: string;
    linkText: string;
    reason: string;
}

/**
 * Get related services for internal linking
 * Returns 2-3 complementary services that work well together
 */
export function getRelatedServices(currentServiceSlug: string): RelatedService[] {
    const relatedMap: Record<string, RelatedService[]> = {
        "online-ordering": [
            {
                title: "Admin App & Order Management",
                slug: "admin-app",
                linkText: "Manage Orders Efficiently",
                reason: "Receive and manage online orders in real-time",
            },
            {
                title: "Analytics & Reporting",
                slug: "analytics",
                linkText: "Track Online Order Analytics",
                reason: "Monitor sales and customer behavior from your online orders",
            },
            {
                title: "Loyalty & Engagement",
                slug: "loyalty",
                linkText: "Build Customer Loyalty",
                reason: "Increase repeat orders through rewards and promotions",
            },
        ],
        pos: [
            {
                title: "Online Ordering System",
                slug: "online-ordering",
                linkText: "Add Online Ordering",
                reason: "Integrate online orders directly into your POS",
            },
            {
                title: "Analytics & Reporting",
                slug: "analytics",
                linkText: "Advanced Sales Analytics",
                reason: "Get deep insights into your point-of-sale data",
            },
            {
                title: "Inventory Management",
                slug: "inventory",
                linkText: "Sync Inventory Automatically",
                reason: "Keep inventory levels consistent across all channels",
            },
        ],
        "admin-app": [
            {
                title: "Online Ordering System",
                slug: "online-ordering",
                linkText: "Manage Online Orders",
                reason: "Receive orders from your website and app",
            },
            {
                title: "Delivery Fleet Management",
                slug: "delivery",
                linkText: "Manage Delivery Fleet",
                reason: "Track and optimize your delivery operations",
            },
            {
                title: "POS System",
                slug: "pos",
                linkText: "Integrate with POS",
                reason: "Sync orders with your point-of-sale system",
            },
        ],
        analytics: [
            {
                title: "Online Ordering System",
                slug: "online-ordering",
                linkText: "Analyze Online Orders",
                reason: "Understand your online ordering trends",
            },
            {
                title: "POS System",
                slug: "pos",
                linkText: "Analyze POS Data",
                reason: "Get comprehensive insights from your point-of-sale",
            },
            {
                title: "Customer App (Android & iOS)",
                slug: "customer-app",
                linkText: "Track App Engagement",
                reason: "Monitor customer app usage and behavior",
            },
        ],
        delivery: [
            {
                title: "Online Ordering System",
                slug: "online-ordering",
                linkText: "Enable Online Delivery",
                reason: "Accept delivery orders from your website and app",
            },
            {
                title: "Admin App & Order Management",
                slug: "admin-app",
                linkText: "Assign Deliveries",
                reason: "Assign orders to delivery riders in real-time",
            },
            {
                title: "Analytics & Reporting",
                slug: "analytics",
                linkText: "Delivery Performance Metrics",
                reason: "Track delivery times and performance",
            },
        ],
        loyalty: [
            {
                title: "Online Ordering System",
                slug: "online-ordering",
                linkText: "Loyalty Through Online Orders",
                reason: "Reward customers who order directly from you",
            },
            {
                title: "Customer App (Android & iOS)",
                slug: "customer-app",
                linkText: "In-App Loyalty Program",
                reason: "Integrate loyalty features into your mobile app",
            },
            {
                title: "Analytics & Reporting",
                slug: "analytics",
                linkText: "Track Loyalty ROI",
                reason: "Measure the impact of your loyalty program",
            },
        ],
    };

    return relatedMap[currentServiceSlug] || [];
}

/**
 * Generate internal links for a specific city and service
 * Returns links to related services in the same city
 */
export function getRelatedCityServiceLinks(
    currentServiceSlug: string,
    citySlug: string,
    countrySlug: string
): Array<{
    title: string;
    href: string;
    reason: string;
}> {
    const relatedServices = getRelatedServices(currentServiceSlug);

    return relatedServices.map((rs) => ({
        title: rs.title,
        href: `/${createSlug(rs.slug, citySlug, countrySlug)}`,
        reason: rs.reason,
    }));
}

/**
 * Get links to other major cities for the same service
 * Good for location-based internal linking
 */
export function getOtherCityLinks(
    serviceSlug: string,
    currentCitySlug: string,
    currentCountrySlug: string,
    allCities: Array<{ slug: string; label: string }>,
    currentCountryLabel: string
): Array<{
    citySlug: string;
    cityLabel: string;
    href: string;
}> {
    // Show links to 2-3 other major cities
    return allCities
        .filter((city) => city.slug !== currentCitySlug)
        .slice(0, 3)
        .map((city) => ({
            citySlug: city.slug,
            cityLabel: city.label,
            href: `/${createSlug(serviceSlug, city.slug, currentCountrySlug)}`,
        }));
}
