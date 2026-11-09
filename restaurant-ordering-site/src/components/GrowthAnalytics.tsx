"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { trackGrowthEvent } from "@/lib/growth-events";
import { getConsent, getServerConsent, subscribeConsent, trackPageView } from "@/lib/tracking-consent";
const started = new WeakSet<HTMLFormElement>();
export default function GrowthAnalytics() {
 const pathname = usePathname();
 const consent = useSyncExternalStore(subscribeConsent,getConsent,getServerConsent);
 useEffect(() => {
  if (!consent?.analytics) return;
  trackPageView(pathname);
  if (pathname === "/pricing") trackGrowthEvent("pricing_view", {pagePath:pathname}, pathname);
  if (/^\/customers\/[^/]+$/.test(pathname)) trackGrowthEvent("customer_case_study_view", {pagePath:pathname}, pathname);
  const click = (event: MouseEvent) => {
   if (!(event.target instanceof Element)) return;
   const anchor = event.target.closest("a"); if (!anchor) return;
   const url = new URL(anchor.href, window.location.origin);
   if (url.origin !== window.location.origin || !(url.pathname === "/contact" || (url.pathname === "/" && url.hash === "#contact"))) return;
   trackGrowthEvent("demo_cta_click", {pagePath:pathname, location:anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" : "content"});
  };
  const change = (event: Event) => {
   if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) return;
   const form = event.target.form;
   if (!form?.hasAttribute("data-demo-form") || started.has(form) || !event.isTrusted) return;
   if (trackGrowthEvent("demo_form_start", {pagePath:pathname,location:pathname === "/demo/schedule" ? "schedule" : "intake"})) started.add(form);
  };
  document.addEventListener("click",click);document.addEventListener("change",change);document.addEventListener("input",change);
  return ()=>{document.removeEventListener("click",click);document.removeEventListener("change",change);document.removeEventListener("input",change);};
 }, [pathname,consent]);
 return null;
}
