"use client";

import Image from "next/image";
import Link from "next/link";

const nav = [
  { label: "Platform", href: "/#platform" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#how" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/30 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="Restrova"
            width={240}
            height={60}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-[#FF6B6B] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-[#FF6B6B] after:to-[#F4A261] after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-7 text-sm font-semibold text-white shadow-lg shadow-coral-500/30 transition-all hover:shadow-xl hover:shadow-coral-500/40 hover:scale-105"
          >
            Request demo
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-amber-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-amber-50 list-none">
            <span>Menu</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl animate-fade-in">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-slate-900">Menu</span>
                <button
                  onClick={(e) => {
                    const details = e.currentTarget.closest('details');
                    if (details) details.open = false;
                  }}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-coral-50 hover:text-coral-600 transition"
                  aria-label="Close menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-coral-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Request demo
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}



