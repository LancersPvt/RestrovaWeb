import {
  ArrowRight,
  BadgePercent,
  Download,
  Facebook,
  Instagram,
  MessageCircle,
  Navigation,
  ShoppingBag,
  Sparkles,
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
  onlineOrdering: "https://fruitninjapakistan.com",
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.fruitninjapakistan",
  appStore: "https://apps.apple.com/pk/app/fruit-ninja-pakistan/id6783385415",
  facebook: "https://www.facebook.com/profile.php?id=61573797485797",
  instagram: "https://www.instagram.com/fruitninjapakistan/",
  googleMaps: "https://maps.app.goo.gl/3PMDGZdCtqUWESHQ7",
  whatsapp: "https://wa.me/923155127541",
};

type ButtonVariant = "primary" | "dark" | "outline";

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "dark",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-[#F26522] bg-[#F26522] text-white shadow-[0_14px_36px_rgba(242,101,34,0.28)] hover:bg-[#FF7430]",
    dark: "border-white/10 bg-[#111713] text-white hover:border-[#F26522]/75 hover:bg-[#151D18]",
    outline:
      "border-[#F26522]/55 bg-[#0A0F0C]/70 text-white hover:border-[#F26522] hover:bg-[#121914]",
  };

  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] border px-4 py-4 transition duration-300 hover:-translate-y-1 sm:px-5 ${variants[variant]}`}
    >
      <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 ${
            isPrimary
              ? "border-white/25 bg-black/20 text-white"
              : "border-[#F26522]/45 bg-[#F26522]/10 text-[#F26522]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className={`truncate text-[13px] uppercase tracking-[0.06em] sm:text-[15px] ${headingFont.className}`}
          >
            {label}
          </p>

          {sublabel ? (
            <p
              className={`mt-1 text-xs font-medium sm:text-[13px] ${
                isPrimary ? "text-white/75" : "text-white/50"
              }`}
            >
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={`relative ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:translate-x-1 ${
          isPrimary
            ? "border-white/25 bg-white/10"
            : "border-white/10 bg-white/[0.03]"
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
      <div className="h-[2px] w-8 bg-[#F26522]" />
      <p
        className={`text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-xs ${headingFont.className}`}
      >
        {children}
      </p>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/65 backdrop-blur sm:text-[11px]">
      {children}
    </div>
  );
}

function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(242,101,34,0.20),transparent_37%),radial-gradient(circle_at_10%_55%,rgba(242,101,34,0.08),transparent_25%),radial-gradient(circle_at_90%_75%,rgba(242,101,34,0.07),transparent_24%)]" />

      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="absolute left-[-17%] top-[14%] h-[7px] w-[68%] -rotate-[19deg] bg-gradient-to-r from-transparent via-[#F26522] to-transparent opacity-75 blur-[0.2px]" />
      <div className="absolute right-[-20%] top-[36%] h-[3px] w-[62%] -rotate-[19deg] bg-gradient-to-r from-transparent via-[#F26522] to-transparent opacity-35" />
      <div className="absolute bottom-[15%] left-[-20%] h-[4px] w-[65%] -rotate-[19deg] bg-gradient-to-r from-transparent via-[#F26522] to-transparent opacity-25" />

      <div className="absolute -left-40 top-24 h-80 w-80 rounded-full border border-[#F26522]/10" />
      <div className="absolute -right-56 top-[42%] h-[430px] w-[430px] rounded-full border border-white/[0.035]" />
    </div>
  );
}

export default function FruitNinjaPakistanLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#030605] text-white`}
    >
      <BackgroundEffects />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[680px] flex-col px-4 py-7 sm:px-6 sm:py-10 lg:py-14">
        <header className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090D0B]/90 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-4">
          <div className="pointer-events-none absolute -right-20 top-16 h-[5px] w-[370px] -rotate-[19deg] bg-[#F26522] opacity-90" />
          <div className="pointer-events-none absolute -right-14 top-[106px] h-px w-[320px] -rotate-[19deg] bg-white/25" />

          <div className="relative overflow-hidden rounded-[25px] border border-white/[0.08] bg-[#050806]">
            <div className="relative aspect-[16/9] w-full min-h-[215px] sm:min-h-[270px]">
              <Image
                src={logo}
                alt="Fruit Ninja Pakistan logo"
                fill
                priority
                className="object-contain p-5 sm:p-8"
              />

              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050806] to-transparent" />
            </div>

            <div className="relative px-5 pb-6 sm:px-7 sm:pb-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F26522]/45 bg-[#F26522]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8B52]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Official Fruit Ninja Pakistan
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F26522] shadow-[0_0_14px_#F26522]" />
                  Fresh every day
                </div>
              </div>

              <h1
                className={`mt-5 max-w-[520px] text-[27px] uppercase leading-[1.02] tracking-tight text-white sm:text-[39px] ${headingFont.className}`}
              >
                Slice into freshness.
                <span className="block text-[#F26522]">Order your favourites.</span>
              </h1>

              <p className="mt-3 max-w-[500px] text-sm font-medium leading-6 text-white/52 sm:text-[15px]">
                Fresh juices, shakes, desserts and exclusive app deals — all official
                Fruit Ninja links in one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <MiniChip>Fresh Juices</MiniChip>
                <MiniChip>Shakes</MiniChip>
                <MiniChip>Sweet Deals</MiniChip>
                <MiniChip>Official Links</MiniChip>
              </div>
            </div>
          </div>

          <div className="relative mt-3 overflow-hidden rounded-[22px] border border-[#F26522]/45 bg-gradient-to-r from-[#F26522] to-[#D94F12] px-4 py-4 shadow-[0_16px_34px_rgba(242,101,34,0.18)] sm:px-5">
            <div className="absolute right-[-40px] top-[-44px] h-32 w-32 rounded-full border-[22px] border-white/10" />
            <div className="relative flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/25 bg-black/15">
                <BadgePercent className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p
                  className={`text-[13px] uppercase tracking-wide sm:text-[15px] ${headingFont.className}`}
                >
                  Exclusive app deals
                </p>
                <p className="mt-1 text-xs font-medium text-white/75 sm:text-[13px]">
                  Download the app for discounts and special offers.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-4">
          <SectionTitle>Order online</SectionTitle>

          <LinkButton
            href={LINKS.onlineOrdering}
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Order Online"
            sublabel="Order directly from our website"
            variant="primary"
          />

          <div className="pt-2">
            <SectionTitle>Download our app</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.playStore}
            icon={<Download className="h-5 w-5" />}
            label="Google Play Store"
            sublabel="Android app, offers and discounts"
            variant="dark"
          />

          <LinkButton
            href={LINKS.appStore}
            icon={<Download className="h-5 w-5" />}
            label="Apple App Store"
            sublabel="iPhone app, offers and discounts"
            variant="dark"
          />

          <div className="pt-2">
            <SectionTitle>Follow us</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5" />}
            label="Facebook"
            sublabel="News, offers and official updates"
            variant="outline"
          />

          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="Photos, reels and new launches"
            variant="outline"
          />

          <div className="pt-2">
            <SectionTitle>Contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<Navigation className="h-5 w-5" />}
            label="Google Maps"
            sublabel="Tap to open directions"
            variant="dark"
          />

          <LinkButton
            href={LINKS.whatsapp}
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            sublabel="Chat with us for orders and queries"
            variant="primary"
          />
        </div>

        <footer className="mt-auto pt-10 text-center">
          <div className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-[#F26522]/70 to-transparent" />
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 sm:text-xs">
            © {new Date().getFullYear()} Fruit Ninja Pakistan
          </p>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scroll-behavior: smooth;
              background: #030605;
            }

            body {
              margin: 0;
              background: #030605;
            }

            ::selection {
              background: #F26522;
              color: #ffffff;
            }
          `,
        }}
      />
    </main>
  );
}
