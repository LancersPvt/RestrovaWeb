import ProgrammaticPage,{programmaticMetadata} from "@/components/ProgrammaticPage";
type Params={params:Promise<{city:string;feature:string}>};
export async function generateMetadata({params}:Params){const p=await params;return programmaticMetadata(`/locations/${p.city}/${p.feature}`);}
export default async function Page({params}:Params){const p=await params;return <ProgrammaticPage path={`/locations/${p.city}/${p.feature}`}/>;}
