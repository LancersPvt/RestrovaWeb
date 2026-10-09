const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), path = require('node:path');
const { intake, futureDay, project } = require('./helpers.cjs');
const secret = 'test_sheets_secret_32_characters_only';
class FakeSheet {
  constructor(rows = []) { this.rows = rows; this.maxColumns = 26; }
  getLastRow() { return this.rows.length; }
  getLastColumn() { return Math.max(0, ...this.rows.map(row => row.length)); }
  getMaxColumns() { return this.maxColumns; }
  insertColumnsAfter(_, amount) { this.maxColumns += amount; }
  getRange(row, column, height = 1, width = 1) { return {
    getValues: () => Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => this.rows[row + i - 1]?.[column + j - 1] || '')),
    setValues: values => values.forEach((valuesRow, i) => { this.rows[row + i - 1] ||= []; valuesRow.forEach((v, j) => { this.rows[row + i - 1][column + j - 1] = v; }); }),
    createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => this.rows.slice(row - 1, row - 1 + height).some(r => r[column - 1] === id) }) })
  }; }
  appendRow(row) { this.rows.push(row); }
}
const tabs = { Leads: new FakeSheet([['Sales Notes', 'Restaurant Name'], ['Keep this note', 'Existing Restaurant']]) };
const spreadsheet = { getSheetByName: name => tabs[name], insertSheet: name => (tabs[name] = new FakeSheet()) };
const context = { Date, console,
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: key => key === 'RESTROVA_SHEETS_SHARED_SECRET' ? secret : null }) },
  SpreadsheetApp: { getActiveSpreadsheet: () => spreadsheet, flush() {} },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) }
};
vm.createContext(context); vm.runInContext(fs.readFileSync(path.join(project, 'Code.gs'), 'utf8'), context);
const base = { secret, schemaVersion: 1, ...intake.contact, qualification: intake.qualification,
  submissionId: '00000000-0000-4000-8000-000000000001', type: 'qualified_demo',
  schedule: { day: futureDay, time: '14:45', platform: 'WhatsApp' } };
function post(payload) { return JSON.parse(context.doPost({ postData: { contents: JSON.stringify(payload) } }).text); }
function value(sheet, row, header) { return sheet.rows[row][sheet.rows[0].indexOf(header)]; }
assert.equal(post(base).stored, true); assert.equal(tabs.Leads.rows.length, 3);
assert.equal(tabs.Leads.rows[1][0], 'Keep this note'); assert.equal(tabs.Leads.rows[1][1], 'Existing Restaurant');
assert.equal(value(tabs.Leads, 2, 'Preferred Day'), futureDay);
assert.equal(value(tabs.Leads, 2, 'Preferred Time'), '14:45');
assert.equal(value(tabs.Leads, 2, 'Meeting Platform'), 'WhatsApp');
assert.equal(value(tabs.Leads, 2, 'Qualification Status'), 'Qualified — Demo Requested');
assert.equal(value(tabs.Leads, 2, 'WhatsApp / Phone'), "'+923001234567");
assert.equal(post(base).duplicate, true); assert.equal(tabs.Leads.rows.length, 3);
const other = { ...base, type: 'other_enquiry', qualification: { ...base.qualification, businessType: 'home' },
  submissionId: '00000000-0000-4000-8000-000000000002', name: '=HYPERLINK("bad")', schedule: undefined };
assert.equal(post(other).stored, true); assert.equal(tabs['Other Enquiries'].rows.length, 2);
assert.equal(value(tabs['Other Enquiries'], 1, 'Owner Name'), "'=HYPERLINK(\"bad\")");
assert.equal(value(tabs['Other Enquiries'], 1, 'Preferred Day'), '');
for (const invalid of [{ ...base, secret: 'wrong' }, { ...base, schedule: undefined },
  { ...base, schedule: { ...base.schedule, day: '2030-02-30' } },
  { ...base, qualification: other.qualification }, { ...base, schemaVersion: 0 },
  { ...base, type: 'other_enquiry' }, { ...base, qualification: { ...base.qualification, businessType: 'chain', branches: '1' } }]) {
  assert.equal(post(invalid).stored, false);
}
assert.equal(tabs.Leads.rows.length, 3);
console.log('PASS: qualified details and schedule columns, duplicate protection, existing columns/data preserved');
console.log('PASS: enquiries excluded from Leads, formula escaping, authentication and receiver-side guards');
