import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {loadSeoSource} from './load-seo-source.mjs';
const {seoPages}=loadSeoSource('src/data/seoPages.ts');
const engine=loadSeoSource('src/lib/seo-engine.ts');
const editorial=loadSeoSource('src/lib/editorial.ts');
const articles=editorial.editorialArticles;
const requested=articles.filter(a=>/^editorial-\d+-\d+$/.test(a.id));assert.equal(requested.length,100);for(let n=1;n<=10;n++)assert.equal(requested.filter(a=>a.cluster===String(n)).length,10);
assert.ok(articles.filter(a=>a.draftDisposition==='complete_draft').length>=10);
assert.ok(articles.filter(a=>a.body.length>0).length>=10);
assert.ok(requested.filter(a=>!a.body).every(a=>a.overlapTarget&&a.reviewNote&&a.blockers.length));
assert.ok(seoPages.filter(p=>p.pageType==='resource').length>=15);assert.ok(seoPages.filter(p=>p.pageType==='website_template').length>=8);
assert.ok(seoPages.filter(p=>['draft','needs_review','approved','archived'].includes(p.publicationStatus)).every(p=>!engine.isVisible(p)));assert.ok(articles.filter(a=>a.publicationStatus!=='published').every(a=>!editorial.articleIsPublished(a)));
const draft=articles.find(a=>a.body);const approved={...draft,blockers:[],verificationStatus:'verified',distinctIntent:true,reviewedBy:'Test reviewer',reviewedAt:'2026-11-10',publicationStatus:'published',publishedAt:'2026-11-10'};approved.reviewSignature=editorial.articleSignature(approved);assert.equal(editorial.articleIsPublished(approved),true);assert.equal(editorial.articleIsPublished({...approved,body:approved.body+' changed'}),false);assert.equal(editorial.articleIsPublished({...approved,blockers:['unverified']}),false);
const page={...seoPages.find(p=>p.calculator),publicationStatus:'published',verificationStatus:'verified',distinctIntent:true,reviewedBy:'Test reviewer',reviewedAt:'2026-11-10',sources:['https://www.restrova.com/pricing']};page.reviewSignature=engine.pageSignature(page);assert.equal(engine.isIndexable(page),true);assert.equal(engine.isIndexable({...page,title:'Changed'}),false);assert.equal(engine.isVisible({...page,publicationStatus:'draft'}),false);assert.ok(engine.validateInventory([page,page]).length>0);
const before=fs.readFileSync('src/data/editorial.json','utf8');const rejected=spawnSync(process.execPath,['scripts/seo-content.mjs','publish',draft.id],{encoding:'utf8'});assert.equal(rejected.status,1);assert.equal(fs.readFileSync('src/data/editorial.json','utf8'),before);
const {directory,firstSearchValue}=loadSeoSource('src/lib/blog-navigation.ts');assert.equal(directory('',1).posts.length,8);assert.equal(directory('',2).posts.length,8);assert.equal(directory('nonexistent-search-term',1).total,0);assert.equal(directory('',-1).current,1);
const {calculate}=loadSeoSource('src/lib/restaurant-calculators.ts');assert.equal(calculate('profit',{revenue:1000,costs:700})['Operating margin (%)'],30);assert.equal(calculate('food',{ingredients:500,portions:10,sales:2000})['Food cost (%)'],25);assert.equal(calculate('menu',{cost:150,target:30})['Menu price before tax (PKR)'],500);assert.equal(calculate('roi',{benefit:1000,running:200,setup:4000})['Payback months'],5);assert.equal(calculate('roi',{benefit:100,running:200,setup:0})['Payback months'],null);assert.equal(calculate('commission',{orders:100,aov:1000,commission:20,marketDelivery:0,marketOther:0,payment:2,directDelivery:50,subscription:5000,directOther:1000})['Channel-cost difference (PKR)'],7000);assert.throws(()=>calculate('profit',{revenue:0,costs:1}));assert.throws(()=>calculate('menu',{cost:1,target:101}));
for(const p of seoPages.filter(p=>p.resourceFile)){assert.ok(fs.readFileSync('content/resources/'+p.resourceFile,'utf8').includes('contenteditable="true"'));}
console.log('PASS original 100-title inventory, content/resources, private-state gates, approval freshness, rejected publication, navigation and calculator formulas.');

assert.equal(firstSearchValue(["inventory","riders"]),"inventory");assert.equal(firstSearchValue(undefined),"");assert.ok(directory(firstSearchValue(["inventory","riders"]),1).total>0);
