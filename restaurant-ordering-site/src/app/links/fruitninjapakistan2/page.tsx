import {
  Facebook,
  Instagram,
  Smartphone,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import logo from "./logo.png";

const LINKS = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.restrova.fruitninjapakistan",
  facebook: "https://www.facebook.com/profile.php?id=61573797485797",
  instagram: "https://www.instagram.com/fruitninjapakistan/",
  googleMaps: "https://maps.app.goo.gl/3PMDGZdCtqUWESHQ7",
  whatsapp: "https://wa.me/923155127541",
};

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
  variant?: "yellow" | "pink" | "green" | "orange" | "black";
}) {
  const variants = {
    yellow: "bg-[#FFC21A] hover:bg-[#FFD447]",
    pink: "bg-[#FF3F8E] hover:bg-[#FF5EA1]",
    green: "bg-[#87D957] hover:bg-[#9BEA6D]",
    orange: "bg-[#FF8A1F] hover:bg-[#FFA142]",
    black: "bg-[#111111] hover:bg-[#222222] text-white",
  };

  const textColor = variant === "black" ? "text-white" : "text-[#111111]";
  const subTextColor = variant === "black" ? "text-white/65" : "text-black/60";
  const iconBg = variant === "black" ? "bg-white/12" : "bg-white/70";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group flex w-full items-center justify-between rounded-[1.35rem] border-[3px] border-[#111111] px-5 py-4 text-left shadow-[6px_6px_0_#111111] transition duration-200 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111111] active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#111111] ${variants[variant]}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl border-2 border-[#111111] ${iconBg} ${textColor}`}
        >
          {icon}
        </div>

        <div>
          <div className={`text-sm font-black uppercase tracking-wide ${textColor}`}>
            {label}
          </div>
          {sublabel ? (
            <div className={`mt-0.5 text-xs font-semibold ${subTextColor}`}>
              {sublabel}
            </div>
          ) : null}
        </div>
      </div>

      <ArrowRight
        className={`h-5 w-5 transition group-hover:translate-x-1 ${textColor}`}
      />
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 text-xs font-black uppercase tracking-[0.22em] text-[#111111]">
      {children}
    </p>
  );
}

function BackgroundLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 1800"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[
        80, 210, 340, 470, 600, 730, 860, 990, 1120, 1250, 1380, 1510, 1640,
      ].map((y, i) => (
        <path
          key={i}
          d={`
            M -100 ${y}
            C 80 ${y - 70}, 170 ${y + 90}, 340 ${y + 10}
            S 620 ${y - 80}, 790 ${y + 20}
            S 1080 ${y + 110}, 1260 ${y + 5}
            S 1500 ${y - 90}, 1600 ${y + 30}
          `}
          stroke="#FF5B99"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

function FruitSticker({
  emoji,
  className,
}: {
  emoji: string;
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#111111] bg-white/80 text-3xl shadow-[5px_5px_0_#111111] backdrop-blur-sm ${className}`}
    >
      <span className="translate-y-[1px]">{emoji}</span>
    </div>
  );
}

function SlashMark({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute z-0 h-3 w-20 rotate-[-28deg] rounded-full border-2 border-[#111111] bg-[#FF3F8E] shadow-[3px_3px_0_#111111] ${className}`}
    />
  );
}

export default function FruitNinjaPakistanLinktree() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFC21A] text-[#111111]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundLines />

        {/* soft glow blobs */}
        <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-[#FF8A1F]/35 blur-3xl" />
        <div className="absolute right-0 top-40 h-52 w-52 rounded-full bg-[#87D957]/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#FF3F8E]/20 blur-3xl" />

        {/* fruit stickers */}
        <FruitSticker emoji="🍉" className="left-[5%] top-[10%] hidden md:flex" />
        <FruitSticker emoji="🍇" className="right-[8%] top-[14%] hidden md:flex" />
        <FruitSticker emoji="🥝" className="left-[8%] top-[55%] hidden md:flex" />
        <FruitSticker emoji="🍊" className="right-[10%] top-[62%] hidden md:flex" />
        <FruitSticker emoji="🍍" className="left-[14%] bottom-[10%] hidden md:flex" />
        <FruitSticker emoji="🍓" className="right-[16%] bottom-[12%] hidden md:flex" />

        {/* slash marks for fruit-ninja vibe */}
        <SlashMark className="left-[12%] top-[34%] hidden md:block" />
        <SlashMark className="right-[14%] top-[44%] hidden md:block rotate-[18deg]" />
        <SlashMark className="left-[18%] bottom-[26%] hidden md:block rotate-[12deg]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10 sm:px-6 sm:py-12">
        {/* Main logo card */}
        <div className="relative rounded-[2rem] border-[5px] border-[#111111] bg-white p-4 shadow-[10px_10px_0_#111111]">
          <div className="rounded-[1.5rem] border-[3px] border-[#FF3F8E] bg-[#FFF8E8] p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl border-[4px] border-[#111111] bg-[#FFC21A] shadow-[4px_4px_0_#111111]">
                <Image
                  src={logo}
                  alt="Fruit Ninja Pakistan logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#111111] bg-[#87D957] px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-[3px_3px_0_#111111]">
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1 className="mt-3 text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">
                  Fruit Ninja
                  <span className="block text-[#FF3F8E] [text-shadow:2px_2px_0_#111]">
                    Pakistan
                  </span>
                </h1>

                <p className="mt-2 text-sm font-bold text-black/65">
                  Fresh juices, fruity deals & official updates
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border-[3px] border-[#111111] bg-[#FFC21A] px-4 py-3 shadow-[5px_5px_0_#111111]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border-2 border-[#111111] bg-white">
                  <BadgePercent className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase">
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-semibold text-black/60">
                    Download the app for discounts & special offers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <SectionTitle>Download our app</SectionTitle>

          <LinkButton
            href={LINKS.playStore}
            icon={<Smartphone className="h-5 w-5" />}
            label="Google Play Store"
            sublabel="Exclusive deals and discounts"
            variant="black"
          />

          <div className="pt-3">
            <SectionTitle>Follow us on social media</SectionTitle>
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

          <div className="pt-3">
            <SectionTitle>Contact</SectionTitle>
          </div>

          <LinkButton
            href={LINKS.googleMaps}
            icon={<MapPin className="h-5 w-5" />}
            label="Find us on Google Maps"
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
          <div className="inline-flex rounded-full border-[3px] border-[#111111] bg-white px-5 py-2 text-xs font-black uppercase tracking-wide shadow-[4px_4px_0_#111111]">
            © {new Date().getFullYear()} Fruit Ninja Pakistan
          </div>
        </footer>
      </section>
    </main>
  );
}