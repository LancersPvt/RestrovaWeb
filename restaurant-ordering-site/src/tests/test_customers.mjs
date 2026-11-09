import assert from "node:assert/strict";
import fs from "node:fs";
import { loadSeoSource } from "../../scripts/load-seo-source.mjs";
const { approvedCustomers, getApprovedCustomer } = loadSeoSource("src/data/customers.ts");
const drafts = JSON.parse(fs.readFileSync(new URL("../../docs/customers/drafts.json", import.meta.url), "utf8"));
assert.equal(approvedCustomers.length, 1);
assert.equal(approvedCustomers[0].slug, "mandi-valley");
assert.equal(drafts.length, 5);
const sitemap = loadSeoSource("src/app/sitemap.ts").default().map(row=>row.url);
assert.ok(sitemap.includes("https://www.restrova.com/customers"));
for (const draft of drafts) {
 assert.equal(draft.publicationStatus, "pending_approval");
 assert.equal(getApprovedCustomer(draft.slug), undefined);
 assert.ok(!sitemap.includes(`https://www.restrova.com/customers/${draft.slug}`));
}
assert.ok(fs.readFileSync(new URL("../app/(main)/customers/[slug]/page.tsx",import.meta.url),"utf8").includes("dynamicParams = false"));
console.log("PASS approved-only publication, five excluded drafts, sitemap and route allowlist");
