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
  if(relative.endsWith(".json"))return JSON.parse(fs.readFileSync(file,"utf8"));
  if (cache.has(file)) return cache.get(file).exports;
  const result = { exports: {} }; cache.set(file, result);
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), { fileName: file,
    compilerOptions: { esModuleInterop: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const localRequire = (name) => {
    if (!name.startsWith("@/")) return require(name);
    const stem = `src/${name.slice(2)}`;
    if(stem.endsWith(".json"))return load(stem);
    return load(fs.existsSync(path.join(root, `${stem}.ts`)) ? `${stem}.ts` : `${stem}.tsx`);
  };
  new Function("require", "module", "exports", js)(localRequire, result, result.exports);
  return result.exports;
}

const { monthlyFee } = load("src/lib/pricing.ts");
for (const [sales, expected] of [[0, 5000], [200000, 5000], [499999, 5000], [500000, 5000], [500100, 5001], [800000, 8000], [1500000, 15000]]) assert.equal(monthlyFee(sales), expected);
for (const invalid of [-1, NaN, Infinity]) assert.throws(() => monthlyFee(invalid), RangeError);

const { businessIdentity, siteIdentitySchema } = load("src/lib/business-identity.ts");
const legalName = "LANCERS SOFTWARE (PRIVATE) LIMITED";
const approvedAddress = "Plot No. 70/5, Faizan Street, Range Road, Shalley Valley, Rawalpindi, 46000, Pakistan";
assert.equal(businessIdentity.legalName, legalName);
assert.equal(businessIdentity.address, approvedAddress);
assert.equal(businessIdentity.companyUrl, "https://www.lancers.dev/");
assert.equal(new Set(siteIdentitySchema.map(s => s["@id"])).size, 3);
const operator = siteIdentitySchema.find(s => s["@type"] === "Organization");
const brand = siteIdentitySchema.find(s => s["@type"] === "Brand");
const website = siteIdentitySchema.find(s => s["@type"] === "WebSite");
assert.equal(operator.name, legalName); assert.equal(operator.legalName, legalName);
assert.equal(operator["@id"], "https://www.restrova.com/#organization", "preserve existing provider/publisher references");
assert.deepEqual(operator.address, { "@type": "PostalAddress", streetAddress: "Plot No. 70/5, Faizan Street, Range Road, Shalley Valley", addressLocality: "Rawalpindi", postalCode: "46000", addressCountry: "PK" });
assert.equal(operator.brand["@id"], brand["@id"]);
assert.equal(brand.name, "Restrova"); assert.equal(brand.logo, "https://www.restrova.com/logo.png");
assert.equal(website.publisher["@id"], operator["@id"]);
assert.equal(website.about["@id"], brand["@id"]);
assert.equal(website.url, "https://www.restrova.com/");
assert.ok(!operator.logo, "the product logo must not be labelled as a company logo");
assert.ok(!JSON.stringify(siteIdentitySchema).match(/aggregateRating|"review"|taxID|vatID|foundingDate/));
console.log("PASS: confirmed legal operator, Restrova Brand, PostalAddress and stable website/provider identity links");

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
  const { businessTypes } = load("src/data/businessTypes.ts");
  const { blogPosts } = load("src/lib/blog-data.ts");
  const sitemap = load("src/app/sitemap.ts").default();
  assert.equal(sitemap.length, staticSeoPages.length + solutions.length + businessTypes.length + blogPosts.filter(p => p.indexable !== false).length);
  const expectedPaths = [...staticSeoPages.map(p => p.path), ...solutions.map(p => `/services/${p.slug}`), ...businessTypes.map(p => `/solutions/${p.slug}`), ...blogPosts.map(p => `/blog/${p.slug}`)];
  assert.deepEqual(sitemap.map(p => new URL(p.url).pathname).sort(), expectedPaths.filter(path => !blogPosts.some(p => p.indexable === false && path === `/blog/${p.slug}`)).sort());
  assert.equal(new Set(sitemap.map(({ url }) => url)).size, sitemap.length);
  for (const item of sitemap) {
    assert.equal(new URL(item.url).origin, siteConfig.url);
    assert.doesNotMatch(item.url, /privacy-policy|\/demo\/|software-in-|best-restaurants|\/links\//);
  }
  for (const item of [...staticSeoPages, ...solutions.map((s) => ({ ...s, path: `/services/${s.slug}` })), ...businessTypes.map((s) => ({ ...s, path: `/solutions/${s.slug}` }))]) {
    const meta = pageMetadata(item.path, item.title, item.description);
    assert.equal(meta.alternates.canonical, new URL(item.path, siteConfig.url).href);
    assert.equal(meta.openGraph.url, meta.alternates.canonical);
    assert.equal(meta.robots.index, true);
    assert.ok(meta.description.length > 50 && meta.description.length < 180);
  }
  for (const solution of solutions) for (const slug of solution.related) assert.ok(solutions.some((item) => item.slug === slug));
  for (const business of businessTypes) {
    assert.ok(business.sections.length >= 3);
    assert.ok(business.faqs.length >= 2);
    for (const slug of business.services) assert.ok(solutions.some(s => s.slug === slug));
    assert.ok(blogPosts.some(p => p.slug === business.guide.slug));
  }
  assert.equal(new Set(blogPosts.map(p => p.slug)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map(p => p.seoTitle || p.title)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map(p => p.excerpt)).size, blogPosts.length);
  for (const post of blogPosts) {
    assert.ok(post.date <= (post.updated || post.date));
    assert.ok(!Number.isNaN(Date.parse(post.date)));
    assert.ok(post.excerpt.length >= 70 && post.excerpt.length <= 180, `${post.slug}: useful description`);
    assert.ok(solutions.some(s => s.slug === post.relatedSolution));
    assert.doesNotMatch(post.content, /^# /m, `${post.slug}: no second H1`);
    for (const [, href] of post.content.matchAll(/\]\((\/(?!\/)[^\s)]+)\)/g)) {
      assert.ok(expectedPaths.includes(href.split("#")[0]), `${post.slug}: unknown internal target ${href}`);
    }
  }
  const requiredArticles = ["how-to-choose-restaurant-management-software-pakistan", "how-to-choose-restaurant-pos-software-pakistan", "restaurant-app-cost-pakistan", "why-direct-ordering-beats-third-party-marketplaces", "restaurant-inventory-management-guide-pakistan", "restaurant-rider-management-tracking-settlement", "start-online-ordering-small-restaurant-pakistan", "restaurant-pos-vs-manual-billing", "manage-multiple-restaurant-branches", "restaurant-software-pricing-pakistan-guide", "launch-restaurant-ordering-app", "compare-restaurant-ordering-systems"];
  for (const slug of requiredArticles) {
    const post = blogPosts.find(p => p.slug === slug);
    assert.ok(post, `required article ${slug}`);
    assert.ok(post.content.includes("/contact"), `${slug}: demo CTA`);
    assert.ok(post.content.split("\n\n").filter(b => b.startsWith("## ")).length >= 4, `${slug}: complete guide`);
  }
  const { solutionGuides } = load("src/data/solutionGuides.ts");
  const articlePage = load("src/app/(main)/blog/[slug]/page.tsx");
  const { ONBOARDING_FEE } = load("src/lib/pricing.ts");
  for (const slug of ["restaurant-online-ordering-system-cost-pakistan", "restaurant-pos-software-cost-pakistan"]) {
    const post = blogPosts.find(item => item.slug === slug);
    assert.ok(post, `dedicated cost guide: ${slug}`);
    for (const href of ["/pricing", "/contact", `/services/${post.relatedSolution}`]) assert.ok(post.content.includes(`](${href})`), `${slug}: contextual ${href}`);
    assert.ok(solutionGuides[post.relatedSolution].reading.some(link => link.href === `/blog/${slug}`), `${slug}: linked from its commercial pillar`);
    const examples = [...post.content.matchAll(/^\| PKR ([\d,]+) \| PKR ([\d,]+) \| PKR ([\d,]+) \|$/gm)];
    assert.ok(examples.length >= 3, `${slug}: fee examples`);
    for (const example of examples) {
      const [sales, fee, firstMonth] = example.slice(1).map(value => Number(value.replaceAll(",", "")));
      assert.equal(fee, monthlyFee(sales), `${slug}: example matches pricing formula`);
      assert.equal(firstMonth, ONBOARDING_FEE + fee, `${slug}: onboarding is separate`);
    }
  }
  // Image-bearing legacy articles are checked in the production crawl, where Next's image configuration is available.
  for (const post of blogPosts.filter(item => !item.image)) {
    const params = Promise.resolve({ slug: post.slug });
    const markup = renderToStaticMarkup(await articlePage.default({ params }));
    const metadata = await articlePage.generateMetadata({ params });
    const schema = [...markup.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1])).find(item => item["@type"] === "BlogPosting");
    assert.equal(metadata.robots.index, post.indexable !== false);
    assert.equal(schema.headline, post.title);
    assert.equal(schema.mainEntityOfPage, metadata.alternates.canonical);
    assert.equal(schema.image, post.image, "only a visible article image belongs in article schema");
    assert.ok([...markup.matchAll(/<time\b[^>]*datetime="([^"]+)"/gi)].some(match => match[1] === schema.dateModified), "schema date is visible in a time element");
    assert.ok(markup.includes(`<h1 `) && (markup.match(/<h1\b/g) || []).length === 1);
  }
  const {blogTopics,getTopicArticles} = load("src/lib/blog-topics.ts");
  const topicPage = load("src/app/(main)/blog/topics/[topic]/page.tsx");
  assert.equal(blogTopics.length, 10);
  const allTopicArticles = [];
  for (const topic of blogTopics) {
    const posts = getTopicArticles(topic.id);
    assert.equal(posts.length, 10);
    allTopicArticles.push(...posts.map(post => post.id));
    const params = Promise.resolve({topic: topic.slug});
    const html = renderToStaticMarkup(await topicPage.default({params}));
    const metadata = await topicPage.generateMetadata({params});
    assert.equal(metadata.robots.index, false);
    assert.equal(metadata.alternates.canonical, `https://www.restrova.com/blog/topics/${topic.slug}`);
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
    const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='CollectionPage');
    assert.equal(schema.mainEntity.numberOfItems,10);
    assert.equal(schema.mainEntity.itemListElement.length,10);
    for(const post of posts)assert.ok(html.includes(`href="/blog/${post.slug}"`));
  }
  assert.equal(new Set(allTopicArticles).size,100);
  const cards = renderToStaticMarkup(createElement(load("src/components/BlogTopicCards.tsx").default));
  assert.equal((cards.match(/href="\/blog\/topics\//g)||[]).length,10);
  assert.equal((cards.match(/10 articles/g)||[]).length,10);
  await assert.rejects(topicPage.default({params:Promise.resolve({topic:'not-a-real-topic'})}), /NEXT_HTTP_ERROR_FALLBACK;404/);
  console.log("PASS: ten server-rendered topic cards, ten complete articles per topic, collection schema and indexing decisions");
  assert.deepEqual(Object.keys(solutionGuides).sort(), solutions.map((s) => s.slug).sort());
  for (const solution of solutions) {
    const guide = solutionGuides[solution.slug];
    assert.equal(guide.steps.length, 4);
    assert.ok(guide.faqs.length >= 3);
    assert.equal(new Set(guide.faqs.map((f) => f.question)).size, guide.faqs.length);
    assert.match(solution.heading, /Pakistan/);
  }
  assert.equal(solutions.find((s) => s.slug === "restaurant-pos").heading, "Restaurant POS & Order Management Software in Pakistan");
  const servicePage = load("src/app/(main)/services/[service]/page.tsx");
  const connectedSlugs = ["restaurant-pos", "inventory-management", "delivery-management"];
  for (const solution of solutions) {
    const params = Promise.resolve({ service: solution.slug });
    const markup = renderToStaticMarkup(await servicePage.default({ params }));
    const visibleMarkup = markup.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const software = [...markup.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .map(match => JSON.parse(match[1])).find(schema => schema["@type"] === "SoftwareApplication");
    assert.equal(software.url, `${siteConfig.url}/services/${solution.slug}`);
    const metadata = await servicePage.generateMetadata({ params });
    assert.equal(metadata.alternates.canonical, software.url, "service canonicals remain unchanged");
    if (connectedSlugs.includes(solution.slug)) {
      for (const id of ["connected-workflow", "operational-checks", "workflow", "buying-checklist", "solution-faq"]) {
        assert.ok(visibleMarkup.includes(`id="${id}"`), `${solution.slug}: server-rendered ${id}`);
        assert.ok(visibleMarkup.includes(`href="#${id}"`), `${solution.slug}: accessible section link`);
      }
      for (const href of [...connectedSlugs.filter(slug => slug !== solution.slug).map(slug => `/services/${slug}`), "/pricing", "/faq", "/apps", "/about", "/contact"]) {
        assert.ok(visibleMarkup.includes(`href="${href}"`), `${solution.slug}: contextual destination ${href}`);
      }
      assert.ok(Array.isArray(software.featureList) && software.featureList.length > 0);
      for (const feature of software.featureList) {
        assert.equal(typeof feature, "string", "Schema.org featureList accepts Text");
        assert.ok(visibleMarkup.includes(feature), `${solution.slug}: structured feature must also be visible`);
      }
      assert.ok(!software.offers && !software.aggregateRating && !software.screenshot && !software.video);
      assert.ok(visibleMarkup.includes("Verify in the demo"));
    } else {
      assert.equal(software.featureList, undefined, "other service schemas are preserved");
      assert.ok(!visibleMarkup.includes('id="connected-workflow"'), "other service layouts are preserved");
    }
  }
  console.log("PASS: six service routes render on the server; three connected workflows, demo checks, contextual links, visible schema features and preserved canonicals");
  const { buyerTopics } = load("src/data/buyerTopics.ts");
  assert.equal(buyerTopics.length, 8);
  assert.equal(new Set(buyerTopics.map(topic => topic.href.split("#")[0])).size, 8, "one main destination per buyer topic");
  const directory = renderToStaticMarkup(createElement(load("src/components/BuyerTopicDirectory.tsx").default));
  const directorySchema = JSON.parse(directory.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(directorySchema["@type"], "ItemList");
  assert.equal(directorySchema.numberOfItems, buyerTopics.length);
  assert.equal(directorySchema.itemListOrder, "https://schema.org/ItemListUnordered");
  for (const [index, topic] of buyerTopics.entries()) {
    for (const href of [topic.href, topic.guide]) {
      assert.ok(expectedPaths.includes(href.split("#")[0]), `existing route for topic ${topic.id}`);
      assert.ok(directory.includes(`href="${href}"`), "topic and guide links in server HTML");
    }
    assert.deepEqual(directorySchema.itemListElement[index], { "@type": "ListItem", position: index + 1, name: topic.label, url: new URL(topic.href, siteConfig.url).href });
  }
  const faqPage = renderToStaticMarkup(createElement(load("src/app/(main)/faq/page.tsx").default));
  assert.ok(faqPage.includes('lang="ur-Latn"'));
  const { romanUrduQuestions } = load("src/data/romanUrduQuestions.ts");
  assert.equal(romanUrduQuestions.length, 7);
  for (const question of romanUrduQuestions) {
    assert.ok(faqPage.includes(`id="roman-urdu-${question.id}"`));
    assert.ok(faqPage.includes(`href="${question.href}"`));
  }
  const romanPricing = romanUrduQuestions.find(question => question.id === "pricing").answer;
  assert.ok(romanPricing.includes("PKR 10,000") && romanPricing.includes("PKR 5,000") && romanPricing.includes("1%") && romanPricing.includes("jo zyada ho") && romanPricing.includes("Dono jama nahin hote"));
  for (const slug of ["restaurant-ordering-websites", "restaurant-ordering-apps"]) {
    const markup = renderToStaticMarkup(await servicePage.default({ params: Promise.resolve({ service: slug }) }));
    assert.ok(markup.includes('id="direct-ordering-guide"'));
    assert.ok(markup.includes('href="/services#buyer-topics"'));
    assert.ok(markup.includes('href="/solutions/multi-branch-restaurants"'));
  }
  console.log("PASS: 8 topic destinations use existing URLs; visible ItemList, 7 server-rendered Roman Urdu answers, accurate pricing and connected ordering channels");
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
const linkedArticle = renderToStaticMarkup(createElement(ArticleBody, { content: "[Internal](/pricing) [Source](https://example.com/help?a=1&b=2) [Unsafe](javascript:alert) [Protocol relative](//example.com)" }));
assert.ok(linkedArticle.includes('href="/pricing"'));
assert.ok(linkedArticle.includes('href="https://example.com/help?a=1&amp;b=2"'));
assert.ok(!linkedArticle.includes('href="javascript:'));
assert.ok(!linkedArticle.includes('href="//'));
const { articleSections } = load("src/components/ArticleBody.tsx");
const content = "## Same heading\n\nText\n\n## Same heading";
const sections = articleSections(content);
const rendered = renderToStaticMarkup(createElement(ArticleBody, { content }));
assert.equal(new Set(sections.map((s) => s.id)).size, 2);
for (const section of sections) assert.ok(rendered.includes(`id="${section.id}"`));
const splitContent = "Opening answer.\n\n## First heading\n\nBody\n\n## Second heading";
const splitSections = articleSections(splitContent);
const splitRendered = renderToStaticMarkup(createElement(ArticleBody, { content: splitContent.split("\n\n").slice(1).join("\n\n"), startIndex: 1 }));
for (const section of splitSections) assert.ok(splitRendered.includes(`id="${section.id}"`), "intro-before-contents preserves anchors");
const table = renderToStaticMarkup(createElement(ArticleBody, { content: "## Compare costs\n\n| Item | Evidence |\n| --- | --- |\n| Software | [Pricing](/pricing) |\n| <script> | [Unsafe](javascript:alert) |", startIndex: 2 }));
assert.ok(table.includes('<caption id="article-table-3" class="sr-only">Compare costs</caption>'));
assert.ok(table.includes('role="region" aria-labelledby="article-table-3" tabindex="0"'));
assert.equal((table.match(/scope="col"/g) || []).length, 2);
assert.equal((table.match(/scope="row"/g) || []).length, 2);
assert.ok(table.includes('href="/pricing"') && table.includes('&lt;script&gt;'));
assert.ok(!table.includes('href="javascript:') && !table.includes('<script>'));
for (const malformed of ["| A | B |\n| --- | --- |\n| missing cell |", "| A | B |\n| not a separator | B |\n| C | D |"])
  assert.ok(!renderToStaticMarkup(createElement(ArticleBody, { content: malformed })).includes('<table'), "malformed tables remain text");
console.log("PASS: pricing, canonicals, sitemap, article schema/visible images, cost examples, contextual links, escaped tables and stable article anchors");
