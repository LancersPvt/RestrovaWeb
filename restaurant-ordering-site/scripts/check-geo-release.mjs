import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSeoSource } from "./load-seo-source.mjs";

// Scope: public HTTP and release-content checks. Indexing requires separate account evidence.
export function robotsAllows(text, agent, pathname) {
  const groups = []; let group = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.split("#")[0].trim(); if (!line.includes(":")) continue;
    const split = line.indexOf(":"); const key = line.slice(0, split).toLowerCase(); const value = line.slice(split + 1).trim();
    if (key === "user-agent") {
      if (!group || group.hasRules) { group = { agents: [], rules: [], hasRules: false }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else if (group && ["allow", "disallow"].includes(key)) {
      group.hasRules = true;
      if (value) group.rules.push({ allow: key === "allow", value });
    }
  }
  const score = group => Math.max(-1, ...group.agents.map(value => value === "*" ? 0 : agent.toLowerCase().includes(value) ? value.length : -1));
  const best = Math.max(-1, ...groups.map(score));
  const matches = groups.filter(group => best >= 0 && score(group) === best).flatMap(group => group.rules).filter(rule => {
    const expression = rule.value.split("*").map(part => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*").replace(/\\\$$/, "$");
    return new RegExp(`^${expression}`).test(pathname);
  }).sort((a, b) => b.value.replaceAll("*", "").length - a.value.replaceAll("*", "").length || Number(b.allow) - Number(a.allow));
  return matches[0]?.allow ?? true;
}

export async function checkGeoRelease(base = "https://www.restrova.com") {
  const { buyerTopics } = loadSeoSource("src/data/buyerTopics.ts");
  const { solutions } = loadSeoSource("src/data/solutions.ts");
  const { pageMetadata, staticSeoPages } = loadSeoSource("src/lib/seo.ts");
  const { businessTypes } = loadSeoSource("src/data/businessTypes.ts");
  const canonicalOrigin = "https://www.restrova.com";
  const markers = new Map([
    ["/", ['href="/services"']],
    ["/services", ['id="buyer-topics"', 'id="daily-operations"']],
    ["/services/restaurant-ordering-websites", ['id="direct-ordering-guide"']],
    ["/services/restaurant-ordering-apps", ['id="direct-ordering-guide"']],
    ["/services/restaurant-pos", ['id="connected-workflow"', 'href="/services#buyer-topics"']],
    ["/services/inventory-management", ['id="connected-workflow"', 'href="/services#buyer-topics"']],
    ["/services/delivery-management", ['id="connected-workflow"', 'href="/services#buyer-topics"']],
    ["/solutions/multi-branch-restaurants", ['href="/services/restaurant-ordering-websites"', 'href="/services/restaurant-ordering-apps"', 'href="/services#buyer-topics"']],
    ["/pricing", ['id="pricing-scope-links"']], ["/faq", ['id="roman-urdu"', 'lang="ur-Latn"']], ["/apps", ['id="check-published-evidence"']],
  ]);
  const get = async (route, agent = "Mozilla/5.0") => {
    try { const response = await fetch(new URL(route, base), { headers: { "User-Agent": agent }, signal: AbortSignal.timeout(30000) }); return { status: response.status, finalUrl: response.url, xRobotsTag: response.headers.get("x-robots-tag"), body: await response.text() }; }
    catch (error) { return { status: null, error: error.message, body: "" }; }
  };
  const robots = await get("/robots.txt"); const sitemap = await get("/sitemap.xml");
  const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].replaceAll("&amp;", "&"));
  const expectedSitemap = loadSeoSource("src/app/sitemap.ts").default().map(item => item.url);
  const sitemapMatches = sitemap.status === 200 && JSON.stringify([...sitemapUrls].sort()) === JSON.stringify([...expectedSitemap].sort());
  const rows = [];
  for (const [route, requiredMarkers] of markers) {
    const result = await get(route, "OAI-SearchBot");
    const html = result.body;
    const decode = value => value?.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
    const meta = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(match => {
      const attrs = Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(attribute => [attribute[1], decode(attribute[2])]));
      return [attrs.name || attrs.property, attrs.content];
    }));
    const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1]);
    const canonical = decode(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1]);
    const source = staticSeoPages.find(page => page.path === route) || solutions.find(page => `/services/${page.slug}` === route) || businessTypes.find(page => `/solutions/${page.slug}` === route);
    const expected = pageMetadata(route, source.title, source.description);
    const crawlPermissions = Object.fromEntries(["Googlebot", "bingbot", "OAI-SearchBot"].map(agent => [agent, robots.status === 200 ? robotsAllows(robots.body, agent, route) : null]));
    const checks = {
      http200: result.status === 200,
      expectedCanonical: Boolean(canonical) && new URL(canonical).href === new URL(route, canonicalOrigin).href,
      expectedMetadata: title === `${source.title} | Restrova` && meta.description === source.description,
      indexableDirectives: !/noindex|none/i.test(`${meta.robots || ""} ${meta.googlebot || ""} ${result.xRobotsTag || ""}`),
      releaseContentPresent: requiredMarkers.every(marker => html.includes(marker)),
      sitemapIncludesPage: sitemapUrls.includes(expected.alternates.canonical),
      crawlerRulesAllow: Object.values(crawlPermissions).every(value => value === true),
    };
    let schemaValidJson = true; try { for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(match[1]); } catch { schemaValidJson = false; }
    checks.schemaParses = schemaValidJson && html.includes('type="application/ld+json"');
    rows.push({ route, status: result.status, error: result.error, title, canonical, checks, crawlPermissions });
  }
  return {
    base, checkedAt: new Date().toISOString(),
    expectedReleasePresent: sitemapMatches && rows.every(row => Object.values(row.checks).every(Boolean)),
    sitemap: { status: sitemap.status, actualCount: sitemapUrls.length, expectedCount: expectedSitemap.length, matches: sitemapMatches },
    topicCount: buyerTopics.length, rows,
    indexing: { status: "not_verified", reason: "HTTP 200, an indexable directive and sitemap inclusion do not prove indexing. Record Search Console/Bing URL inspection and selected-canonical evidence separately." },
    limitation: "Public requests simulate a user agent; they do not verify access from real crawler IPs or measure AI answer visibility.",
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkGeoRelease(process.env.GEO_BASE_URL || "https://www.restrova.com");
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(result, null, 2));
  else console.log(JSON.stringify(result, null, 2));
  console.log(`${result.expectedReleasePresent ? "PASS" : "PENDING"}: expected release ${result.expectedReleasePresent ? "present" : "not fully verified"}; ${result.rows.length} topic/support pages; sitemap ${result.sitemap.actualCount}/${result.sitemap.expectedCount}; indexing unverified.`);
  if (!result.expectedReleasePresent) process.exitCode = 1;
}
