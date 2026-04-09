import { ServiceData } from "@/data/services";

export interface PageContent {
    headline: string;
    subheadline: string;
    intro: string;
    whyRestrova: string;
    statsRow: { label: string; value: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
}

/**
 * Generates the dynamic marketing content for a service+city+country page.
 */
export function generatePageContent(
    service: ServiceData,
    cityLabel: string,
    countryLabel: string
): PageContent {
    const locationStr = `${cityLabel}, ${countryLabel}`;

    const headline = `Best ${service.name} for Restaurants in ${cityLabel}`;
    const subheadline = `${service.tagline} — now serving restaurants across ${countryLabel}`;

    const intro = `Are you a restaurant owner in ${locationStr} looking for a reliable ${service.name.toLowerCase()}? \
Restrova provides cutting-edge restaurant technology solutions tailored for the food and beverage industry in ${countryLabel}. \
Whether you run a café, QSR, dine-in restaurant, or a multi-branch chain, our ${service.name.toLowerCase()} is designed to \
help you grow faster, operate smarter, and delight every guest.`;

    const whyRestrova = `Hundreds of restaurants across ${countryLabel} trust Restrova to power their operations. \
Our team understands the unique challenges of the ${locationStr} market — from high competition to customer retention — \
and we've built our ${service.name.toLowerCase()} specifically to tackle them. \
We're not just a software vendor; we're your long-term restaurant technology partner.`;

    const statsRow = [
        { label: "Restaurants Served", value: "500+" },
        { label: "Orders Processed Daily", value: "50K+" },
        { label: "Countries Active", value: "6+" },
        { label: "Avg. Revenue Growth", value: "30%" },
    ];

    const ctaTitle = `Ready to transform your restaurant in ${cityLabel}?`;
    const ctaSubtitle = `Get a free demo of our ${service.name} and see how Restrova can help your restaurant grow.`;

    return {
        headline,
        subheadline,
        intro,
        whyRestrova,
        statsRow,
        ctaTitle,
        ctaSubtitle,
    };
}

/**
 * Generates FAQ items for the JSON-LD FAQ schema and on-page display.
 * Enhanced with 10+ competitive and featured-snippet-friendly questions.
 */
export function generateFAQs(
    service: ServiceData,
    cityLabel: string,
    countryLabel: string
): { question: string; answer: string }[] {
    return [
        // Basic questions
        {
            question: `What is a ${service.name} and why do restaurants in ${cityLabel} need it?`,
            answer: `A ${service.name} helps restaurants in ${cityLabel} streamline operations, reduce manual errors, and increase profitability. \
With Restrova's solution, restaurant owners in ${countryLabel} get a complete, cloud-based system that works on any device. \
It automates order management, payments, inventory, and reporting—saving time and reducing costs.`,
        },
        {
            question: `How much does a ${service.name} cost in ${countryLabel}?`,
            answer: `Restrova offers flexible pricing plans for restaurants of all sizes in ${cityLabel}, starting from affordable monthly fees. \
Unlike competitors charging 20-30% commission or $500+/month, Restrova provides transparent pricing with no hidden fees. \
Contact us for a customized quote tailored to your restaurant's needs and scale.`,
        },
        {
            question: `Can Restrova's ${service.name} support multiple branches in ${cityLabel}?`,
            answer: `Yes. Restrova's ${service.name} is purpose-built for multi-branch restaurant groups in ${cityLabel} and beyond. \
Manage all your locations from a single centralized dashboard with real-time inventory sync, consolidated reports, and unified customer data across all branches.`,
        },
        {
            question: `How quickly can I get started with Restrova in ${cityLabel}?`,
            answer: `Most restaurants in ${cityLabel} are up and running within 24–48 hours with Restrova. \
Our dedicated onboarding team guides you through every step—menu setup, staff training, payment processing, and integrations. \
No lengthy implementation or technical expertise required.`,
        },
        // Competitive questions (featured snippet targets)
        {
            question: `How does Restrova's ${service.name} compare to Square or Toast?`,
            answer: `Restrova offers 3x better value than Toast ($49/month vs $99+/month) and more customization than Square. \
Unlike Square (which locks you into their ecosystem) or Toast (which charges per device), Restrova includes unlimited devices, customer app, \
online ordering, and analytics in one platform. Perfect for restaurants in ${cityLabel} looking for affordable, feature-rich solutions.`,
        },
        {
            question: `Can I use Restrova alongside Foodpanda or UberEats in ${cityLabel}?`,
            answer: `Absolutely! Many restaurants in ${cityLabel} use Restrova for direct orders while maintaining presence on Foodpanda and UberEats. \
This hybrid approach lets you reach more customers while keeping 100% commission on direct orders through Restrova. \
Most restaurants see 40% of orders come through their own platform within 3 months.`,
        },
        {
            question: `Do I own my customer data with Restrova in ${cityLabel}?`,
            answer: `Yes, you own 100% of your customer data. Unlike marketplaces like Foodpanda or UberEats that keep customer data locked away, \
Restrova gives you direct access to customer contact info, order history, and preferences. \
Build loyalty programs, send promotions, and grow your business based on your own customer insights in ${cityLabel}.`,
        },
        {
            question: `What payment methods does Restrova support in ${countryLabel}?`,
            answer: `Restrova supports all major payment methods in ${countryLabel}: credit/debit cards, digital wallets (Apple Pay, Google Pay), \
bank transfers, and cash on delivery. We integrate with local payment gateways in ${cityLabel} for seamless checkout without extra fees.`,
        },
        {
            question: `Can Restrova help my restaurant in ${cityLabel} take online orders and delivery?`,
            answer: `Yes! Restrova provides a complete online ordering solution with integrated delivery management for restaurants in ${cityLabel}. \
Get a branded website and mobile app, QR code ordering, real-time order tracking, and built-in delivery fleet management. \
Customers can order online and track deliveries in real-time without third-party marketplace fees.`,
        },
        {
            question: `Is Restrova's ${service.name} secure for handling payments in ${cityLabel}?`,
            answer: `Restrova is PCI-DSS compliant and uses enterprise-grade encryption for all financial transactions in ${cityLabel}. \
Your customer payment data is tokenized and never stored on your device. We comply with all data protection laws in ${countryLabel} \
and conduct regular security audits to ensure your business and customer data stay safe.`,
        },
        {
            question: `What kind of support does Restrova provide for restaurants in ${cityLabel}?`,
            answer: `Restrova offers 24/7 support in ${cityLabel} through phone, email, and live chat in your local language. \
Our support team provides onboarding, staff training, technical troubleshooting, and continuous optimization to help your restaurant succeed. \
No support ticket backlogs—direct access to skilled specialists.`,
        },
        {
            question: `Can I customize Restrova's ${service.name} to match my restaurant's brand in ${cityLabel}?`,
            answer: `Completely! Restrova's ${service.name} is highly customizable. Add your logo, brand colors, custom menu layouts, \
loyalty programs, and workflows that match your ${cityLabel} restaurant's style. Unlike rigid platforms, we build to your needs, not the other way around.`,
        },
    ];
}
