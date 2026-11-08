import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/links/mods", "MODS App and Restaurant Links", "Find the existing public app and contact links for MODS. Customer links are separate from Restrova Admin and Fleet.", false);
export default function LinkPageLayout({ children }: { children: React.ReactNode }) { return children; }
