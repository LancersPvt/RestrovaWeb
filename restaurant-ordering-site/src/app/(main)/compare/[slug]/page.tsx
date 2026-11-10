import ProgrammaticPage,{programmaticMetadata} from "@/components/ProgrammaticPage";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){return programmaticMetadata(`/compare/${(await params).slug}`);}
export default async function Page({params}:{params:Promise<{slug:string}>}){return <ProgrammaticPage path={`/compare/${(await params).slug}`}/>;}
