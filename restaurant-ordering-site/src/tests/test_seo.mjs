import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const { renderToStaticMarkup } = require("react-dom/server");
const { createElement } = require("react");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
let cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file).exports;
  const result = { exports: {} }; cache.set(file, result);
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), { fileName: file,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const localRequire = (name) => {
    if (!name.startsWith("@/")) return require(name);
    const stem = `src/${name.slice(2)}`;
    return load(fs.existsSync(path.join(root, `${stem}.ts`)) ? `${stem}.ts` : `${stem}.tsx`);
  };
  new Function("require", "module", "exports", js)(localRequire, result, result.exports);
  return result.exports;
}

const { monthlyFee } = load("src/lib/pricing.ts");
for (const [sales, expected] of [[0, 5000], [200000, 5000], [499999, 5000], [500000, 5000], [500100, 5001], [800000, 8000], [1500000, 15000]]) assert.equal(monthlyFee(sales), expected);
for (const invalid of [-1, NaN, Infinity]) assert.throws(() => monthlyFee(invalid), RangeError);

const originalEnv = { VERCEL_ENV: process.env.VERCEL_ENV, VERCEL_URL: process.env.VERCEL_URL, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL };
try {
  process.env.VERCEL_ENV = "production";
  process.env.VERCEL_URL = "wrong-preview.vercel.app";
  process.env.NEXT_PUBLIC_SITE_URL = "https://wrong-preview.vercel.app";
  cache = new Map();
  const { siteConfig } = load("src/lib/site.ts");
  assert.equal(siteConfig.url, "https://www.restrova.com");
  const { pageMetadata, staticSeoPages } = load("src/lib/seo.ts");
  const { solutions } = load("src/data/solutions.ts");
  const sitemap = load("src/app/sitemap.ts").default();
  assert.equal(sitemap.length, 19);
  assert.equal(new Set(sitemap.map(({ url }) => url)).size, sitemap.length);
  for (const item of sitemap) {
    assert.equal(new URL(item.url).origin, siteConfig.url);
    assert.doesNotMatch(item.url, /privacy-policy|\/demo\/|software-in-|best-restaurants|\/links\//);
  }
  for (const item of [...staticSeoPages, ...solutions.map((s) => ({ ...s, path: `/services/${s.slug}` }))]) {
    const meta = pageMetadata(item.path, item.title, item.description);
    assert.equal(meta.alternates.canonical, new URL(item.path, siteConfig.url).href);
    assert.equal(meta.openGraph.url, meta.alternates.canonical);
    assert.equal(meta.robots.index, true);
    assert.ok(meta.description.length > 50 && meta.description.length < 180);
  }
  for (const solution of solutions) for (const slug of solution.related) assert.ok(solutions.some((item) => item.slug === slug));
  const { locationData } = load("src/data/locationData.ts");
  const { services } = load("src/data/services.ts");
  const { createSlug } = load("src/lib/slugUtils.ts");
  const legacy = load("src/app/(main)/[slug]/page.tsx");
  let legacyCount = 0;
  for (const [country, data] of Object.entries(locationData)) for (const city of data.cities) for (const service of Object.keys(services)) {
    const slug = createSlug(service, city.slug, country);
    const metadata = await legacy.generateMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(metadata.robots.index, false);
    assert.equal(metadata.alternates.canonical, `${siteConfig.url}/${slug}`);
    legacyCount++;
  }
  assert.equal(legacyCount, 552);
  console.log("PASS: all 552 existing location/service URLs still resolve to self-canonical, noindex metadata");
  const robots = load("src/app/robots.ts").default();
  assert.equal(robots.sitemap, "https://www.restrova.com/sitemap.xml");
  assert.deepEqual(robots.rules.disallow, ["/api/"]);
  process.env.VERCEL_ENV = "preview"; cache = new Map();
  assert.equal(load("src/lib/seo.ts").pageMetadata("/pricing", "Pricing", "Description").robots.index, false);
  const config = load("next.config.ts").default;
  assert.deepEqual(await config.headers(), [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]);
  const redirects = await config.redirects();
  assert.equal(redirects[0].destination, "https://www.restrova.com/:path*");
  assert.equal(redirects[0].permanent, true);
  process.env.VERCEL_ENV = "production";
  assert.deepEqual(await config.headers(), []);
} finally {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
cache = new Map();
const JsonLd = load("src/components/JsonLd.tsx").default;
const html = renderToStaticMarkup(createElement(JsonLd, { data: { name: "</script><script>alert(1)</script>" } }));
assert.equal((html.match(/<script/g) || []).length, 1);
assert.ok(html.includes("\\u003c/script>"));
const ArticleBody = load("src/components/ArticleBody.tsx").default;
const article = renderToStaticMarkup(createElement(ArticleBody, { content: "## Test\n\n- One\n- Two\n\n<script>alert(1)</script>" }));
assert.ok(article.includes("<ul")); assert.ok(article.includes("<li")); assert.ok(article.includes("&lt;script&gt;"));
assert.ok(!article.includes("<h1"));
console.log("PASS: pricing boundaries/invalid input, production canonicals, preview noindex, 19 curated sitemap URLs, metadata, related links and safe JSON-LD/article rendering");
