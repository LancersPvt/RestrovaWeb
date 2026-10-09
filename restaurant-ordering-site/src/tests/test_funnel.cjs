const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load, project, intake, futureDay } = require('./helpers.cjs');
const { parseIntake, isEligible, parseSchedule, businessTypes } = load('src/lib/restrova-demo.ts');
const cases = [
  [{}, true], [{ branches: '1', dailyOrders: '10_29' }, true], [{ businessType: 'home' }, false],
  [{ branches: '1', dailyOrders: 'under_10' }, false], [{ timeline: 'researching' }, false],
  [{ onboardingBudget: 'no' }, false], [{ role: 'other' }, false], [{ completeSystem: 'no' }, false],
  [{ onboardingBudget: 'discuss' }, true], [{ businessType: 'chain', branches: '3_5' }, true]
];
for (const [patch, expected] of cases) {
  const parsed = parseIntake({ ...intake, qualification: { ...intake.qualification, ...patch } });
  assert(parsed); assert.equal(isEligible(parsed.qualification), expected);
}
assert.equal(parseIntake({ ...intake, qualification: { ...intake.qualification, businessType: 'chain', branches: '1' } }), null);
assert.equal(parseIntake({ ...intake, qualification: { ...intake.qualification, businessType: 'not_started' } }), null);
assert(!businessTypes.some(option => /not started/i.test(option.label)));
for (const key of ['name', 'restaurant', 'phone', 'city']) {
  assert.equal(parseIntake({ ...intake, contact: { ...intake.contact, [key]: '' } }), null);
}
const instant = Date.parse('2030-06-15T10:00:00Z');
assert.equal(parseSchedule({ day: '2030-06-15', time: '14:59', platform: 'WhatsApp' }, instant), null);
assert(parseSchedule({ day: '2030-06-15', time: '15:01', platform: 'WhatsApp' }, instant));
assert.equal(parseSchedule({ day: '2030-02-30', time: '16:00', platform: 'WhatsApp' }, 0), null);
assert.equal(parseSchedule({ day: futureDay, time: '16:00', platform: 'Other', otherPlatform: 'a\nb' }), null);
const front = fs.readFileSync(path.join(project, 'src/components/ContactForm.tsx'), 'utf8');
assert(front.indexOf('Tell Us About Your Restaurant') < front.indexOf('Your Contact Information'));
assert(!front.includes('isEligible('), 'Contact section has no eligibility gate');
const thanks = fs.readFileSync(path.join(project, 'src/app/demo/thank-you/page.tsx'), 'utf8');
assert(thanks.includes('Thank you! Your form has been submitted successfully.'));
assert(!/unqualified|ineligible|do not qualify/i.test(thanks));
process.env.RESTROVA_DEMO_SESSION_SECRET = 'test_session_secret_32_characters_only';
const { encryptDraft, decryptDraft } = load('src/lib/restrova-demo-session.ts');
const longIntake = { ...intake, attribution: 'a'.repeat(1000), contact: { name: 'ع'.repeat(120), restaurant: 'ع'.repeat(160), city: 'ع'.repeat(100), phone: intake.contact.phone } };
const token = encryptDraft(longIntake);
assert(token.length < 3800); assert.deepEqual(decryptDraft(token).intake, longIntake);
console.log('PASS: qualification rules, removed option, chain guard, all contacts required, neutral thanks, timezone and cookie sizing');
