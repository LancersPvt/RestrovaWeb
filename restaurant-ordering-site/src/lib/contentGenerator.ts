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

export function generatePageContent(
    service: ServiceData,
    cityLabel: string,
    countryLabel: string
): PageContent {
    const locationStr = `${cityLabel}, ${countryLabel}`;

    return {
        headline: `${service.name} for Restaurants in ${cityLabel}`,
        subheadline: `${service.tagline} — tailored for restaurant teams in ${countryLabel}`,
        intro: `If you run a restaurant in ${locationStr}, your technology should fit the way your team serves customers. Restrova configures ${service.name.toLowerCase()} around your menu, branches, ordering channels, and day-to-day workflows—whether you operate a café, QSR, dine-in restaurant, or multi-branch group.`,
        whyRestrova: `Restrova combines a branded customer experience with practical restaurant operations tools. We start by understanding how your team works, recommend the most useful setup, and support the rollout instead of forcing every restaurant into the same template.`,
        statsRow: [
            { label: "Ordering experience", value: "Your brand" },
            { label: "Customer channels", value: "Web + apps" },
            { label: "Operations", value: "One admin" },
            { label: "Onboarding", value: "Guided launch" },
        ],
        ctaTitle: `Ready to improve your restaurant workflow in ${cityLabel}?`,
        ctaSubtitle: `Get a free walkthrough of our ${service.name} and a recommendation shaped around your restaurant.`,
    };
}

export function generateFAQs(
    service: ServiceData,
    cityLabel: string,
    countryLabel: string
): { question: string; answer: string }[] {
    return [
        {
            question: `What is a ${service.name} and why might a restaurant in ${cityLabel} need it?`,
            answer: `A ${service.name} helps a restaurant organize the related customer and operational workflow in one system. Restrova adapts the setup to your menu, branches, service model, and team instead of treating every restaurant the same.`,
        },
        {
            question: `How much does a ${service.name} cost in ${countryLabel}?`,
            answer: `Pricing depends on the number of branches, customer channels, integrations, and operational modules you need. After a short walkthrough, Restrova provides a clear recommended scope and cost for your restaurant.`,
        },
        {
            question: `Can Restrova's ${service.name} support multiple branches in ${cityLabel}?`,
            answer: `Yes. Restrova can support branch-specific menus, pricing, availability, delivery areas, staff workflows, and consolidated reporting based on your operating model.`,
        },
        {
            question: `How quickly can I get started with Restrova in ${cityLabel}?`,
            answer: `The launch timeline depends on your menu size, branches, branding, apps, and integrations. Restrova maps the work up front and guides your team through configuration, testing, and rollout.`,
        },
        {
            question: `How does Restrova's ${service.name} compare with general restaurant software?`,
            answer: `Restrova focuses on a branded direct-ordering experience plus the restaurant workflows connected to it. The best fit depends on your existing systems, so the demo includes a practical comparison based on what your team already uses.`,
        },
        {
            question: `Can I use Restrova alongside delivery marketplaces in ${cityLabel}?`,
            answer: `Yes. Marketplaces can remain useful for discovery while Restrova gives regular customers a direct, branded way to order again. Your team can decide how each channel fits its acquisition and retention strategy.`,
        },
        {
            question: `Do I control my direct customer relationship with Restrova?`,
            answer: `Restrova is designed around your restaurant’s branded channel and direct customer journey. The exact customer data available to your team depends on your configuration, consent choices, and applicable privacy requirements.`,
        },
        {
            question: `What payment methods can Restrova support in ${countryLabel}?`,
            answer: `Payment options depend on the gateway and local providers selected for your setup. Restrova can review cash-on-delivery, card, wallet, and bank-transfer requirements during discovery and confirm compatible integrations before launch.`,
        },
        {
            question: `Can Restrova help my restaurant take online orders and manage delivery?`,
            answer: `Yes. A Restrova setup can include a branded ordering website, customer apps, delivery and pickup flows, delivery zones, rider workflows, and order-status updates based on your requirements.`,
        },
        {
            question: `How are payments and customer information protected?`,
            answer: `Security responsibilities depend on the selected hosting, payment gateway, and integrations. Restrova documents the proposed architecture and payment flow so your team can review the relevant safeguards before launch.`,
        },
        {
            question: `What support does Restrova provide in ${cityLabel}?`,
            answer: `Restrova provides guided onboarding and ongoing product support based on the agreed service scope. We clarify support channels and availability before you commit.`,
        },
        {
            question: `Can I customize Restrova's ${service.name} for my restaurant?`,
            answer: `Yes. Branding, menu structure, ordering flows, branch rules, loyalty, and operational modules can be configured around the needs agreed during discovery.`,
        },
    ];
}
