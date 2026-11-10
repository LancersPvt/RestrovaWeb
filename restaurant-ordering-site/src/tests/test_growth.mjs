import assert from "node:assert/strict";
import {loadSeoSource} from "../../scripts/load-seo-source.mjs";
const {configureGrowthAnalytics,trackGrowthEvent}=loadSeoSource("src/lib/growth-events.ts");
const calls=[];const send=(...args)=>calls.push(args);
assert.equal(trackGrowthEvent("generate_lead",{pagePath:"/demo/schedule"},"one"),false);
configureGrowthAnalytics({consent:false,send});trackGrowthEvent("pricing_view",{pagePath:"/pricing"});assert.equal(calls.length,0);
configureGrowthAnalytics({consent:true,send});
trackGrowthEvent("generate_lead",{pagePath:"/demo/schedule?email=private@example.com",location:"schedule",phone:"private"},"one");
trackGrowthEvent("generate_lead",{pagePath:"/demo/schedule"},"one");assert.equal(calls.length,1);
assert.deepEqual(calls[0],["generate_lead",{page_path:"/demo/schedule",cta_location:"schedule"}]);
trackGrowthEvent("demo_cta_click",{pagePath:"/private-person",location:"private-person"});assert.deepEqual(calls[1][1],{page_path:"/other"});
trackGrowthEvent("unknown",{pagePath:"/"});assert.equal(calls.length,2);
configureGrowthAnalytics({consent:true,send:()=>{throw Error("blocked")}});assert.equal(trackGrowthEvent("pricing_view",{pagePath:"/pricing"}),false);
configureGrowthAnalytics({consent:false});assert.equal(trackGrowthEvent("pricing_view",{pagePath:"/pricing"}),false);
console.log("PASS disabled-by-default analytics, consent gating, allowlisted payloads, PII stripping, deduplication and failure isolation");

for(const event of ["calculator_use","resource_download"]){
 const measured=[];
 configureGrowthAnalytics({consent:false,send:(...args)=>measured.push(args)});
 assert.equal(trackGrowthEvent(event,{pagePath:"/pricing",inputs:{revenue:200000},email:"private@example.com"}),false);
 assert.equal(measured.length,0);
 configureGrowthAnalytics({consent:true,send:(...args)=>measured.push(args)});
 assert.equal(trackGrowthEvent(event,{pagePath:"/pricing?email=private@example.com",location:"content",inputs:{revenue:200000},result:5000}),true);
 assert.deepEqual(measured,[[event,{page_path:"/pricing",cta_location:"content"}]]);
 configureGrowthAnalytics({consent:false});
 assert.equal(trackGrowthEvent(event,{pagePath:"/pricing"}),false);
}
console.log("PASS calculator/download events require consent, stop on revocation and exclude figures, results and personal fields");
