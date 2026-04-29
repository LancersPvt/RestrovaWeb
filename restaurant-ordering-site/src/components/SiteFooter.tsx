import Link from "next/link";

import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 bg-gradient-to-br from-[#2A2D34] via-[#3A3D44] to-[#2A2D34] text-gray-300">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#F4A261] to-[#E07A5F]" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] bg-clip-text text-transparent">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-white mb-4">Industries</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/industries/pizza-italian" className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block">
                  Pizza & Italian
                </Link>
              </li>
              <li>
                <Link href="/industries/fast-food-qsr" className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block">
                  Fast Food (QSR)
                </Link>
              </li>
              <li>
                <Link href="/industries/fine-dining" className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block">
                  Fine Dining
                </Link>
              </li>
              <li>
                <Link href="/industries/bakery-cafe" className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block">
                  Bakery & Cafe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-white mb-4">Quick links</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/compare-marketplaces" className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block font-semibold text-[#FF6B6B]">
                  Restrova vs Marketplaces
                </Link>
              </li>
              <li>
                <Link
                  href="/#platform"
                  className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#how"
                  className="transition hover:text-[#F4A261] hover:translate-x-1 inline-block"
                >
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-white mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition hover:text-[#F4A261] inline-flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500 text-center">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
