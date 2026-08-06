function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://www.restrova.com";
}

export const siteConfig = {
  name: "Restrova",
  description:
    "Restrova helps restaurants grow direct orders with a branded ordering website, customer apps, and simple tools for managing orders, menus, and customer relationships.",
  url: getSiteUrl(),
  contact: {
    email: "support@lancers.dev",
  },
} as const;

