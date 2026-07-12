import AutoStoreRedirect from "./AutoStoreRedirect";

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: "100dvh",
                background: "#09090b",
                color: "#fafafa",
                colorScheme: "dark",
            }}
        >
            <AutoStoreRedirect />
            {children}
        </div>
    );
}
