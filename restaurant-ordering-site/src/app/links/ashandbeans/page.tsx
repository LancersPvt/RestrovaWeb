import {
  Facebook,
  Instagram,
  Store,
  Download,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Coffee,
  Navigation,
} from "lucide-react";

import Image from "next/image";
import { Rye, Nunito_Sans } from "next/font/google";
import logo from "./logo.jpeg";

const headingFont = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-body",
});

const LINKS = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.ashandbeans",
  appStore: "https://apps.apple.com/pk/app/ash-beans/id6759486466",
  facebook: "https://facebook.com/YOUR_PAGE",
  instagram: "https://instagram.com/ash_beans",
  googleMaps: "https://share.google/LmWOjk85C8nZY3Oz9",
  whatsapp: "https://wa.me/923318226835",
};

type ButtonVariant = "charcoal" | "cream" | "green" | "coffee" | "bean";

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
    charcoal: "bg-[#55585A] text-white hover:bg-[#47494B]",
    cream: "bg-[#FFF8EA] text-[#3F4142] hover:bg-white",
    green: "bg-[#0B8D43] text-white hover:bg-[#087A3A]",
    coffee: "bg-[#6B4A34] text-white hover:bg-[#5B3E2C]",
    bean: "bg-[#941A1F] text-white hover:bg-[#7D1419]",
  };

  const isLight = variant === "cream";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border-[3px] border-[#4F5254] px-4 py-4 shadow-[6px_6px_0_#4F5254] transition duration-200 hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#4F5254] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_#4F5254] sm:px-5 ${variants[variant]}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-[#4F5254] ${
            isLight ? "bg-[#F1E4D0] text-[#4F5254]" : "bg-white/14 text-white"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`truncate text-sm font-black uppercase tracking-wide sm:text-[15px] ${
              headingFont.className
            }`}
          >
            {label}
          </div>

          {sublabel ? (
            <div
              className={`mt-0.5 text-xs font-bold sm:text-[13px] ${
                isLight ? "text-[#4F5254]/70" : "text-white/75"
              }`}
            >
              {sublabel}
            </div>
          ) : null}
        </div>
      </div>

      <ArrowRight className="relative ml-3 h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-1 pt-2">
      <div className="h-[3px] w-8 rounded-full bg-[#4F5254]" />
      <p
        className={`text-[10px] font-black uppercase tracking-[0.25em] text-[#4F5254] sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
    </div>
  );
}

function BackgroundSteam() {
  const rows = [120, 300, 480, 660, 840, 1020, 1200, 1380, 1560, 1740, 1920];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 2100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {rows.map((y, index) => (
        <path
          key={index}
          d={`M -120 ${y}
              C 110 ${y - 90}, 250 ${y + 80}, 450 ${y - 10}
              S 760 ${y - 70}, 950 ${y + 18}
              S 1220 ${y + 76}, 1540 ${y - 40}`}
          stroke="#5A5D5F"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.13"
        />
      ))}

      {[230, 620, 1010, 1400, 1790].map((y, index) => (
        <path
          key={`green-${index}`}
          d={`M -80 ${y}
              C 180 ${y + 70}, 330 ${y - 60}, 560 ${y + 10}
              S 910 ${y + 90}, 1140 ${y - 20}
              S 1350 ${y - 70}, 1540 ${y + 40}`}
          stroke="#0B8D43"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.14"
        />
      ))}
    </svg>
  );
}

function CoffeeBeanIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <ellipse
        cx="32"
        cy="32"
        rx="18"
        ry="25"
        fill="#941A1F"
        stroke="#4F5254"
        strokeWidth="3"
        transform="rotate(-24 32 32)"
      />
      <path
        d="M25 13C36 24 25 39 39 51"
        stroke="#FFF8EA"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M10 44C20 18 42 12 55 12C49 31 34 49 10 44Z"
        fill="#0B8D43"
        stroke="#4F5254"
        strokeWidth="3"
      />
      <path
        d="M14 42C26 34 35 26 50 14"
        stroke="#FFF8EA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M28 33L28 20M36 26L44 25M22 38L18 30"
        stroke="#FFF8EA"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M18 29H43V42C43 49 38 54 31 54H30C23 54 18 49 18 42V29Z"
        fill="#FFF8EA"
        stroke="#4F5254"
        strokeWidth="3"
      />
      <path
        d="M43 33H48C53 33 55 37 53 42C51 47 47 48 43 46"
        fill="none"
        stroke="#4F5254"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 22C18 15 29 14 24 7M34 22C28 15 39 14 34 7M44 22C38 15 49 14 44 7"
        stroke="#4F5254"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 55H48"
        stroke="#4F5254"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SnackIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M14 28C18 16 31 10 44 17C54 23 55 38 46 47C36 57 19 52 14 39C13 36 13 32 14 28Z"
        fill="#D8B47B"
        stroke="#4F5254"
        strokeWidth="3"
      />
      <circle cx="27" cy="29" r="3" fill="#6B4A34" />
      <circle cx="39" cy="36" r="3" fill="#6B4A34" />
      <circle cx="30" cy="43" r="2.5" fill="#6B4A34" />
      <path
        d="M22 20C27 23 33 22 39 19"
        stroke="#FFF8EA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DecorBadge({
  children,
  className,
  delay = "0s",
}: {
  children: React.ReactNode;
  className: string;
  delay?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden h-[76px] w-[76px] items-center justify-center rounded-full border-[4px] border-[#4F5254] bg-[#FFF8EA] shadow-[6px_6px_0_#4F5254] lg:flex ${className}`}
      style={{ animation: `floatCafe 6s ease-in-out ${delay} infinite` }}
    >
      {children}
    </div>
  );
}

function SteamAccent({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`pointer-events-none absolute hidden h-20 w-20 lg:block ${className}`}
      style={{ animation: `floatCafe 5s ease-in-out ${delay} infinite` }}
      aria-hidden="true"
    >
      <path
        d="M25 62C12 46 38 42 25 25C18 16 29 12 35 8"
        fill="none"
        stroke="#4F5254"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M47 66C34 50 60 45 47 28C40 18 52 14 58 10"
        fill="none"
        stroke="#0B8D43"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border-2 border-[#4F5254] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#4F5254] shadow-[3px_3px_0_#4F5254] sm:text-[11px]">
      {children}
    </div>
  );
}

export default function AshAndBeansLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#EFE2CF] text-[#4F5254]`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundSteam />

        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#0B8D43]/10 blur-3xl" />
        <div className="absolute -right-24 top-64 h-96 w-96 rounded-full bg-[#941A1F]/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6B4A34]/10 blur-3xl" />

        <DecorBadge className="left-[5%] top-[11%]" delay="0.2s">
          <CoffeeBeanIcon />
        </DecorBadge>

        <DecorBadge className="right-[7%] top-[16%]" delay="1s">
          <LeafIcon />
        </DecorBadge>

        <DecorBadge className="left-[8%] top-[58%]" delay="1.8s">
          <CupIcon />
        </DecorBadge>

        <DecorBadge className="right-[8%] top-[67%]" delay="0.5s">
          <SnackIcon />
        </DecorBadge>

        <SteamAccent className="left-[14%] top-[36%]" delay="0.6s" />
        <SteamAccent className="right-[14%] top-[43%]" delay="1.3s" />
        <SteamAccent className="left-[17%] bottom-[20%]" delay="0.9s" />
        <SteamAccent className="right-[17%] bottom-[15%]" delay="1.7s" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
        <div className="rounded-[34px] border-[5px] border-[#4F5254] bg-white p-[10px] shadow-[10px_10px_0_#4F5254]">
          <div className="rounded-[26px] border-[3px] border-[#0B8D43] bg-[#FFF8EA] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-[4px] border-[#4F5254] bg-white shadow-[4px_4px_0_#4F5254] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Ash & Beans logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#4F5254] bg-[#0B8D43] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[3px_3px_0_#4F5254]">
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1
                  className={`mt-3 text-[30px] font-black uppercase leading-[0.98] tracking-tight text-[#4F5254] sm:text-[42px] ${headingFont.className}`}
                >
                  Ash & Beans
                </h1>

                <p className="mt-2 max-w-[360px] text-sm font-extrabold text-[#4F5254]/70 sm:text-[15px]">
                  Coffee, tea, snacks, tobacco & official updates.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border-[3px] border-[#4F5254] bg-[#EFE2CF] px-4 py-3 shadow-[5px_5px_0_#4F5254]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-[#4F5254] bg-white">
                  <BadgePercent className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-black uppercase sm:text-[15px] ${headingFont.className}`}
                  >
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-bold text-[#4F5254]/70 sm:text-[13px]">
                    Download the app for discounts & special offers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Coffee</MiniChip>
              <MiniChip>Tea</MiniChip>
              <MiniChip>Snacks</MiniChip>
              <MiniChip>Official Links</MiniChip>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <SectionTitle>Download our app</SectionTitle>

          <LinkButton
            href={LINKS.playStore}
            icon={<Download className="h-5 w-5" />}
            label="Google Play"
            sublabel="Exclusive deals and discounts"
            variant="charcoal"
          />

          <LinkButton
            href={LINKS.appStore}
            icon={<Store className="h-5 w-5" />}
            label="Apple App Store"
            sublabel="Exclusive deals and discounts"
            variant="coffee"
          />

          <div className="pt-2">
            <SectionTitle>Follow us</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="News, offers, and updates"
            variant="cream"
          />

          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="Photos, reels, and stories"
            variant="bean"
          />

          <div className="pt-2">
            <SectionTitle>Contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<Navigation className="h-5 w-5" />}
            label="Google Maps"
            sublabel="Tap to open directions"
            variant="green"
          />

          <LinkButton
            href={LINKS.whatsapp}
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            sublabel="Chat with us for orders & queries"
            variant="coffee"
          />
        </div>

        <footer className="mt-auto pt-10 text-center">
          <div
            className={`inline-flex rounded-full border-[3px] border-[#4F5254] bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#4F5254] shadow-[4px_4px_0_#4F5254] sm:text-xs ${headingFont.className}`}
          >
            © {new Date().getFullYear()} Ash & Beans
          </div>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatCafe {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            html {
              scroll-behavior: smooth;
            }

            body {
              margin: 0;
            }
          `,
        }}
      />
    </main>
  );
}