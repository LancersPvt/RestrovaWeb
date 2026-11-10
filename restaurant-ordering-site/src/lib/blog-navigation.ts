import {blogPosts} from "@/lib/blog-data";
export const taxonomySlug=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export function directory(query:string,page:number,category?:string,tag?:string){const list=blogPosts.filter(p=>(!category||taxonomySlug(p.category)===category)&&(!tag||p.relatedSolution===tag)&&(`${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase())));const pages=Math.max(1,Math.ceil(list.length/8));const current=Number.isInteger(page)&&page>0?Math.min(page,pages):1;return {posts:list.slice((current-1)*8,current*8),total:list.length,pages,current};}

export const firstSearchValue=(value:string|string[]|undefined)=>Array.isArray(value)?value[0]||"":value||"";
