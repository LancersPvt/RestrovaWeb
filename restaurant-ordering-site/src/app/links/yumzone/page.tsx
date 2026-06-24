import {
  Facebook,
  Instagram,
  Download,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Navigation,
  Pizza,
  Star,
  Flame,
} from "lucide-react";

import Image from "next/image";
import { Bungee, Nunito_Sans } from "next/font/google";
import logo from "./logo.jpeg";

const headingFont = Bungee({
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
  playStore: "https://play.google.com/store/apps/details?id=com.restrova.yumzone",

  // Enable only after replacing with the real Yum Zone App Store URL:
  // appStore: "https://apps.apple.com/pk/app/yum-zone/...",

  facebook: "https://www.facebook.com/p/YUM-ZONE-61565917286913/",
  instagram: "https://www.instagram.com/yumzone553/",
  googleMaps: "https://maps.app.goo.gl/yR8KmTXk7GRKw1Fn9",
  whatsapp: "https://wa.me/923325532222",
};

type ButtonVariant = "yellow" | "black" | "red" | "orange" | "white" | "green";

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "yellow",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, string> = {
    yellow:
      "bg-gradient-to-br from-[#FFC229] via-[#F5A800] to-[#D98200] text-[#080808] hover:brightness-110",
    orange:
      "bg-gradient-to-br from-[#FF9A22] via-[#F47612] to-[#B84608] text-white hover:brightness-110",
    red:
      "bg-gradient-to-br from-[#EF233C] via-[#C9142B] to-[#7E0F1B] text-white hover:brightness-110",
    black:
      "bg-gradient-to-br from-[#181818] via-[#0B0B0B] to-[#020202] text-white hover:from-[#242424]",
    white:
      "bg-gradient-to-br from-[#FFFFFF] via-[#FFF6DC] to-[#F6DCA1] text-[#080808] hover:brightness-105",
    green:
      "bg-gradient-to-br from-[#16A34A] via-[#0E7A36] to-[#064D21] text-white hover:brightness-110",
  };

  const isLight = variant === "yellow" || variant === "white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[26px] border-[3px] border-[#FFC229] px-4 py-4 shadow-[7px_7px_0_#000000] ring-1 ring-white/10 transition duration-300 hover:-translate-y-[2px] hover:shadow-[10px_10px_0_#000000,0_0_26px_rgba(255,194,41,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_#000000] sm:px-5 ${variants[variant]}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 ${
            isLight
              ? "border-black/70 bg-black/10 text-[#080808]"
              : "border-[#FFC229]/70 bg-[#FFC229]/12 text-[#FFC229]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`truncate text-[13px] font-black uppercase tracking-wide sm:text-[15px] ${headingFont.className}`}
          >
            {label}
          </div>

          {sublabel ? (
            <div
              className={`mt-0.5 text-xs font-bold sm:text-[13px] ${
                isLight ? "text-black/70" : "text-white/75"
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
      <div className="h-[3px] w-9 rounded-full bg-[#FFC229]" />
      <p
        className={`text-[10px] font-black uppercase tracking-[0.28em] text-[#FFC229] sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
      <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#FFC229]/70 to-transparent" />
    </div>
  );
}

function BackgroundPattern() {
  const rows = [120, 320, 520, 720, 920, 1120, 1320, 1520, 1720, 1920];

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
              C 150 ${y - 95}, 330 ${y + 80}, 560 ${y - 10}
              S 870 ${y - 85}, 1080 ${y + 30}
              S 1320 ${y + 80}, 1560 ${y - 30}`}
          stroke="#FFC229"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.12"
        />
      ))}

      {[240, 640, 1040, 1440, 1840].map((y, index) => (
        <path
          key={`red-${index}`}
          d={`M -100 ${y}
              C 180 ${y + 85}, 420 ${y - 80}, 680 ${y + 15}
              S 1060 ${y + 100}, 1540 ${y - 30}`}
          stroke="#EF233C"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.11"
        />
      ))}
    </svg>
  );
}

function PizzaSliceIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M14 55L31 9C43 14 51 22 56 34L14 55Z"
        fill="#FFD84D"
        stroke="#050505"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M29 10C42 14 51 23 56 34C52 38 47 38 42 36C35 33 27 33 20 38"
        fill="#F79C21"
        stroke="#050505"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="29" r="5" fill="#EF233C" stroke="#050505" strokeWidth="2.5" />
      <circle cx="42" cy="31" r="4.5" fill="#EF233C" stroke="#050505" strokeWidth="2.5" />
      <circle cx="24" cy="43" r="4" fill="#EF233C" stroke="#050505" strokeWidth="2.5" />
      <path
        d="M19 48C18 54 22 55 24 49M33 40C32 47 37 49 39 42"
        stroke="#FFD84D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="37" cy="22" r="2" fill="#050505" />
      <circle cx="48" cy="36" r="2" fill="#050505" />
      <circle cx="26" cy="36" r="2" fill="#050505" />
    </svg>
  );
}

function PepperoniIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <circle cx="32" cy="32" r="21" fill="#EF233C" stroke="#050505" strokeWidth="3" />
      <circle cx="24" cy="26" r="4" fill="#FF6B6B" />
      <circle cx="39" cy="34" r="4" fill="#FF6B6B" />
      <circle cx="29" cy="42" r="3" fill="#FF6B6B" />
      <path
        d="M20 20C27 15 38 16 45 24"
        stroke="#FFC229"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function CheeseDripIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M12 18H52V34C52 40 48 43 44 40C40 37 42 31 38 31C34 31 35 42 29 45C22 49 22 37 22 34C22 31 18 32 18 38C18 43 12 43 12 36V18Z"
        fill="#FFC229"
        stroke="#050505"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C22 10 40 10 52 18"
        fill="#F79C21"
        stroke="#050505"
        strokeWidth="3"
      />
      <circle cx="24" cy="24" r="2.5" fill="#EF233C" />
      <circle cx="39" cy="24" r="2.5" fill="#EF233C" />
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
      className={`pointer-events-none absolute hidden h-[78px] w-[78px] items-center justify-center rounded-full border-[4px] border-[#FFC229] bg-[#080808]/95 shadow-[0_18px_40px_rgba(0,0,0,0.55),0_0_24px_rgba(255,194,41,0.15)] lg:flex ${className}`}
      style={{ animation: `floatYum 6s ease-in-out ${delay} infinite` }}
    >
      {children}
    </div>
  );
}

function CheeseSlash({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden h-4 w-28 rounded-full border-[3px] border-black bg-[#FFC229] shadow-[5px_5px_0_#000000] lg:block ${className}`}
      style={{ animation: `floatYum 5s ease-in-out ${delay} infinite` }}
    />
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`rounded-full border-2 border-[#FFC229] bg-[#0A0A0A] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#FFC229] shadow-[3px_3px_0_#000000] sm:text-[11px] ${headingFont.className}`}
    >
      {children}
    </div>
  );
}

export default function YumZoneLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#050505] text-white`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,194,41,0.28),transparent_36%),radial-gradient(circle_at_10%_30%,rgba(239,35,60,0.14),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(255,154,34,0.16),transparent_30%),linear-gradient(180deg,#101010_0%,#050505_62%,#000000_100%)]" />

        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:32px_32px]" />

        <BackgroundPattern />

        <DecorBadge className="left-[5%] top-[11%]" delay="0.2s">
          <PizzaSliceIcon />
        </DecorBadge>

        <DecorBadge className="right-[7%] top-[16%]" delay="1s">
          <PepperoniIcon />
        </DecorBadge>

        <DecorBadge className="left-[8%] top-[58%]" delay="1.8s">
          <CheeseDripIcon />
        </DecorBadge>

        <DecorBadge className="right-[8%] top-[68%]" delay="0.5s">
          <PizzaSliceIcon />
        </DecorBadge>

        <CheeseSlash className="left-[13%] top-[38%] rotate-[-26deg]" delay="0.6s" />
        <CheeseSlash className="right-[14%] top-[47%] rotate-[18deg]" delay="1.3s" />
        <CheeseSlash className="left-[18%] bottom-[24%] rotate-[12deg]" delay="0.9s" />
        <CheeseSlash className="right-[18%] bottom-[16%] rotate-[-18deg]" delay="1.7s" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
        <div className="relative rounded-[36px] border-[4px] border-[#FFC229] bg-[#090909]/95 p-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.65),0_0_42px_rgba(255,194,41,0.16)] backdrop-blur">
          <div className="absolute -inset-px rounded-[36px] bg-gradient-to-br from-[#FFC229]/18 via-transparent to-[#EF233C]/15" />

          <div className="relative rounded-[28px] border-[2px] border-[#FFC229]/65 bg-gradient-to-br from-[#151515] via-[#090909] to-[#020202] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-[3px] border-[#FFC229] bg-black shadow-[0_14px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,194,41,0.22)] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Yum Zone logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`inline-flex items-center gap-1 rounded-full border-2 border-[#FFC229] bg-[#FFC229] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#080808] shadow-[4px_4px_0_#000000] ${headingFont.className}`}
                >
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1
                  className={`mt-3 bg-gradient-to-b from-[#FFEAA2] via-[#FFC229] to-[#F47612] bg-clip-text text-[32px] font-black uppercase leading-[0.95] tracking-tight text-transparent sm:text-[46px] ${headingFont.className}`}
                >
                  Yum Zone
                </h1>

                <p className="mt-2 max-w-[360px] text-sm font-bold text-white/70 sm:text-[15px]">
                  Pizza, tasty bites, healthy munching & official updates.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border-[3px] border-[#FFC229] bg-gradient-to-br from-[#FFC229] via-[#F5A800] to-[#D98200] px-4 py-3 text-[#080808] shadow-[7px_7px_0_#000000]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-black/70 bg-black/10">
                  <BadgePercent className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-black uppercase sm:text-[15px] ${headingFont.className}`}
                  >
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-extrabold text-black/70 sm:text-[13px]">
                    Download the app for discounts & special offers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Pizza</MiniChip>
              <MiniChip>Deals</MiniChip>
              <MiniChip>Fresh Bites</MiniChip>
              <MiniChip>Official Links</MiniChip>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <SectionTitle>Download our app</SectionTitle>

          <LinkButton
            href={LINKS.playStore}
            icon={<Download className="h-5 w-5" />}
            label="Google Play Store"
            sublabel="Exclusive deals and discounts"
            variant="yellow"
          />

          <div className="pt-2">
            <SectionTitle>Follow us</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="News, offers, and updates"
            variant="black"
          />

          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="Photos, reels, and stories"
            variant="red"
          />

          <div className="pt-2">
            <SectionTitle>Contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<Navigation className="h-5 w-5" />}
            label="Google Maps"
            sublabel="Tap to open directions"
            variant="white"
          />

          <LinkButton
            href={LINKS.whatsapp}
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            sublabel="Chat with us for orders & queries"
            variant="green"
          />
        </div>

        <footer className="mt-auto pt-10 text-center">
          <div
            className={`inline-flex rounded-full border-2 border-[#FFC229] bg-[#070707] px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#FFC229] shadow-[4px_4px_0_#000000] sm:text-xs ${headingFont.className}`}
          >
            © {new Date().getFullYear()} Yum Zone
          </div>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatYum {
              0%, 100% {
                transform: translateY(0) rotate(var(--tw-rotate, 0deg));
              }
              50% {
                transform: translateY(-10px) rotate(var(--tw-rotate, 0deg));
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