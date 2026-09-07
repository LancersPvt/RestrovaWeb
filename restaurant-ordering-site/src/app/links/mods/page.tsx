import {
  ArrowRight,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pizza,
  ShoppingBag,
  Sparkles,
  Utensils,
} from "lucide-react";

import Image from "next/image";
import { Bungee, Fredoka } from "next/font/google";
import logo from "./logo.png";

const headingFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Replace these with the client's real links.
const LINKS = {
  orderOnline: "#",
  menu: "#",
  googleMaps: "#",
  whatsapp: "#",
  phone: "#",
  instagram: "#",
  facebook: "#",
};

type ButtonVariant = "orange" | "dark" | "cream";

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "cream",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, string> = {
    orange:
      "bg-[#F35D2B] text-white border-[#454548] hover:bg-[#FF6B37]",
    dark: "bg-[#454548] text-white border-[#454548] hover:bg-[#353537]",
    cream:
      "bg-[#FFF8EF] text-[#454548] border-[#454548] hover:bg-white",
  };

  const isDark = variant === "dark";
  const isOrange = variant === "orange";
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] border-[3px] px-4 py-4 shadow-[6px_6px_0_#454548] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#454548] sm:px-5 ${variants[variant]}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border-[16px] border-current opacity-[0.06]" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[2px] transition duration-200 group-hover:-rotate-6 group-hover:scale-105 ${
            isDark
              ? "border-white/25 bg-white/10 text-white"
              : isOrange
                ? "border-white/30 bg-[#454548]/15 text-white"
                : "border-[#454548] bg-[#F35D2B] text-white"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className={`truncate text-[13px] uppercase tracking-[0.035em] sm:text-[15px] ${headingFont.className}`}
          >
            {label}
          </p>
          {sublabel ? (
            <p
              className={`mt-1 text-xs font-semibold sm:text-[13px] ${
                isDark || isOrange ? "text-white/70" : "text-[#454548]/60"
              }`}
            >
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={`relative ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border-[2px] transition duration-200 group-hover:translate-x-1 ${
          isDark || isOrange
            ? "border-white/25 bg-white/10"
            : "border-[#454548] bg-[#FFF2E4]"
        }`}
      >
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-1 pt-3">
      <span className="h-[4px] w-10 rounded-full bg-[#F35D2B]" />
      <p
        className={`text-[10px] uppercase tracking-[0.22em] text-[#454548]/70 sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
      <span className="h-[2px] flex-1 bg-[#454548]/15" />
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border-[2px] border-[#454548] bg-[#FFF8EF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#454548] shadow-[2px_2px_0_#454548] sm:text-[11px]">
      {children}
    </div>
  );
}

function BackgroundDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-36 -top-32 h-80 w-80 rounded-full bg-[#F35D2B]/18 blur-2xl" />
      <div className="absolute -right-40 top-[28%] h-[360px] w-[360px] rounded-full bg-[#F35D2B]/12 blur-2xl" />
      <div className="absolute bottom-[-120px] left-[20%] h-72 w-72 rounded-full bg-[#F35D2B]/12 blur-2xl" />

      <Pizza className="absolute left-[5%] top-[6%] h-24 w-24 -rotate-12 text-[#F35D2B]/15 sm:h-32 sm:w-32" strokeWidth={1.3} />
      <Flame className="absolute right-[3%] top-[18%] h-20 w-20 rotate-12 text-[#454548]/10 sm:h-28 sm:w-28" strokeWidth={1.3} />
      <Utensils className="absolute bottom-[12%] left-[2%] h-20 w-20 -rotate-12 text-[#454548]/10 sm:h-28 sm:w-28" strokeWidth={1.3} />
      <Sparkles className="absolute bottom-[4%] right-[5%] h-16 w-16 rotate-6 text-[#F35D2B]/18 sm:h-24 sm:w-24" strokeWidth={1.3} />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #454548 1.4px, transparent 1.4px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

export default function ModsLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#FFF1E3] text-[#454548]`}
    >
      <BackgroundDoodles />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[680px] flex-col px-4 py-7 sm:px-6 sm:py-10 lg:py-14">
        <header>
          <div className="relative overflow-hidden rounded-[32px] border-[3px] border-[#454548] bg-[#F35D2B] shadow-[9px_9px_0_#454548]">
            <div className="relative aspect-[4/3] min-h-[285px] w-full sm:min-h-[360px]">
              <Image
                src={logo}
                alt="MODS restaurant logo"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[28px] border-[3px] border-[#454548] bg-[#FFF8EF] p-5 shadow-[7px_7px_0_#454548] sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border-[18px] border-[#F35D2B]/10" />

            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border-[2px] border-[#454548] bg-[#F35D2B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[2px_2px_0_#454548]">
                <Sparkles className="h-3.5 w-3.5" />
                Official MODS Links
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#454548]/55">
                <span className="h-2 w-2 rounded-full bg-[#F35D2B]" />
                Fueling up with taste
              </div>
            </div>

            <h1
              className={`relative mt-5 max-w-[560px] text-[29px] uppercase leading-[1.02] tracking-tight sm:text-[42px] ${headingFont.className}`}
            >
              Hungry? You&apos;re in
              <span className="block text-[#F35D2B]">the right place.</span>
            </h1>

            <p className="relative mt-3 max-w-[540px] text-sm font-semibold leading-6 text-[#454548]/65 sm:text-[15px]">
              Order your favourites, check the menu, find MODS, or message us —
              everything you need is right here.
            </p>

            <div className="relative mt-5 flex flex-wrap gap-2">
              <MiniChip>Pizza</MiniChip>
              <MiniChip>Burgers</MiniChip>
              <MiniChip>Fries</MiniChip>
              <MiniChip>Good vibes</MiniChip>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-4">
          <SectionTitle>Order & explore</SectionTitle>

          <LinkButton
            href={LINKS.orderOnline}
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Order Online"
            sublabel="Get your MODS favourites delivered"
            variant="orange"
          />

          <LinkButton
            href={LINKS.menu}
            icon={<Menu className="h-5 w-5" />}
            label="View Menu"
            sublabel="See what's cooking at MODS"
            variant="cream"
          />

          <div className="pt-2">
            <SectionTitle>Visit & contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<MapPin className="h-5 w-5" />}
            label="Find Us"
            sublabel="Open MODS on Google Maps"
            variant="dark"
          />

          <LinkButton
            href={LINKS.whatsapp}
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            sublabel="Chat with us for orders and queries"
            variant="cream"
          />

          <LinkButton
            href={LINKS.phone}
            icon={<Phone className="h-5 w-5" />}
            label="Call MODS"
            sublabel="Tap to call the restaurant"
            variant="cream"
          />

          <div className="pt-2">
            <SectionTitle>Follow MODS</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="Food shots, reels, offers and updates"
            variant="orange"
          />

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="Latest posts and announcements"
            variant="cream"
          />
        </div>

        <footer className="mt-auto pt-12 text-center">
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-[2px] w-10 bg-[#454548]/20" />
            <Flame className="h-5 w-5 text-[#F35D2B]" />
            <span className="h-[2px] w-10 bg-[#454548]/20" />
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#454548]/45 sm:text-xs">
            © {new Date().getFullYear()} MODS • Fueling up with Taste!
          </p>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scroll-behavior: smooth;
              background: #FFF1E3;
            }

            body {
              margin: 0;
              background: #FFF1E3;
            }

            ::selection {
              background: #F35D2B;
              color: #ffffff;
            }
          `,
        }}
      />
    </main>
  );
}
