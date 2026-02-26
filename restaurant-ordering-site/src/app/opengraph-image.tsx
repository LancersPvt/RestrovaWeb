/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Removing Edge runtime because it often causes deployment issues on Vercel
// export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoUrl = new URL("/logo.png", siteConfig.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.35), transparent 45%), radial-gradient(circle at 90% 30%, rgba(59,130,246,0.25), transparent 40%), linear-gradient(135deg, #0a0a0a, #111827)",
          color: "white",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <img src={logoUrl} width={72} height={72} alt="Restrova" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
              Restrova
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 26,
                opacity: 0.85,
              }}
            >
              Restaurant Ordering Apps, POS & Analytics
            </div>
          </div>
        </div>

        <div style={{ fontSize: 28, opacity: 0.9 }}>
          Your brand. Your customers. Your data.
        </div>
      </div>
    ),
    size
  );
}
