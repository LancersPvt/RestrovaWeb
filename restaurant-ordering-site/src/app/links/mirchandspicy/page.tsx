import {
  Facebook,
  Instagram,
  Store,
  Smartphone,
  BadgePercent,
  ArrowRight,
  MapPin,
  MessageCircle,
} from "lucide-react";

import Image from "next/image";
import logo from "./mirchandspicylogo.png"; // <-- update if your filename differs

const LINKS = {
  // Replace these with real URLs:
  playStore: "https://play.google.com/store/apps/details?id=com.restrova.ashandbeans",
  appStore: "https://apps.apple.com/app/idYOUR_APP_ID",
  facebook: "https://facebook.com/Mirchnspicy",
  instagram: "https://instagram.com/mirchnspicy",

  // NEW:
  googleMaps: "https://share.google/lASRgpreehX6jfVyJ", // or your full Google Maps share link
  whatsapp: "https://wa.me/9234657643397", // use country code, no +, no spaces
};

function LinkButton({
  href,
  icon,
  label,
  sublabel,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left backdrop-blur transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-white/90">{label}</div>
          {sublabel ? (
            <div className="text-xs text-white/55">{sublabel}</div>
          ) : null}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-white/50 transition group-hover:translate-x-0.5 group-hover:text-white/80" />
    </a>
  );
}

export default function MirchAndSpicyLinktree() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/20 via-cyan-400/20 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-240px] left-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-amber-400/15 via-rose-500/15 to-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 py-14">
        {/* Header card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            {/* Logo placeholder */}
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/10">
              <Image
                src={logo}
                alt="Mirch and Spicy logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Mirch and Spicy
              </h1>
              <p className="mt-1 text-sm text-white/65">
                Official links • deals • updates
              </p>
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <BadgePercent className="h-4 w-4" />
            Exclusive deals & discounts in the app
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <p className="px-1 text-xs font-medium uppercase tracking-wider text-white/45">
            Download our app
          </p>

          <LinkButton
            href={LINKS.playStore}
            icon={<Smartphone className="h-5 w-5 text-white/80" />}
            label="Google Play Store"
            sublabel="Exclusive deals and discounts"
          />
          {/* <LinkButton
            href={LINKS.appStore}
            icon={<Store className="h-5 w-5 text-white/80" />}
            label="Apple App Store"
            sublabel="Exclusive deals and discounts"
          /> */}

          <p className="mt-6 px-1 text-xs font-medium uppercase tracking-wider text-white/45">
            Follow us on social media
          </p>

          <LinkButton
            href={LINKS.facebook}
            icon={<Facebook className="h-5 w-5 text-white/80" />}
            label="Facebook"
            sublabel="News, offers, and updates"
          />
          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="h-5 w-5 text-white/80" />}
            label="Instagram"
            sublabel="Photos, reels, and stories"
          />

                  <p className="mt-6 px-1 text-xs font-medium uppercase tracking-wider text-white/45">
          Contact
        </p>

        <LinkButton
          href={LINKS.googleMaps}
          icon={<MapPin className="h-5 w-5 text-white/80" />}
          label="Find us on Google Maps"
          sublabel="Tap to open directions"
        />

        <LinkButton
          href={LINKS.whatsapp}
          icon={<MessageCircle className="h-5 w-5 text-white/80" />}
          label="WhatsApp"
          sublabel="Chat with us for orders & queries"
        />

        </div>
        <footer className="mt-auto pt-10 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Mirch and Spicy
        </footer>
      </section>
    </main>
  );
}
