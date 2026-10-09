const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const project = path.resolve(__dirname, '../..');
const cache = new Map();
const fakeNext = { NextResponse: { json(body, init = {}) {
  const jar = [];
  return { body, status: init.status || 200, headers: new Headers(init.headers || {}),
    cookies: { set: value => jar.push(value) }, jar };
} } };
function load(relative) {
  const file = path.resolve(project, relative);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, { fileName: file,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
  const localRequire = name => name === 'next/server' ? fakeNext : name.startsWith('@/lib/')
    ? load(`src/lib/${name.slice('@/lib/'.length)}.ts`) : require(name);
  new Function('require', 'module', 'exports', js)(localRequire, module, module.exports);
  return module.exports;
}
const qualification = { businessType: 'established', branches: '2', dailyOrders: '30_99', role: 'owner',
  completeSystem: 'yes', onboardingBudget: 'ready', timeline: '10_days' };
const contact = { name: 'Test Person', restaurant: 'Test Restaurant', phone: '+923001234567', city: 'Karachi' };
const intake = { qualification, contact, attribution: 'utm_source=test' };
const futureDay = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
module.exports = { load, project, intake, futureDay };
