import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import GrowthAnalytics from "@/components/GrowthAnalytics";
import TrackingConsent from "@/components/TrackingConsent";
import "./globals.css";

import { siteIdentitySchema } from "@/lib/business-identity";
import JsonLd from "@/components/JsonLd";
import { isPreviewDeployment, siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Restaurant Management Software Pakistan | Restrova",
    template: "%s | Restrova",
  },
  description: siteConfig.description,
  applicationName: "Restrova",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "Restrova",
    title: "Your restaurant. Your customers. Your growth.",
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 912,
        alt: "Restrova — direct ordering, built around your restaurant brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your restaurant. Your customers. Your growth.",
    description: siteConfig.description,
    images: ["/og.png"],
  },
  robots: {
    index: !isPreviewDeployment,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#171816",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <JsonLd data={siteIdentitySchema} />
        {children}
        <TrackingConsent />
        <GrowthAnalytics />
      </body>
    </html>
  );
}
