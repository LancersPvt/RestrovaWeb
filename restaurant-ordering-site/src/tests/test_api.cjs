const assert = require('node:assert/strict');
const { load, intake, futureDay } = require('./helpers.cjs');
process.env.RESTROVA_DEMO_SESSION_SECRET = 'test_session_secret_32_characters_only';
delete process.env.RESTROVA_SHEETS_SHARED_SECRET;
delete process.env.GOOGLE_SHEETS_URL;
const intakeApi = load('src/app/api/demo/intake/route.ts');
const sessionApi = load('src/app/api/demo/session/route.ts');
const scheduleApi = load('src/app/api/demo/schedule/route.ts');
const session = load('src/lib/restrova-demo-session.ts');
const calls = [];
let responseMode = 'ok';
global.fetch = async (url, opts) => {
  const payload = JSON.parse(opts.body); calls.push(payload);
  if (responseMode === 'network') throw new Error('Simulated network failure');
  return { ok: true, json: async () => responseMode === 'old_receiver' ? { ok: true, stored: true }
    : responseMode === 'not_stored' ? { ok: true, stored: false }
    : { ok: true, stored: true, schemaVersion: 1, submissionId: payload.submissionId } };
};
const request = (body, cookie) => ({ json: async () => body, cookies: { get: () => cookie ? { value: cookie } : undefined } });
const schedule = { day: futureDay, time: '13:30', platform: 'Google Meet' };

(async () => {
  let res = await intakeApi.POST(request(intake));
  assert.equal(res.status, 200); assert.equal(res.body.next, 'schedule');
  assert.equal(calls.length, 0, 'Intake works without Sheets configuration and writes no lead');
  const cookie = res.jar[0].value;
  assert.equal(res.jar[0].httpOnly, true); assert.equal(res.jar[0].path, '/api/demo');
  assert.equal(res.headers.get('Cache-Control'), 'no-store');
  assert.equal((await sessionApi.GET(request(null, cookie))).body.ok, true);
  const badCookie = cookie.slice(0, -5) + 'xxxxx';
  assert.equal((await sessionApi.GET(request(null, badCookie))).status, 401);
  assert.equal((await scheduleApi.POST(request(schedule))).status, 401);
  assert.equal((await scheduleApi.POST(request(schedule, badCookie))).status, 401);
  const before = Date.now;
  try { Date.now = () => before() + (session.DRAFT_TTL_SECONDS + 1) * 1000;
    assert.equal((await scheduleApi.POST(request(schedule, cookie))).status, 401);
  } finally { Date.now = before; }
  for (const body of [null, {}, { ...schedule, day: '2030-02-30' }, { ...schedule, time: '25:00' },
    { ...schedule, day: '2020-01-01' }, { ...schedule, platform: 'Invalid' }, { ...schedule, platform: 'Other' }]) {
    assert.equal((await scheduleApi.POST(request(body, cookie))).status, 400);
  }
  assert.equal(calls.length, 0);
  const missingConfig = await scheduleApi.POST(request(schedule, cookie));
  assert.equal(missingConfig.status, 502); assert.equal(missingConfig.jar.length, 0);
  process.env.RESTROVA_SHEETS_SHARED_SECRET = 'test_sheets_secret_32_characters_only';
  process.env.GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/TEST_ONLY/exec';
  for (const mode of ['network', 'not_stored', 'old_receiver']) {
    responseMode = mode;
    const failed = await scheduleApi.POST(request(schedule, cookie));
    assert.equal(failed.status, 502); assert.equal(failed.jar.length, 0, 'Retain draft for retry');
  }
  responseMode = 'ok'; calls.length = 0;
  const booked = await scheduleApi.POST(request({ ...schedule, contact: { name: 'Tampered' } }, cookie));
  assert.equal(booked.status, 200); assert.equal(calls.length, 1);
  assert.equal(calls[0].type, 'qualified_demo'); assert.equal(calls[0].name, intake.contact.name);
  assert.deepEqual(calls[0].schedule, schedule); assert.deepEqual(calls[0].qualification, intake.qualification);
  assert.equal(calls[0].qualificationStatus, 'QUALIFIED - DEMO REQUESTED');
  assert(calls[0].message.includes('PREFERRED PLATFORM: Google Meet'));
  assert.equal(booked.jar[0].maxAge, 0);
  const retry = await scheduleApi.POST(request(schedule, cookie));
  assert.equal(retry.body.eventId, booked.body.eventId);
  assert.equal(calls[1].submissionId, calls[0].submissionId, 'Receiver can deduplicate retries');
  const other = { ...intake, qualification: { ...intake.qualification, businessType: 'home' } };
  res = await intakeApi.POST(request(other));
  assert.equal(res.body.next, 'thank-you'); assert.equal(res.jar[0].maxAge, 0);
  assert.equal(calls.at(-1).type, 'other_enquiry'); assert.equal(calls.at(-1).schedule, undefined);
  assert.equal((await scheduleApi.POST(request(schedule, session.encryptDraft(other)))).status, 401);
  const count = calls.length;
  for (const body of [{ ...intake, contact: {} }, { ...other, contact: {} },
    { ...intake, qualification: { ...intake.qualification, businessType: 'chain', branches: '1' } }]) {
    assert.equal((await intakeApi.POST(request(body))).status, 400);
  }
  assert.equal((await intakeApi.POST(request({ ...intake, website: 'bot' }))).body.next, 'thank-you');
  assert.equal(calls.length, count);
  const otherMeeting = await scheduleApi.POST(request({ ...schedule, platform: 'Other', otherPlatform: 'Microsoft Teams' }, cookie));
  assert.equal(otherMeeting.status, 200); assert.equal(calls.at(-1).schedule.platform, 'Other: Microsoft Teams');
  console.log('PASS: both routes, required contacts, no early qualified write, encrypted/expired/tampered sessions');
  console.log('PASS: schedule validation, trusted identity, acknowledgement, failures/retries, stable IDs and other enquiries');
})().catch(error => { console.error(error); process.exitCode = 1; });
