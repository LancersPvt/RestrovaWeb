import {notFound} from "next/navigation";
import {localPreviewEnabled} from "@/lib/local-preview";
import {editorialArticles} from "@/lib/editorial";
import {seoPages} from "@/data/seoPages";
import ArticleBody from "@/components/ArticleBody";
import ProgrammaticPage from "@/components/ProgrammaticPage";
export const metadata={title:"Private content review",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){if(!localPreviewEnabled())notFound();const {id}=await params;const a=editorialArticles.find(a=>a.id===id);if(a)return <main className="seo-content mx-auto max-w-4xl p-8"><p>LOCAL DRAFT REVIEW — {a.publicationStatus}</p><h1>{a.title}</h1><ArticleBody content={a.body||a.reviewNote}/></main>;const p=seoPages.find(p=>p.id===id);if(!p)notFound();return <><p className="bg-amber-100 p-5 font-bold">LOCAL DRAFT REVIEW — {p.publicationStatus}</p><ProgrammaticPage path={p.path} preview/></>;}
