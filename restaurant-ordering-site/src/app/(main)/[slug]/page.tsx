import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCountries, getCityLabel, getCountryLabel, isValidLocation } from "@/data/locationData";
import { getServiceBySlug } from "@/data/services";
import { getSolution, legacyServiceDestinations } from "@/data/solutions";
import { parseSlugSafe } from "@/lib/slugUtils";
import { pageMetadata } from "@/lib/seo";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";

// Resolve known legacy URLs on demand instead of prebuilding 552 thin pages.
export function generateStaticParams() { return []; }
export const revalidate = 86400;
function resolve(slug: string) {
  const parsed = parseSlugSafe(slug, getAllCountries());
  if (!parsed || !isValidLocation(parsed.country, parsed.city)) return null;
  const service = getServiceBySlug(parsed.service); if (!service) return null;
  return { parsed, service, city: getCityLabel(parsed.country, parsed.city), country: getCountryLabel(parsed.country) };
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const data = resolve(slug); if (!data) notFound();
  return pageMetadata(`/${slug}`, `${data.service.name}: ${data.city}`, `Review ${data.service.name.toLowerCase()} requirements for a restaurant in ${data.city}, ${data.country}, and explore Restrova's current solutions.`, false);
}
export default async function LegacyLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const data = resolve(slug); if (!data) notFound();
  const destination = legacyServiceDestinations[data.parsed.service];
  const solution = destination ? getSolution(destination) : undefined;
  return <MarketingPage path={`/${slug}`} label={data.city} parent={{ label: "Solutions", href: "/services" }} title={`${data.service.name}: planning for ${data.city}`} intro={`Review the ordering and operations requirements for your restaurant in ${data.city}, ${data.country}. Restrova's current commercial focus is Pakistan.`}>
    <section><h2>Start with the workflow you need</h2><p className="mt-4">Describe how your team takes orders, updates menu availability and manages daily operations. Confirm the required devices, integrations and support scope in a demonstration before choosing software.</p>
      {solution ? <p className="mt-4">Read the current <Link href={`/services/${solution.slug}`}>{solution.label} guide</Link> for the capabilities and questions to review.</p> : <p className="mt-4">Review the <Link href="/services">current Restrova solutions</Link>. Specialist requirements such as kitchen display routing or automated CRM campaigns need separate product confirmation and are not promised by this page.</p>}
    </section>
    <section><h2>Confirm the local setup</h2><p className="mt-4">Share your branches, delivery areas and internet connectivity. No local office, city-specific service level or payment integration is implied. {data.parsed.country === "pakistan" ? "See the Pakistan planning guide and current PKR pricing." : "Availability, commercial terms and local requirements outside Pakistan must be confirmed directly with Restrova."}</p><p className="mt-4"><Link href="/locations">Pakistan planning guide</Link> · <Link href="/pricing">Pricing and worked examples</Link></p></section>
    <DemoCta />
  </MarketingPage>;
}
