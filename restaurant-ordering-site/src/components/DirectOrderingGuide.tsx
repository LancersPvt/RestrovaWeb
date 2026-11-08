import Link from "next/link";

export default function DirectOrderingGuide({ channel }: { channel: "website" | "app" }) {
  return <section id="direct-ordering-guide" className="scroll-mt-28">
    <h2>{channel === "website" ? "Start direct online ordering with a website, then plan the app" : "Where a branded app fits in your direct ordering setup"}</h2>
    <p className="mt-4 max-w-3xl">{channel === "website"
      ? "Direct ordering means the customer places the order through your restaurant's own channel. A website gives you a menu and ordering link that opens in a browser. A branded app offers another route for customers who choose to install it; both journeys need a team ready to receive and fulfil orders."
      : "A restaurant-branded app serves customers who choose to keep your restaurant on their phone. It works alongside a browser ordering link, while Admin is for staff handling the order and Fleet is for rider operations. Choose the launch sequence around your customers and the team's readiness."}</p>
    <div className="mt-7 grid gap-5 md:grid-cols-2">
      <div className="seo-card"><h3>{channel === "website" ? "Make the first order easy to follow" : "Give regulars a reason to use the app"}</h3>
        <p className="mt-3">{channel === "website" ? "Check the menu, item choices and configured pickup or delivery flow on a phone. Follow a sample order into Admin and ask the branch team to find it. Agree who handles an unavailable item or an address outside your delivery area." : "Test a real menu item, order status and the repeat-order experience you intend to offer. Inspect the published restaurant-app listings below, then demonstrate the features agreed for your own app. A store listing is evidence of publication; it does not promise more orders."}</p>
        <p className="mt-4"><Link href={channel === "website" ? "/blog/start-online-ordering-small-restaurant-pakistan" : "/apps#customer-app-examples"}>{channel === "website" ? "Prepare your first direct-ordering launch" : "Review published customer-app examples"}</Link></p>
      </div>
      <div className="seo-card"><h3>Agree the customer channel and the operating scope</h3>
        <p className="mt-3">{channel === "website" ? "If you also want an app, compare account ownership, store review, maintenance and the customer journey. Confirm pricing and rollout scope before deciding which channel to promote first." : "Keep a website route for customers who prefer ordering without an installation. Confirm developer-account ownership, maintenance and store charges alongside the published software fee."}</p>
        <p className="mt-4"><Link href={channel === "website" ? "/services/restaurant-ordering-apps" : "/services/restaurant-ordering-websites"}>{channel === "website" ? "Plan a branded Android and iOS app" : "Explore browser-based direct ordering"}</Link> · <Link href="/pricing">Review pricing and exclusions</Link></p>
      </div>
    </div>
    <p className="mt-6 max-w-3xl">Direct orders still need <Link href="/services/restaurant-pos">order and preparation handling</Link>, <Link href="/services/inventory-management">stock and availability checks</Link>, and <Link href="/services/delivery-management">delivery dispatch where needed</Link>. For several locations, review <Link href="/solutions/multi-branch-restaurants">branch menus, order destinations and staff access</Link>.</p>
    {channel === "website" && <p className="mt-4 max-w-3xl">You can keep a marketplace channel where it is useful. Your own website does not imply automatic marketplace or WhatsApp order imports, an included payment integration, or a zero-cost service. Compare <Link href="/compare-marketplaces">channel responsibilities and costs</Link> and verify the integrations you require.</p>}
  </section>;
}
