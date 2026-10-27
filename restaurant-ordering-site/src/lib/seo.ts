import type { Metadata } from "next";
import { isPreviewDeployment, siteConfig } from "@/lib/site";

export function pageMetadata(path: string, title: string, description: string, index = true): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const socialTitle = `${title} | Restrova`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: {
      type: "website", locale: "en_PK", url, siteName: siteConfig.name,
      title: socialTitle, description,
      images: [{ url: `${siteConfig.url}/og.png`, width: 1728, height: 912, alt: "Restrova restaurant ordering and management software" }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [`${siteConfig.url}/og.png`] },
    robots: { index: index && !isPreviewDeployment, follow: true },
  };
}

export const staticSeoPages = [
  { path: "/about", title: "About Restrova | Restaurant Technology for Pakistan", description: "Learn how Restrova helps restaurants in Pakistan run branded ordering apps, websites, POS orders, inventory and delivery operations in one connected platform." },
  { path: "/", title: "Restaurant Management Software Pakistan", description: siteConfig.description },
  { path: "/services", title: "Restaurant Software Solutions in Pakistan", description: "Explore Restrova restaurant apps, ordering websites, POS, inventory, delivery management and reporting. Find the right workflow for your restaurant." },
  { path: "/pricing", title: "Restaurant Software Pricing in Pakistan", description: "Restrova costs PKR 10,000 to onboard, then PKR 5,000 or 1% of Restrova-processed monthly sales, whichever is higher. See examples and calculate your fee." },
  { path: "/contact", title: "Book a Free Restaurant Software Demo", description: "See Restrova apps, ordering websites, POS, inventory and delivery tools in a free demo for your restaurant in Pakistan. Review pricing and your workflow." },
  { path: "/faq", title: "Restaurant Software and Pricing FAQs", description: "Answers for restaurant owners in Pakistan about Restrova pricing, branded apps, online ordering, POS, inventory, riders and arranging a free demo." },
  { path: "/blog", title: "Restaurant Software Guides for Pakistan", description: "Practical guides for Pakistani restaurant owners on choosing management software, POS, direct ordering, branded apps and loyalty. Plan your next software demo." },
  { path: "/compare-marketplaces", title: "Direct Ordering vs Food Delivery Marketplaces", description: "Compare direct restaurant ordering with delivery marketplaces in Pakistan. Review costs, customer relationships and operations before choosing your mix." },
  { path: "/locations", title: "Restaurant Software for Teams Across Pakistan", description: "Plan restaurant software for Islamabad, Rawalpindi, Lahore, Karachi and other Pakistan cities. Review branch, menu and delivery needs with Restrova." },
  { path: "/apps", title: "Restrova Apps: Customer, Admin and Fleet", description: "Understand Restrova customer ordering apps, Admin software and Fleet rider management. Browse verified client app examples and desktop Admin downloads." },
  { path: "/download", title: "Download Restrova Admin for Windows and Mac", description: "Get the existing Restrova Admin desktop installers for Windows and Mac. Choose the right platform and ask Restrova about your restaurant account setup." },
] as const;

export function staticMetadata(path: string): Metadata {
  const page = staticSeoPages.find((item) => item.path === path);
  if (!page) throw new Error(`Missing SEO metadata for ${path}`);
  return pageMetadata(page.path, page.title, page.description);
}
