import {
  Facebook,
  Instagram,
  Smartphone,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Download,
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
    yellow: "bg-[#F6C322] hover:bg-[#FFD54C]",
    pink: "bg-[#F54B98] hover:bg-[#FF64AA]",
    green: "bg-[#97DB5C] hover:bg-[#A9E96E]",
    orange: "bg-[#F89A2B] hover:bg-[#FFAB45]",
    black: "bg-[#111111] hover:bg-[#1C1C1C] text-white",
  };

  const textColor = variant === "black" ? "text-white" : "text-[#111111]";
  const subTextColor = variant === "black" ? "text-white/70" : "text-black/60";
  const iconBg = variant === "black" ? "bg-white/10" : "bg-white/65";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] border-[3px] border-[#111111] px-4 py-4 shadow-[6px_6px_0_#111111] transition duration-200 hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_#111111] ${variants[variant]}`}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-y-0 -left-1/3 w-1/2 rotate-12 bg-white/10 blur-2xl" />
      </div>

      <div className="relative flex items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-[#111111] ${iconBg} ${textColor}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div
            className={`truncate text-sm font-black uppercase tracking-wide sm:text-[15px] ${textColor}`}
          >
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
        className={`relative ml-3 h-5 w-5 shrink-0 transition duration-200 group-hover:translate-x-1 ${textColor}`}
      />
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-1 pt-2">
      <div className="h-[3px] w-8 rounded-full bg-[#111111]" />
      <p className="text-xs font-black uppercase tracking-[0.26em] text-[#111111]">
        {children}
      </p>
    </div>
  );
}

function FruitCoin({
  emoji,
  className,
  delay = "0s",
  size = "h-16 w-16",
}: {
  emoji: string;
  className: string;
  delay?: string;
  size?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden items-center justify-center rounded-full border-[3px] border-[#111111] bg-[#FFF7E7]/95 text-3xl shadow-[5px_5px_0_#111111] backdrop-blur-sm md:flex ${size} ${className}`}
      style={{ animation: `floatY 6s ease-in-out ${delay} infinite` }}
    >
      <span>{emoji}</span>
    </div>
  );
}

function SlashAccent({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden h-3 w-20 rounded-full border-[3px] border-[#111111] bg-[#F54B98] shadow-[4px_4px_0_#111111] md:block ${className}`}
      style={{ animation: `floatY 5s ease-in-out ${delay} infinite` }}
    />
  );
}

function BackgroundLines() {
  const rows = [
    90, 220, 350, 480, 610, 740, 870, 1000, 1130, 1260, 1390, 1520, 1650,
    1780, 1910,
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 2100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {rows.map((y, i) => (
        <path
          key={i}
          d={`M -120 ${y}
              C 40 ${y - 48}, 170 ${y + 62}, 340 ${y + 8}
              S 620 ${y - 70}, 810 ${y + 18}
              S 1120 ${y + 76}, 1320 ${y + 10}
              S 1540 ${y - 62}, 1650 ${y + 18}`}
          stroke="#F56BA4"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.95"
        />
      ))}
    </svg>
  );
}

export default function FruitNinjaPakistanLinktree() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F6C322] text-[#111111]">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundLines />

        {/* ambient glows */}
        <div className="absolute left-[-60px] top-[120px] h-64 w-64 rounded-full bg-[#FF8C2A]/20 blur-3xl" />
        <div className="absolute right-[-60px] top-[240px] h-72 w-72 rounded-full bg-[#97DB5C]/20 blur-3xl" />
        <div className="absolute bottom-[10%] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#F54B98]/15 blur-3xl" />

        {/* fruit coins - desktop only */}
        <FruitCoin emoji="🍉" className="left-[5%] top-[8%]" delay="0.2s" />
        <FruitCoin emoji="🍇" className="right-[7%] top-[14%]" delay="1s" />
        <FruitCoin emoji="🥝" className="left-[8%] top-[58%]" delay="1.8s" />
        <FruitCoin emoji="🍊" className="right-[8%] top-[68%]" delay="0.5s" />
        <FruitCoin emoji="🍍" className="left-[12%] bottom-[12%]" delay="1.2s" />
        <FruitCoin emoji="🍓" className="right-[15%] bottom-[10%]" delay="2.2s" />

        {/* slash accents */}
        <SlashAccent
          className="left-[12%] top-[37%] rotate-[-29deg]"
          delay="0.6s"
        />
        <SlashAccent
          className="right-[14%] top-[47%] rotate-[22deg]"
          delay="1.4s"
        />
        <SlashAccent
          className="left-[18%] bottom-[25%] rotate-[12deg]"
          delay="0.9s"
        />
        <SlashAccent
          className="right-[18%] bottom-[18%] rotate-[-18deg]"
          delay="1.7s"
        />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[620px] flex-col px-4 py-8 sm:px-6 sm:py-10">
        {/* hero */}
        <div className="rounded-[34px] border-[5px] border-[#111111] bg-white p-[10px] shadow-[10px_10px_0_#111111]">
          <div className="rounded-[26px] border-[3px] border-[#F54B98] bg-[#FFF8EA] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] border-[4px] border-[#111111] bg-[#F6C322] shadow-[4px_4px_0_#111111] sm:h-24 sm:w-24">
                <Image
                  src={logo}
                  alt="Fruit Ninja Pakistan logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#111111] bg-[#97DB5C] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] shadow-[3px_3px_0_#111111]">
                  <Sparkles className="h-3 w-3" />
                  Official
                </div>

                <h1 className="mt-3 text-[30px] font-black uppercase leading-[0.95] tracking-tight text-[#111111] sm:text-[40px]">
                  Fruit Ninja
                  <span className="block text-[#F54B98] [text-shadow:2px_2px_0_#111111]">
                    Pakistan
                  </span>
                </h1>

                <p className="mt-2 max-w-[340px] text-sm font-bold text-black/65 sm:text-[15px]">
                  Fresh juices, fruity deals & official updates
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border-[3px] border-[#111111] bg-[#F6C322] px-4 py-3 shadow-[5px_5px_0_#111111]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-[#111111] bg-white">
                  <BadgePercent className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black uppercase sm:text-[15px]">
                    Exclusive app deals
                  </p>
                  <p className="text-xs font-semibold text-black/65 sm:text-[13px]">
                    Download the app for discounts & special offers
                  </p>
                </div>
              </div>
            </div>

            {/* optional micro badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="rounded-full border-2 border-[#111111] bg-white px-3 py-1 text-[11px] font-black uppercase shadow-[3px_3px_0_#111111]">
                Fresh
              </div>
              <div className="rounded-full border-2 border-[#111111] bg-white px-3 py-1 text-[11px] font-black uppercase shadow-[3px_3px_0_#111111]">
                Deals
              </div>
              <div className="rounded-full border-2 border-[#111111] bg-white px-3 py-1 text-[11px] font-black uppercase shadow-[3px_3px_0_#111111]">
                Official Links
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="mt-8 space-y-4">
          <SectionTitle>Download our app</SectionTitle>

          <LinkButton
            href={LINKS.playStore}
            icon={<Download className="h-5 w-5" />}
            label="Google Play Store"
            sublabel="Exclusive deals and discounts"
            variant="black"
          />

          <div className="pt-2">
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

          <div className="pt-2">
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
          <div className="inline-flex rounded-full border-[3px] border-[#111111] bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#111111]">
            © {new Date().getFullYear()} Fruit Ninja Pakistan
          </div>
        </footer>
      </section>

      <style jsx global>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }
      `}</style>
    </main>
  );
}