export type PublicationStatus = "approved" | "pending_approval" | "draft";
export interface Customer {
  slug: string; name: string; publicationStatus: PublicationStatus;
  evidenceStatus: "verified" | "draft"; summary: string;
  services: { label: string; href: string }[];
  links: { label: string; href: string }[];
  sections: { heading: string; text: string }[];
}
// Public content only. Private research and pending records live in docs/customers/drafts.json.
export const customers: Customer[] = [{
  slug: "mandi-valley", name: "Mandi Valley", publicationStatus: "approved", evidenceStatus: "verified",
  summary: "Mandi Valley uses Restrova for Android and iOS ordering apps, an ordering website, POS/Admin, inventory and delivery operations through Fleet.",
  services: [
    { label: "Branded Android and iOS ordering apps", href: "/services/restaurant-ordering-apps" },
    { label: "Ordering website", href: "/services/restaurant-ordering-websites" },
    { label: "POS and administration", href: "/services/restaurant-pos" },
    { label: "Inventory management", href: "/services/inventory-management" },
    { label: "Delivery and Restrova Fleet", href: "/services/delivery-management" }
  ],
  links: [{ label: "Mandi Valley on the Apple App Store", href: "https://apps.apple.com/pk/app/mandi-valley/id6796204041" }],
  sections: [
    { heading: "About the implementation", text: "Mandi Valley brings its customer ordering channels and operational tools together through Restrova. Its public iOS listing describes ordering fresh produce and everyday essentials. This implementation shows how the connected ordering platform can support a food business alongside its restaurant applications." },
    { heading: "The scope of the setup", text: "The confirmed scope spans customer ordering, administration, stock and delivery. The branded apps and website provide customer entry points; POS/Admin, inventory and Fleet support the staff side. This account describes the services in use rather than an undocumented account of the business before implementation." },
    { heading: "The customer ordering journey", text: "The public Mandi Valley app description explains browsing categories, reviewing product information and prices, choosing quantities and managing a basket. Customers review their order and proceed through checkout, with delivery or pickup where available. These are published app capabilities; availability and fulfilment options depend on the current setup." },
    { heading: "From customer order to administration", text: "Mandi Valley uses Restrova POS and administration alongside its ordering channels. In the Restrova workflow, staff review incoming orders and follow preparation and fulfilment. For a similar setup, a demonstration should follow one sample order from the customer channel into Admin, including item choices and the person responsible for the next handoff." },
    { heading: "Stock and delivery as part of the same operation", text: "Inventory management and Restrova Fleet are confirmed parts of Mandi Valley's implementation. Stock records help frame availability decisions, while Fleet provides the delivery-management tools. Detailed recipe deductions, branch rules and customer-specific automation should be demonstrated separately rather than inferred from the names of these services." },
    { heading: "Restrova solutions used by Mandi Valley", text: "The implementation includes both branded mobile platforms, an ordering website, POS/Admin, inventory and Fleet. Together they cover the customer ordering channel and the operational tools behind it. This case study documents that scope without attributing sales growth, cost savings or delivery-time changes to the software." },
    { heading: "Plan a comparable workflow", text: "Bring your product or menu list, order channels, stock units and delivery arrangement to a demo. Ask the team to trace a normal order and a correction through the relevant tools. Agree account ownership, staff access, training and support before setting your launch plan." }
  ]
}];
export const approvedCustomers = customers.filter(customer => customer.publicationStatus === "approved" && customer.evidenceStatus === "verified");
export const getApprovedCustomer = (slug: string) => approvedCustomers.find(customer => customer.slug === slug);
