import assert from "node:assert/strict";
import {loadSeoSource} from "../../scripts/load-seo-source.mjs";
const {approvedCustomers,getApprovedCustomer}=loadSeoSource("src/data/customers.ts");
assert.deepEqual(approvedCustomers.map(c=>c.slug),["yum-zone","ash-and-beans","top-spice","fruit-ninja-pakistan","mandi-valley"]);
const urls=loadSeoSource("src/app/sitemap.ts").default().map(r=>r.url);
for(const c of approvedCustomers)assert.ok(urls.includes(`https://www.restrova.com/customers/${c.slug}`));
for(const slug of ["eat-oyee","yumzone","fruit-ninja","unknown"]){assert.equal(getApprovedCustomer(slug),undefined);assert.ok(!urls.includes(`https://www.restrova.com/customers/${slug}`));}
assert.equal(getApprovedCustomer("fruit-ninja-pakistan").services.length,0);
assert.ok(getApprovedCustomer("fruit-ninja-pakistan").profileOnly);
console.log("PASS five approved profiles, canonical slug allowlist and limited Fruit Ninja scope");
