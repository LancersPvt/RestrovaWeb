/** Restrova intake receiver. Set script properties as described in docs/demo-setup.md. */

function reply_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function text_(value, limit) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= limit;
}

function qualificationValid_(q) {
  if (!q || typeof q !== 'object') return false;
  var choices = {
    businessType: ['established', 'takeaway', 'chain', 'home'], branches: ['1', '2', '3_5', '6_plus'],
    dailyOrders: ['under_10', '10_29', '30_99', '100_plus'], role: ['owner', 'partner', 'manager', 'other'],
    completeSystem: ['yes', 'no'], onboardingBudget: ['ready', 'discuss', 'no'],
    timeline: ['immediately', '10_days', '1_month', 'researching']
  };
  return Object.keys(choices).every(function (key) { return choices[key].indexOf(q[key]) !== -1; }) &&
    !(q.businessType === 'chain' && q.branches === '1');
}

function eligible_(q) {
  return ['established', 'takeaway', 'chain'].indexOf(q.businessType) !== -1 &&
    (q.branches !== '1' || q.dailyOrders !== 'under_10') &&
    ['owner', 'partner', 'manager'].indexOf(q.role) !== -1 &&
    ['ready', 'discuss'].indexOf(q.onboardingBudget) !== -1 &&
    q.completeSystem === 'yes' && q.timeline !== 'researching';
}

function scheduleValid_(s) {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s.day) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time)) return false;
  var date = new Date(s.day + 'T00:00:00Z');
  if (!isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== s.day ||
      new Date(s.day + 'T' + s.time + ':00+05:00').getTime() <= Date.now()) return false;
  return ['WhatsApp', 'Zoom Meeting', 'Google Meet', 'Phone Call'].indexOf(s.platform) !== -1 ||
    (text_(s.platform, 77) && /^Other: \S[^\r\n]*$/.test(s.platform));
}

// User-entered values must remain text, even when they start like a spreadsheet formula.
function cellText_(value) {
  var valueText = value == null ? '' : String(value);
  return /^[\s]*[=+\-@]/.test(valueText) ? "'" + valueText : valueText;
}

// Match the CRM's existing headers before adding a genuinely missing field.
// Do not treat Sales Status (managed by the sales team) as Lead Stage.
var RESTROVA_FIELDS = {
  submitted: ['Submitted At'], restaurant: ['Restaurant Name'], name: ['Owner Name', 'Full Name'],
  phone: ['WhatsApp / Phone', 'Phone Number'], city: ['City'], business: ['Business Type'],
  branches: ['Branches', 'Number of Branches'], orders: ['Daily Orders', 'Daily Order Volume'],
  role: ['Decision-Maker Role', 'Buyer Role'], system: ['Complete System Interest', 'Complete System Intent'],
  pricing: ['Pricing Readiness'], timeline: ['Purchase Timeline'],
  screen: ['Auto Screen Result', 'Automated Screen'], sales: ['Sales Status'],
  qualification: ['Qualification Status'], stage: ['Lead Stage'],
  attribution: ['Ad Attribution'], message: ['Message', 'Form Message', 'Original Message', 'Notes / Message'],
  day: ['Preferred Day', 'Preferred Demo Day', 'Demo Date'],
  time: ['Preferred Time', 'Preferred Time (Pakistan Time)', 'Demo Time'],
  platform: ['Meeting Platform', 'Preferred Meeting Platform', 'Preferred Platform'], id: ['Lead ID', 'Submission ID']
};

function normalized_(value) {
  return String(value == null ? '' : value).toLowerCase().replace(/[–—]/g, '-').replace(/[^a-z0-9]+/g, ' ').trim();
}
function hasValue_(value) { return value !== '' && value !== null && value !== undefined; }
function columnsFor_(headers, field) {
  var indexes = [];
  RESTROVA_FIELDS[field].forEach(function (alias) {
    headers.forEach(function (header, index) {
      if (normalized_(header) === normalized_(alias) && indexes.indexOf(index) === -1) indexes.push(index);
    });
  });
  return indexes;
}
function rowValue_(row, headers, field) {
  var columns = columnsFor_(headers, field);
  for (var i = 0; i < columns.length; i++) if (hasValue_(row[columns[i]])) return row[columns[i]];
  return '';
}
function readMessage_(message, label) {
  var prefix = label + ': ';
  var lines = String(message || '').split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) if (lines[i].indexOf(prefix) === 0) return lines[i].slice(prefix.length).trim();
  return '';
}
function pricingKey_(value) {
  var label = normalized_(value);
  if (/outside|^no\b|cannot|not ready/.test(label)) return 'no';
  if (/discuss|need details|more details/.test(label)) return 'discuss';
  if (/^yes\b|^ready\b/.test(label)) return 'ready';
  return '';
}
function listOptions_(rule) {
  if (!rule) return null;
  var criteria = rule.getCriteriaType();
  var values = rule.getCriteriaValues();
  if (criteria === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) return values[0].map(String);
  if (criteria === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
    return values[0].getDisplayValues().reduce(function (all, row) { return all.concat(row); }, []).filter(hasValue_);
  }
  return null;
}
function fitDropdown_(field, value, rule) {
  var options = listOptions_(rule);
  if (!options || !hasValue_(value)) return value;
  var exact = options.filter(function (option) { return normalized_(option) === normalized_(value); });
  if (exact.length) return exact[0];
  if (field === 'pricing') {
    var key = pricingKey_(value);
    var matches = options.filter(function (option) { return key && pricingKey_(option) === key; });
    if (matches.length === 1) return matches[0];
  }
  throw new Error('No allowed dropdown value for ' + field);
}
function serialDay_(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  var date = new Date(value + 'T00:00:00Z');
  if (!isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return value;
  return date.getTime() / 86400000 + 25569;
}
function serialTime_(value) {
  if (typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return value;
  var parts = value.split(':').map(Number);
  return (parts[0] * 60 + parts[1]) / 1440;
}
function typedValue_(field, value) {
  if (field === 'day') return serialDay_(value);
  if (field === 'time') return serialTime_(value);
  if (field === 'submitted' && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    var date = new Date(value);
    if (isFinite(date.getTime())) return date;
  }
  return value;
}
function safeValue_(value) { return typeof value === 'string' ? cellText_(value) : value; }
function formatField_(cell, field) {
  if (field === 'submitted') cell.setNumberFormat('dd mmm yyyy hh:mm');
  if (field === 'day') cell.setNumberFormat('dd mmm yyyy');
  if (field === 'time') cell.setNumberFormat('hh:mm" PKT"');
}
function spreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('RESTROVA_SPREADSHEET_ID');
  var spreadsheet = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Missing spreadsheet');
  return spreadsheet;
}
function headers_(sheet) {
  return sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
}
function ensureHeaders_(sheet) {
  var headers = headers_(sheet);
  var previousLength = headers.length;
  Object.keys(RESTROVA_FIELDS).forEach(function (field) {
    if (!columnsFor_(headers, field).length) headers.push(RESTROVA_FIELDS[field][0]);
  });
  if (sheet.getMaxColumns() < headers.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  if (headers.length > previousLength) {
    var target = sheet.getRange(1, previousLength + 1, 1, headers.length - previousLength);
    target.setValues([headers.slice(previousLength)]);
    if (previousLength) sheet.getRange(1, 1).copyTo(target, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
    else target.setBackground('#17283b').setFontColor('#ffffff').setFontWeight('bold');
  }
  return headers;
}
function payloadFields_(payload) {
  var q = payload.qualification;
  var qualified = payload.type === 'qualified_demo';
  var highPriority = qualified && q.onboardingBudget === 'ready' &&
    (q.branches !== '1' || ['30_99', '100_plus'].indexOf(q.dailyOrders) !== -1);
  var schedule = qualified ? payload.schedule : {};
  return {
    submitted: new Date(), restaurant: payload.restaurant, name: payload.name, phone: payload.phone, city: payload.city,
    business: { established: 'Restaurant / dine-in', takeaway: 'Takeaway / fast food', chain: 'Restaurant with multiple branches', home: 'Home-based food business' }[q.businessType],
    branches: { '1': '1 branch', '2': '2 branches', '3_5': '3–5 branches', '6_plus': '6+ branches' }[q.branches],
    orders: { under_10: 'Under 10 orders', '10_29': '10–29 orders', '30_99': '30–99 orders', '100_plus': '100+ orders' }[q.dailyOrders],
    role: { owner: 'Owner / Founder', partner: 'Partner / Director', manager: 'Restaurant / Operations Manager', other: 'Other / Not involved in purchasing' }[q.role],
    system: q.completeSystem === 'yes' ? 'Yes' : 'No',
    pricing: { ready: 'Yes — onboarding + monthly fees', discuss: 'I understand the pricing, but want to discuss it first', no: 'No, the onboarding and monthly fees are outside my budget' }[q.onboardingBudget],
    timeline: { immediately: 'Immediately', '10_days': 'Within 10 days', '1_month': 'Within 1 month', researching: 'Only researching' }[q.timeline],
    screen: qualified ? (highPriority ? 'HIGH PRIORITY (VERIFY WITH SALES)' : 'POTENTIAL FIT (VERIFY WITH SALES)') : 'OTHER ENQUIRY',
    sales: 'New', qualification: qualified ? 'Qualified — Demo Requested' : 'Other Enquiry',
    stage: qualified ? 'Demo Requested' : 'Enquiry Received',
    attribution: String(payload.attribution || '').slice(0, 1000), message: String(payload.message || '').slice(0, 6000),
    day: schedule.day || '', time: schedule.time || '', platform: schedule.platform || '', id: payload.submissionId
  };
}
function fieldsFromRow_(row, headers) {
  var fields = {};
  var message = rowValue_(row, headers, 'message');
  var messageLabels = { business: 'BUSINESS TYPE', branches: 'NUMBER OF BRANCHES', orders: 'DAILY ORDER VOLUME',
    role: 'BUYER ROLE', system: 'COMPLETE SYSTEM INTENT', pricing: 'PRICING READINESS (ONBOARDING + MONTHLY)',
    timeline: 'PURCHASE TIMELINE', screen: 'AUTOMATED SCREEN', qualification: 'QUALIFICATION STATUS',
    day: 'PREFERRED DAY', time: 'PREFERRED TIME', platform: 'PREFERRED PLATFORM', id: 'LEAD ID', attribution: 'AD ATTRIBUTION' };
  Object.keys(RESTROVA_FIELDS).forEach(function (field) {
    fields[field] = rowValue_(row, headers, field);
    if (!hasValue_(fields[field]) && messageLabels[field]) fields[field] = readMessage_(message, messageLabels[field]);
  });
  if (fields.qualification === 'QUALIFIED - DEMO REQUESTED') fields.qualification = 'Qualified — Demo Requested';
  if (fields.qualification === 'OTHER ENQUIRY') fields.qualification = 'Other Enquiry';
  // Only recover workflow statuses for identifiable submitted records.
  if (hasValue_(fields.restaurant) && hasValue_(fields.id || fields.message)) {
    if (!hasValue_(fields.sales)) fields.sales = 'New';
    if (!hasValue_(fields.stage) && hasValue_(fields.day) && hasValue_(fields.time)) fields.stage = 'Demo Requested';
  }
  return fields;
}
function planRow_(row, formulas, rules, headers, fields, repair) {
  var changes = [];
  var issues = [];
  Object.keys(RESTROVA_FIELDS).forEach(function (field) {
    columnsFor_(headers, field).forEach(function (column) {
      if (formulas[column]) return;
      var existing = row[column];
      var value = repair && hasValue_(existing) ? existing : fields[field];
      if (!hasValue_(value)) return;
      try { value = typedValue_(field, fitDropdown_(field, value, rules[column])); }
      catch (_) { issues.push(RESTROVA_FIELDS[field][0]); return; }
      // Keep manually entered values. Only normalize recognized pricing labels and ISO date/time text.
      if (!repair || !hasValue_(existing) || field === 'pricing' || field === 'submitted' || field === 'day' || field === 'time') {
        var same = existing instanceof Date && value instanceof Date ? existing.getTime() === value.getTime() : existing === value;
        if (!same) changes.push({ column: column, field: field, value: value });
      }
    });
  });
  return { changes: changes, issues: issues };
}
function applyRowChanges_(sheet, row, changes) {
  changes.forEach(function (change) {
    var cell = sheet.getRange(row, change.column + 1);
    cell.setValue(safeValue_(change.value));
    formatField_(cell, change.field);
  });
}
function revealSchedule_(sheet, headers) {
  ['day', 'time', 'platform'].forEach(function (field) {
    columnsFor_(headers, field).forEach(function (column) {
      sheet.showColumns(column + 1);
      if (sheet.getColumnWidth(column + 1) < 155) sheet.setColumnWidth(column + 1, 155);
      if (sheet.getLastRow() > 1) formatField_(sheet.getRange(2, column + 1, sheet.getLastRow() - 1, 1), field);
    });
  });
}
function storedReceipt_(sheet, row, headers, payload, duplicate) {
  var values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
  var scheduleStored = ['day', 'time', 'platform'].every(function (field) { return hasValue_(rowValue_(values, headers, field)); });
  if (payload.type === 'qualified_demo' && !scheduleStored) throw new Error('Schedule storage verification failed');
  var mappedColumns = {};
  ['branches', 'orders', 'role', 'system', 'screen', 'sales', 'day', 'time', 'platform'].forEach(function (field) {
    mappedColumns[field] = headers[columnsFor_(headers, field)[0]];
  });
  return { row: row, duplicate: duplicate, scheduleStored: scheduleStored, mappedColumns: mappedColumns };
}
function writePayload_(sheet, payload) {
  var headers = ensureHeaders_(sheet);
  var fields = payloadFields_(payload);
  var lastRow = sheet.getLastRow();
  var existingRow = 0;
  columnsFor_(headers, 'id').some(function (column) {
    var found = lastRow > 1 ? sheet.getRange(2, column + 1, lastRow - 1, 1)
      .createTextFinder(payload.submissionId).matchEntireCell(true).findNext() : null;
    if (found) existingRow = found.getRow();
    return Boolean(found);
  });
  if (existingRow) {
    var range = sheet.getRange(existingRow, 1, 1, headers.length);
    var values = range.getValues()[0];
    var plan = planRow_(values, range.getFormulas()[0], range.getDataValidations()[0], headers, fields, true);
    if (plan.issues.length) throw new Error('Dropdown mismatch');
    applyRowChanges_(sheet, existingRow, plan.changes);
    return storedReceipt_(sheet, existingRow, headers, payload, true);
  }
  var rowNumber = Math.max(2, lastRow + 1);
  if (rowNumber > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1);
  var target = sheet.getRange(rowNumber, 1, 1, headers.length);
  var rules = target.getDataValidations()[0];
  var templateRules = sheet.getRange(2, 1, 1, headers.length).getDataValidations()[0];
  rules = rules.map(function (rule, index) { return rule || templateRules[index]; });
  var blank = headers.map(function () { return ''; });
  var planned = planRow_(blank, blank, rules, headers, fields, false);
  if (planned.issues.length) throw new Error('Dropdown mismatch');
  var values = blank.slice();
  planned.changes.forEach(function (change) { values[change.column] = safeValue_(change.value); });
  target.setDataValidations([rules]);
  target.setValues([values]);
  ['submitted', 'day', 'time'].forEach(function (field) {
    columnsFor_(headers, field).forEach(function (column) { formatField_(sheet.getRange(rowNumber, column + 1), field); });
  });
  return storedReceipt_(sheet, rowNumber, headers, payload, false);
}

function doPost(e) {
  var lock;
  try {
    var payload = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('RESTROVA_SHEETS_SHARED_SECRET');
    if (!secret || secret.length < 32 || payload.secret !== secret) return reply_({ ok: false, stored: false });
    if (payload.schemaVersion !== 1 || !/^[0-9a-f-]{36}$/i.test(payload.submissionId || '') ||
        !qualificationValid_(payload.qualification) || !text_(payload.name, 120) ||
        !text_(payload.restaurant, 160) || !text_(payload.phone, 35) || !text_(payload.city, 100) ||
        !/^\d{7,16}$/.test(payload.phone.replace(/\D/g, ''))) return reply_({ ok: false, stored: false });
    var qualified = eligible_(payload.qualification);
    var sheetName;
    if (payload.type === 'qualified_demo') {
      if (!qualified || !scheduleValid_(payload.schedule)) return reply_({ ok: false, stored: false });
      sheetName = 'Leads';
    } else if (payload.type === 'other_enquiry') {
      if (qualified) return reply_({ ok: false, stored: false });
      sheetName = 'Other Enquiries';
    } else return reply_({ ok: false, stored: false });
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    var spreadsheet = spreadsheet_();
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    var saved = writePayload_(sheet, payload);
    SpreadsheetApp.flush();
    return reply_({ ok: true, stored: true, schemaVersion: 1, receiverVersion: 2,
      submissionId: payload.submissionId, duplicate: saved.duplicate,
      scheduleStored: saved.scheduleStored, mappedColumns: saved.mappedColumns });
  } catch (_) {
    return reply_({ ok: false, stored: false, receiverVersion: 2 });
  } finally {
    if (lock) lock.releaseLock();
  }
}

/** Run once from the Apps Script editor after saving this file. Safe to rerun. */
function repairRestrovaSheet() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var summaries = [];
  try {
    var spreadsheet = spreadsheet_();
    var properties = PropertiesService.getScriptProperties();
    ['Leads', 'Other Enquiries'].forEach(function (name) {
      var sheet = spreadsheet.getSheetByName(name);
      if (!sheet) return;
      // Keep a recoverable copy of the original layout, formulas, validations and data.
      var backupKey = 'RESTROVA_REPAIR_V2_BACKUP_' + sheet.getSheetId();
      if (!properties.getProperty(backupKey)) {
        var backup = sheet.copyTo(spreadsheet);
        backup.setName(name + ' backup ' + Utilities.formatDate(new Date(), 'Asia/Karachi', 'yyyyMMdd-HHmmss'));
        properties.setProperty(backupKey, String(backup.getSheetId()));
      }
      var headers = ensureHeaders_(sheet);
      var count = Math.max(0, sheet.getLastRow() - 1);
      var summary = { sheet: name, repairedRows: 0, missingScheduleRows: [], dropdownIssues: [] };
      if (count) {
        var range = sheet.getRange(2, 1, count, headers.length);
        var values = range.getValues(), formulas = range.getFormulas(), rules = range.getDataValidations();
        values.forEach(function (row, index) {
          if (!hasValue_(rowValue_(row, headers, 'restaurant'))) return;
          var fields = fieldsFromRow_(row, headers);
          var plan = planRow_(row, formulas[index], rules[index], headers, fields, true);
          if (plan.changes.length) { applyRowChanges_(sheet, index + 2, plan.changes); summary.repairedRows++; }
          if (plan.issues.length) summary.dropdownIssues.push({ row: index + 2, fields: plan.issues });
          if (name === 'Leads' && (!hasValue_(fields.day) || !hasValue_(fields.time) || !hasValue_(fields.platform))) summary.missingScheduleRows.push(index + 2);
        });
      }
      revealSchedule_(sheet, headers);
      summaries.push(summary);
    });
    SpreadsheetApp.flush();
  } finally { lock.releaseLock(); }
  console.log(JSON.stringify(summaries));
  showDemoSchedule();
  return summaries;
}

/** Focus the real scheduling columns, including those added to the far right earlier. */
function showDemoSchedule() {
  var spreadsheet = spreadsheet_();
  var sheet = spreadsheet.getSheetByName('Leads');
  if (!sheet) return;
  var headers = headers_(sheet);
  var columns = ['day', 'time', 'platform'].reduce(function (all, field) { return all.concat(columnsFor_(headers, field)); }, []);
  if (!columns.length) return;
  revealSchedule_(sheet, headers);
  spreadsheet.setActiveSheet(sheet);
  var first = Math.min.apply(null, columns), last = Math.max.apply(null, columns);
  sheet.setActiveRange(sheet.getRange(1, first + 1, Math.max(2, Math.min(sheet.getLastRow(), 12)), last - first + 1));
}
