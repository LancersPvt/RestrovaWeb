/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Removing Edge runtime because it often causes deployment issues on Vercel
// export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  const logoUrl = new URL("/logo.png", siteConfig.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background:
            "radial-gradient(circle at 15% 30%, rgba(236,72,153,0.25), transparent 45%), radial-gradient(circle at 85% 40%, rgba(34,197,94,0.18), transparent 40%), linear-gradient(135deg, #0a0a0a, #111827)",
          color: "white",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 26,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <img src={logoUrl} width={64} height={64} alt="Restrova" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
              Restrova
            </div>
            <div style={{ marginTop: 10, fontSize: 26, opacity: 0.85 }}>
              Restaurant Ordering Apps, POS & Analytics
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
