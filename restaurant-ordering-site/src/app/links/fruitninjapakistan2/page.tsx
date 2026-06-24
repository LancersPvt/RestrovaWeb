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

export default function FruitNinjaPakistanLinktree() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFC21A] text-[#111111]">
      {/* Theme background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-70 [background-image:url('data:image/svg+xml,%3Csvg%20width=%22800%22%20height=%22800%22%20viewBox=%220%200%20800%20800%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20stroke=%22%23ff3f8e%22%20stroke-width=%229%22%20stroke-linecap=%22round%22%3E%3Cpath%20d=%22M-90%20107C54%20143%20142%200%20291%2054c105%2038%20100%20167%20228%20171%20141%204%20214-122%20372-65%22/%3E%3Cpath%20d=%22M-104%20200C47%20246%20137%2099%20286%20152c119%2042%20121%20170%20243%20176%20152%207%20231-116%20379-59%22/%3E%3Cpath%20d=%22M-90%20300C52%20344%20143%20206%20293%20254c115%2037%20119%20161%20244%20169%20152%2010%20229-101%20370-49%22/%3E%3Cpath%20d=%22M-82%20402C60%20443%20145%20312%20296%20359c112%2035%20114%20152%20243%20160%20141%209%20218-89%20358-41%22/%3E%3Cpath%20d=%22M-80%20505C59%20547%20153%20418%20294%20461c113%2035%20111%20146%20242%20157%20138%2012%20217-78%20351-34%22/%3E%3Cpath%20d=%22M-76%20608C73%20652%20151%20523%20298%20566c111%2032%20110%20137%20242%20148%20139%2012%20212-66%20341-28%22/%3E%3Cpath%20d=%22M-80%20710C64%20751%20157%20632%20298%20669c118%2031%20110%20129%20241%20139%20133%2010%20208-52%20335-20%22/%3E%3C/g%3E%3C/svg%3E')] [background-size:680px_680px]" />

        <div className="absolute -left-20 top-28 h-44 w-44 rounded-full bg-[#FF3F8E]/60 blur-3xl" />
        <div className="absolute -right-20 top-64 h-48 w-48 rounded-full bg-[#87D957]/70 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#FF8A1F]/70 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10 sm:px-6 sm:py-12">
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