import {firstSearchValue} from "@/lib/blog-navigation";
import Link from "next/link";
import MarketingPage,{DemoCta} from "@/components/MarketingPage";
import BlogTopicCards from "@/components/BlogTopicCards";
import BlogDirectory from "@/components/BlogDirectory";
import {pageMetadata} from "@/lib/seo";
type Props={searchParams:Promise<{q?:string|string[];page?:string|string[]}>};
export async function generateMetadata({searchParams}:Props){const p=await searchParams;return pageMetadata("/blog","Restaurant Software Guides for Pakistan","Buying guides for Pakistani restaurant owners: compare POS, online ordering, branded apps, inventory and rider workflows, with software cost and launch checklists.",!firstSearchValue(p.q)&&(!firstSearchValue(p.page)||firstSearchValue(p.page)==="1"));}
export default async function BlogPage({searchParams}:Props){const p=await searchParams;return <MarketingPage path="/blog" label="Guides" title="Practical guides for restaurant owners in Pakistan." intro="Explore buying checklists, operating workflows and transparent software costs."><BlogTopicCards/><section aria-labelledby="all-guides-heading"><h2 id="all-guides-heading">All restaurant guides</h2><BlogDirectory query={firstSearchValue(p.q).slice(0,120)} page={Number(firstSearchValue(p.page)||1)}/></section><p><Link href="/services#buyer-topics">Choose the restaurant workflow you need</Link> or review <Link href="/pricing">software pricing</Link>.</p><DemoCta/></MarketingPage>;}
