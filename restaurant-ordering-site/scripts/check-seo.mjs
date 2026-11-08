import assert from "node:assert/strict";
import { loadSeoSource } from "./load-seo-source.mjs";
const base = process.env.SEO_BASE_URL || "http://localhost:3100";
const origin = "https://www.restrova.com";
const legalName = "LANCERS SOFTWARE (PRIVATE) LIMITED";
const address = "Plot No. 70/5, Faizan Street, Range Road, Shalley Valley, Rawalpindi, 46000, Pakistan";
function checkIdentity(schemas, route) {
  const operator = schemas.find(s => s["@type"] === "Organization");
  const brand = schemas.find(s => s["@type"] === "Brand");
  const website = schemas.find(s => s["@type"] === "WebSite");
  for (const type of ["Organization", "Brand", "WebSite"]) assert.equal(schemas.filter(s => s["@type"] === type).length, 1, `${route}: single ${type}`);
  assert.equal(operator.name, legalName); assert.equal(operator.legalName, legalName);
  assert.equal(operator.url, "https://www.lancers.dev/");
  assert.deepEqual(operator.address, { "@type": "PostalAddress", streetAddress: "Plot No. 70/5, Faizan Street, Range Road, Shalley Valley", addressLocality: "Rawalpindi", postalCode: "46000", addressCountry: "PK" });
  assert.equal(operator["@id"], `${origin}/#organization`);
  assert.equal(operator.brand["@id"], brand["@id"]); assert.equal(brand.name, "Restrova");
  assert.equal(website.publisher["@id"], operator["@id"]); assert.equal(website.about["@id"], brand["@id"]);
}
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
function attributes(tag) { return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])])); }
async function get(route) { const res = await fetch(new URL(route, base), { headers: { "User-Agent": "Googlebot" }, signal: AbortSignal.timeout(45000) }); return { status: res.status, html: await res.text() }; }
const sitemap = await get("/sitemap.xml"); assert.equal(sitemap.status, 200);
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
const expectedUrls = loadSeoSource("src/app/sitemap.ts").default().map(item => item.url);
assert.deepEqual([...urls].sort(), [...expectedUrls].sort(), "sitemap matches curated source routes");
assert.equal(new Set(urls).size, urls.length);
const rows = []; const titles = new Set(); const descriptions = new Set(); const allLinks = new Set(); const pageIds = new Map();
for (const url of urls) {
  assert.equal(new URL(url).origin, origin);
  const route = new URL(url).pathname; const { status, html } = await get(route); assert.equal(status, 200, route);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0])).filter((a) => a.rel === "canonical");
  assert.equal(canonicals.length, 1, `${route}: canonical count`); assert.equal(new URL(canonicals[0].href).href, url, route);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
  const meta = (key) => metas.find((item) => item.name === key || item.property === key)?.content;
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ""); const description = meta("description");
  assert.ok(title && !titles.has(title), `${route}: unique title`); titles.add(title);
  assert.ok(description && !descriptions.has(description), `${route}: unique description`); descriptions.add(description);
  assert.equal(new URL(meta("og:url")).href, url); assert.ok(meta("og:image")); assert.ok(meta("twitter:card"));
  assert.ok(!meta("robots")?.includes("noindex"), `${route}: indexable`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one H1`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((m) => JSON.parse(m[1]));
  checkIdentity(schemas, route);
  assert.ok(schemas.some((s) => s["@type"] === "Organization")); assert.ok(schemas.some((s) => s["@type"] === "WebSite"));
  for (const type of ["Organization", "WebSite"]) assert.equal(schemas.filter((s) => s["@type"] === type).length, 1, `${route}: single ${type} definition`);
  const schemaIds = schemas.filter((s) => s["@id"]).map((s) => s["@id"]);
  assert.equal(new Set(schemaIds).size, schemaIds.length, `${route}: unique schema IDs`);
  if (route === "/about") assert.ok(schemas.some((s) => s["@type"] === "AboutPage" && s.mainEntity["@id"] === `${origin}/#brand` && s.publisher["@id"] === `${origin}/#organization`));
  if (route === "/services" || route.startsWith("/services/")) assert.ok(schemas.some((s) => s["@type"] === "SoftwareApplication" && s["@id"] === `${url}#software` && s.provider["@id"] === `${origin}/#organization` && !s.offers));
  if (route === "/services") {
    const { buyerTopics } = loadSeoSource("src/data/buyerTopics.ts");
    const list = schemas.find(schema => schema["@type"] === "ItemList");
    assert.equal(list.numberOfItems, buyerTopics.length);
    assert.equal(list.itemListOrder, "https://schema.org/ItemListUnordered");
    assert.deepEqual(list.itemListElement.map(item => item.name), buyerTopics.map(topic => topic.label));
    for (const topic of buyerTopics) assert.ok(html.includes(`href="${topic.href}"`) && html.includes(`href="${topic.guide}"`));
  }
  if (route === "/faq") {
    assert.ok(html.includes('lang="ur-Latn"'));
    for (const question of loadSeoSource("src/data/romanUrduQuestions.ts").romanUrduQuestions) assert.ok(html.includes(`id="roman-urdu-${question.id}"`) && html.includes(`href="${question.href}"`));
  }
  const connectedRoutes = ["/services/restaurant-pos", "/services/inventory-management", "/services/delivery-management"];
  if (connectedRoutes.includes(route)) {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "") || "";
    const visibleText = decode(main.replace(/<[^>]*>/g, " "));
    for (const id of ["connected-workflow", "operational-checks"]) assert.ok(main.includes(`id="${id}"`), `${route}: crawler receives ${id}`);
    for (const href of [...connectedRoutes.filter(target => target !== route), "/pricing", "/faq", "/apps", "/about", "/contact"]) assert.ok(main.includes(`href="${href}"`), `${route}: main-content link ${href}`);
    const software = schemas.find(schema => schema["@type"] === "SoftwareApplication");
    assert.ok(Array.isArray(software.featureList) && software.featureList.length > 0);
    for (const feature of software.featureList) assert.ok(typeof feature === "string" && visibleText.includes(feature), `${route}: schema feature is visible text`);
    assert.ok(!software.screenshot && !software.video, `${route}: no unapproved product media`);
  }
  if (route.startsWith("/blog/")) assert.ok(schemas.some((s) => s["@type"] === "BlogPosting" && s.mainEntityOfPage === url && s.datePublished <= s.dateModified && s.author.name === "Restrova Team"));
  if (route !== "/" && route !== "/download") assert.ok(schemas.some((s) => s["@type"] === "BreadcrumbList"), `${route}: breadcrumbs`);
  assert.ok(!schemas.some((s) => s.aggregateRating || s.review || s["@type"] === "FAQPage"));
  // /download has its own installation-help footer, outside the marketing shell.
  if (route !== "/download") assert.ok(html.includes(legalName) && html.includes(address), `${route}: visible marketing-footer identity`);
  if (["/about", "/contact"].includes(route)) assert.ok(html.includes('id="company-information"'), `${route}: company information section`);
  pageIds.set(route, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])));
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = decode(match[1]); if (href.startsWith("/") || href.startsWith("#")) allLinks.add(new URL(href, base + route).href);
  }
  rows.push({ route, status, title, description, canonical: url, schemas: schemas.map((s) => s["@type"]) });
}
for (const link of allLinks) {
  const url = new URL(link); let ids = pageIds.get(url.pathname);
  if (!ids) { const page = await get(url.pathname); assert.equal(page.status, 200, link); ids = new Set([...page.html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])); pageIds.set(url.pathname, ids); }
  if (url.hash) assert.ok(ids.has(decodeURIComponent(url.hash.slice(1))), `Missing anchor ${link}`);
}
for (const route of ["/privacy-policy", "/demo/schedule", "/demo/thank-you", "/restaurant-pos-software-in-islamabad-pakistan", "/industries/bakery-cafe", "/links/ashandbeans"]) {
  const { status, html } = await get(route); assert.equal(status, 200, route);
  assert.match(html, /name="robots" content="[^"]*noindex/, `${route}: noindex`);
  if (route === "/privacy-policy") {
    assert.ok(html.includes(legalName) && html.includes(address));
    assert.ok(!html.includes("Awaiting business confirmation"));
    assert.ok(html.includes("Draft for review") && html.includes("To be confirmed before publication") && html.includes("owner/legal approval"));
    checkIdentity([...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1])), route);
  }
}
const missing = await get("/this-route-does-not-exist-seo-check"); assert.equal(missing.status, 404); assert.match(missing.html, /noindex/);
const robots = await get("/robots.txt"); assert.ok(robots.html.includes(`${origin}/sitemap.xml`)); assert.ok(!robots.html.includes("vercel.app"));
if (process.env.SEO_VERBOSE === "1") console.log(JSON.stringify(rows, null, 2));
console.log(`PASS: ${rows.length} production-rendered routes; unique metadata, canonical, H1, schema, ${allLinks.size} internal links/anchors, noindex utilities and 404`);
