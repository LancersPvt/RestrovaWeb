import assert from "node:assert/strict";
const base = process.env.SEO_BASE_URL || "http://localhost:3100";
const origin = "https://www.restrova.com";
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
function attributes(tag) { return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])])); }
async function get(route) { const res = await fetch(new URL(route, base), { headers: { "User-Agent": "Googlebot" }, signal: AbortSignal.timeout(45000) }); return { status: res.status, html: await res.text() }; }
const sitemap = await get("/sitemap.xml"); assert.equal(sitemap.status, 200);
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
assert.equal(urls.length, 19); assert.equal(new Set(urls).size, urls.length);
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
  assert.ok(schemas.some((s) => s["@type"] === "Organization")); assert.ok(schemas.some((s) => s["@type"] === "WebSite"));
  if (route !== "/" && route !== "/download") assert.ok(schemas.some((s) => s["@type"] === "BreadcrumbList"), `${route}: breadcrumbs`);
  assert.ok(!schemas.some((s) => s.aggregateRating || s.review || s["@type"] === "FAQPage"));
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
}
const missing = await get("/this-route-does-not-exist-seo-check"); assert.equal(missing.status, 404); assert.match(missing.html, /noindex/);
const robots = await get("/robots.txt"); assert.ok(robots.html.includes(`${origin}/sitemap.xml`)); assert.ok(!robots.html.includes("vercel.app"));
console.log(JSON.stringify(rows, null, 2));
console.log(`PASS: ${rows.length} production-rendered routes; unique metadata, canonical, H1, schema, ${allLinks.size} internal links/anchors, noindex utilities and 404`);
