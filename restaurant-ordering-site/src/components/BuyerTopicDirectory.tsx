import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buyerTopics } from "@/data/buyerTopics";
import { siteConfig } from "@/lib/site";

export default function BuyerTopicDirectory() {
  return <section id="buyer-topics" className="scroll-mt-28" aria-labelledby="buyer-topics-heading">
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "ItemList", "@id": `${siteConfig.url}/services#buyer-topics`,
      name: "Choose restaurant software around the job you need to do",
      itemListOrder: "https://schema.org/ItemListUnordered", numberOfItems: buyerTopics.length,
      itemListElement: buyerTopics.map((topic, index) => ({ "@type": "ListItem", position: index + 1, name: topic.label, url: new URL(topic.href, siteConfig.url).href })),
    }} />
    <h2 id="buyer-topics-heading">Choose restaurant software around the job you need to do</h2>
    <p className="mt-4 max-w-3xl">Start with the problem your restaurant needs to solve. These pages explain the customer journey, the staff workflow and the questions to bring to a demonstration.</p>
    <ul className="mt-7 grid gap-5 md:grid-cols-2">{buyerTopics.map(topic => <li className="seo-card" key={topic.id}>
      <h3><Link href={topic.href}>{topic.label}</Link></h3>
      <p className="mt-3 font-bold">{topic.question}</p><p className="mt-3">{topic.summary}</p>
      <p className="mt-4 text-sm"><Link href={topic.guide}>{topic.guideLabel}</Link></p>
    </li>)}</ul>
  </section>;
}
