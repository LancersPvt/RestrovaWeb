import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
        <JsonLd data={[
          { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name,
            url: siteConfig.url, logo: `${siteConfig.url}/logo.png`, description: siteConfig.description,
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: siteConfig.contact.email }, areaServed: { "@type": "Country", name: "Pakistan" } },
          { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name,
            url: siteConfig.url, inLanguage: "en-PK", publisher: { "@id": `${siteConfig.url}/#organization` } },
        ]} />
        {children}

        {/* Meta Pixel: base code provided in Events Manager. */}
        <Script id="restrova-meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2124022461583064');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2124022461583064&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
