import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import CompanyInformation from "@/components/CompanyInformation";
import { businessIdentity } from "@/lib/business-identity";
import ArticleBody from "@/components/ArticleBody";
import JsonLd from "@/components/JsonLd";
import { aboutContent } from "@/data/about";
import { staticMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const baseMetadata = staticMetadata("/about");
const title = "About Restrova | Restaurant Technology for Pakistan";
export const metadata = {
  ...baseMetadata,
  title: { absolute: title },
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function AboutPage() {
  return <MarketingPage path="/about" label="About" title="About Restrova: Restaurant Technology Built Around Your Brand"
    intro="Restrova helps restaurants in Pakistan offer customers a direct way to order under their own brand, while giving restaurant teams connected tools for everyday operations. The platform brings together branded ordering websites and mobile apps with restaurant administration, order workflows, menu and stock management, rider coordination, reporting and promotions.">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${siteConfig.url}/about#webpage`,
      url: `${siteConfig.url}/about`, name: title, description: baseMetadata.description,
      mainEntity: { "@id": businessIdentity.brandId }, publisher: { "@id": businessIdentity.organizationId }, isPartOf: { "@id": `${siteConfig.url}/#website` }, inLanguage: "en-PK" }} />
    <CompanyInformation />
    <section className="max-w-4xl">
      <p className="mb-8 text-xl font-bold">Your Restaurant. Your Brand. Your Ordering App. One Connected System.</p>
      <ArticleBody content={aboutContent} />
    </section>
    <DemoCta />
  </MarketingPage>;
}
