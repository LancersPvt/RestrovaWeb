import entries from "@/data/editorial.json";
export type EditorialArticle = (typeof entries)[number];
export const editorialArticles = entries;

// Public visibility and search indexing are separate editorial decisions.
export function articleSignature(p: EditorialArticle) {
  return JSON.stringify({title:p.title,slug:p.slug,body:p.body,excerpt:p.excerpt,metaTitle:p.metaTitle,metaDescription:p.metaDescription,productLinks:p.productLinks,sources:p.sources,canonicalUrl:p.canonicalUrl,category:p.category,author:p.author,verificationStatus:p.verificationStatus,distinctIntent:p.distinctIntent,blockers:p.blockers,indexingStatus:p.indexingStatus,h1:p.h1,cluster:p.cluster,faq:p.faq,relatedArticleIds:p.relatedArticleIds});
}
export function articleErrors(p: EditorialArticle) {
  const errors: string[] = [];
  if (p.body.trim().split(/\s+/).length < 300 || (p.body.match(/^## /gm) || []).length < 3) errors.push("Substantive article missing");
  if (p.draftDisposition !== "complete_draft") errors.push("Merge/research decision unresolved");
  if (p.blockers.length) errors.push("Editorial blockers unresolved");
  if (!["verified", "editorially_reviewed"].includes(p.verificationStatus)) errors.push("Editorial review required");
  if (!["index", "noindex"].includes(p.indexingStatus)) errors.push("Explicit indexing decision required");
  if (p.indexingStatus === "index" && (p.verificationStatus !== "verified" || !p.distinctIntent)) errors.push("Indexing requires verified claims and distinct intent");
  if (!p.sources.length) errors.push("Sources required");
  if (!p.reviewedBy || !p.reviewedAt || p.reviewSignature !== articleSignature(p)) errors.push("Current content not approved by reviewer");
  if (p.h1 !== p.title) errors.push("Headline mismatch");
  if (p.canonicalUrl !== `https://www.restrova.com/blog/${p.slug}`) errors.push("Canonical mismatch");
  return errors;
}
export function articleIsPublished(p: EditorialArticle) {
  return p.publicationStatus === "published" && !!p.publishedAt && articleErrors(p).length === 0;
}
export function articleIsIndexable(p: EditorialArticle) {
  return articleIsPublished(p) && p.indexingStatus === "index";
}
