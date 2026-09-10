import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Download,
  Laptop,
  Monitor,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const downloads = [
  {
    name: "Windows",
    detail: "Windows 10 or later",
    fileType: ".exe installer",
    href: "https://storage.googleapis.com/lostandfound-d0629.firebasestorage.app/admin/windows/restrova-admin-setup.exe",
    icon: Monitor,
    accent: "from-[#FF6B6B] to-[#F4A261]",
    ring: "group-hover:border-[#FF6B6B]/40",
    button: "bg-slate-900 hover:bg-slate-800",
  },
  {
    name: "Mac with Apple silicon",
    detail: "M1, M2, M3, M4 or newer",
    fileType: ".dmg installer",
    href: "https://storage.googleapis.com/lostandfound-d0629.firebasestorage.app/admin/macos/restrova-admin-apple-silicon.dmg",
    icon: Laptop,
    accent: "from-[#FF6B6B] to-[#F4A261]",
    ring: "border-[#F4A261]/40 group-hover:border-[#FF6B6B]/50",
    button:
      "bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] hover:shadow-[#FF6B6B]/25",
    recommended: true,
  },
  {
    name: "Mac with Intel chip",
    detail: "Intel-based Macs",
    fileType: ".dmg installer",
    href: "https://storage.googleapis.com/lostandfound-d0629.firebasestorage.app/admin/macos/restrova-admin-intel.dmg",
    icon: Cpu,
    accent: "from-slate-700 to-slate-900",
    ring: "group-hover:border-slate-400",
    button: "bg-slate-900 hover:bg-slate-800",
  },
] as const;

const features = [
  "Online and POS order management",
  "Inventory and stock control",
  "Live rider tracking and assignment",
  "Rider stats and payment reconciliation",
  "Loyalty, discounts, and coupons",
  "Custom admin colors and fonts",
];

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F2] text-slate-900">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#FF6B6B]/12 blur-3xl" />
        <div className="absolute -right-32 top-44 h-96 w-96 rounded-full bg-[#F4A261]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#8FBC8F]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between" aria-label="Download page navigation">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#F4A261]/25 bg-white/80 px-4 py-2 text-sm font-bold shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261]" />
            Restrova Admin
          </div>
        </nav>

        <section className="pb-16 pt-14 sm:pt-20 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F4A261]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#D95C57] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Your restaurant command centre
            </span>

            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get Restrova Admin for your computer
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Choose your platform to install the desktop app and manage orders,
              preparation, and day-to-day restaurant operations from one place.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3 lg:mt-14">
            {downloads.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.name}
                  className={`group relative flex flex-col rounded-[1.75rem] border bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(42,45,52,0.3)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(42,45,52,0.4)] sm:p-7 ${item.ring}`}
                >
                  {"recommended" in item && item.recommended ? (
                    <span className="absolute right-5 top-5 rounded-full bg-[#FFF0DE] px-3 py-1 text-xs font-bold text-[#C6534D]">
                      Recommended
                    </span>
                  ) : null}

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Restrova Admin
                    </p>
                    <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                      <span>{item.fileType}</span>
                      <span>Desktop app</span>
                    </div>

                    <a
                      href={item.href}
                      download
                      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B] focus-visible:ring-offset-2 ${item.button}`}
                      aria-label={`Download Restrova Admin for ${item.name}`}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-[#F4A261]/25 bg-[#FFF4E6]/80 p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#E0695F] shadow-sm">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-950">Not sure which Mac download to choose?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    On your Mac, open the Apple menu and select <strong className="font-semibold text-slate-800">About This Mac</strong>.
                    Choose Apple silicon if the chip begins with M; choose Intel if it lists an Intel processor.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 sm:p-7">
              <p className="text-sm font-bold text-slate-950">Your restaurant control center</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Run the daily operation from orders and stock to riders and repeat customers.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-5 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E0695F]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative border-t border-[#F4A261]/20 bg-white/60 px-6 py-6 text-center text-sm text-slate-600 backdrop-blur">
        Having trouble installing? Contact the Restrova support team for help.
      </footer>
    </main>
  );
}
