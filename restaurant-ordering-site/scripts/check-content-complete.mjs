import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {loadSeoSource} from "./load-seo-source.mjs";

const articles = loadSeoSource("src/lib/editorial.ts").editorialArticles;
const pages = loadSeoSource("src/data/seoPages.ts").seoPages;
const {legacyBlogPosts} = loadSeoSource("src/lib/blog-data.ts");
const requested = articles.filter(article => /^editorial-\d+-\d+$/.test(article.id));
assert.equal(requested.length, 100);
const allIds = new Set([...articles, ...legacyBlogPosts].map(article => article.id));
const bodies = new Set();
const metadata = new Set();
for (let cluster = 1; cluster <= 10; cluster++) {
  assert.equal(requested.filter(article => article.cluster === String(cluster)).length, 10);
}
for (const article of requested) {
  assert.equal(article.draftDisposition, "complete_draft", article.id);
  assert.ok(article.body.trim().split(/\s+/).length >= 300, article.id);
  assert.ok((article.body.match(/^## /gm) || []).length >= 3, article.id);
  assert.ok(article.body.includes("](/contact)"), article.id + " demo CTA");
  assert.ok(article.sources.length && article.metaTitle && article.metaDescription, article.id);
  assert.ok(article.relatedArticleIds.every(id => allIds.has(id)), article.id + " related IDs");
  assert.equal(article.h1, article.title);
  const normalized = article.body.toLowerCase().replace(/\s+/g, " ").trim();
  assert.ok(!bodies.has(normalized), article.id + " duplicate body");
  bodies.add(normalized);
  assert.ok(!metadata.has(article.metaTitle), article.id + " duplicate metadata");
  metadata.add(article.metaTitle);
}
const counts = {city:10, restaurant_type:12, feature:8, comparison:5, calculator:5, resource:15, website_template:8};
for (const [type, count] of Object.entries(counts)) {
  assert.ok(pages.filter(page => page.pageType === type).length >= count, type);
}
for (const page of pages) {
  assert.ok(page.intro.trim() && page.sections.length >= 2, page.id);
  assert.ok(page.sections.every(section => section.heading.trim() && section.text.trim()), page.id);
  assert.ok(page.sources.length && page.description, page.id);
  if (page.resourceFile) assert.ok(fs.existsSync("content/resources/" + page.resourceFile));
}
const validation = spawnSync(process.execPath, ["scripts/seo-content.mjs", "validate"], {encoding:"utf8"});
assert.equal(validation.status, 0, validation.stderr);
console.log("PASS 100 complete requested article bodies, ten clusters, unique metadata/bodies, related IDs, CTA links, all programmatic text and resource assets.");
