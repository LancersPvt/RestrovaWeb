"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const nav = [
  { label: "Why direct", href: "/#outcomes" },
  { label: "Platform", href: "/#platform" },
  { label: "Restaurants", href: "/#restaurants" },
  { label: "How it works", href: "/#how" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#fffaf4]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Restrova home">
          <span className="flex h-16 w-32 items-center justify-center overflow-hidden sm:w-36">
            <Image
              src="/logo.png"
              alt="Restrova"
              width={220}
              height={220}
              className="h-16 w-32 scale-[2.25] object-contain mix-blend-multiply sm:w-36"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-black/65 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#e45239]">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="group hidden min-h-11 items-center gap-2 rounded-full bg-[#171816] px-5 text-sm font-black text-white transition hover:bg-[#e45239] focus:outline-none focus:ring-4 focus:ring-[#ff6247]/15 lg:inline-flex"
        >
          Get a free demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/10 bg-white text-[#171816] [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-black/10 bg-white p-3 shadow-2xl">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-black/70 transition hover:bg-[#fff4e7] hover:text-[#e45239]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6247] px-4 py-3 text-sm font-black text-white"
              >
                Get a free demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
