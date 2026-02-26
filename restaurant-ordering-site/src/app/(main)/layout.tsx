import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-dvh bg-background text-foreground">
            <SiteHeader />
            {children}
            <SiteFooter />
        </div>
    );
}
