import Link from "next/link";
import MarketingPage, { DemoCta } from "@/components/MarketingPage";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("/locations");
export default function LocationsPage() {
  return <MarketingPage path="/locations" label="Pakistan" title="Restaurant software for teams across Pakistan." intro="Start with your restaurant's workflow, then plan the branch and delivery details. Restrova's focus is restaurant owners, cafés, fast-food businesses, cloud kitchens and chains in Pakistan.">
    <section><h2>Islamabad and Rawalpindi: review connected branch operations</h2><p className="mt-4">If your restaurant serves both cities, document which branch accepts each order and the delivery areas your team actually covers. Bring those boundaries to a <Link href="/services/restaurant-pos">POS and order-management demo</Link>. Do not assume a rider can serve every address across the two cities at the same time or cost.</p></section>
    <section><h2>Lahore and Karachi: plan the direct ordering journey</h2><p className="mt-4">For a restaurant considering its own <Link href="/services/restaurant-ordering-apps">branded ordering app</Link> or <Link href="/services/restaurant-ordering-websites">ordering website</Link>, start with the branch menu, service hours and delivery process. Test a mobile order and the staff handoff using your own operating model before choosing a rollout date.</p></section>
    <section><h2>Peshawar, Chakwal, Talagang, Fateh Jang and Jhelum</h2><p className="mt-4">A useful software review does not require a large chain. Bring your current order volume, available devices and stock routine. Review mobile connectivity for riders, who will update menus and how staff will learn the system. Confirm onboarding arrangements and support scope for your location directly with Restrova.</p></section>
    <section className="seo-card"><h2>A location is a planning detail, not a separate product</h2><p className="mt-4">The core Restrova system and the published <Link href="/pricing">pricing formula</Link> are explained in one place. Your requirements may differ by branch, devices or delivery coverage. No local office, city-specific service level or guaranteed launch date is implied by this page.</p><p className="mt-4" lang="ur-Latn">Apne restaurant ka shehar, branches aur rozana orders batayein. Demo mein apne kaam ka tareeqa aur setup ki zarooriyat discuss karein.</p></section>
    <DemoCta title="Plan your restaurant's setup in Pakistan" />
  </MarketingPage>;
}
