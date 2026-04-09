export interface Industry {
    slug: string;
    name: string;
    icon: string;
    headline: string;
    subheadline: string;
    benefits: string[];
    features: string[];
    roiMetric: {
        label: string;
        value: string;
    };
}

export const industries: Record<string, Industry> = {
    "pizza-italian": {
        slug: "pizza-italian",
        name: "Pizza & Italian",
        icon: "🍕",
        headline: "The Ultimate Ordering System for Pizza & Italian Restaurants",
        subheadline: "Handle complex modifiers, toppings, and fast delivery workflows with ease. Built for high-volume pizzerias.",
        benefits: [
            "Advanced topping & crust modifiers",
            "Real-time driver tracking for delivery",
            "Heat-map analytics for delivery zones",
            "Automatic printing for kitchen stations"
        ],
        features: [
            "Split-topping support",
            "Delivery zone management",
            "SMS order updates",
            "Loyalty rewards for repeat customers"
        ],
        roiMetric: {
            label: "Average Delivery Speed Increase",
            value: "25%"
        }
    },
    "fast-food-qsr": {
        slug: "fast-food-qsr",
        name: "Quick Service (QSR)",
        icon: "🍔",
        headline: "Scale Your Fast Food Brand with Rapid Ordering",
        subheadline: "Minimize wait times and maximize turnover with QR ordering, kiosking, and high-speed POS integration.",
        benefits: [
            "Seamless QR-code table ordering",
            "Kiosk-ready interface",
            "Kitchen Display System (KDS) integration",
            "Bulk order management"
        ],
        features: [
            "Self-service workflow",
            "Combo & meal-deal builder",
            "Peak-hour performance dashboards",
            "Multi-branch inventory sync"
        ],
        roiMetric: {
            label: "Average Order Turnover Increase",
            value: "40%"
        }
    },
    "fine-dining": {
        slug: "fine-dining",
        name: "Fine Dining",
        icon: "🍷",
        headline: "Elevate the Guest Experience with Branded Digital Tools",
        subheadline: "Maintain your premium brand identity with a high-end, customized ordering experience for your guests.",
        benefits: [
            "Custom high-end UI design",
            "Table reservation & pre-ordering",
            "VIP customer tagging & history",
            "Direct feedback & guest concierge"
        ],
        features: [
            "Elegant digital menu",
            "Sommelier & pairing notes",
            "Private event booking module",
            "White-glove customer support"
        ],
        roiMetric: {
            label: "Average VIP Retention Boost",
            value: "35%"
        }
    },
    "bakery-cafe": {
        slug: "bakery-cafe",
        name: "Bakeries & Cafés",
        icon: "🥐",
        headline: "Grow Your Bakery with Pre-Orders and Loyalty",
        subheadline: "Let customers schedule pickups and build routines with subscriptions and loyalty rewards.",
        benefits: [
            "Scheduled pre-orders for cakes & bulk items",
            "Subscription & 'Coffee Card' logic",
            "Inventory alerts for fresh items",
            "Seamless pickup workflows"
        ],
        features: [
            "Order scheduling (24h+ in advance)",
            "Automated loyalty notifications",
            "Social media ordering integration",
            "Custom branding for seasonal items"
        ],
        roiMetric: {
            label: "Pre-order Volume Increase",
            value: "50%"
        }
    }
};

export const getAllIndustrySlugs = () => Object.keys(industries);
export const getIndustryBySlug = (slug: string) => industries[slug];
