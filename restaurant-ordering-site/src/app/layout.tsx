import "./globals.css";

export const metadata = {
  title: "Under Construction",
  description: "Website under construction",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
