/**
 * Maps keyword stems → canonical service slugs.
 * Used during slug generation and slug parsing.
 */
export const serviceCategories: Record<string, string> = {
    // POS
    pos: "pos",
    billing: "pos",
    "cash-register": "pos",
    "point-of-sale": "pos",
    "restaurant-pos": "pos",
    "cloud-pos": "pos",

    // Online Ordering
    "online-ordering": "online-ordering",
    ordering: "online-ordering",
    "food-ordering": "online-ordering",
    "digital-ordering": "online-ordering",
    "web-ordering": "online-ordering",

    // KDS
    kds: "kds",
    "kitchen-display": "kds",
    "kitchen-screen": "kds",
    "kitchen-management": "kds",

    // Inventory
    inventory: "inventory",
    stock: "inventory",
    stockroom: "inventory",
    "stock-management": "inventory",
    "supply-management": "inventory",

    // Analytics
    analytics: "analytics",
    reports: "analytics",
    dashboard: "analytics",
    "data-analytics": "analytics",
    reporting: "analytics",

    // CRM
    crm: "crm",
    "customer-management": "crm",
    "guest-management": "crm",
    "customer-relationship": "crm",

    // Loyalty
    loyalty: "loyalty",
    rewards: "loyalty",
    "loyalty-program": "loyalty",
    "reward-system": "loyalty",
    points: "loyalty",

    // App Development
    "app-development": "app-development",
    "restaurant-app": "app-development",
    "mobile-app": "app-development",
    "custom-app": "app-development",
    "branded-app": "app-development",
};

/**
 * Returns the canonical service slug for a given keyword stem.
 * Returns null if not found.
 */
export function getServiceType(keyword: string): string | null {
    return serviceCategories[keyword.toLowerCase()] ?? null;
}

/**
 * All unique canonical service slugs derived from the mapping.
 */
export function getAllCanonicalServices(): string[] {
    return [...new Set(Object.values(serviceCategories))];
}
