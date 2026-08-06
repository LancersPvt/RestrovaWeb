import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#171816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div className="max-w-md">
            <p className="text-2xl font-black tracking-[-0.04em]">Restrova</p>
            <p className="mt-4 text-sm leading-7 text-white/55">
              Direct online ordering, customer apps, and restaurant operations
              tools—built around your brand and the way your team works.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#ff9b84] transition hover:text-white"
            >
              Request a free demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-white/35">Explore</p>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-white/60">
              <li><Link href="/#outcomes" className="transition hover:text-white">Why direct ordering</Link></li>
              <li><Link href="/#platform" className="transition hover:text-white">Platform</Link></li>
              <li><Link href="/#restaurants" className="transition hover:text-white">Restaurants</Link></li>
              <li><Link href="/services" className="transition hover:text-white">All services</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-white/35">For restaurants</p>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-white/60">
              <li><Link href="/compare-marketplaces" className="transition hover:text-white">Restrova vs marketplaces</Link></li>
              <li><Link href="/#how" className="transition hover:text-white">How it works</Link></li>
              <li><Link href="/#faq" className="transition hover:text-white">Common questions</Link></li>
              <li><a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-white">Email Restrova</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Restrova. All rights reserved.</p>
          <p>Your restaurant. Your customers. Your growth.</p>
        </div>
      </div>
    </footer>
  );
}
