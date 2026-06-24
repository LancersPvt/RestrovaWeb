import {
  Download,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Navigation,
  Flame,
  UtensilsCrossed,
  Crown,
} from "lucide-react";

import Image from "next/image";
import { Cinzel, Manrope } from "next/font/google";
import logo from "./logo.png";

const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const LINKS = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.basmafood",
  googleMaps: "https://maps.app.goo.gl/qHM2w7Ura3ZbS5jYA",
  whatsapp: "https://wa.me/923155054406",
};

type ButtonVariant = "gold" | "black" | "deepGold" | "green";

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "gold",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, string> = {
    gold:
      "bg-gradient-to-br from-[#F8D978] via-[#C9972D] to-[#8C5A13] text-[#120F0A] hover:brightness-110",
    deepGold:
      "bg-gradient-to-br from-[#B98322] via-[#8C5A13] to-[#4A2D0A] text-white hover:brightness-110",
    black:
      "bg-gradient-to-br from-[#191714] via-[#0D0D0C] to-[#050505] text-white hover:from-[#24211D]",
    green:
      "bg-gradient-to-br from-[#0B7A3B] via-[#07592B] to-[#04391C] text-white hover:brightness-110",
  };

  const isLight = variant === "gold";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border border-[#F5D27A]/70 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-black/50 transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_24px_55px_rgba(0,0,0,0.45),0_0_28px_rgba(245,210,122,0.18)] active:translate-y-[1px] sm:px-5 ${variants[variant]}`}
    >
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.24)_45%,transparent_60%)] [background-size:220%_220%] [background-position:150%_0] transition-all duration-700 group-hover:[background-position:-50%_0]" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${
            isLight
              ? "border-black/30 bg-black/10 text-[#15120C]"
              : "border-[#F5D27A]/50 bg-[#F5D27A]/10 text-[#F8D978]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`truncate text-sm font-black uppercase tracking-wide sm:text-[15px] ${headingFont.className}`}
          >
            {label}
          </div>

          {sublabel ? (
            <div
              className={`mt-0.5 text-xs font-semibold sm:text-[13px] ${
                isLight ? "text-black/70" : "text-white/70"
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
      <div className="h-px w-10 bg-gradient-to-r from-transparent via-[#F5D27A] to-[#F5D27A]" />
      <p
        className={`text-[10px] font-black uppercase tracking-[0.28em] text-[#F8D978] sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
      <div className="h-px flex-1 bg-gradient-to-r from-[#F5D27A] to-transparent opacity-60" />
    </div>
  );
}

function LuxuryBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-100"
      viewBox="0 0 1440 2200"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#F8D978" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#C9972D" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="2200" fill="url(#goldGlow)" />

      {[160, 410, 660, 910, 1160, 1410, 1660, 1910].map((y, index) => (
        <path
          key={index}
          d={`M -120 ${y}
              C 150 ${y - 120}, 350 ${y + 110}, 570 ${y - 20}
              S 960 ${y - 90}, 1180 ${y + 40}
              S 1440 ${y + 70}, 1580 ${y - 40}`}
          stroke="#F5D27A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.13"
        />
      ))}

      {[260, 760, 1260, 1760].map((y, index) => (
        <path
          key={`thin-${index}`}
          d={`M -100 ${y}
              C 220 ${y + 90}, 420 ${y - 80}, 720 ${y + 15}
              S 1120 ${y + 110}, 1540 ${y - 30}`}
          stroke="#B98322"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.18"
        />
      ))}
    </svg>
  );
}

function GoldenFlameIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M34 6C42 17 32 20 45 32C52 39 48 54 33 58C20 55 13 45 19 33C23 25 31 23 28 14C32 17 35 21 34 29C43 23 43 14 34 6Z"
        fill="url(#flameGold)"
        stroke="#090807"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M31 34C36 39 35 48 29 53C24 49 24 41 31 34Z"
        fill="#FFF2B8"
        opacity="0.75"
      />
      <defs>
        <linearGradient id="flameGold" x1="20" y1="8" x2="47" y2="58">
          <stop stopColor="#FFF0A5" />
          <stop offset="0.45" stopColor="#D39A2B" />
          <stop offset="1" stopColor="#7A4208" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClocheIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M12 45C15 29 23 21 32 21C41 21 49 29 52 45H12Z"
        fill="#F8D978"
        stroke="#090807"
        strokeWidth="3"
      />
      <path
        d="M28 20C28 16 36 16 36 20"
        stroke="#090807"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M9 49H55"
        stroke="#090807"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 39C25 32 33 29 43 33"
        stroke="#FFF4C2"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RoyalForkKnifeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M20 9V28M14 9V28M26 9V28M14 28C14 35 26 35 26 28M20 35V55"
        stroke="#F8D978"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43 10C37 18 36 30 44 35V55"
        stroke="#F8D978"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      className={`pointer-events-none absolute hidden h-[78px] w-[78px] items-center justify-center rounded-full border border-[#F5D27A]/70 bg-[#0C0B09]/90 shadow-[0_16px_35px_rgba(0,0,0,0.5),0_0_24px_rgba(245,210,122,0.12)] ring-1 ring-black lg:flex ${className}`}
      style={{ animation: `floatLuxury 6s ease-in-out ${delay} infinite` }}
    >
      {children}
    </div>
  );
}

function Ornament({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 60"
      className={`pointer-events-none absolute hidden h-16 w-44 text-[#F5D27A]/35 lg:block ${className}`}
      style={{ animation: `floatLuxury 7s ease-in-out ${delay} infinite` }}
      aria-hidden="true"
    >
      <path
        d="M8 30H54C70 30 65 8 47 18C35 25 45 44 64 42C80 40 78 22 90 22C102 22 100 40 116 42C135 44 145 25 133 18C115 8 110 30 126 30H172"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M90 8C94 18 104 22 114 22C104 26 94 32 90 52C86 32 76 26 66 22C76 22 86 18 90 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`rounded-full border border-[#F5D27A]/70 bg-[#0B0A08] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#F8D978] shadow-[0_8px_22px_rgba(0,0,0,0.25)] sm:text-[11px] ${headingFont.className}`}
    >
      {children}
    </div>
  );
}

export default function BasmaFoodLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#070706] text-white`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(248,217,120,0.26),transparent_38%),radial-gradient(circle_at_10%_20%,rgba(185,131,34,0.12),transparent_28%),radial-gradient(circle_at_90%_55%,rgba(248,217,120,0.1),transparent_30%),linear-gradient(180deg,#11100D_0%,#060606_60%,#020202_100%)]" />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:34px_34px]" />

        <LuxuryBackground />

        <DecorBadge className="left-[5%] top-[12%]" delay="0.2s">
          <GoldenFlameIcon />
        </DecorBadge>

        <DecorBadge className="right-[7%] top-[17%]" delay="1s">
          <ClocheIcon />
        </DecorBadge>

        <DecorBadge className="left-[8%] top-[58%]" delay="1.8s">
          <RoyalForkKnifeIcon />
        </DecorBadge>

        <DecorBadge className="right-[8%] top-[68%]" delay="0.6s">
          <GoldenFlameIcon />
        </DecorBadge>

        <Ornament className="left-[9%] top-[38%]" delay="0.7s" />
        <Ornament className="right-[9%] top-[48%]" delay="1.4s" />
        <Ornament className="left-[13%] bottom-[16%]" delay="1.1s" />
        <Ornament className="right-[13%] bottom-[10%]" delay="1.9s" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
        <div className="relative rounded-[36px] border border-[#F5D27A]/80 bg-[#0A0908]/90 p-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_40px_rgba(245,210,122,0.15)] ring-1 ring-black backdrop-blur">
          <div className="absolute -inset-px rounded-[36px] bg-gradient-to-br from-[#FFF1A8]/20 via-transparent to-[#B98322]/15 opacity-70" />

          <div className="relative rounded-[28px] border border-[#F5D27A]/45 bg-gradient-to-br from-[#171411] via-[#0C0B09] to-[#050505] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#F5D27A]/90 bg-black shadow-[0_12px_30px_rgba(0,0,0,0.45),0_0_22px_rgba(245,210,122,0.2)] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Basma Food logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`inline-flex items-center gap-1 rounded-full border border-[#F5D27A]/70 bg-[#F8D978] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#120F0A] shadow-[0_8px_18px_rgba(0,0,0,0.35)] ${headingFont.className}`}
                >
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1
                  className={`mt-3 bg-gradient-to-b from-[#FFF4BA] via-[#F5C65D] to-[#8C5A13] bg-clip-text text-[30px] font-black uppercase leading-[0.98] tracking-tight text-transparent sm:text-[42px] ${headingFont.className}`}
                >
                  Basma Food
                </h1>

                <p className="mt-2 max-w-[360px] text-sm font-semibold text-white/68 sm:text-[15px]">
                  Premium taste, fresh food, official links & app-exclusive deals.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-[#F5D27A]/60 bg-gradient-to-br from-[#F8D978] via-[#C9972D] to-[#7B4A0C] px-4 py-3 text-[#120F0A] shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/25 bg-black/10">
                  <BadgePercent className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-black uppercase sm:text-[15px] ${headingFont.className}`}
                  >
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-bold text-black/70 sm:text-[13px]">
                    Download the app for discounts & special offers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Fresh Food</MiniChip>
              <MiniChip>Premium Taste</MiniChip>
              <MiniChip>Deals</MiniChip>
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
            variant="gold"
          />

          <div className="pt-2">
            <SectionTitle>Contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<Navigation className="h-5 w-5" />}
            label="Google Maps"
            sublabel="Tap to open directions"
            variant="black"
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
            className={`inline-flex rounded-full border border-[#F5D27A]/70 bg-[#0B0A08] px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#F8D978] shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:text-xs ${headingFont.className}`}
          >
            © {new Date().getFullYear()} Basma Food
          </div>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatLuxury {
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