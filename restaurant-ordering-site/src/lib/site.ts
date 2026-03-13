function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Restrova",
  description:
    "Restrova builds customized restaurant ordering systems: customer apps (Android/iOS), admin order management, POS/RMS modules, and analytics — built for your brand, not a marketplace.",
  url: getSiteUrl(),
  contact: {
    email: "support@lancers.dev",
  },
} as const;

