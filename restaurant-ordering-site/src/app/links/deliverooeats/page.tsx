import {
  Facebook,
  Instagram,
  Download,
  BadgePercent,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Navigation,
  Flame,
  Pizza,
} from "lucide-react";

import Image from "next/image";
import { Bangers, Nunito_Sans } from "next/font/google";
import logo from "./logo.png"; // change to ./logo.jpeg if your file is jpeg

const headingFont = Bangers({
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
  // Replace with real Deliveroo Eats links
  playStore: "https://play.google.com/store/apps/details?id=com.restrova.deliverooeats",

  facebook: "https://facebook.com/YOUR_PAGE",
  instagram: "https://instagram.com/YOUR_PAGE",

  googleMaps: "https://maps.app.goo.gl/YOUR_MAP_LINK",
  whatsapp: "https://wa.me/923000000000",
};

type ButtonVariant = "red" | "black" | "white" | "pizza" | "green";

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "red",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, string> = {
    red: "bg-gradient-to-br from-[#E23726] via-[#C92016] to-[#861009] text-white hover:brightness-110",
    black:
      "bg-gradient-to-br from-[#161616] via-[#080808] to-[#000000] text-white hover:from-[#242424]",
    white:
      "bg-gradient-to-br from-white via-[#FFF4EF] to-[#FFD8CF] text-[#111111] hover:brightness-105",
    pizza:
      "bg-gradient-to-br from-[#FFD45A] via-[#FF9F1C] to-[#E23726] text-[#111111] hover:brightness-110",
    green:
      "bg-gradient-to-br from-[#1BA447] via-[#107332] to-[#064A20] text-white hover:brightness-110",
  };

  const isLight = variant === "white" || variant === "pizza";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border-[3px] border-[#111111] px-4 py-4 shadow-[7px_7px_0_#111111] transition duration-300 hover:-translate-y-[2px] hover:shadow-[10px_10px_0_#111111,0_0_28px_rgba(226,55,38,0.22)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_#111111] sm:px-5 ${variants[variant]}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 ${
            isLight
              ? "border-black/70 bg-black/10 text-[#111111]"
              : "border-white/30 bg-white/12 text-white"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`truncate text-[18px] uppercase tracking-wide sm:text-[20px] ${headingFont.className}`}
          >
            {label}
          </div>

          {sublabel ? (
            <div
              className={`mt-0.5 text-xs font-extrabold sm:text-[13px] ${
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
      <div className="h-[3px] w-9 rounded-full bg-[#E23726]" />
      <p
        className={`text-[17px] uppercase tracking-[0.08em] text-white drop-shadow-[2px_2px_0_#111] sm:text-[19px] ${headingFont.className}`}
      >
        {children}
      </p>
      <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#E23726] to-transparent" />
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
              C 160 ${y - 90}, 330 ${y + 80}, 570 ${y - 10}
              S 890 ${y - 80}, 1110 ${y + 35}
              S 1330 ${y + 85}, 1560 ${y - 30}`}
          stroke="#E23726"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.16"
        />
      ))}

      {[240, 640, 1040, 1440, 1840].map((y, index) => (
        <path
          key={`cheese-${index}`}
          d={`M -100 ${y}
              C 180 ${y + 80}, 420 ${y - 75}, 690 ${y + 15}
              S 1060 ${y + 95}, 1540 ${y - 30}`}
          stroke="#FFD45A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.14"
        />
      ))}
    </svg>
  );
}

function PizzaSliceIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M13 55L31 9C43 14 52 23 57 35L13 55Z"
        fill="#FFD45A"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M30 10C43 14 52 23 57 35C52 39 47 39 42 36C35 33 28 33 20 38"
        fill="#F28B22"
        stroke="#111"
        strokeWidth="3"
      />
      <circle cx="30" cy="29" r="5" fill="#E23726" stroke="#111" strokeWidth="2.5" />
      <circle cx="43" cy="32" r="4.5" fill="#E23726" stroke="#111" strokeWidth="2.5" />
      <circle cx="24" cy="43" r="4" fill="#E23726" stroke="#111" strokeWidth="2.5" />
      <path
        d="M19 48C18 54 22 56 24 49M34 40C33 47 38 49 40 42"
        stroke="#FFD45A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="22" r="2" fill="#111" />
      <circle cx="49" cy="36" r="2" fill="#111" />
      <circle cx="27" cy="36" r="2" fill="#111" />
    </svg>
  );
}

function TomatoIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <circle cx="32" cy="35" r="20" fill="#E23726" stroke="#111" strokeWidth="3" />
      <path
        d="M32 18C36 11 43 12 47 17C41 17 37 20 32 18ZM32 18C28 11 21 12 17 17C23 17 27 20 32 18Z"
        fill="#1BA447"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M22 33C26 27 34 25 43 29"
        stroke="#FFB2A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BasilIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M10 43C21 17 43 12 55 13C50 33 35 50 10 43Z"
        fill="#1BA447"
        stroke="#111"
        strokeWidth="3"
      />
      <path
        d="M15 41C27 33 37 25 51 15"
        stroke="#E9FFE9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M29 32L28 20M37 25L46 24M22 37L18 29"
        stroke="#E9FFE9"
        strokeWidth="2.5"
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
      className={`pointer-events-none absolute hidden h-[78px] w-[78px] items-center justify-center rounded-full border-[4px] border-[#E23726] bg-white shadow-[7px_7px_0_#111111,0_0_24px_rgba(226,55,38,0.18)] lg:flex ${className}`}
      style={{ animation: `floatDeliveroo 6s ease-in-out ${delay} infinite` }}
    >
      {children}
    </div>
  );
}

function RibbonAccent({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden h-5 w-32 rounded-sm border-[3px] border-[#111111] bg-[#E23726] shadow-[5px_5px_0_#111111] lg:block ${className}`}
      style={{ animation: `floatDeliveroo 5s ease-in-out ${delay} infinite` }}
    />
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`rounded-full border-2 border-[#111111] bg-white px-3 py-1 text-[17px] uppercase tracking-wide text-[#E23726] shadow-[3px_3px_0_#111111] ${headingFont.className}`}
    >
      {children}
    </div>
  );
}

export default function DeliverooEatsLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#070707] text-white`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(226,55,38,0.36),transparent_36%),radial-gradient(circle_at_12%_30%,rgba(255,212,90,0.18),transparent_30%),radial-gradient(circle_at_88%_62%,rgba(226,55,38,0.18),transparent_30%),linear-gradient(180deg,#121212_0%,#070707_62%,#000000_100%)]" />

        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:32px_32px]" />

        <BackgroundPattern />

        <DecorBadge className="left-[5%] top-[11%]" delay="0.2s">
          <PizzaSliceIcon />
        </DecorBadge>

        <DecorBadge className="right-[7%] top-[16%]" delay="1s">
          <TomatoIcon />
        </DecorBadge>

        <DecorBadge className="left-[8%] top-[58%]" delay="1.8s">
          <BasilIcon />
        </DecorBadge>

        <DecorBadge className="right-[8%] top-[68%]" delay="0.5s">
          <PizzaSliceIcon />
        </DecorBadge>

        <RibbonAccent className="left-[13%] top-[38%] rotate-[-18deg]" delay="0.6s" />
        <RibbonAccent className="right-[14%] top-[47%] rotate-[18deg]" delay="1.3s" />
        <RibbonAccent className="left-[18%] bottom-[24%] rotate-[12deg]" delay="0.9s" />
        <RibbonAccent className="right-[18%] bottom-[16%] rotate-[-18deg]" delay="1.7s" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
        <div className="relative rounded-[36px] border-[4px] border-[#E23726] bg-white p-[10px] shadow-[10px_10px_0_#111111,0_0_42px_rgba(226,55,38,0.18)]">
          <div className="absolute -inset-px rounded-[36px] bg-gradient-to-br from-[#FFD45A]/20 via-transparent to-[#E23726]/20" />

          <div className="relative rounded-[28px] border-[3px] border-[#111111] bg-[#FFFDF7] p-5 text-[#111111] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-[4px] border-[#111111] bg-white shadow-[5px_5px_0_#E23726] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Deliveroo Eats logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`inline-flex items-center gap-1 rounded-full border-2 border-[#111111] bg-[#E23726] px-3 py-1 text-[15px] uppercase tracking-wide text-white shadow-[3px_3px_0_#111111] ${headingFont.className}`}
                >
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1
                  className={`mt-3 text-[42px] uppercase leading-[0.88] tracking-wide text-[#E23726] [text-shadow:2px_2px_0_#111111] sm:text-[58px] ${headingFont.className}`}
                >
                  Deliveroo
                  <span className="block text-[#111111] [text-shadow:2px_2px_0_#E23726]">
                    Eats
                  </span>
                </h1>

                <p className="mt-3 max-w-[360px] text-sm font-extrabold text-black/65 sm:text-[15px]">
                  Hot & fresh pizza, tasty deals, official links and quick ordering.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border-[3px] border-[#111111] bg-[#E23726] px-4 py-3 text-white shadow-[6px_6px_0_#111111]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-white/70 bg-white/15">
                  <BadgePercent className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[20px] uppercase leading-none ${headingFont.className}`}
                  >
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-extrabold text-white/75 sm:text-[13px]">
                    Download the app for discounts & special offers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Pizza</MiniChip>
              <MiniChip>Hot</MiniChip>
              <MiniChip>Fresh</MiniChip>
              <MiniChip>Deals</MiniChip>
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
            variant="pizza"
          />

          <div className="pt-2">
            <SectionTitle>Follow us</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="News, offers, and updates"
            variant="white"
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
            className={`inline-flex rounded-full border-2 border-[#E23726] bg-white px-5 py-2 text-[17px] uppercase tracking-wide text-[#E23726] shadow-[4px_4px_0_#111111] ${headingFont.className}`}
          >
            © {new Date().getFullYear()} Deliveroo Eats
          </div>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatDeliveroo {
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