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
 */
export function generateFAQs(
    service: ServiceData,
    cityLabel: string,
    countryLabel: string
): { question: string; answer: string }[] {
    return [
        {
            question: `What is a ${service.name} and why do restaurants in ${cityLabel} need it?`,
            answer: `A ${service.name} helps restaurants in ${cityLabel} streamline operations, reduce manual errors, and increase profitability. \
With Restrova's solution, restaurant owners in ${countryLabel} get a complete, cloud-based system that works on any device.`,
        },
        {
            question: `How much does a ${service.name} cost in ${countryLabel}?`,
            answer: `Restrova offers flexible pricing plans for restaurants of all sizes across ${countryLabel}. \
Contact us for a customized quote based on your restaurant's specific needs and scale.`,
        },
        {
            question: `Can Restrova's ${service.name} support multiple branches in ${cityLabel}?`,
            answer: `Yes. Restrova's ${service.name} is built for multi-branch restaurant groups. \
You can manage all your locations in ${cityLabel} and beyond from a single centralized dashboard.`,
        },
        {
            question: `How quickly can I get started with Restrova in ${cityLabel}?`,
            answer: `Most restaurants in ${cityLabel} are up and running within 24–48 hours. \
Our onboarding team guides you through every step, from setup to staff training.`,
        },
    ];
}
