/** Restrova intake receiver. Set script properties as described in docs/demo-setup.md. */
var RESTROVA_HEADERS = [
  'Submitted At', 'Restaurant Name', 'Owner Name', 'WhatsApp / Phone', 'City',
  'Business Type', 'Number of Branches', 'Daily Order Volume', 'Buyer Role',
  'Complete System Intent', 'Pricing Readiness', 'Purchase Timeline',
  'Qualification Status', 'Lead Stage', 'Ad Attribution', 'Message',
  'Preferred Day', 'Preferred Time', 'Meeting Platform', 'Lead ID'
];

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

function doPost(e) {
  var lock;
  try {
    var payload = JSON.parse(e.postData.contents);
    var properties = PropertiesService.getScriptProperties();
    var secret = properties.getProperty('RESTROVA_SHEETS_SHARED_SECRET');
    if (!secret || secret.length < 32 || payload.secret !== secret) return reply_({ ok: false, stored: false });
    if (payload.schemaVersion !== 1 || !/^[0-9a-f-]{36}$/i.test(payload.submissionId || '') ||
        !qualificationValid_(payload.qualification) || !text_(payload.name, 120) ||
        !text_(payload.restaurant, 160) || !text_(payload.phone, 35) || !text_(payload.city, 100) ||
        !/^\d{7,16}$/.test(payload.phone.replace(/\D/g, ''))) return reply_({ ok: false, stored: false });
    var type = payload.type;
    var qualified = eligible_(payload.qualification);
    var sheetName;
    if (type === 'qualified_demo') {
      if (!qualified || !scheduleValid_(payload.schedule)) return reply_({ ok: false, stored: false });
      sheetName = 'Leads';
    } else if (type === 'other_enquiry') {
      if (qualified) return reply_({ ok: false, stored: false });
      sheetName = 'Other Enquiries';
    } else {
      return reply_({ ok: false, stored: false });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    var spreadsheetId = properties.getProperty('RESTROVA_SPREADSHEET_ID');
    var spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) throw new Error('Missing target spreadsheet');
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    var headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    // Match columns by name and append missing columns; preserve existing columns and sales notes.
    RESTROVA_HEADERS.forEach(function (header) { if (headers.indexOf(header) === -1) headers.push(header); });
    if (sheet.getMaxColumns() < headers.length) sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    var idColumn = headers.indexOf('Lead ID') + 1;
    if (sheet.getLastRow() > 1 && sheet.getRange(2, idColumn, sheet.getLastRow() - 1, 1)
        .createTextFinder(payload.submissionId).matchEntireCell(true).findNext()) {
      return reply_({ ok: true, stored: true, duplicate: true, schemaVersion: 1, submissionId: payload.submissionId });
    }

    var q = payload.qualification;
    var schedule = type === 'qualified_demo' ? payload.schedule : {};
    var labels = {
      businessType: { established: 'Restaurant / dine-in', takeaway: 'Takeaway / fast food', chain: 'Restaurant with multiple branches', home: 'Home-based food business' },
      branches: { '1': '1 branch', '2': '2 branches', '3_5': '3–5 branches', '6_plus': '6+ branches' },
      dailyOrders: { under_10: 'Under 10 orders', '10_29': '10–29 orders', '30_99': '30–99 orders', '100_plus': '100+ orders' },
      role: { owner: 'Owner / Founder', partner: 'Partner / Director', manager: 'Restaurant / Operations Manager', other: 'Other / Not involved in purchasing' },
      onboardingBudget: { ready: 'Ready to pay onboarding and monthly fees', discuss: 'Wants to discuss pricing', no: 'Outside budget' },
      timeline: { immediately: 'Immediately', '10_days': 'Within 10 days', '1_month': 'Within 1 month', researching: 'Only researching' }
    };
    var fields = {
      'Submitted At': new Date().toISOString(), 'Restaurant Name': payload.restaurant, 'Owner Name': payload.name,
      'WhatsApp / Phone': payload.phone, 'City': payload.city,
      'Business Type': labels.businessType[q.businessType], 'Number of Branches': labels.branches[q.branches],
      'Daily Order Volume': labels.dailyOrders[q.dailyOrders], 'Buyer Role': labels.role[q.role],
      'Complete System Intent': q.completeSystem === 'yes' ? 'Yes' : 'No',
      'Pricing Readiness': labels.onboardingBudget[q.onboardingBudget], 'Purchase Timeline': labels.timeline[q.timeline],
      'Qualification Status': qualified ? 'Qualified — Demo Requested' : 'Other Enquiry',
      'Lead Stage': qualified ? 'Demo Requested' : 'Enquiry Received',
      'Ad Attribution': String(payload.attribution || '').slice(0, 1000), 'Message': String(payload.message || '').slice(0, 6000),
      'Preferred Day': schedule.day || '', 'Preferred Time': schedule.time || '',
      'Meeting Platform': schedule.platform || '', 'Lead ID': payload.submissionId
    };
    sheet.appendRow(headers.map(function (header) { return cellText_(fields[header]); }));
    SpreadsheetApp.flush();
    return reply_({ ok: true, stored: true, schemaVersion: 1, submissionId: payload.submissionId });
  } catch (_) {
    // Do not expose contact data, authentication details, or spreadsheet internals.
    return reply_({ ok: false, stored: false });
  } finally {
    if (lock) lock.releaseLock();
  }
}
