import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";
import { ArrowRight } from "lucide-react";

const nav = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Apps", href: "/apps" },
  { label: "Guides", href: "/blog" },
  { label: "FAQ", href: "/faq" },
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
            <Link key={item.href} href={item.href} className="transition hover:text-[#b83d29]">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="group hidden min-h-11 items-center gap-2 rounded-full bg-[#171816] px-5 text-sm font-black text-white transition hover:bg-[#e45239] focus:outline-none focus:ring-4 focus:ring-[#ff6247]/15 lg:inline-flex"
        >
          Request a Free Demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>

        <MobileNavigation items={nav} />
      </div>
    </header>
  );
}
