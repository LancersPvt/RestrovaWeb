import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((item, i) => ({
      "@type": "ListItem", position: i + 1, name: item.label, item: new URL(item.href, siteConfig.url).toString(),
    })) }} />
    <nav aria-label="Breadcrumb" className="mb-7 text-sm">
      <ol className="flex flex-wrap gap-x-3 gap-y-2">{all.map((item, i) => <li key={item.href} className="flex gap-3">
        {i > 0 && <span aria-hidden="true">/</span>}
        {i === all.length - 1 ? <span aria-current="page">{item.label}</span> : <Link className="underline underline-offset-4" href={item.href}>{item.label}</Link>}
      </li>)}</ol>
    </nav>
  </>;
}

export function DemoCta({ title = "See how it fits your restaurant" }: { title?: string }) {
  return <section className="rounded-[2rem] bg-[#171816] p-7 text-white sm:p-10">
    <h2 className="text-3xl font-black tracking-tight">{title}</h2>
    <p className="mt-4 max-w-2xl leading-7 text-white/80">Bring your menu, branch count and current order workflow. We will walk through the relevant tools and agree the scope before you commit.</p>
    <div className="mt-6 flex flex-wrap gap-4">
      <Link href="/contact" className="seo-button">Request a Free Demo</Link>
      <Link href="/pricing" className="inline-flex min-h-12 items-center font-bold underline underline-offset-4">See pricing and examples</Link>
    </div>
  </section>;
}

export default function MarketingPage({ path, label, title, intro, children, parent }: {
  path: string; label: string; title: string; intro: string; children: ReactNode; parent?: { label: string; href: string };
}) {
  return <main id="main-content" className="bg-[#fffaf4] text-[#171816]">
    <section className="border-b border-black/5 bg-[#171816] py-12 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[...(parent ? [parent] : []), { label, href: path }]} />
        <p className="text-sm font-bold uppercase tracking-[.16em] text-[#ffb09b]">Restrova · For restaurant owners</p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-tight tracking-[-.04em] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{intro}</p>
        <Link href="/contact" className="seo-button mt-7">Request a Free Demo</Link>
      </div>
    </section>
    <div className="seo-content mx-auto max-w-6xl space-y-14 px-6 py-14 sm:py-20">{children}</div>
  </main>;
}
