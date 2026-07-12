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

const LINKS = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.fruitninjapakistan",
  appStore: "https://apps.apple.com/pk/app/fruit-ninja-pakistan/id6783385415",
  facebook: "https://www.facebook.com/profile.php?id=61573797485797",
  instagram: "https://www.instagram.com/fruitninjapakistan/",
  googleMaps: "https://maps.app.goo.gl/3PMDGZdCtqUWESHQ7",
  whatsapp: "https://wa.me/923155127541",
};

type ButtonVariant = "black" | "yellow" | "pink" | "green" | "orange";

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
    black: "bg-[#111111] text-white hover:bg-[#1f1f1f]",
    yellow: "bg-[#FFC928] text-[#111111] hover:bg-[#FFD95A]",
    pink: "bg-[#F54B98] text-[#111111] hover:bg-[#FF66AB]",
    green: "bg-[#91DB58] text-[#111111] hover:bg-[#A5EB6E]",
    orange: "bg-[#FF9828] text-[#111111] hover:bg-[#FFAD4F]",
  };

  const isDark = variant === "black";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border-[3px] border-[#111111] px-4 py-4 shadow-[6px_6px_0_#111111] transition duration-200 hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_#111111] sm:px-5 ${variants[variant]}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-[#111111] ${
            isDark ? "bg-white/10 text-white" : "bg-white/65 text-[#111111]"
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
              className={`mt-0.5 text-xs font-semibold sm:text-[13px] ${
                isDark ? "text-white/70" : "text-black/65"
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
      <div className="h-[3px] w-8 rounded-full bg-[#111111]" />
      <p
        className={`text-[10px] font-black uppercase tracking-[0.28em] text-[#111111] sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
    </div>
  );
}

function BackgroundLines() {
  const rows = [
    80, 210, 340, 470, 600, 730, 860, 990, 1120, 1250, 1380, 1510, 1640, 1770,
    1900, 2030,
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 2200"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {rows.map((y, index) => (
        <path
          key={index}
          d={`M -160 ${y}
              C 40 ${y - 65}, 180 ${y + 70}, 370 ${y + 5}
              S 650 ${y - 78}, 840 ${y + 18}
              S 1130 ${y + 78}, 1325 ${y + 4}
              S 1580 ${y - 60}, 1660 ${y + 28}`}
          stroke="#F65D9E"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.92"
        />
      ))}
    </svg>
  );
}

function FruitSticker({
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
      className={`pointer-events-none absolute hidden h-[74px] w-[74px] items-center justify-center rounded-full border-[4px] border-[#111111] bg-[#FFF8EA] shadow-[6px_6px_0_#111111] lg:flex ${className}`}
      style={{ animation: `floatFruit 6s ease-in-out ${delay} infinite` }}
    >
      {children}
    </div>
  );
}

function WatermelonIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M12 42C18 19 43 10 55 27C45 44 27 51 12 42Z"
        fill="#1E9C55"
        stroke="#111"
        strokeWidth="3"
      />
      <path d="M18 39C24 24 41 18 50 28C40 39 27 44 18 39Z" fill="#FF4D74" />
      <path d="M21 39C29 43 41 38 50 28" fill="none" stroke="#F7E36A" strokeWidth="3" />
      <circle cx="30" cy="31" r="2" fill="#111" />
      <circle cx="39" cy="29" r="2" fill="#111" />
      <circle cx="35" cy="37" r="2" fill="#111" />
    </svg>
  );
}

function OrangeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <circle cx="31" cy="35" r="19" fill="#FF9828" stroke="#111" strokeWidth="3" />
      <path d="M37 17C39 10 46 9 51 13C46 20 41 21 37 17Z" fill="#6BCB4E" stroke="#111" strokeWidth="3" />
      <path d="M32 17C33 13 35 10 39 8" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 34C24 29 31 26 40 28" stroke="#FFCF70" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function KiwiIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <circle cx="32" cy="32" r="21" fill="#B8834E" stroke="#111" strokeWidth="3" />
      <circle cx="32" cy="32" r="15" fill="#9BE769" />
      <circle cx="32" cy="32" r="5" fill="#F7F6D5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <circle
          key={r}
          cx={32 + Math.cos((r * Math.PI) / 180) * 10}
          cy={32 + Math.sin((r * Math.PI) / 180) * 10}
          r="1.8"
          fill="#111"
        />
      ))}
    </svg>
  );
}

function GrapesIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path d="M36 16C40 10 47 10 52 14C47 21 41 22 36 16Z" fill="#77CF55" stroke="#111" strokeWidth="3" />
      <path d="M33 18C34 13 37 10 41 8" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      {[
        [26, 24],
        [38, 24],
        [20, 35],
        [32, 35],
        [44, 35],
        [26, 46],
        [38, 46],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="8"
          fill="#8D5AD8"
          stroke="#111"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}

function StrawberryIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <path
        d="M32 54C18 42 13 28 20 20C25 14 31 18 32 22C33 18 39 14 44 20C51 28 46 42 32 54Z"
        fill="#F54B98"
        stroke="#111"
        strokeWidth="3"
      />
      <path d="M25 19L22 12L31 16L34 9L38 16L47 12L43 20" fill="#77CF55" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="26" cy="29" r="1.8" fill="#FFE66D" />
      <circle cx="36" cy="30" r="1.8" fill="#FFE66D" />
      <circle cx="31" cy="39" r="1.8" fill="#FFE66D" />
      <circle cx="40" cy="41" r="1.8" fill="#FFE66D" />
    </svg>
  );
}

function SlashAccent({ className, delay = "0s" }: { className: string; delay?: string }) {
  return (
    <div
      className={`pointer-events-none absolute hidden h-3 w-24 rounded-full border-[3px] border-[#111111] bg-[#F54B98] shadow-[4px_4px_0_#111111] lg:block ${className}`}
      style={{ animation: `floatFruit 5s ease-in-out ${delay} infinite` }}
    />
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border-2 border-[#111111] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide shadow-[3px_3px_0_#111111] sm:text-[11px]">
      {children}
    </div>
  );
}

export default function FruitNinjaPakistanLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#FFC928] text-[#111111]`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundLines />

        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#FF9828]/25 blur-3xl" />
        <div className="absolute -right-24 top-56 h-80 w-80 rounded-full bg-[#91DB58]/25 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#F54B98]/15 blur-3xl" />

        <FruitSticker className="left-[5%] top-[10%]" delay="0.2s">
          <WatermelonIcon />
        </FruitSticker>

        <FruitSticker className="right-[7%] top-[16%]" delay="1s">
          <GrapesIcon />
        </FruitSticker>

        <FruitSticker className="left-[8%] top-[58%]" delay="1.8s">
          <KiwiIcon />
        </FruitSticker>

        <FruitSticker className="right-[8%] top-[68%]" delay="0.5s">
          <OrangeIcon />
        </FruitSticker>

        <FruitSticker className="left-[13%] bottom-[10%]" delay="1.4s">
          <StrawberryIcon />
        </FruitSticker>

        <SlashAccent className="left-[12%] top-[38%] rotate-[-28deg]" delay="0.6s" />
        <SlashAccent className="right-[14%] top-[48%] rotate-[20deg]" delay="1.3s" />
        <SlashAccent className="left-[18%] bottom-[25%] rotate-[12deg]" delay="0.9s" />
        <SlashAccent className="right-[18%] bottom-[16%] rotate-[-18deg]" delay="1.7s" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
        <div className="rounded-[34px] border-[5px] border-[#111111] bg-white p-[10px] shadow-[10px_10px_0_#111111]">
          <div className="rounded-[26px] border-[3px] border-[#F54B98] bg-[#FFF8EA] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] border-[4px] border-[#111111] bg-[#FFC928] shadow-[4px_4px_0_#111111] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Fruit Ninja Pakistan logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#111111] bg-[#91DB58] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] shadow-[3px_3px_0_#111111]">
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1
                  className={`mt-3 text-[28px] font-black uppercase leading-[0.95] tracking-tight text-[#111111] sm:text-[40px] ${headingFont.className}`}
                >
                  Fruit Ninja
                  <span className="block text-[#F54B98] [text-shadow:2px_2px_0_#111111]">
                    Pakistan
                  </span>
                </h1>

                <p className="mt-2 max-w-[360px] text-sm font-bold text-black/65 sm:text-[15px]">
                  Fresh juices, fruity deals & official updates.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border-[3px] border-[#111111] bg-[#FFC928] px-4 py-3 shadow-[5px_5px_0_#111111]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-[#111111] bg-white">
                  <BadgePercent className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-black uppercase sm:text-[15px] ${headingFont.className}`}
                  >
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-semibold text-black/65 sm:text-[13px]">
                    Download the app for discounts & special offers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Fresh</MiniChip>
              <MiniChip>Juices</MiniChip>
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
            variant="black"
          />

          <LinkButton
            href={LINKS.appStore}
            icon={<Download className="h-5 w-5" />}
            label="App Store"
            sublabel="Exclusive deals and discounts"
            variant="black"
          />

          <div className="pt-2">
            <SectionTitle>Follow us</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="News, offers, and updates"
            variant="yellow"
          />

          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="Photos, reels, and stories"
            variant="pink"
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
            variant="orange"
          />
        </div>

        <footer className="mt-auto pt-10 text-center">
          <div
            className={`inline-flex rounded-full border-[3px] border-[#111111] bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#111111] sm:text-xs ${headingFont.className}`}
          >
            © {new Date().getFullYear()} Fruit Ninja Pakistan
          </div>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatFruit {
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