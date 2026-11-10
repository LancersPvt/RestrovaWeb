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
  if (relative.endsWith(".json")) return JSON.parse(fs.readFileSync(path.join(root,relative),"utf8"));
  const result = { exports: {} };
  const file = path.join(root, relative);
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { esModuleInterop: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS }, fileName: file,
  }).outputText;
  new Function("require", "module", "exports", js)(name => name.startsWith("@/") ? loadSeoSource(`src/${name.slice(2)}${name.endsWith(".json") ? "" : ".ts"}`) : require(name), result, result.exports);
  cache.set(relative, result.exports);
  return result.exports;
}

export function clearSeoSourceCache(){cache.clear();}
