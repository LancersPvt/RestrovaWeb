export interface Solution {
  slug: string; label: string; title: string; description: string; heading: string; intro: string;
  sections: { heading: string; text: string; points?: string[] }[];
  demo: string[]; related: string[];
}

export const solutions: Solution[] = [
  {
    slug: "restaurant-ordering-apps", label: "Branded ordering apps", title: "Branded Restaurant Ordering Apps in Pakistan",
    description: "Give regular customers your own Android and iOS restaurant ordering apps. Connect branded mobile ordering with Restrova Admin, menus and delivery workflows.",
    heading: "Branded Restaurant Ordering Apps in Pakistan",
    intro: "Restrova provides branded Android and iOS ordering applications for restaurants in Pakistan. Give customers who already know your food a direct route back to your menu, with orders managed by your team.",
    sections: [
      { heading: "Make repeat ordering part of your brand", text: "A restaurant app is useful when regular customers have a reason to return. Start with a menu that is easy to browse, clear item options and an ordering flow your staff can support. Your logo and brand should help customers recognize the restaurant they trust.", points: ["Branded Android and iOS customer applications", "Menu items, modifiers and availability", "Orders connected to Restrova Admin"] },
      { heading: "App development starts with your restaurant workflow", text: "Before choosing screens or launch dates, map how an order moves from the customer to preparation and delivery. Bring a sample menu and explain which branches accept each order. The demo can then focus on the handoffs that matter to your restaurant." },
      { heading: "Plan the store launch and the first customers", text: "App availability depends on the restaurant's approved store listings. Agree who owns the developer accounts, which devices will be tested and who maintains screenshots and support details. Store review times and account charges must be confirmed in your launch scope; an app does not create demand on its own." },
    ],
    demo: ["Try a real menu item with its options on Android and iOS.", "Follow the order in Admin and review the delivery workflow.", "Agree branding assets, store account ownership and launch responsibilities."],
    related: ["restaurant-ordering-websites", "restaurant-pos", "delivery-management"],
  },
  {
    slug: "restaurant-ordering-websites", label: "Ordering websites", title: "Restaurant Websites with Online Ordering Pakistan",
    description: "Build a branded restaurant website with online ordering in Pakistan. Connect your menu and customer orders with Restrova Admin and your delivery workflow.",
    heading: "Restaurant Websites with Online Ordering in Pakistan",
    intro: "Give customers a link to your own menu and ordering experience. Restrova connects a branded restaurant ordering website to the admin tools your team uses to manage incoming orders.",
    sections: [
      { heading: "Turn interest into a clear ordering journey", text: "A customer arriving from a social post or your restaurant profile needs to understand the menu, available choices and how the order will be fulfilled. Keep that journey focused on your restaurant, especially on a small mobile screen.", points: ["A website presented under your restaurant brand", "Menu items, prices, modifiers and availability", "Online orders connected with restaurant administration"] },
      { heading: "Set delivery expectations before launch", text: "Use the demo to review branch selection, delivery areas and pickup requirements. Confirm the payment methods and providers for your setup before advertising them. A website should explain the order process clearly without promising delivery to areas your team cannot serve." },
      { heading: "Connect the website with the rest of service", text: "Your counter team and online-order team need a shared view of what can be sold. Walk through how an unavailable item is handled and who checks each incoming order. For a café or cloud kitchen, this practical rehearsal can reveal more than a long list of website features." },
    ],
    demo: ["Open a sample menu on a mobile phone and place a demonstration order.", "Check item availability and how the team sees incoming orders.", "Confirm domain ownership, delivery coverage and payment-provider scope."],
    related: ["restaurant-ordering-apps", "restaurant-pos", "inventory-management"],
  },
  {
    slug: "restaurant-pos", label: "POS and order management", title: "Restaurant POS and Order Management Pakistan",
    description: "Manage online, app, walk-in and POS orders with Restrova restaurant software in Pakistan. Review your counter and preparation workflow in a free demo.",
    heading: "Restaurant POS & Order Management Software in Pakistan",
    intro: "Keep online and counter orders in view. Restrova brings online, app, walk-in and POS order management into your restaurant administration workflow, so your team can follow service across channels.",
    sections: [
      { heading: "Start with the way your team takes orders", text: "A fast-food counter, café and restaurant with delivery have different handoffs. Show how staff take a walk-in or phone order today, who checks item options and when preparation starts. Use those steps to evaluate the POS instead of comparing screen counts.", points: ["Walk-in and POS order entry", "Website and customer-app orders", "Order and preparation statuses in Admin"] },
      { heading: "Review a busy service, not just one sale", text: "During the demo, ask the team to work through several orders from different channels. Review how they identify each order, update its status and pass it to delivery. Bring the branch structure and staff responsibilities so the proposed setup matches the way you operate." },
      { heading: "Confirm hardware and integrations separately", text: "List your existing computers, printers, payment devices and any fiscal reporting requirements. Compatibility, offline operation, payment processing and tax integrations require explicit confirmation. Do not assume an existing device or integration is included simply because a system has a POS." },
    ],
    demo: ["Enter a walk-in order and compare it with a website order.", "Follow preparation and delivery handoffs with your staff roles.", "Review printer, payment and tax-integration requirements before agreeing scope."],
    related: ["inventory-management", "reporting-analytics", "delivery-management"],
  },
  {
    slug: "inventory-management", label: "Inventory management", title: "Restaurant Inventory Management Software Pakistan",
    description: "Manage restaurant stock and menu availability with Restrova in Pakistan. Review inventory workflows alongside POS, online orders and branch operations.",
    heading: "Restaurant Inventory Management Software in Pakistan",
    intro: "Restrova includes inventory and stock management for restaurant operations. Bring your stock records and menu to a walkthrough of how your team can track availability alongside incoming orders.",
    sections: [
      { heading: "Begin with a reliable opening stock record", text: "Software cannot correct an inaccurate starting count. Decide which ingredients or items your team will track, agree their units and identify who records changes. For a café, a clear daily count of frequently used items may be a more useful starting point than a complicated reporting setup.", points: ["Inventory and stock management", "Item availability controls", "Stock visibility alongside restaurant operations"] },
      { heading: "Give the team a repeatable stock routine", text: "Review stock at a consistent time and investigate differences before they accumulate. When an item is unavailable, the people handling website, app and counter orders need to know. Use the demo to check the relationship between your stock workflow and menu availability." },
      { heading: "Verify specialist inventory requirements", text: "Bring any requirements for recipe deductions, expiry tracking, purchase orders, supplier workflows or branch transfers. These need to be demonstrated and agreed for your setup. The current inventory offering should not be treated as a promise of every specialist warehouse function." },
    ],
    demo: ["Use your own stock units and a small sample of menu items.", "Review how staff record stock and change item availability.", "Agree stock-count responsibilities and any specialist requirements."],
    related: ["restaurant-pos", "restaurant-ordering-websites", "reporting-analytics"],
  },
  {
    slug: "delivery-management", label: "Delivery and rider management", title: "Restaurant Delivery and Rider Management Pakistan",
    description: "Coordinate restaurant deliveries with Restrova Fleet: rider assignment, live tracking, delivery statuses and rider settlement workflows. Request a demo.",
    heading: "Restaurant Delivery & Rider Management in Pakistan",
    intro: "Restrova Fleet supports restaurant delivery and rider management. Connect order dispatch with rider assignment, live tracking and delivery status so your team can follow an order beyond the kitchen.",
    sections: [
      { heading: "Know who is handling each delivery", text: "The handoff from preparation to dispatch should identify the order and the rider responsible for it. Review how your team assigns riders and follows status changes. Live tracking helps the restaurant and customer follow delivery where the configured service and device permissions support it.", points: ["Rider assignment and delivery statuses", "Live rider tracking for administrators and customers", "Rider performance statistics and payment reconciliation"] },
      { heading: "Review the end of the shift too", text: "A delivery workflow is incomplete if staff cannot reconcile the activity afterward. Use a sample shift to review delivery records and rider payments. Agree how your team handles questions about cash collected, incomplete deliveries and settlement differences." },
      { heading: "Match the setup to actual delivery coverage", text: "Share the areas served by each branch and the phones used by your riders. Connectivity, location permissions and the agreed dispatch process affect tracking. Confirm device setup and onboarding with Restrova; no public Fleet app-store listing is advertised unless its availability has been verified." },
    ],
    demo: ["Assign an example delivery and follow its status.", "Review rider and customer tracking on the intended devices.", "Walk through a rider settlement with your operations manager."],
    related: ["restaurant-pos", "reporting-analytics", "restaurant-ordering-apps"],
  },
  {
    slug: "reporting-analytics", label: "Reporting and analytics", title: "Restaurant Reporting and Analytics Pakistan",
    description: "Review restaurant sales, orders and delivery activity with Restrova reporting in Pakistan. Turn operational records into useful daily review questions.",
    heading: "Restaurant Reporting & Analytics in Pakistan",
    intro: "Restrova includes reporting and business analytics alongside order and delivery operations. Start with the decisions your restaurant needs to make, then review the available reports in a free demo.",
    sections: [
      { heading: "Agree what each number means", text: "A sales total needs context: which branch, which period and which order statuses are included. Before relying on a report, ask how cancellations, discounts and other adjustments appear. Restrova-processed sales are also the basis for the percentage component of your monthly service fee.", points: ["Restaurant order and sales reporting", "Rider performance statistics", "Delivery activity and payment reconciliation"] },
      { heading: "Build a practical review routine", text: "At the end of service, compare the order records with what your team handled. Use delivery information to identify handoff questions and stock records to investigate availability problems. Review patterns over several comparable shifts before changing staffing or promotions." },
      { heading: "Separate sales reporting from profit accounting", text: "Revenue alone does not show profit. Food costs, wages, rent, payment charges and delivery costs may sit in other records. Confirm the reports, filters and export requirements you need; accounting integration, predictive analytics and automated cost-of-goods calculations require a separate demonstration and agreement." },
    ],
    demo: ["Review a sample order and sales report with clear date and branch filters.", "Follow delivery activity through rider settlement.", "List the reporting fields and exports your manager needs each week."],
    related: ["restaurant-pos", "inventory-management", "delivery-management"],
  },
];

export function getSolution(slug: string) { return solutions.find((solution) => solution.slug === slug); }
export const legacyServiceDestinations: Record<string, string> = {
  pos: "restaurant-pos", "online-ordering": "restaurant-ordering-websites", "app-development": "restaurant-ordering-apps",
  inventory: "inventory-management", analytics: "reporting-analytics",
};
