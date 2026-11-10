export type PublicationStatus = "draft" | "needs_review" | "approved" | "published" | "noindex" | "archived";
export interface SeoPage { id:string; pageType:"city"|"restaurant_type"|"feature"|"comparison"|"calculator"|"resource"|"website_template"; path:string; title:string; description:string; intro:string; sections:{heading:string;text:string}[]; relatedLinks:string[]; publicationStatus:PublicationStatus; verificationStatus:string; distinctIntent:boolean; reviewedBy:string; reviewedAt:string; updatedAt:string; sources:string[]; canonicalUrl:string; reviewNote:string; mappedTo:string|null; calculator?:string; }
export function publicationErrors(page:SeoPage) {
 const errors:string[]=[];
 if(page.mappedTo)errors.push("Mapped to an existing page; consolidate instead of publishing a competing URL");
 if(!page.distinctIntent)errors.push("Distinct intent not reviewed");
 if(page.verificationStatus!=="verified")errors.push("Evidence not verified");
 if(!page.reviewedBy || !/^\d{4}-\d{2}-\d{2}$/.test(page.reviewedAt))errors.push("Missing editorial review");
 if(!page.intro || page.sections.length<2 || page.sections.some(s=>!s.heading||!s.text))errors.push("Missing substantive sections");
 if(page.sources.length===0)errors.push("Missing evidence references");
 if(page.canonicalUrl!==`https://www.restrova.com${page.path}`)errors.push("Canonical does not match route");
 return errors;
}
export function isIndexable(page:SeoPage) { return page.publicationStatus==="published" && publicationErrors(page).length===0; }
export function isVisible(page:SeoPage) { return isIndexable(page) || (page.publicationStatus==="noindex" && !!page.intro && page.sections.length>=2); }
export function validateInventory(pages:SeoPage[],reserved:string[]=[]) {
 const errors:string[]=[];const paths=new Set<string>();const ids=new Set<string>();const bodies=new Map<string,string>();
 for(const p of pages){if(paths.has(p.path)||ids.has(p.id))errors.push(`Duplicate route/id: ${p.path}`);paths.add(p.path);ids.add(p.id);
 if(!/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+$/.test(p.path))errors.push(`Invalid route: ${p.path}`);
 if(p.canonicalUrl!==`https://www.restrova.com${p.path}`)errors.push(`Canonical conflict: ${p.path}`);
 if(isVisible(p)&&reserved.includes(p.path))errors.push(`Existing route conflict: ${p.path}`);
 if(p.publicationStatus==="published")errors.push(...publicationErrors(p).map(e=>`${p.path}: ${e}`));
 if(isIndexable(p)){const body=JSON.stringify(p.sections).toLowerCase();if(bodies.has(body))errors.push(`Duplicate body: ${p.path}`);bodies.set(body,p.path);}}
 return errors;
}
