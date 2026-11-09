"use client";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { getConsent, getServerConsent, initializeTracking, saveConsent, subscribeConsent } from "@/lib/tracking-consent";

export default function TrackingConsent() {
 const choice=useSyncExternalStore(subscribeConsent,getConsent,getServerConsent);
 const [ready,setReady]=useState(false);
 const [editing,setEditing]=useState(false);
 const [analytics,setAnalytics]=useState(false);
 const [marketing,setMarketing]=useState(false);
 useEffect(()=>{initializeTracking(); const timer=setTimeout(()=>setReady(true),0);return ()=>clearTimeout(timer);},[]);
 const save=(a:boolean,m:boolean)=>{saveConsent({analytics:a,marketing:m});setEditing(false);};
 if (!ready) return null;
 return <>
  {choice && !editing && <button type="button" className="fixed bottom-4 left-4 z-[90] rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-bold text-[#171816] shadow-lg focus-visible:outline-2" onClick={()=>{setAnalytics(choice.analytics);setMarketing(choice.marketing);setEditing(true);}}>Cookie settings</button>}
  {(!choice || editing) && <section aria-labelledby="tracking-choice-title" className="fixed inset-x-0 bottom-0 z-[100] max-h-[85dvh] overflow-y-auto border-t border-black/20 bg-white p-5 text-[#171816] shadow-2xl sm:p-6">
   <div className="mx-auto max-w-5xl"><h2 id="tracking-choice-title" className="text-xl font-bold">Your privacy choices</h2>
    <p className="mt-2 text-sm leading-6">With your permission, Google Analytics helps us understand website use, and Meta helps measure advertising. Both are optional. Your demo request works without them. We remember your choice for 180 days. <Link className="underline" href="/privacy-policy">Privacy policy</Link></p>
    <div className="my-4 flex flex-wrap gap-x-8 gap-y-3">
     <label className="flex items-center gap-3"><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)} className="h-5 w-5" />Analytics (Google)</label>
     <label className="flex items-center gap-3"><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)} className="h-5 w-5" />Marketing (Meta)</label>
    </div>
    <div className="flex flex-wrap gap-3">{[{label:"Reject optional",action:()=>save(false,false)},{label:"Save choices",action:()=>save(analytics,marketing)},{label:"Accept both",action:()=>save(true,true)}].map(b=><button key={b.label} type="button" onClick={b.action} className="rounded-full border border-[#171816] bg-white px-5 py-3 text-sm font-bold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2">{b.label}</button>)}
    {choice && <button type="button" className="px-4 py-3 underline" onClick={()=>setEditing(false)}>Cancel</button>}</div>
   </div>
  </section>}
 </>;
}
