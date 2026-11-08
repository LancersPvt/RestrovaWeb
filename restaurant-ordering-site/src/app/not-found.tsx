import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="min-h-[65vh] bg-[#fffaf4] px-6 py-20 text-center text-[#171816]">
    <p className="font-bold">404</p><h1 className="mt-3 text-4xl font-black">This page could not be found.</h1>
    <p className="mx-auto mt-5 max-w-lg leading-7">Explore Restrova restaurant software, review pricing or arrange a free demo.</p>
    <nav aria-label="Page recovery" className="mt-7 flex flex-wrap justify-center gap-6"><Link href="/" className="underline">Home</Link><Link href="/services" className="underline">Solutions</Link><Link href="/pricing" className="underline">Pricing</Link><Link href="/contact" className="underline">Free demo</Link></nav>
  </main>;
}
