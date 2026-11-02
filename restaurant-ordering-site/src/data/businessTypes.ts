export interface BusinessType {
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
  checklist: string[];
  faqs: { question: string; answer: string }[];
  services: string[];
  guide: { slug: string; label: string };
}

export const businessTypes: BusinessType[] = [
  {
    slug: "cafes", label: "Cafés and coffee shops",
    title: "Café POS and Ordering Software in Pakistan",
    description: "Connect café counter orders, drink choices, pickup ordering and menu availability. Explore Restrova with a practical coffee-shop workflow and free demo.",
    intro: "A café needs the right drink choices to reach preparation while the counter keeps moving. Restrova brings POS, website and app orders into restaurant administration, with menu options and availability controls for your team to review together.",
    sections: [
      { title: "Carry drink choices from counter to preparation", text: "Bring a drink with the sizes and options you actually sell. Check which choices are required, how they change the price and what the preparation team sees. Compare the same drink ordered at the counter and through your branded website. Specialist rules, such as a complex combination of milk substitutions and bundle discounts, should be demonstrated before you include them in the launch menu." },
      { title: "Make pickup instructions clear", text: "For a customer collecting a coffee and snack, the menu, branch and collection instructions should be easy to understand on a phone. Review the pickup flow enabled for your café and how staff identify the order. Confirm any scheduled pickup, queue display or precise ready-time feature separately; a pickup option does not establish those specialist functions." },
      { title: "Keep the last slice off an unavailable menu", text: "When a pastry or ingredient runs out, someone must update availability and check the counter and customer views. Restrova includes stock management and item availability controls. Test a short stock list and an unavailable menu item in your demo, including what happens to an order already being placed." },
      { title: "Give regular customers a useful reason to return", text: "A branded ordering link or app can make your café easier to recognize. Restrova's offering includes loyalty, discounts and coupons; demonstrate the specific reward you want to offer and calculate its cost. Subscriptions, timed offers or automated campaigns are separate requirements to confirm. Review repeat orders and reward costs without assuming every promotion creates extra profit." },
    ],
    checklist: ["One drink with required options and a price change.", "A counter order and a mobile pickup order arriving together.", "An unavailable pastry and the customer's resulting menu.", "A proposed reward, its conditions and the closing sales record."],
    faqs: [
      { question: "Can a café start with a website before promoting an app?", answer: "A Restrova ordering website provides a browser-based route to the menu. Review the website and app scope together, then choose the customer launch sequence your team can support." },
      { question: "Are my receipt printer and payment terminal supported?", answer: "Share the model numbers and payment provider. Compatibility needs a demonstration and written confirmation for your setup." },
      { question: "Does this include a separate café price?", answer: "No separate café tariff is claimed here. Use the published pricing and confirm branches, devices, taxes and any exclusions in your proposal." },
    ],
    services: ["restaurant-pos", "restaurant-ordering-websites", "restaurant-ordering-apps", "inventory-management"],
    guide: { slug: "start-online-ordering-small-restaurant-pakistan", label: "Plan your first online ordering service" },
  },
  {
    slug: "cloud-kitchens", label: "Cloud kitchens",
    title: "Cloud Kitchen Ordering Software in Pakistan",
    description: "Plan direct orders for a cloud kitchen with branded ordering, preparation statuses, menu availability and rider dispatch. Review the workflow in a demo.",
    intro: "A delivery-only kitchen needs a reliable handoff from checkout to preparation and dispatch. Restrova connects your own ordering website and apps with Admin, stock controls and Fleet rider operations, so you can evaluate the complete delivery workflow.",
    sections: [
      { title: "Build an official ordering route", text: "Give customers who already know your kitchen a recognizable website or branded app. Prepare an accurate menu and explain the delivery areas and service hours your team can fulfil. A direct channel still needs customer acquisition; keep marketplace discovery where it serves a useful purpose and compare the full cost of each channel." },
      { title: "Keep preparation separate from dispatch", text: "An accepted order is not necessarily ready for a rider. Review the preparation statuses in Admin and name the person responsible for each update. Test two orders with similar items and different delivery details. Confirm any kitchen display, station routing or automatic marketplace import independently rather than assuming those integrations." },
      { title: "Test availability before a customer pays", text: "A delivery-only operation cannot rely on a counter conversation to explain an unavailable item. Assign someone to maintain stock records and menu availability, then rehearse an item becoming unavailable during service. Check the customer experience and the team's procedure for correcting an affected order." },
      { title: "Carry the delivery through settlement", text: "Review assignment, rider status, customer tracking and end-of-shift reconciliation with your intended phones and network conditions. Fleet supports these delivery workflows, while the restaurant must confirm rider staffing, coverage and exception handling. If a delivery fails, staff should know who contacts the customer and how the order and collected money are reviewed." },
    ],
    checklist: ["A direct mobile order from checkout into preparation.", "A delivery address inside, near and outside the service boundary.", "An unavailable rider, an unsuccessful delivery and a cash reconciliation.", "For several brands, a separate demonstration of accounts, menus and order separation."],
    faqs: [
      { question: "Does Restrova import orders from every marketplace?", answer: "Direct website and app ordering do not establish marketplace integration. Name the provider and require the import workflow to be demonstrated and included in scope." },
      { question: "Can one kitchen operate multiple virtual brands?", answer: "Bring your brand structure to the demo. Multi-brand separation, shared inventory and billing are specialist requirements that must be confirmed; this page does not promise them." },
      { question: "Does Fleet supply delivery riders?", answer: "Fleet is rider-management software. Rider staffing, courier services and third-party integrations require separate agreement." },
    ],
    services: ["restaurant-ordering-websites", "restaurant-ordering-apps", "delivery-management", "inventory-management"],
    guide: { slug: "restaurant-rider-management-tracking-settlement", label: "Plan dispatch, tracking and rider settlement" },
  },
  {
    slug: "fast-food-restaurants", label: "Fast-food restaurants",
    title: "Fast-Food Restaurant POS Software in Pakistan",
    description: "Review fast-food counter and online orders, item choices, preparation handoffs, takeaway and rider dispatch with Restrova POS and ordering software.",
    intro: "A fast-food team needs to distinguish counter, takeaway and delivery orders during a busy service. Restrova brings walk-in, POS, website and app orders into Admin so you can test order entry, preparation and fulfilment as one workflow.",
    sections: [
      { title: "Test your real order entry", text: "Bring a burger or pizza with the sizes, choices and prices your counter staff use. Ask a staff member to enter it, verify the total and locate the order record. Then try a correction. This is more useful than assuming a particular order-entry speed from a screenshot; no throughput or time-saving figure is promised here." },
      { title: "Distinguish orders arriving together", text: "Rehearse several counter and direct online orders close together. Check the reference, channel, branch and item choices visible to the preparation team. Name the person who checks incoming orders and updates status. Confirm printer routing, kitchen screens, kiosks and offline operation against the actual devices and configuration." },
      { title: "Separate takeaway collection from rider dispatch", text: "The staff handoff differs when a customer collects an order and when a rider takes it for delivery. Review both configured flows and decide who verifies the package. For delivery, continue into rider assignment, tracking and settlement rather than ending the demonstration when the kitchen marks an order ready." },
      { title: "Close the shift with understandable records", text: "Compare completed and cancelled orders with the sales report and any cash collected by riders. Ask how corrections and discounts affect the totals. A sales report is a starting point for reconciliation, not proof that cash balances or that every sale is profitable." },
    ],
    checklist: ["A menu item with required options and an order correction.", "Several counter and direct online orders with distinct references.", "A takeaway collection alongside a rider delivery.", "A cancellation, the closing report and a device-interruption question."],
    faqs: [
      { question: "Will online and counter orders be visible in Admin?", answer: "Restrova's offering includes website, customer-app, walk-in and POS orders. Review the exact staff view and preparation flow with your own example orders." },
      { question: "Is a kitchen display or self-service kiosk included?", answer: "These are separate device and integration requirements. Request a working demonstration and written inclusion before relying on them." },
      { question: "Can we use the system at more than one branch?", answer: "Restrova supports branch-configured operations. Review menus, order destinations, access, reports and commercial scope for your particular branch structure." },
    ],
    services: ["restaurant-pos", "delivery-management", "reporting-analytics"],
    guide: { slug: "how-to-choose-restaurant-pos-software-pakistan", label: "Use the restaurant POS buying checklist" },
  },
  {
    slug: "multi-branch-restaurants", label: "Multi-branch restaurants",
    title: "Multi-Branch Restaurant Software in Pakistan",
    description: "Evaluate branch menus, order destinations, staff responsibilities, delivery coverage and reporting with Restrova. Plan a clear multi-branch rollout.",
    intro: "Connected branches need shared standards and clear local differences. Restrova's offering supports branch-configured menus, pricing, availability, delivery areas and operations. Bring your branch structure to a demo of the access and reporting scope you require.",
    sections: [
      { title: "Document the differences between locations", text: "List each branch's hours, menu owner, prices, available items and manager. Test a shared item with a different price and availability at two branches. Decide which updates should be central and which should stay local; verify the available controls before assuming every change can be applied everywhere." },
      { title: "Check the destination of each order", text: "Place a demonstration order for each branch and have the relevant staff find it. Review addresses near overlapping delivery boundaries and an order attempted outside branch hours. Automatic nearest-branch selection, transfers or failover are requirements to demonstrate separately, not assumptions implied by connected software." },
      { title: "Match staff access and stock to the branch", text: "Ask to see the access needed by a cashier, a branch manager and an owner. Confirm who can change menus, review orders and view reports. Keep stock-count ownership local and demonstrate any required inter-branch transfers or shared purchasing; stock visibility alone does not establish those advanced functions." },
      { title: "Compare reports and roll out deliberately", text: "Agree consistent reporting periods and treatment of refunds, discounts and cancellations. Trace orders from each branch into the relevant reports and confirm any combined view or export. Pilot the agreed workflow, train the branch teams and resolve exceptions before extending the rollout. Confirm onboarding, monthly billing and support coverage for the complete branch arrangement." },
    ],
    checklist: ["A branch worksheet with menu, hours, staff and coverage differences.", "The same item with branch-specific price and availability.", "One order per branch and an address near a delivery boundary.", "Staff access, comparable reports and a staged rollout proposal."],
    faqs: [
      { question: "Does the published price cover unlimited branches?", answer: "No unlimited-branch claim is made. Confirm the branches, accounts and billing scope in the written proposal alongside the published fee formula." },
      { question: "Can we transfer stock or orders between branches?", answer: "Bring the exact transfer process to the demo. Branch management alone does not establish automatic stock transfers or order reassignment between locations." },
      { question: "Will the owner see consolidated accounts?", answer: "Review the reports and exports you require. Sales reporting does not imply consolidated accounting or a complete profit-and-loss statement." },
    ],
    services: ["restaurant-pos", "inventory-management", "reporting-analytics"],
    guide: { slug: "manage-multiple-restaurant-branches", label: "Prepare a multi-branch implementation worksheet" },
  },
];

export const getBusinessType = (slug: string) => businessTypes.find((item) => item.slug === slug);
