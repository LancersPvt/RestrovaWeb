import ArticleBody from "@/components/ArticleBody";
import {localPreviewEnabled} from "@/lib/local-preview";
import ResourceDownload from "@/components/ResourceDownload";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarketingPage,{DemoCta} from "@/components/MarketingPage";
import JsonLd from "@/components/JsonLd";
import RestaurantCalculator from "@/components/RestaurantCalculator";
import {calculatorFormulas} from "@/lib/restaurant-calculators";
import {seoPages} from "@/data/seoPages";
import {isVisible,isIndexable} from "@/lib/seo-engine";
import {pageMetadata} from "@/lib/seo";
export function findPage(path:string){const p=seoPages.find(p=>p.path===path&&isVisible(p));if(!p)notFound();return p;}
export function programmaticMetadata(path:string){const p=findPage(path);return pageMetadata(p.path,p.title,p.description,isIndexable(p));}
export default function ProgrammaticPage({path,preview=false}:{path:string;preview?:boolean}){const p=preview&&localPreviewEnabled()?seoPages.find(p=>p.path===path):findPage(path);if(!p)notFound();return <MarketingPage path={p.path} label="Restaurant resources" title={p.title} intro={p.intro}><JsonLd data={{"@context":"https://schema.org","@type":"WebPage",url:p.canonicalUrl,name:p.title,description:p.description}} />{p.calculator&&<section><h2>Calculate with your figures</h2><p className="my-5">{calculatorFormulas[p.calculator]}</p><RestaurantCalculator kind={p.calculator}/></section>}{p.previewUrl&&<p><a href={p.previewUrl} target="_blank" rel="noopener noreferrer">Open the verified template demonstration</a></p>}{p.resourceFile&&<ResourceDownload path={p.path} slug={p.path.split("/").pop()!}/>} {p.sections.map((s,index)=><section key={s.heading}><h2>{s.heading}</h2><div className="mt-4"><ArticleBody content={s.text} startIndex={index*100}/></div></section>)}<nav aria-label="Related resources" className="flex flex-wrap gap-5">{p.relatedLinks.map(h=><Link key={h} href={h}>{relatedLabel(h)}</Link>)}</nav><DemoCta/></MarketingPage>;}

function relatedLabel(path:string) {
 const labels:Record<string,string>={"/pricing":"Review software pricing","/contact":"Request a demo","/services":"Restaurant software services","/apps":"Published restaurant apps","/about":"About Restrova","/locations":"Pakistan setup considerations","/blog/compare-restaurant-ordering-systems":"Compare restaurant ordering systems"};
 return labels[path] || path.split("/").pop()!.replaceAll("-"," ").replace(/^./,letter=>letter.toUpperCase());
}
