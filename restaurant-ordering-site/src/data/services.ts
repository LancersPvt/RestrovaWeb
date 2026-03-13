export interface ServiceData {
    name: string;
    slug: string;
    tagline: string;
    benefits: string[];
    features: string[];
    icon: string;
}

export const services: Record<string, ServiceData> = {
    pos: {
        name: "Restaurant POS System",
        slug: "pos",
        tagline: "The fastest, most reliable POS built for restaurants",
        benefits: [
            "Faster billing and reduced wait times",
            "Cloud-based access from anywhere",
            "Real-time sales reports and analytics",
            "Reduce human errors at the counter",
            "Accept cash, card, and digital payments",
        ],
        features: [
            "Inventory sync across all branches",
            "Multi-branch centralized management",
            "Tax automation and compliance",
            "Shift reports and employee management",
            "Kitchen order printing (KOT)",
            "Daily sales summary dashboard",
        ],
        icon: "🖥️",
    },
    "online-ordering": {
        name: "Online Ordering System",
        slug: "online-ordering",
        tagline: "Get direct orders from your website and app — zero commission",
        benefits: [
            "Increase revenue with zero third-party commission",
            "Own your customer data and relationships",
            "Seamless ordering experience on mobile and web",
            "Higher average order values through smart upselling",
            "Build loyalty with direct customer communication",
        ],
        features: [
            "Branded website and mobile ordering",
            "QR code table ordering",
            "Schedule orders in advance",
            "Real-time order tracking for customers",
            "Multiple payment gateways supported",
            "Promo codes and discount management",
        ],
        icon: "📱",
    },
    kds: {
        name: "Kitchen Display System",
        slug: "kds",
        tagline: "Eliminate paper tickets — speed up your kitchen with digital KDS",
        benefits: [
            "Reduce order errors and miscommunication",
            "Speed up kitchen throughput by up to 40%",
            "Real-time order status visibility for staff",
            "Prioritize rush orders instantly",
            "Reduce food waste with precise order timing",
        ],
        features: [
            "Color-coded order urgency indicators",
            "Multi-station kitchen display routing",
            "Order bump and status updates",
            "Integration with POS and online ordering",
            "Prep time analytics and reporting",
            "Customizable display layouts",
        ],
        icon: "📊",
    },
    inventory: {
        name: "Inventory Management System",
        slug: "inventory",
        tagline: "Never run out of stock — manage your restaurant inventory smarter",
        benefits: [
            "Reduce food waste and over-ordering costs",
            "Automated low-stock alerts",
            "Track ingredient usage per dish sold",
            "Negotiate better with suppliers using data",
            "Multi-branch inventory visibility",
        ],
        features: [
            "Recipe-level ingredient tracking",
            "Automated purchase order generation",
            "Supplier management and cost tracking",
            "Waste logging and shrinkage reports",
            "Batch and expiry date tracking",
            "Stocktake and variance reports",
        ],
        icon: "📦",
    },
    analytics: {
        name: "Restaurant Analytics & Reports",
        slug: "analytics",
        tagline: "Make smarter decisions with restaurant data analytics",
        benefits: [
            "Understand which menu items drive the most profit",
            "Identify peak hours and staff accordingly",
            "Track revenue trends across all branches",
            "Reduce costs with spend analytics",
            "Grow repeat customers with behavior insights",
        ],
        features: [
            "Real-time sales dashboard",
            "Menu performance reports",
            "Customer order history and segmentation",
            "Staff performance metrics",
            "Cost of goods (COGS) analysis",
            "Weekly and monthly trend comparisons",
        ],
        icon: "📈",
    },
    crm: {
        name: "Restaurant CRM System",
        slug: "crm",
        tagline: "Build lasting relationships with every guest who walks in",
        benefits: [
            "Retain more customers with personalized outreach",
            "Increase repeat visit frequency",
            "Know your VIP customers by name",
            "Automated birthday and anniversary offers",
            "Track customer lifetime value effortlessly",
        ],
        features: [
            "Customer profile and order history database",
            "Automated marketing campaigns (SMS/email)",
            "Segmentation by visit frequency, spend, location",
            "Birthday and anniversary automation",
            "Review and feedback collection",
            "Integration with loyalty programs",
        ],
        icon: "🤝",
    },
    loyalty: {
        name: "Restaurant Loyalty & Rewards System",
        slug: "loyalty",
        tagline: "Turn first-time visitors into lifelong regulars",
        benefits: [
            "Increase repeat order frequency by 2–3x",
            "Higher average order values from members",
            "Reduce customer acquisition costs",
            "Build a loyal base that markets for you",
            "Compete with large chains on customer retention",
        ],
        features: [
            "Points-based rewards on every order",
            "Tiered membership (Bronze, Silver, Gold)",
            "Gamified challenges and achievements",
            "Referral reward programs",
            "Automatic points at checkout",
            "Redemption via app, web, or POS",
        ],
        icon: "⭐",
    },
    "app-development": {
        name: "Restaurant App Development",
        slug: "app-development",
        tagline: "Your own branded restaurant app — iOS, Android, and web",
        benefits: [
            "Stand out with a branded app customers love",
            "Own your ordering channel — no marketplace fees",
            "Push notifications for direct customer engagement",
            "Compete with large chains at a fraction of the cost",
            "Integrate loyalty, ordering, and CRM in one app",
        ],
        features: [
            "Custom iOS and Android app development",
            "Branded web ordering portal",
            "Integrated order management dashboard",
            "Real-time push notifications",
            "Menu management from admin panel",
            "Multi-location support built in",
        ],
        icon: "🚀",
    },
};

export function getServiceBySlug(slug: string): ServiceData | null {
    return services[slug] ?? null;
}

export function getAllServiceSlugs(): string[] {
    return Object.keys(services);
}
