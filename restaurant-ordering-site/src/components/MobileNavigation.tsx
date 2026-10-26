"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function MobileNavigation({ items }: { items: { label: string; href: string }[] }) {
  const details = useRef<HTMLDetailsElement>(null);
  function close() { if (details.current) details.current.open = false; }
  return <details ref={details} className="group relative lg:hidden" onKeyDown={(event) => {
    if (event.key === "Escape") { close(); details.current?.querySelector("summary")?.focus(); }
  }}>
    <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/10 bg-white text-[#171816] [&::-webkit-details-marker]:hidden">
      <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" /><X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
      <span className="sr-only">Toggle navigation</span>
    </summary>
    <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-black/10 bg-white p-3 shadow-2xl">
      <nav className="flex flex-col" aria-label="Mobile navigation">
        {items.map((item) => <Link onClick={close} key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-bold text-black/70 transition hover:bg-[#fff4e7] hover:text-[#b83d29]">{item.label}</Link>)}
        <Link onClick={close} href="/#contact" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#c2412d] px-4 py-3 text-sm font-black text-white">Get a free demo<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </nav>
    </div>
  </details>;
}
