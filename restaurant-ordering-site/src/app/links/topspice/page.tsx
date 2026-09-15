import {
  ArrowRight,
  Download,
  Smartphone,
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import logo from "./logo.webp";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const LINKS = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.topspice",
  appStore:
    "https://apps.apple.com/pk/app/top-spice-pakistan/id6796204717",
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
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] border px-4 py-4 transition duration-300 hover:-translate-y-1 sm:px-5 sm:py-5 ${
        featured
          ? "border-[#D2B46B] bg-gradient-to-r from-[#C4A45A] to-[#E1CA8A] text-[#102C45] shadow-[0_18px_44px_rgba(201,170,99,0.24)] hover:shadow-[0_22px_55px_rgba(201,170,99,0.32)]"
          : "border-[#D2B46B]/25 bg-[#102C45]/80 text-[#F8F4EA] shadow-[0_16px_42px_rgba(0,0,0,0.28)] hover:border-[#D2B46B]/55 hover:bg-[#163751]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 translate-x-[-130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

      <div className="relative flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition duration-300 group-hover:scale-105 group-hover:-rotate-3 ${
            featured
              ? "border-[#102C45]/15 bg-[#102C45]/10 text-[#102C45]"
              : "border-[#D2B46B]/35 bg-[#D2B46B]/10 text-[#D9BC73]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className={`text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px] ${
              featured ? "text-[#102C45]/65" : "text-[#D9BC73]/70"
            }`}
          >
            {eyebrow}
          </p>

          <p className="mt-1 truncate text-[15px] font-bold tracking-[0.02em] sm:text-[17px]">
            {label}
          </p>

          <p
            className={`mt-1 text-xs font-medium sm:text-[13px] ${
              featured ? "text-[#102C45]/65" : "text-[#F8F4EA]/50"
            }`}
          >
            {sublabel}
          </p>
        </div>
      </div>

      <div
        className={`relative ml-3 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:translate-x-1 ${
          featured
            ? "border-[#102C45]/15 bg-[#102C45]/[0.06]"
            : "border-[#D2B46B]/20 bg-white/[0.03]"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-8%,rgba(201,170,99,0.18),transparent_34%),radial-gradient(circle_at_10%_70%,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_92%_65%,rgba(201,170,99,0.08),transparent_22%)]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute left-[-18%] top-[18%] h-px w-[70%] -rotate-[14deg] bg-gradient-to-r from-transparent via-[#D2B46B]/70 to-transparent" />
      <div className="absolute right-[-22%] top-[38%] h-px w-[68%] -rotate-[14deg] bg-gradient-to-r from-transparent via-[#D2B46B]/35 to-transparent" />
      <div className="absolute bottom-[12%] left-[-20%] h-px w-[72%] -rotate-[14deg] bg-gradient-to-r from-transparent via-[#D2B46B]/25 to-transparent" />

      <div className="absolute -left-40 top-24 h-80 w-80 rounded-full border border-[#D2B46B]/10" />
      <div className="absolute -right-56 top-[43%] h-[430px] w-[430px] rounded-full border border-[#D2B46B]/[0.06]" />
    </div>
  );
}

export default function TopSpiceLinktree() {
  return (
    <main
      className={`${bodyFont.variable} ${headingFont.variable} ${bodyFont.className} relative min-h-screen overflow-hidden bg-[#0B2438] text-[#F8F4EA]`}
    >
      <BackgroundEffects />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[660px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-12">
        <header className="relative overflow-hidden rounded-[34px] border border-[#D2B46B]/20 bg-[#0D2A42]/90 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4">
          <div className="pointer-events-none absolute -right-20 top-14 h-px w-[360px] -rotate-[14deg] bg-[#D2B46B]/70" />
          <div className="pointer-events-none absolute -right-16 top-[98px] h-px w-[320px] -rotate-[14deg] bg-white/10" />

          <div className="relative overflow-hidden rounded-[27px] border border-[#D2B46B]/15 bg-[#F8F4EA] px-5 pb-8 pt-7 text-[#102C45] sm:px-8 sm:pb-9 sm:pt-9">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#D2B46B]/10 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-[5px] border-[#D2B46B]/70 bg-white shadow-[0_18px_44px_rgba(16,44,69,0.18)] sm:h-48 sm:w-48">
                <Image
                  src={logo}
                  alt="Top Spice HomeChef logo"
                  fill
                  priority
                  sizes="(min-width: 640px) 192px, 160px"
                  className="object-contain"
                />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#C7A85F]/40 bg-[#C7A85F]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6B28] sm:text-[10px]">
                <Sparkles className="h-3.5 w-3.5" />
                Official Top Spice App
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-[#A17E35] sm:text-xs">
                Top Spice HomeChef
              </p>

              <h1
                className={`mt-2 max-w-[540px] text-[40px] font-bold leading-[0.95] tracking-tight text-[#102C45] sm:text-[56px] ${headingFont.className}`}
              >
                Culinary excellence,
                <span className="block text-[#B18B3A]">now in your pocket.</span>
              </h1>

              <p className="mt-4 max-w-[500px] text-sm font-medium leading-6 text-[#102C45]/65 sm:text-[15px]">
                Download the official Top Spice Pakistan app on Android or iPhone.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['EST. 2023', 'HomeChef', 'Pakistan'].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[#102C45]/10 bg-[#102C45]/[0.045] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#102C45]/60"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-7">
          <div className="mb-4 flex items-center gap-3 px-1">
            <div className="h-px w-8 bg-[#D2B46B]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D9BC73]/80 sm:text-xs">
              Download the app
            </p>

            <div className="h-px flex-1 bg-gradient-to-r from-[#D2B46B]/30 to-transparent" />
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
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#D2B46B]/60 to-transparent" />

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8F4EA]/30 sm:text-xs">
            © {new Date().getFullYear()} Top Spice Pakistan
          </p>
        </footer>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scroll-behavior: smooth;
              background: #0B2438;
            }

            body {
              margin: 0;
              background: #0B2438;
            }

            ::selection {
              background: #D2B46B;
              color: #102C45;
            }
          `,
        }}
      />
    </main>
  );
}
