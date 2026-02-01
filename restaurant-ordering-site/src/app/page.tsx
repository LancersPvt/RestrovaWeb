import { Construction, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/25 via-cyan-400/20 to-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-amber-400/15 via-rose-500/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          <Construction className="h-4 w-4" />
          We’re building something polished.
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Under Construction
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          We develop modern restaurant online ordering systems. Our new website is
          almost ready—fast, conversion-focused, and built to scale.
        </p>

        <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <p className="text-sm font-medium text-white/80">Launch ETA</p>
            <p className="mt-2 text-sm text-white/60">
              Coming soon. (This page will automatically update when we deploy.)
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <p className="text-sm font-medium text-white/80">Contact</p>
            <a
              className="mt-2 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
              href="mailto:info@lancers.dev"
            >
              <Mail className="h-4 w-4" />
              info@lancers.dev
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
            <p className="mt-2 text-xs text-white/45">
              Replace with your real email.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/45">
          Tip: Your link page is live at <span className="text-white/70">/linktree/ashandbeans</span>
        </p>
      </section>
    </main>
  );
}
