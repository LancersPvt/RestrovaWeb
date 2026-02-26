import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "DigiAroma services: online ordering systems, customer apps, admin panels, POS/RMS modules, delivery management, and analytics for restaurants.",
};

const services = [
  {
    title: "Online Ordering System",
    points: [
      "Pickup / delivery / dine-in flows",
      "Menu, deals, add-ons, and customizations",
      "Branded ordering website + deep links to app",
    ],
  },
  {
    title: "Customer App (Android & iOS)",
    points: [
      "Fast ordering experience like modern brands (KFC/Cheezious style)",
      "Login, addresses, order history",
      "Re-order, deals, and promotions",
    ],
  },
  {
    title: "Admin App + Order Management",
    points: [
      "Receive orders and manage statuses",
      "Kitchen workflows / ticket printing (optional)",
      "Staff-friendly screens for rush hours",
    ],
  },
  {
    title: "POS & RMS Modules",
    points: [
      "Sales + operations workflows",
      "Inventory / reporting modules (as needed)",
      "Custom integrations (optional)",
    ],
  },
  {
    title: "Delivery Fleet Management",
    points: [
      "Assign riders and track deliveries",
      "Delivery status updates",
      "Operational reporting",
    ],
  },
  {
    title: "Analytics & Insights",
    points: [
      "Best sellers and peak hours",
      "Customer retention & repeat orders",
      "Branch-level performance (optional)",
    ],
  },
  {
    title: "Loyalty & Engagement",
    points: [
      "Coupons, points, and rewards",
      "Push notifications (optional)",
      "Promotions and campaigns",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Services
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary/70">
        DigiAroma builds a complete restaurant ordering platform — customized for
        your brand and workflows. We’re not a marketplace.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-secondary/15 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-secondary">{s.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-secondary/70">
              {s.points.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/#contact"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Request a demo
        </Link>
      </div>
    </main>
  );
}
