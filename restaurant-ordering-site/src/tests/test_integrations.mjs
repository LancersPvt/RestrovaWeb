// Offline contract regression tests. All network calls and tenant records are fixtures.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { EventEmitter } from "node:events";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
function load(relative, mocks = {}) {
  const file = path.join(root, relative);
  const result = { exports: {} };
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), { fileName: file,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  new Function("require", "module", "exports", js)(name => mocks[name] ?? require(name), result, result.exports);
  return result.exports;
}
const envKeys = ["HYPERADMIN_EMAIL", "HYPERADMIN_PASSWORD", "HYPERADMIN_BASE_URL", "REVALIDATION_SECRET_TOKEN"];
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
const originalFetch = global.fetch;
const originalError = console.error;
const originalWarn = console.warn;
try {
  process.env.HYPERADMIN_BASE_URL = "https://api.invalid/v1";
  const calls = [];
  let payload;
  let ok = true;
  let fail = false;
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    if (fail) throw Error("fixture network failure");
    return { ok, status: ok ? 200 : 503, json: async () => payload };
  };
  console.error = () => {}; console.warn = () => {};
  const api = load("src/lib/restrovaApi.ts");
  const branch = { id: "b1", tenantId: "t1", name: "Fixture branch", address: "Test address", latitude: 0, longitude: 0,
    phone: "", email: "", deliveryRadiusKm: 0, active: false, isActive: true,
    openingSlots: [{ active: true, dayOfWeek: 1, opensAt: "18:00", closesAt: "22:00" },
      { active: true, dayOfWeek: 1, opensAt: "09:00", closesAt: "12:00" },
      { active: false, dayOfWeek: 2, opensAt: "09:00", closesAt: "12:00" }] };
  payload = { content: [branch] };
  let branches = await api.fetchBranches("t1");
  assert.equal(branches[0].openingHours.monday, "09:00-12:00, 18:00-22:00");
  assert.equal(branches[0].openingHours.tuesday, "Closed");
  assert.equal(branches[0].phone, "N/A"); assert.equal(branches[0].email, "N/A");
  assert.equal(branches[0].isActive, false, "active takes precedence over legacy isActive");
  payload = [{ ...branch, active: undefined, isActive: true, openingSlots: null }];
  branches = await api.fetchBranches("t1");
  assert.equal(branches[0].isActive, true);
  assert.deepEqual(Object.values(branches[0].openingHours), Array(7).fill("Closed"));
  const category = { id: "c1", tenantId: "t1", name: "Menu", description: null, imageUrl: null, imageKey: "menu.png", displayOrder: 0 };
  const item = { id: "i1", categoryId: "c1", name: "Fixture item", description: null, basePrice: 0, effectivePrice: 250, imageUrl: null };
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => url.includes("categories") ? { categories: [category] }
      : { content: [item, { ...item, id: "inactive", active: false }, { ...item, id: "other-category", categoryId: "c2" }] } };
  };
  const categories = await api.fetchMenuCategories("t1");
  assert.equal(categories[0].imageUrl, "menu.png");
  assert.equal(categories[0].items.length, 1);
  assert.equal(categories[0].items[0].basePrice, 250, "preserve the existing price fallback");
  assert.equal(categories[0].items[0].effectivePrice, 250);
  for (const call of calls) {
    assert.equal(call.options.headers["X-TenantID"], "t1");
    assert.equal(call.options.next.revalidate, 3600);
  }
  global.fetch = async () => ({ ok: false, status: 503 });
  assert.deepEqual(await api.fetchBranches("t1"), []);
  assert.deepEqual(await api.fetchMenuCategories("t1"), []);
  global.fetch = async () => { throw Error("fixture failure"); };
  assert.deepEqual(await api.fetchBranches("t1"), []);
  assert.deepEqual(await api.fetchMenuCategories("t1"), []);
  ok = false; fail = true;

  const cached = load("src/data/tenantsData.ts", { fs: { existsSync: () => true,
    readFileSync: () => 'id,slug,name,lastUpdated\nt1,test,"Test, Kitchen",2026-10-27\nt2,quoted,"The ""Quoted"" Cafe",2026-10-27\n' } });
  assert.deepEqual(await cached.fetchActiveTenants(), [
    { id: "t1", slug: "test", name: "Test, Kitchen" }, { id: "t2", slug: "quoted", name: 'The "Quoted" Cafe' }]);
  delete process.env.HYPERADMIN_EMAIL; delete process.env.HYPERADMIN_PASSWORD;
  const missing = load("src/data/tenantsData.ts", { fs: { existsSync: () => false } });
  assert.deepEqual(await missing.fetchActiveTenants(), []);
  const requests = [];
  const http = { request(options, callback) {
    requests.push(options);
    const request = new EventEmitter();
    request.write = () => {};
    request.end = () => queueMicrotask(() => {
      const response = new EventEmitter(); response.statusCode = 200; callback(response);
      response.emit("data", JSON.stringify(options.path.includes("/login") ? { accessToken: "fixture-token" } : { content: [
        { id: "t1", slug: "display", displayName: "Display name", name: "Name" },
        { id: "t2", slug: "legal", legalName: "Legal name", active: true },
        { id: "t3", slug: "hidden", isActive: false, active: true },
        { id: "t4", slug: "fallback" },
      ] })); response.emit("end");
    });
    return request;
  } };
  process.env.HYPERADMIN_EMAIL = "fixture@example.invalid"; process.env.HYPERADMIN_PASSWORD = "fixture-only";
  const liveFallback = load("src/data/tenantsData.ts", { fs: { existsSync: () => false }, http, https: http });
  const tenants = await liveFallback.fetchActiveTenants();
  assert.deepEqual(tenants.map(t => t.name), ["Display name", "Legal name", "fallback"]);
  await liveFallback.fetchActiveTenants();
  assert.equal(requests.filter(r => r.path.includes("/login")).length, 1, "admin token remains cached");
  assert.equal(requests[1].headers.Authorization, "Bearer fixture-token");

  const revalidated = [];
  let thrown;
  const route = load("src/app/api/revalidate/route.ts", {
    "next/server": { NextResponse: { json: (body, init = {}) => ({ body, status: init.status ?? 200 }) } },
    "next/cache": { revalidatePath: p => { if (thrown) throw thrown; revalidated.push(p); } },
  });
  const request = (query, body, header) => ({ nextUrl: new URL(`https://test.invalid/?${query}`),
    headers: new Headers(header ? { "x-revalidate-token": header } : {}), json: async () => { if (body === "invalid-json") throw Error("invalid JSON"); return body; } });
  delete process.env.REVALIDATION_SECRET_TOKEN;
  assert.equal((await route.GET(request("path=/pricing"))).status, 500);
  process.env.REVALIDATION_SECRET_TOKEN = "fixture-secret";
  assert.equal((await route.GET(request("token=wrong&path=/pricing"))).status, 401);
  assert.equal((await route.GET(request("token=fixture-secret"))).status, 400);
  assert.equal((await route.GET(request("token=fixture-secret&path=/pricing"))).status, 200);
  assert.equal((await route.POST(request("", { path: "/about" }, "fixture-secret"))).status, 200);
  assert.equal((await route.POST(request("token=fixture-secret&path=/services", "invalid-json"))).status, 200);
  assert.deepEqual(revalidated, ["/pricing", "/about", "/services"]);
  thrown = Error("fixture revalidation failure");
  assert.equal((await route.GET(request("token=fixture-secret&path=/pricing"))).body.message, thrown.message);
  thrown = "non-Error throw";
  assert.equal((await route.POST(request("", { path: "/about" }, "fixture-secret"))).body.message, "Unknown revalidation error");
  console.log("PASS: branch/menu API contracts, tenant CSV and authenticated fallback, cached token, and GET/POST revalidation (offline fixtures only)");
} finally {
  global.fetch = originalFetch; console.error = originalError; console.warn = originalWarn;
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}
