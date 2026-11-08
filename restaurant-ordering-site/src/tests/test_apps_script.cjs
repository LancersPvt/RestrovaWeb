const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), path = require('node:path');
const codePath = process.argv[2] || path.resolve(__dirname, '../../Code.gs');
const futureDay = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
const secret = 'test_sheets_secret_32_characters_only';
const criteria = { VALUE_IN_LIST: 'LIST', VALUE_IN_RANGE: 'RANGE' };
class Rule {
  constructor(options, range = false) { this.options = options; this.range = range; }
  getCriteriaType() { return this.range ? criteria.VALUE_IN_RANGE : criteria.VALUE_IN_LIST; }
  getCriteriaValues() { return [this.range ? { getDisplayValues: () => this.options.map(value => [value]) } : this.options]; }
}
let nextSheetId = 1;
class FakeSheet {
  constructor(rows = [], name = '') { this.rows = rows; this.name = name; this.id = nextSheetId++; this.rules = {}; this.formulas = {}; this.formats = {}; this.widths = {}; this.maxColumns = Math.max(26, ...rows.map(row => row.length)); this.maxRows = 1000; this.revealed = []; }
  key(row, col) { return `${row},${col}`; }
  getSheetId() { return this.id; }
  getLastRow() { return this.rows.length; }
  getLastColumn() { return Math.max(0, ...this.rows.map(row => row.length)); }
  getMaxColumns() { return this.maxColumns; }
  getMaxRows() { return this.maxRows; }
  insertColumnsAfter(_, amount) { this.maxColumns += amount; }
  insertRowsAfter(_, amount) { this.maxRows += amount; }
  getColumnWidth(col) { return this.widths[col] || 100; }
  setColumnWidth(col, width) { this.widths[col] = width; }
  showColumns(col) { this.revealed.push(col); }
  setActiveRange(range) { this.activeRange = range; }
  copyTo(spreadsheet) {
    const copy = new FakeSheet(this.rows.map(row => row.slice()), this.name + ' copy');
    copy.rules = { ...this.rules }; copy.formulas = { ...this.formulas }; copy.formats = { ...this.formats };
    spreadsheet.backups.push(copy); return copy;
  }
  setName(name) { this.name = name; return this; }
  getRange(row, col, height = 1, width = 1) {
    const cells = callback => Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => callback(row + i, col + j)));
    const range = {
      row, col, height, width,
      getRow: () => row,
      getValues: () => cells((r, c) => this.rows[r-1]?.[c-1] ?? ''),
      getDisplayValues: () => cells((r, c) => String(this.rows[r-1]?.[c-1] ?? '')),
      getFormulas: () => cells((r, c) => this.formulas[this.key(r,c)] || ''),
      getDataValidations: () => cells((r, c) => this.rules[this.key(r,c)] || null),
      setDataValidations: values => { values.forEach((r,i) => r.forEach((rule,j) => { this.rules[this.key(row+i,col+j)] = rule; })); return range; },
      setValues: values => {
        values.forEach((r,i) => r.forEach((value,j) => {
          const rule = this.rules[this.key(row+i,col+j)];
          if (value !== '' && rule && !rule.options.includes(value)) throw Error('Invalid dropdown input');
        }));
        values.forEach((r,i) => { this.rows[row+i-1] ||= []; r.forEach((value,j) => { this.rows[row+i-1][col+j-1] = value; }); });
        return range;
      },
      setValue: value => range.setValues([[value]]),
      setNumberFormat: format => { cells((r,c) => { this.formats[this.key(r,c)] = format; }); return range; },
      copyTo: () => range, setBackground: () => range, setFontColor: () => range, setFontWeight: () => range,
      createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => {
        const offset = this.rows.slice(row-1, row-1+height).findIndex(r => r[col-1] === id);
        return offset < 0 ? null : this.getRange(row+offset,col);
      } }) })
    };
    return range;
  }
}
// Actual original CRM header names from the user's screenshots, followed by the
// extra columns created by the previous receiver. Preserve both during repair.
const original = ['Submitted At','Restaurant Name','Owner Name','WhatsApp / Phone','City','Business Type',
  'Branches','Daily Orders','Decision-Maker Role','Complete System Interest','Pricing Readiness','Purchase Timeline',
  'Auto Screen Result','Sales Status','Sales Notes','Monthly Service Fee'];
const extras = ['Number of Branches','Daily Order Volume','Buyer Role','Complete System Intent','Qualification Status',
  'Lead Stage','Ad Attribution','Message','Preferred Day','Preferred Time','Meeting Platform','Lead ID'];
const headers = [...original, ...extras];
const rowFrom = fields => headers.map(header => fields[header] ?? '');
const message = [
  'BUSINESS TYPE: Restaurant / dine-in','NUMBER OF BRANCHES: 2 branches','DAILY ORDER VOLUME: 30–99 orders',
  'BUYER ROLE: Owner / Founder','COMPLETE SYSTEM INTENT: Yes',
  'PRICING READINESS (ONBOARDING + MONTHLY): Yes, I can pay the onboarding and monthly fees',
  'PURCHASE TIMELINE: Within 10 days','AUTOMATED SCREEN: HIGH PRIORITY (VERIFY WITH SALES)',
  'QUALIFICATION STATUS: QUALIFIED - DEMO REQUESTED',`PREFERRED DAY: ${futureDay}`,
  'PREFERRED TIME: 14:45','PREFERRED PLATFORM: Google Meet','LEAD ID: 00000000-0000-4000-8000-000000000010'
].join('\n');
const pricing = new Rule(['Yes — onboarding + monthly fees','Discuss onboarding + monthly fees','No — outside budget']);
const sales = new Rule(['New','Contacted','Won']);
const leads = new FakeSheet([headers,
  rowFrom({ 'Restaurant Name':'Existing manual entry','Sales Status':'Contacted','Sales Notes':'Keep sales notes', 'Pricing Readiness': pricing.options[0] }),
  rowFrom({ 'Submitted At':'2026-10-09T19:20:41.100Z','Restaurant Name':'Affected Restaurant','Owner Name':'Test Owner',
    'Number of Branches':'2 branches','Daily Order Volume':'30–99 orders','Buyer Role':'Owner / Founder','Complete System Intent':'Yes',
    'Pricing Readiness':'Ready to pay onboarding and monthly fees','Message':message,'Lead ID':'00000000-0000-4000-8000-000000000010' }),
  rowFrom({ 'Restaurant Name':'Historical unscheduled lead','Branches':'1 branch','Daily Orders':'10–29 orders' })
], 'Leads');
const column = header => headers.indexOf(header) + 1;
for (let row=2;row<=8;row++) { leads.rules[leads.key(row,column('Pricing Readiness'))] = pricing; leads.rules[leads.key(row,column('Sales Status'))] = sales; }
leads.formulas[leads.key(3,column('Monthly Service Fee'))] = '=IF(R3="","",MAX(5000,ROUND(R3*0.01,0)))';
leads.rows[2][column('Monthly Service Fee')-1] = 5000;
const tabs = { Leads: leads };
const properties = new Map([['RESTROVA_SHEETS_SHARED_SECRET',secret]]);
const spreadsheet = { backups: [], getSheetByName: name => tabs[name], insertSheet: name => (tabs[name] = new FakeSheet([],name)), setActiveSheet: sheet => { spreadsheet.active = sheet; } };
const context = { Date, console,
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key) || null, setProperty: (key,value) => properties.set(key,value) }) },
  SpreadsheetApp: { getActiveSpreadsheet: () => spreadsheet, flush() {}, DataValidationCriteria: criteria, CopyPasteType: { PASTE_FORMAT: 'FORMAT' } },
  Utilities: { formatDate: () => '20261010-120000' },
  ContentService: { MimeType: { JSON:'json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) }
};
vm.createContext(context); vm.runInContext(fs.readFileSync(codePath,'utf8'),context);
const base = { secret, schemaVersion:1, name:'Test Owner', restaurant:'New Test', phone:'+12025550199', city:'Test City',
  qualification:{businessType:'established',branches:'2',dailyOrders:'30_99',role:'owner',completeSystem:'yes',onboardingBudget:'ready',timeline:'10_days'},
  submissionId:'00000000-0000-4000-8000-000000000001',type:'qualified_demo',schedule:{day:futureDay,time:'14:45',platform:'Google Meet'},message };
function post(body) { return JSON.parse(context.doPost({postData:{contents:JSON.stringify(body)}}).text); }
function value(row,header,sheet=leads) { return sheet.rows[row-1][sheet.rows[0].indexOf(header)]; }
const repaired = context.repairRestrovaSheet();
assert.equal(spreadsheet.backups.length,1);
assert.equal(value(3,'Branches'),'2 branches'); assert.equal(value(3,'Daily Orders'),'30–99 orders');
assert.equal(value(3,'Decision-Maker Role'),'Owner / Founder'); assert.equal(value(3,'Complete System Interest'),'Yes');
assert.equal(value(3,'Pricing Readiness'),pricing.options[0]);
assert.equal(value(3,'Auto Screen Result'),'HIGH PRIORITY (VERIFY WITH SALES)'); assert.equal(value(3,'Sales Status'),'New');
assert(value(3,'Submitted At') instanceof Date);
assert.equal(value(3,'Preferred Day'),Date.parse(`${futureDay}T00:00:00Z`)/86400000+25569);
assert.equal(value(3,'Preferred Time'),(14*60+45)/1440); assert.equal(value(3,'Meeting Platform'),'Google Meet');
assert.equal(leads.formats[leads.key(3,column('Preferred Time'))],'hh:mm" PKT"');
assert.equal(value(2,'Sales Status'),'Contacted'); assert.equal(value(2,'Sales Notes'),'Keep sales notes');
assert.equal(leads.formulas[leads.key(3,column('Monthly Service Fee'))],'=IF(R3="","",MAX(5000,ROUND(R3*0.01,0)))');
assert.equal(value(3,'Monthly Service Fee'),5000);
assert.equal(value(4,'Preferred Time'),''); assert(repaired[0].missingScheduleRows.includes(4));
assert.equal(repaired[0].dropdownIssues.length,0);
assert(leads.revealed.includes(column('Preferred Time'))); assert.equal(spreadsheet.active,leads);
const before = JSON.stringify(leads.rows);
assert.equal(context.repairRestrovaSheet()[0].repairedRows,0); assert.equal(JSON.stringify(leads.rows),before); assert.equal(spreadsheet.backups.length,1);
const receipt=post(base);
assert.equal(receipt.stored,true); assert.equal(receipt.receiverVersion,2); assert.equal(receipt.scheduleStored,true);
assert.equal(receipt.mappedColumns.branches,'Branches'); assert.equal(receipt.mappedColumns.time,'Preferred Time');
const addedRow=leads.getLastRow();
assert.equal(value(addedRow,'Branches'),'2 branches'); assert.equal(value(addedRow,'Pricing Readiness'),pricing.options[0]);
assert.equal(value(addedRow,'Sales Status'),'New'); assert.equal(value(addedRow,'Preferred Time'),(14*60+45)/1440);
assert.equal(value(addedRow,'Meeting Platform'),'Google Meet');
assert.equal(leads.getLastColumn(),headers.length, 'No more duplicate columns');
leads.rows[addedRow-1][column('Sales Status')-1]='Contacted';
assert.equal(post({...base,schedule:{...base.schedule,time:'16:00'}}).duplicate,true);
assert.equal(leads.getLastRow(),addedRow); assert.equal(value(addedRow,'Sales Status'),'Contacted'); assert.equal(value(addedRow,'Preferred Time'),(14*60+45)/1440);
const other={...base,type:'other_enquiry',submissionId:'00000000-0000-4000-8000-000000000002',qualification:{...base.qualification,businessType:'home'},schedule:undefined,name:'=HYPERLINK("bad")',message:''};
assert.equal(post(other).stored,true); assert.equal(leads.getLastRow(),addedRow);
assert.equal(value(2,'Owner Name',tabs['Other Enquiries']),"'=HYPERLINK(\"bad\")");
assert.equal(value(2,'Preferred Time',tabs['Other Enquiries']),'');
assert.equal(context.fitDropdown_('pricing','Wants to discuss pricing',new Rule(pricing.options,true)),pricing.options[1]);
assert.equal(context.fitDropdown_('pricing','No, outside my budget',pricing),pricing.options[2]);
for (const invalid of [{...base,secret:'wrong'},{...base,schedule:undefined},{...base,qualification:other.qualification},{...base,type:'other_enquiry'},{...base,schemaVersion:0}]) assert.equal(post(invalid).stored,false);
assert.equal(leads.getLastRow(),addedRow);
const originalOnly = new FakeSheet([original.slice()], 'Original Headers Only');
originalOnly.rules[originalOnly.key(2,column('Pricing Readiness'))] = pricing;
originalOnly.rules[originalOnly.key(2,column('Sales Status'))] = sales;
context.writePayload_(originalOnly,base);
assert.equal(originalOnly.rows[0].includes('Number of Branches'),false);
assert.equal(originalOnly.rows[0].includes('Daily Order Volume'),false);
assert.equal(originalOnly.rows[0].includes('Buyer Role'),false);
assert.equal(originalOnly.rows[0].includes('Complete System Intent'),false);
assert.equal(value(2,'Branches',originalOnly),'2 branches');
const rejected = new FakeSheet([original.slice()], 'Unrecognized Dropdown');
rejected.rules[rejected.key(2,column('Pricing Readiness'))] = new Rule(['Manual review required']);
assert.throws(() => context.writePayload_(rejected,base),/Dropdown mismatch/);
assert.equal(rejected.getLastRow(),1,'Unrecognized dropdown does not create a partial contact');
console.log('PASS: actual CRM header aliases, dropdown compatibility, auto-screen and sales status, typed dates and times');
console.log('PASS: historical recovery from extra columns/message, backups, rerun safety, preservation of formulas and manual sales entries');
console.log('PASS: schedule columns revealed, missing historical schedules not invented, duplicate/authentication/qualification guards');
