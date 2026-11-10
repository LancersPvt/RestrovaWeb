import {createHash} from "node:crypto";
import {localPreviewEnabled} from "@/lib/local-preview";
import {readFile} from "node:fs/promises";
import path from "node:path";
import {seoPages} from "@/data/seoPages";
import {isIndexable} from "@/lib/seo-engine";
export const runtime="nodejs";
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=seoPages.find(p=>p.path===`/templates/${slug}`&&(isIndexable(p)||localPreviewEnabled()));if(!p?.resourceFile||!/^[a-z0-9-]+\.html$/.test(p.resourceFile))return new Response("Not found",{status:404});try{const text=await readFile(path.join(process.cwd(),"content/resources",p.resourceFile),"utf8");if(!localPreviewEnabled()&&createHash("sha256").update(text).digest("hex")!==p.resourceDigest)return new Response("Not found",{status:404});return new Response(text,{headers:{"Content-Type":"text/html; charset=utf-8","Content-Disposition":`attachment; filename="${p.resourceFile}"`,"X-Robots-Tag":"noindex","Cache-Control":"no-store"}});}catch{return new Response("Not found",{status:404});}}
