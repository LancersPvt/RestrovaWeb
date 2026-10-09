const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../Code.gs'),'utf8');
class FakeSheet{
 constructor(rows=[[]]){this.rows=rows.map(r=>[...r]);this.maxColumns=26;this.name='Leads';}
 getLastRow(){return this.rows.length===1&&this.rows[0].length===0?0:this.rows.length;}
 getMaxColumns(){return this.maxColumns;}
 insertColumnsAfter(n,amount){this.maxColumns+=amount;}
 getRange(row,col,height=1,width=1){return {
  getValues:()=>Array.from({length:height},(_,i)=>Array.from({length:width},(_,j)=>this.rows[row+i-1]?.[col+j-1]||'')),
  setValues:(values)=>{values.forEach((r,i)=>{const index=row+i-1;while(this.rows.length<=index)this.rows.push([]);r.forEach((v,j)=>this.rows[index][col+j-1]=v);});},
  setFormula:val=>{this.rows[row-1][col-1]=val;},
  createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>this.rows.slice(row-1,row-1+height).find(r=>r[col-1]===id)?true:null})})
 };}
 appendRow(row){this.rows.push(row);}
}
const oldHeaders=['Submitted At','Restaurant Name','Owner Name','WhatsApp / Phone',...Array.from({length:20},(_,i)=>`H${i}`)];
const sheet=new FakeSheet([oldHeaders]);const tabs={'Leads':sheet};
const context={console, Date,
 LockService:{getScriptLock:()=>({waitLock:()=>{},releaseLock:()=>{}})},
 PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'test_secret'})},
 SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:name=>tabs[name],insertSheet:name=>(tabs[name]=new FakeSheet()),})},
 ContentService:{MimeType:{JSON:'json'},createTextOutput:value=>({text:value,setMimeType(){return this}})},
};vm.createContext(context);vm.runInContext(code,context);
const field=(label,value)=>`${label}: ${value}`;
const msg=[field('BUSINESS TYPE','Restaurant / dine-in'),field('NUMBER OF BRANCHES','2 branches'),field('DAILY ORDER VOLUME','30–99 orders'),field('BUYER ROLE','Owner / Founder'),field('COMPLETE SYSTEM INTENT','Yes'),field('PRICING READINESS (ONBOARDING + MONTHLY)','Yes, I can pay the onboarding and monthly fees'),field('PURCHASE TIMELINE','Within 10 days'),field('QUALIFICATION STATUS','QUALIFIED - DEMO REQUESTED'),field('PREFERRED DAY','2026-10-15'),field('PREFERRED TIME','14:45'),field('PREFERRED PLATFORM','WhatsApp'),field('AD ATTRIBUTION','utm_source=facebook; utm_campaign=launch; ad_id=001')].join('\n');
const base={secret:'test_secret',name:'Ali',restaurant:'Example',phone:'+923001234567',city:'Lahore',at:'2026-10-09T12:00:00Z',message:msg,submissionId:'req001'};
function post(payload){const result=context.doPost({postData:{contents:JSON.stringify(payload)}});return JSON.parse(result.text);}
assert.deepEqual(post({...base,type:'qualified_demo'}),{ok:true,stored:true});
assert.equal(tabs.Leads.rows.length,2);assert.equal(tabs.Leads.rows[1][24],'2026-10-15');assert.equal(tabs.Leads.rows[1][25],'14:45');assert.equal(tabs.Leads.rows[1][26],'WhatsApp');assert.equal(tabs.Leads.rows[1][27],'req001');
assert.equal(tabs.Leads.rows[1][12],'Qualified — Demo Requested');
assert.equal(tabs.Leads.rows[1][13],'Demo Requested');
assert.equal(tabs.Leads.rows[1][18],'=IF(R2="","",MAX(5000,ROUND(R2*0.01,0)))');
assert.deepEqual(post({...base,type:'qualified_demo'}),{ok:true,stored:true,duplicate:true});assert.equal(tabs.Leads.rows.length,2);
let other={...base,type:'other_enquiry',submissionId:'inq001',message:msg.replace('QUALIFIED - DEMO REQUESTED','OTHER ENQUIRY')};
assert.deepEqual(post(other),{ok:true,stored:true});
assert.equal(tabs.Leads.rows.length,2);assert.equal(tabs['Other Enquiries'].rows.length,2);
assert.equal(tabs['Other Enquiries'].rows[1][1],'Example');assert.equal(tabs['Other Enquiries'].rows[1][12],'Other Enquiry');
assert.equal(post({...base,secret:'wrong',type:'qualified_demo'}).ok,false);
assert.equal(tabs.Leads.rows.length,2);
console.log('PASS: Apps Script qualified sheet columns A-AB including schedule details');
console.log('PASS: duplicate IDs do not append duplicate CRM rows');
console.log('PASS: other enquiries stored only in separate tab');
console.log('PASS: bad secret rejected');
