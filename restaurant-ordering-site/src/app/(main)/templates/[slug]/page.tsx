import ProgrammaticPage,{programmaticMetadata} from "@/components/ProgrammaticPage";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){return programmaticMetadata(`/templates/${(await params).slug}`);}
export default async function Page({params}:{params:Promise<{slug:string}>}){return <ProgrammaticPage path={`/templates/${(await params).slug}`}/>;}
