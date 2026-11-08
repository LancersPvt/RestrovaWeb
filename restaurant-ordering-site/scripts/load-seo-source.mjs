import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();
// Read the pure metadata/content modules used by the sitemap, without a running Next server.
export function loadSeoSource(relative) {
  if (cache.has(relative)) return cache.get(relative);
  const result = { exports: {} };
  const file = path.join(root, relative);
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS }, fileName: file,
  }).outputText;
  new Function("require", "module", "exports", js)(name => name.startsWith("@/") ? loadSeoSource(`src/${name.slice(2)}.ts`) : require(name), result, result.exports);
  cache.set(relative, result.exports);
  return result.exports;
}
