"use client";
import { useState } from "react";
import { calculate,calculatorFields } from "@/lib/restaurant-calculators";
export default function RestaurantCalculator({kind}:{kind:string}) {
 const [values,setValues]=useState<Record<string,string>>({});const [result,setResult]=useState<Record<string,number|null>|null>(null);const [error,setError]=useState("");
 return <form className="seo-card space-y-5" onSubmit={e=>{e.preventDefault();try{const inputs=Object.fromEntries(calculatorFields[kind].map(f=>{if(!values[f.key]?.trim())throw Error("Complete every field; enter 0 when a cost does not apply.");return [f.key,Number(values[f.key])];}));setResult(calculate(kind,inputs));setError("");}catch(err){setResult(null);setError(err instanceof Error?err.message:"Check your inputs.");}}}>
 {calculatorFields[kind].map(f=><label key={f.key} className="block font-bold" htmlFor={f.key}>{f.label}<input id={f.key} type="number" min="0" step="any" required value={values[f.key]??""} onChange={e=>{setValues({...values,[f.key]:e.target.value});setResult(null);}} className="mt-2 block w-full rounded-xl border border-black/25 bg-white p-3" /></label>)}
 <button className="seo-button" type="submit">Calculate</button>{error&&<p role="alert">{error}</p>}{result&&<dl aria-live="polite" className="space-y-3">{Object.entries(result).map(([k,v])=><div key={k}><dt className="font-bold">{k}</dt><dd>{v===null?"Not applicable":v.toLocaleString("en-PK",{maximumFractionDigits:2})}</dd></div>)}</dl>}
 <p className="text-sm">Calculations stay in this browser. No registration or submission of these figures is required.</p></form>;
}
