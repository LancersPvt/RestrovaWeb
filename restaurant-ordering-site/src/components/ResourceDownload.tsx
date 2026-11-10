"use client";
import {trackGrowthEvent} from "@/lib/growth-events";
export default function ResourceDownload({path,slug}:{path:string;slug:string}){return <a className="seo-button" href={`/resources/${slug}`} download onClick={()=>trackGrowthEvent("resource_download",{pagePath:path,location:"content"})}>Download editable worksheet</a>;}
