import TaxonomyPage,{generateMetadata as metadata} from "@/components/BlogTaxonomyPage";
type Props={params:Promise<{value:string}>;searchParams:Promise<{q?:string|string[];page?:string|string[]}>};
const adapt=(p:Props)=>({...p,params:p.params.then(v=>({...v,taxonomy:"tag"}))});
export const generateMetadata=(p:Props)=>metadata(adapt(p));
export default function Page(p:Props){return TaxonomyPage(adapt(p));}
