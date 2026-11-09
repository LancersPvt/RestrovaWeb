import { configureGrowthAnalytics, safeGrowthPath } from "@/lib/growth-events";

export const CONSENT_KEY = "restrova.tracking-consent.v1";
export const GTM_ID = "GTM-PHGQ9PVS";
const PIXEL_ID = "2124022461583064";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type ConsentChoice = { analytics: boolean; marketing: boolean };
type StoredConsent = ConsentChoice & { version: 1; savedAt: number };
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push?: Pixel; loaded?: boolean; version?: string };
declare global {
 interface Window { dataLayer?: unknown[]; fbq?: Pixel; _fbq?: Pixel; }
}
let choice: ConsentChoice | null = null;
let initialized = false;
let gtmStarted = false;
let pixelStarted = false;
let lastPage: string | null = null;
const listeners = new Set<() => void>();
const leads = new Set<string>();
export const getConsent = () => choice;
export const getServerConsent = () => null;
export function subscribeConsent(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function parseConsent(raw: string | null, now = Date.now()): ConsentChoice | null {
 try {
  const c = JSON.parse(raw || "null") as StoredConsent | null;
  if (!c || c.version !== 1 || typeof c.analytics !== "boolean" || typeof c.marketing !== "boolean" || !Number.isFinite(c.savedAt) || c.savedAt > now || now - c.savedAt >= MAX_AGE) return null;
  return {analytics:c.analytics,marketing:c.marketing};
 } catch { return null; }
}
function push(item: unknown) { (window.dataLayer ||= []).push(item); }
// Consent commands only: this does NOT load/configure a standalone gtag.js installation.
// Google command queues require the Arguments object, not an event object.
// eslint-disable-next-line prefer-rest-params
function consentCommand(...args: unknown[]) { push(arguments); void args; }
function googleConsent(analytics: boolean) {
 return {analytics_storage:analytics ? "granted" : "denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
}
function loadGtm() {
 if (gtmStarted) return;
 gtmStarted = true;
 if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;
 push({...pageFields(location.pathname),cta_location:null});
 push({"gtm.start":Date.now(),event:"gtm.js"});
 const script=document.createElement("script"); script.id="restrova-gtm"; script.async=true;
 script.src=`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
 document.head.appendChild(script);
}
function safeMetaContext() {
 // Meta reads document URLs itself; suppress it where a query/hash/private path could leak.
 if (location.search || location.hash || safeGrowthPath(location.pathname)==="/other") return false;
 try { if (document.referrer) { const ref=new URL(document.referrer); if (ref.search || ref.hash) return false; } } catch { return false; }
 return true;
}
function loadMeta() {
 if (pixelStarted || !safeMetaContext()) return;
 pixelStarted=true;
 if (!window.fbq) {
  const pixel = function(...args:unknown[]) { if (pixel.callMethod) pixel.callMethod(...args); else pixel.queue.push(args); } as Pixel;
  pixel.queue=[];pixel.push=pixel;pixel.loaded=true;pixel.version="2.0";
  window.fbq=pixel;window._fbq=pixel;
  const script=document.createElement("script");script.id="restrova-meta-pixel";script.async=true;script.src="https://connect.facebook.net/en_US/fbevents.js";document.head.appendChild(script);
 }
 window.fbq("consent","grant");
 window.fbq("set","autoConfig",false,PIXEL_ID);
 window.fbq("init",PIXEL_ID);
 window.fbq("track","PageView");
}
export function safeAnalyticsReferrer(raw:string) {
 try {
  const url=new URL(raw);
  const hosts=["www.google.com","google.com","www.google.com.pk","google.com.pk","www.bing.com","bing.com","duckduckgo.com","www.duckduckgo.com","search.yahoo.com"];
  return url.protocol==="https:" && hosts.includes(url.hostname) ? url.origin+"/" : "";
 } catch { return ""; }
}
function pageFields(path: string) {
 const clean=safeGrowthPath(path);
 return {page_path:clean,page_location:`https://www.restrova.com${clean}`,page_title:"Restrova",page_referrer:safeAnalyticsReferrer(document.referrer)};
}
export function trackPageView(path:string) {
 if (!choice?.analytics || lastPage===path) return;
 lastPage=path;
 push({event:"restrova_page_view",...pageFields(path),cta_location:null});
}
function clearOptionalCookies(next:ConsentChoice | null) {
 const names=document.cookie.split(";").map(c=>c.trim().split("=")[0]).filter(name=>(!next?.analytics && /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) || (!next?.marketing && /^_fb[pc]$/.test(name)));
 const domains=["",location.hostname,...(location.hostname.endsWith("restrova.com") ? [".restrova.com"] : [])];
 for (const name of names) for (const domain of domains) document.cookie=`${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
}
function apply(next:ConsentChoice | null, reloadOnWithdrawal:boolean) {
 const withdrawal=(choice?.analytics && !next?.analytics && gtmStarted) || (choice?.marketing && !next?.marketing && pixelStarted);
 choice=next;
 clearOptionalCookies(next);
 configureGrowthAnalytics({consent:!!next?.analytics,send:(event,payload)=>{
  if (choice?.analytics) push({event,...pageFields(payload.page_path),cta_location:payload.cta_location ?? null});
 }});
 consentCommand("consent","update",googleConsent(!!next?.analytics));
 if (!next?.marketing && window.fbq) window.fbq("consent","revoke");
 if (withdrawal && reloadOnWithdrawal) {
  // A loaded third-party script cannot be reliably unloaded. Persist first, then end it.
  listeners.forEach(listener=>listener());window.location.reload();return;
 }
 if (next?.analytics) { loadGtm();trackPageView(location.pathname); }
 if (next?.marketing) loadMeta();
 listeners.forEach(listener=>listener());
}
function readChoice() { try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; } }
export function initializeTracking() {
 if (initialized) return;
 initialized=true;
 consentCommand("consent","default",googleConsent(false));
 apply(readChoice(),false);
 window.addEventListener("storage",event=>{if(event.key===CONSENT_KEY || event.key===null)apply(readChoice(),true);});
}
export function saveConsent(next:ConsentChoice) {
 try { localStorage.setItem(CONSENT_KEY,JSON.stringify({...next,version:1,savedAt:Date.now()})); } catch { /* Session-only choice if storage is unavailable. */ }
 apply(next,true);
}
export function trackMetaLead(eventId:string) {
 if (!choice?.marketing || !window.fbq || !safeMetaContext() || !eventId || leads.has(eventId)) return;
 try { window.fbq("track","Lead",{}, {eventID:eventId});leads.add(eventId); } catch { /* Never interrupt lead delivery. */ }
}
