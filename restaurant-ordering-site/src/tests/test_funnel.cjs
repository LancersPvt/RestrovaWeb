const fs = require('fs'), ts = require('typescript'), path = require('path'), assert = require('assert');
const base = path.resolve(__dirname, '..');
const srcDir=path.join(base,'src');
const files = [];
function walk(d) { for (const ent of fs.readdirSync(d, {withFileTypes:true})) {const p=path.join(d,ent.name);if(ent.isDirectory())walk(p);else if(/\.(tsx|ts)$/.test(p))files.push(p);} }
walk(srcDir);
for(const file of files) {
  const source=fs.readFileSync(file,'utf8');
  const r=ts.transpileModule(source,{fileName:file, reportDiagnostics:true, compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}});
  const errors=(r.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
  if(errors.length)throw Error(file+':'+errors.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join('; '));
}
const sharedTs=fs.readFileSync(path.join(srcDir,'lib/restrova-demo.ts'),'utf8');
const sharedJs=ts.transpileModule(sharedTs,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const moduleObj={exports:{}};
require('node:vm').runInNewContext('(function(exports,module){'+sharedJs+'})') (moduleObj.exports,moduleObj);
const {parseIntake,isEligible,buildCRMMessage,isHighPriority}=moduleObj.exports;
const standard={qualification:{businessType:'established',branches:'2',dailyOrders:'30_99',role:'owner',completeSystem:'yes',onboardingBudget:'ready',timeline:'10_days'},contact:{name:'Ali',restaurant:'Example Restaurant',phone:'+923001234567',city:'Lahore'},attribution:'utm_source=facebook; ad_id=123'};
const clone=x=>JSON.parse(JSON.stringify(x));
const cases=[
 ['normal suitable',{},true],
 ['single sufficient', {branches:'1',dailyOrders:'10_29'},true],
 ['home',{businessType:'home'},false],
 ['tiny single',{branches:'1',dailyOrders:'under_10'},false],
 ['research only',{timeline:'researching'},false],
 ['no budget',{onboardingBudget:'no'},false],
 ['other employee',{role:'other'},false],
 ['only individual modules',{completeSystem:'no'},false],
 ['discuss price',{onboardingBudget:'discuss'},true],
 ['multiple branches',{businessType:'chain',branches:'3_5'},true],
];
for(const [name,patch,expected] of cases){const v=clone(standard);Object.assign(v.qualification,patch);const parsed=parseIntake(v);assert(parsed,`invalid parse: ${name}`);assert.equal(isEligible(parsed.qualification),expected,name);}
let invalid=clone(standard);invalid.qualification.businessType='chain';invalid.qualification.branches='1';assert.equal(parseIntake(invalid),null);
invalid=clone(standard);invalid.qualification.businessType='not_started';assert.equal(parseIntake(invalid),null);
const message=buildCRMMessage(standard,{day:'2026-10-15',time:'15:30',platform:'WhatsApp'},'req-123');
for(const term of ['PREFERRED DAY: 2026-10-15','PREFERRED TIME: 15:30','PREFERRED PLATFORM: WhatsApp','QUALIFICATION STATUS: QUALIFIED - DEMO REQUESTED','PRICING READINESS (ONBOARDING + MONTHLY):','LEAD ID: req-123','AD ATTRIBUTION:']) assert(message.includes(term),'Message missing '+term);
assert(isHighPriority(standard.qualification));
const frontend=fs.readFileSync(path.join(srcDir,'components/ContactForm.tsx'),'utf8');
assert(!frontend.includes('Not started yet'));
assert(frontend.includes('availableBranches'));
assert(frontend.indexOf('Tell Us About Your Restaurant') < frontend.indexOf('Your Contact Information'));
assert(frontend.includes('router.push(result.next === "schedule"'));
assert(!frontend.includes('fbq('));
const schedule=fs.readFileSync(path.join(srcDir,'components/RestrovaScheduleDemo.tsx'),'utf8');
assert(schedule.includes('fbq("track", "Lead"'));
assert(schedule.includes('if (!response.ok || result?.ok !== true)'));
const script=fs.readFileSync(path.join(base,'Code.gs'),'utf8');
assert(script.includes("type === 'other_enquiry'"));
assert(script.includes("type === 'qualified_demo'"));
assert(script.includes("'Preferred Day', 'Preferred Time', 'Meeting Platform', 'Lead ID'"));
new Function(script);
console.log(`PASS: ${files.length} TypeScript/TSX files transpile without syntax errors`);
console.log(`PASS: ${cases.length} screening cases, chain branch guard, message mapping, UI wiring, Google script syntax`);
