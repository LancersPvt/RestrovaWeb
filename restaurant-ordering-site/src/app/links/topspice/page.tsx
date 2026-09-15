import {
  ArrowRight,
  Download,
  Smartphone,
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import { Bungee, Fredoka } from "next/font/google";
import logo from "./logo.webp";

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
  playStore: "https://play.google.com/store/apps/details?id=com.restrova.topspice",
  appStore: "https://apps.apple.com/pk/app/top-spice-pakistan/id6796204717",
};

type StoreButtonProps = {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  label: string;
  sublabel: string;
  featured?: boolean;
};

function StoreButton({
  href,
  icon,
  eyebrow,
  label,
  sublabel,
  featured = false,
}: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border px-4 py-4 transition duration-300 hover:-translate-y-1 sm:px-5 sm:py-5 ${
        featured
          ? "border-[#E4472F] bg-gradient-to-r from-[#E4472F] to-[#B9281C] text-white shadow-[0_18px_44px_rgba(228,71,47,0.26)] hover:shadow-[0_22px_52px_rgba(228,71,47,0.34)]"
          : "border-white/10 bg-[#120E0C]/90 text-white shadow-[0_16px_42px_rgba(0,0,0,0.26)] hover:border-[#F3B53F]/50 hover:bg-[#18110E]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 translate-x-[-130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition duration-300 group-hover:scale-105 group-hover:-rotate-3 ${
            featured
              ? "border-white/25 bg-black/15 text-white"
              : "border-[#F3B53F]/35 bg-[#F3B53F]/10 text-[#F3B53F]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className={`text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] ${
              featured ? "text-white/65" : "text-white/40"
            }`}
          >
            {eyebrow}
          </p>
          <p
            className={`mt-1 truncate text-[15px] uppercase tracking-[0.04em] sm:text-[17px] ${headingFont.className}`}
          >
            {label}
          </p>
          <p
            className={`mt-1 text-xs font-medium sm:text-[13px] ${
              featured ? "text-white/72" : "text-white/50"
            }`}
          >
            {sublabel}
          </p>
        </div>
      </div>

      <div
        className={`relative ml-3 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:translate-x-1 ${
          featured
            ? "border-white/25 bg-white/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}

function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-8%,rgba(228,71,47,0.25),transparent_34%),radial-gradient(circle_at_8%_62%,rgba(243,181,63,0.10),transparent_23%),radial-gradient(circle_at_92%_72%,rgba(228,71,47,0.08),transparent_24%)]" />

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="absolute left-[-16%] top-[17%] h-[5px] w-[62%] -rotate-[17deg] bg-gradient-to-r from-transparent via-[#E4472F] to-transparent opacity-60" />
      <div className="absolute right-[-18%] top-[39%] h-[2px] w-[56%] -rotate-[17deg] bg-gradient-to-r from-transparent via-[#F3B53F] to-transparent opacity-30" />
      <div className="absolute bottom-[12%] left-[-18%] h-[3px] w-[64%] -rotate-[17deg] bg-gradient-to-r from-transparent via-[#E4472F] to-transparent opacity-22" />

      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#E4472F]/10" />
      <div className="absolute -right-52 top-[44%] h-[410px] w-[410px] rounded-full border border-[#F3B53F]/[0.06]" />
    </div>
  );
}

export default function TopSpiceLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#070504] text-white`}
    >
      <BackgroundEffects />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[660px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-12">
        <header className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0D0908]/90 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-4">
          <div className="pointer-events-none absolute -right-20 top-14 h-[5px] w-[360px] -rotate-[17deg] bg-[#E4472F] opacity-80" />
          <div className="pointer-events-none absolute -right-16 top-[98px] h-px w-[320px] -rotate-[17deg] bg-[#F3B53F]/40" />

          <div className="relative overflow-hidden rounded-[27px] border border-white/[0.08] bg-[#090605] px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-9">
            <div className="flex items-start justify-between gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[26px] border border-[#E4472F]/45 bg-white/[0.04] shadow-[0_16px_40px_rgba(228,71,47,0.14)] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Top Spice Pakistan logo"
                  fill
                  priority
                  sizes="(min-width: 640px) 96px, 80px"
                  className="object-contain p-2"
                />
              </div>

              <div className="mt-1 flex items-center gap-2 rounded-full border border-[#E4472F]/35 bg-[#E4472F]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F48A78] sm:text-[10px]">
                <Sparkles className="h-3.5 w-3.5" />
                Official App
              </div>
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F3B53F]/80 sm:text-xs">
              Top Spice Pakistan
            </p>

            <h1
              className={`mt-3 max-w-[540px] text-[34px] uppercase leading-[0.98] tracking-tight text-white sm:text-[48px] ${headingFont.className}`}
            >
              Turn up
              <span className="block text-[#E4472F]">the flavour.</span>
            </h1>

            <p className="mt-4 max-w-[500px] text-sm font-medium leading-6 text-white/55 sm:text-[15px]">
              Get the official Top Spice Pakistan app on Android or iPhone and keep your favourites just a tap away.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                Android
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                iPhone
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                Top Spice Pakistan
              </div>
            </div>
          </div>
        </header>

        <div className="mt-7">
          <div className="mb-4 flex items-center gap-3 px-1">
            <div className="h-[2px] w-8 bg-[#E4472F]" />
            <p
              className={`text-[10px] uppercase tracking-[0.26em] text-white/45 sm:text-xs ${headingFont.className}`}
            >
              Download the app
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="space-y-4">
            <StoreButton
              href={LINKS.playStore}
              icon={<Download className="h-5 w-5" />}
              eyebrow="Get it on"
              label="Google Play"
              sublabel="Download for Android"
              featured
            />

            <StoreButton
              href={LINKS.appStore}
              icon={<Smartphone className="h-5 w-5" />}
              eyebrow="Download on the"
              label="App Store"
              sublabel="Download for iPhone"
            />
          </div>
        </div>

        <footer className="pt-9 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#F3B53F]/55 to-transparent" />
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 sm:text-xs">
            © {new Date().getFullYear()} Top Spice Pakistan
          </p>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scroll-behavior: smooth;
              background: #070504;
            }

            body {
              margin: 0;
              background: #070504;
            }

            ::selection {
              background: #E4472F;
              color: #ffffff;
            }
          `,
        }}
      />
    </main>
  );
}
