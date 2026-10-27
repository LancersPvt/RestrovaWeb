export interface SolutionGuide {
  workflowTitle: string;
  workflowIntro: string;
  steps: { title: string; text: string }[];
  decisionTitle: string;
  decisions: string[];
  faqs: { question: string; answer: string }[];
  reading: { href: string; label: string }[];
}

export const solutionGuides: Record<string, SolutionGuide> = {
  "restaurant-pos": {
    workflowTitle: "From a counter order to the end-of-shift review",
    workflowIntro: "Use one familiar menu item to connect the cashier, preparation team and manager. Restrova supports POS and walk-in orders alongside website and app orders; your demonstration should follow the complete handoff.",
    steps: [
      { title: "Record the order", text: "Select the items, quantities and applicable options. Check the order with the customer before preparation. Compare this counter entry with an order arriving from your restaurant website or app." },
      { title: "Keep preparation visible", text: "Identify who checks incoming orders and updates preparation status in Admin. Test two orders arriving close together so staff can distinguish the channel, branch and items without relying on a verbal reminder." },
      { title: "Complete the handoff", text: "Review how staff handle pickup, counter service or delivery in your setup. For delivery, continue into rider assignment and delivery status. Confirm the exact printing or kitchen-display arrangement separately." },
      { title: "Review the shift", text: "Compare the order records with the sales report and delivery activity. Ask how cancelled or adjusted orders are represented, and agree who investigates a difference before the next shift starts." },
    ],
    decisionTitle: "A POS buying checklist for your restaurant",
    decisions: ["Bring the model numbers of the computers, receipt printers and payment devices you already use.", "Write down each order source. Direct website/app orders do not imply automatic imports from marketplaces or messaging apps.", "For several branches, compare menus, staff access and dispatch areas. Ask for your branch setup to be demonstrated.", "Request a demonstration of any essential offline, fiscal-reporting, kitchen-screen or accounting integration before including it in the agreement.", "Check the reports your cashier and manager need, the onboarding scope and the complete recurring cost."],
    faqs: [
      { question: "Can online and walk-in orders be managed with Restrova?", answer: "Yes. Restrova includes website, customer-app, walk-in and POS order management. Use your demo to compare how these orders reach Admin and how staff follow their preparation and fulfilment." },
      { question: "Will my printer, payment terminal or FBR integration work?", answer: "Compatibility is specific to the device and integration. Share model numbers and requirements with Restrova and request a working demonstration. A POS page is not confirmation of printer, offline, payment-provider or tax-integration support." },
      { question: "What should a multi-branch restaurant test?", answer: "Test the same item at two branches, including any price or availability differences. Review which staff can see each branch, where online orders arrive and what the manager can report. Confirm the branch configuration and commercial scope in your proposal." },
      { question: "What does the POS cost?", answer: "The published Restrova model is PKR 10,000 onboarding once, then the higher of PKR 5,000 and 1% of monthly sales processed through Restrova. Confirm hardware, branch scope, taxes and specialist development separately." },
    ],
    reading: [{ href: "/blog/how-to-choose-restaurant-pos-software-pakistan", label: "Use the restaurant POS buying guide" }, { href: "/locations", label: "Plan branches and delivery coverage in Pakistan" }],
  },
  "restaurant-ordering-apps": {
    workflowTitle: "Plan a branded app from menu to first order",
    workflowIntro: "A useful launch connects your customer experience with the people taking and fulfilling orders. Agree the launch responsibilities before choosing a date.",
    steps: [
      { title: "Prepare the restaurant identity", text: "Supply approved logos, menu photography, item prices and options. Agree the app name, support contact, privacy information and the owner of each developer account." },
      { title: "Test a customer order", text: "Browse the menu on Android and iOS. Try required item choices, quantities and an unavailable item. Review the fulfilment options and payment methods configured for your restaurant." },
      { title: "Follow the order in Admin", text: "Have a staff member identify the incoming app order and follow preparation. Where delivery is configured, review the rider handoff and customer-facing status on the intended devices." },
      { title: "Launch and maintain the listing", text: "Agree who submits store information, responds to review requests and tests updates. Publish the official ordering links on your own channels and keep menu, operating hours and support details current." },
    ],
    decisionTitle: "Agree ownership and maintenance before launch",
    decisions: ["Who owns the Google Play and Apple developer accounts, and who has publishing access?", "Which store-account charges, app updates and operating-system compatibility work are included?", "Who supplies the approved privacy policy, screenshots, support contact and brand assets?", "How will the restaurant test a menu change and obtain help with an ordering problem?"],
    faqs: [
      { question: "Can I see existing restaurant apps?", answer: "Yes. The public examples below link to individual restaurant listings. They demonstrate published client-branded apps, not a guarantee that every restaurant has the same configuration or availability on every device." },
      { question: "Does an app replace the ordering website?", answer: "They serve different entry points. A website lets a customer open a menu link, while a branded app gives customers another route back to the restaurant. Review both journeys and the shared order handling in Admin." },
      { question: "Is app-store approval or a launch date guaranteed?", answer: "No. Store review, account readiness, branding, privacy information and testing affect publication. Agree responsibilities and the launch scope with Restrova; confirm account charges and maintenance terms before committing." },
    ],
    reading: [{ href: "/blog/5-features-every-restaurant-app-must-have-in-2026", label: "Five checks before choosing a restaurant app" }, { href: "/apps", label: "Choose between customer apps, Admin and Fleet" }],
  },
  "restaurant-ordering-websites": {
    workflowTitle: "Follow a mobile order from menu to restaurant",
    workflowIntro: "Review the ordering journey on a phone before publishing your link. The website should set expectations that the branch can fulfil.",
    steps: [
      { title: "Open the menu", text: "Check that the customer can recognize your restaurant, find the right menu and understand prices and item choices. Review branch-specific availability with the person responsible for menu updates." },
      { title: "Review the basket and fulfilment", text: "Check quantities and options before checkout. Test pickup or delivery according to your configured service, including address coverage and any charges shown before the order is placed." },
      { title: "Place a demonstration order", text: "Use an agreed test order and the payment methods supported by your setup. Check the confirmation the customer receives and what happens if an item or delivery address cannot be served." },
      { title: "Receive it in Admin", text: "Ask the branch team to locate the order, review its details and follow preparation. For deliveries, continue through dispatch and customer updates rather than ending the demonstration at checkout." },
    ],
    decisionTitle: "A launch checklist for the restaurant owner",
    decisions: ["Keep the restaurant's domain and account ownership documented.", "Approve the menu, prices, operating hours, delivery boundaries and pickup instructions.", "Confirm payment-provider availability, charges and reconciliation responsibilities.", "Agree the process for cancellations, unavailable items, privacy requests and support.", "Use your official ordering link consistently on approved profiles and customer communications."],
    faqs: [
      { question: "Can customers order without downloading an app?", answer: "A Restrova ordering website provides a browser-based route to your restaurant menu and online ordering. Test it on the phones and connections your customers use." },
      { question: "Are delivery and pickup both available?", answer: "The existing Restrova offering includes delivery and pickup flows. Confirm which options, service areas and branch rules will be enabled for your restaurant before advertising them." },
      { question: "Will it import orders from a delivery marketplace?", answer: "A branded ordering website receives your direct orders. Automatic marketplace imports require an explicitly supported integration; confirm the exact provider and workflow separately." },
    ],
    reading: [{ href: "/compare-marketplaces", label: "Compare direct ordering with marketplaces" }, { href: "/blog/why-direct-ordering-beats-third-party-marketplaces", label: "Evaluate channel costs and responsibilities" }],
  },
  "inventory-management": {
    workflowTitle: "Build a stock routine your team can maintain",
    workflowIntro: "Restrova includes inventory and stock management with item availability controls. Start with a short, accurate stock list and verify how your own units and adjustments work in the system.",
    steps: [
      { title: "Agree items and units", text: "Choose what to count, such as pieces, bottles or kilograms. Keep purchase and counting units consistent, or document the conversion. Assign a person to maintain the stock list." },
      { title: "Record the opening position", text: "Count the items before service and compare the physical count with the recorded balance. Use the demo to enter your sample stock and confirm the fields available for your setup." },
      { title: "Review changes and availability", text: "Keep a clear routine for receipts, corrections and unavailable menu items. Ask how each stock adjustment is recorded and how staff update menu availability; do not assume automatic recipe deductions." },
      { title: "Investigate the closing difference", text: "Compare the closing count with the recorded activity. Check unit conversions, missing entries and timing before treating a difference as waste. Agree who can correct a record and how the manager reviews it." },
    ],
    decisionTitle: "Inventory details to demonstrate before purchase",
    decisions: ["Stock units, opening balances and the available adjustment fields.", "The relationship between stock records and menu-item availability.", "Staff responsibilities for counting, recording and approving corrections.", "Recipe deductions, waste, expiry, purchase orders and inter-branch transfers only if demonstrated and included in scope."],
    faqs: [
      { question: "Does every sale automatically deduct recipe ingredients?", answer: "Inventory support alone does not establish recipe-level deductions. Bring a sample recipe with quantities and units and ask Restrova to demonstrate the exact behaviour before relying on it." },
      { question: "How should we handle an unavailable item?", answer: "Agree who updates the item's availability and checks the customer and counter experience. Test this across the ordering channels used by your restaurant, including any branch-specific menu." },
      { question: "Can inventory records tell me my profit?", answer: "Stock records are one input. Profit also depends on costs such as wages, rent and delivery. Confirm the available valuation and reporting functions rather than assuming inventory management is a complete accounting system." },
    ],
    reading: [{ href: "/services/reporting-analytics", label: "Connect stock questions with your management review" }, { href: "/blog/how-to-choose-restaurant-pos-software-pakistan", label: "Include inventory in your software buying checklist" }],
  },
  "delivery-management": {
    workflowTitle: "Connect dispatch, delivery status and rider settlement",
    workflowIntro: "Restrova Fleet supports rider assignment, live tracking, status updates and payment reconciliation. Follow the delivery through a complete shift so dispatch and closing are reviewed together.",
    steps: [
      { title: "Prepare the dispatch handoff", text: "Check that the order is ready for the rider and that the branch can serve the delivery address. Assign responsibility for resolving incomplete details before the order leaves." },
      { title: "Assign the rider", text: "Link the delivery with the rider handling it. Review the order details available to the rider and the status the restaurant sees. Confirm the process for a reassignment or an unavailable rider." },
      { title: "Follow the delivery", text: "Review live tracking and status changes from the administrator and customer perspectives. Test the intended rider phone with location permissions and connectivity; tracking depends on those conditions." },
      { title: "Reconcile the shift", text: "Review completed and incomplete deliveries with the rider's payment records. Agree how cash collected and any settlement differences are checked. Use a sample shift to confirm the reconciliation fields and responsibilities." },
    ],
    decisionTitle: "Questions for a reliable delivery rollout",
    decisions: ["Which branch dispatches each area, and who handles addresses outside that area?", "Which rider devices, access permissions and connectivity arrangements will be used?", "How will staff handle an unsuccessful delivery, a rider reassignment or a tracking interruption?", "Who reviews rider activity and signs off settlement differences at closing?", "If you need a third-party courier integration, which provider and actions are explicitly supported?"],
    faqs: [
      { question: "Can restaurant staff and customers follow a rider?", answer: "The existing Restrova offering includes live rider tracking for administrators and customers. Confirm the configured experience and test it with the rider's intended phone, location permissions and connection." },
      { question: "Does Restrova provide delivery riders?", answer: "Fleet is the software for managing restaurant delivery and rider operations. It does not establish that riders, a courier service or a third-party courier integration are included in your agreement." },
      { question: "Where do riders download Fleet?", answer: "Ask Restrova to confirm the distribution method and account setup for your team. A public Fleet store listing has not been verified here, so this page does not provide an assumed download link." },
    ],
    reading: [{ href: "/services/reporting-analytics", label: "Review delivery activity and settlement reports" }, { href: "/locations", label: "Plan delivery boundaries across your branches" }],
  },
  "reporting-analytics": {
    workflowTitle: "Turn an end-of-shift report into a useful review",
    workflowIntro: "Restrova provides order and sales reporting alongside rider performance and payment reconciliation. Decide what the manager needs to understand before selecting reports.",
    steps: [
      { title: "Set the reporting scope", text: "Agree the reporting period, branch and order statuses. Ask which filters are available and how the system treats a service that ends after midnight." },
      { title: "Check against order records", text: "Follow a sample completed order into the report, then compare a cancelled or adjusted order. Resolve what the totals include before using them for decisions or billing checks." },
      { title: "Review delivery and cash questions", text: "Compare delivery activity with rider records and payment reconciliation. A report should help the manager identify what needs checking; it does not replace investigating a discrepancy." },
      { title: "Choose a small next action", text: "Use comparable shifts to investigate a recurring issue, such as unavailable items or a dispatch delay. Record the change and review the next comparable period without assuming that one day's movement proves a trend." },
    ],
    decisionTitle: "Bring the reports you already rely on",
    decisions: ["A sample daily sales report and the definitions your team uses.", "Your branch structure and who should be able to view each report.", "Questions about cancellations, refunds, discounts and the Restrova-processed sales used for billing.", "Any required export fields or accounting integration, to be demonstrated and agreed separately."],
    faqs: [
      { question: "Does a sales report show restaurant profit?", answer: "Sales and profit are different measures. Profit requires the relevant costs and adjustments, including those held outside Restrova. Do not treat a sales total as a complete profit-and-loss statement." },
      { question: "Are accounting exports and predictive analytics included?", answer: "Confirm the exact exports, integrations and advanced analysis you require. The verified reporting offering does not imply every accounting or forecasting function is available." },
      { question: "How does reporting relate to the monthly fee?", answer: "The percentage is based on sales processed through Restrova. Agree the billing period and treatment of refunds, cancellations and adjustments, then review the source records alongside the published pricing examples." },
    ],
    reading: [{ href: "/pricing", label: "Understand the monthly fee calculation" }, { href: "/services/restaurant-pos", label: "Review the order records behind your reports" }],
  },
};
