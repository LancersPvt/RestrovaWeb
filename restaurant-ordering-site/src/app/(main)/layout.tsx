import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-dvh bg-background text-foreground">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <SiteHeader />
            {children}
            <SiteFooter />
            <WhatsAppButton />
        </div>
    );
}
