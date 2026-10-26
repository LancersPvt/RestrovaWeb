// Marketing URLs must never depend on a preview/development environment.
export const siteConfig = {
  name: "Restrova",
  description:
    "Restaurant management software in Pakistan for branded ordering apps, websites, POS orders, inventory and rider management. Book a free Restrova demo.",
  url: "https://www.restrova.com",
  contact: {
    email: "support@lancers.dev",
    whatsapp: "923231543394",
  },
} as const;

export const isPreviewDeployment = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");

