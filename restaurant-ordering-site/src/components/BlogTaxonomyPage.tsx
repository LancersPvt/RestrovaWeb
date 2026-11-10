import {notFound} from "next/navigation";
import MarketingPage,{DemoCta} from "@/components/MarketingPage";
import BlogDirectory from "@/components/BlogDirectory";
import {blogPosts} from "@/lib/blog-data";
import {taxonomySlug,firstSearchValue} from "@/lib/blog-navigation";
import {pageMetadata} from "@/lib/seo";
type Props={params:Promise<{taxonomy:string;value:string}>;searchParams:Promise<{q?:string|string[];page?:string|string[]}>};
function label(t:string,v:string){const p=blogPosts.find(p=>t==="category"?taxonomySlug(p.category)===v:t==="tag"?p.relatedSolution===v:false);if(!p)notFound();return t==="category"?p.category:v.replaceAll("-"," ");}
export async function generateMetadata({params}:Props){const {taxonomy,value}=await params;const name=label(taxonomy,value);return pageMetadata(`/blog/${taxonomy}/${value}`,`${name} restaurant guides`,`Browse Restrova guides about ${name}.`,false);}
export default async function Page({params,searchParams}:Props){const {taxonomy,value}=await params;const name=label(taxonomy,value);const s=await searchParams;const path=`/blog/${taxonomy}/${value}`;return <MarketingPage path={path} label="Guide collection" title={`${name} guides`} intro="Related published guidance for restaurant owners." parent={{label:"Guides",href:"/blog"}}><BlogDirectory base={path} query={firstSearchValue(s.q).slice(0,120)} page={Number(firstSearchValue(s.page)||1)} category={taxonomy==="category"?value:undefined} tag={taxonomy==="tag"?value:undefined}/><DemoCta/></MarketingPage>;}
