export interface ServiceOperations {
  heading: string;
  summary: string;
  scenario: string;
  handoffs: {
    title: string;
    owner: string;
    action: string;
    href: string;
    linkLabel: string;
  }[];
  exception: string;
  evaluationTitle: string;
  evaluations: { problem: string; evaluate: string; verify: string }[];
  preparation: string;
}

// These are operational examples and demo questions, not records of customer outcomes.
export const serviceOperations: Partial<Record<string, ServiceOperations>> = {
  "restaurant-pos": {
    heading: "How POS, inventory and rider tracking work together",
    summary: "Restrova combines restaurant POS and order management, inventory management and live rider tracking in Pakistan. POS handles the order, stock and availability checks help the team decide what it can prepare, and Fleet follows the delivery handoff. Staff responsibilities and the configured workflow connect these stages.",
    scenario: "Example to walk through: a cashier takes a pickup meal order while a customer places a delivery order through the restaurant's app. Use a sample menu and follow both orders through a busy service.",
    handoffs: [
      {
        title: "Check availability before committing the order",
        owner: "Counter team and stock lead",
        action: "Confirm the requested item and options can be prepared. If stock is short, agree who changes menu availability and who contacts the customer. Test how that change appears to counter, website and app users.",
        href: "/services/inventory-management", linkLabel: "Stock and menu availability",
      },
      {
        title: "Pass a clear order to preparation",
        owner: "Order taker and kitchen team",
        action: "Keep the order reference, items and pickup or delivery choice clear. Review the order and preparation statuses in Admin, then establish who confirms the food is ready. Demonstrate any printer or kitchen-display requirement separately.",
        href: "/apps", linkLabel: "Customer, Admin and Fleet app roles",
      },
      {
        title: "Hand the prepared delivery to a named rider",
        owner: "Dispatcher and rider",
        action: "Match the packed items to the delivery order before assigning the rider. Follow Fleet's delivery status and live tracking on the intended devices, then review the delivery and payment records at closing.",
        href: "/services/delivery-management", linkLabel: "Dispatch, live tracking and settlement",
      },
    ],
    exception: "Repeat the example with an item unavailable after ordering. Ask who updates the order, informs preparation and stops an incorrect dispatch. Verify how stock and payment records are corrected; do not assume that an order edit automatically updates every record.",
    evaluationTitle: "Evaluate the POS against everyday service problems",
    evaluations: [
      { problem: "Counter and online orders are easy to confuse", evaluate: "Can the team identify the channel, items and next action without relying on a separate verbal message?", verify: "Enter one counter order and one app or website order. Have another staff member find both and follow their preparation status." },
      { problem: "An order is accepted for an unavailable item", evaluate: "Who owns availability updates, and how does the counter team know what the kitchen can fulfil?", verify: "Change a sample item's availability and inspect the POS and customer menu. Ask which updates are manual and which are automatic in your setup." },
      { problem: "Prepared food waits without a clear delivery owner", evaluate: "Can the dispatcher distinguish ready orders from assigned deliveries and explain the next step?", verify: "Follow one prepared order into Fleet, assign a rider and review tracking and completion with the operations manager." },
    ],
    preparation: "For a restaurant in Chakwal, bring the actual branch address, delivery areas, internet connection and device list to the demo. Confirm onboarding arrangements and support availability for that location before choosing a setup.",
  },
  "inventory-management": {
    heading: "Connect stock decisions with orders and dispatch",
    summary: "Restaurant inventory management supports the decisions around a sale: what is available, what the kitchen can prepare and what should reach the customer. In Restrova, review these decisions alongside POS and online orders, then follow the prepared order into Fleet's delivery and live rider tracking workflow.",
    scenario: "Example to walk through: the kitchen finds that a popular meal cannot be prepared with the remaining stock while counter and online orders are arriving. Rehearse the response before a busy shift.",
    handoffs: [
      {
        title: "Turn a stock count into an availability decision",
        owner: "Stock lead and kitchen team",
        action: "Check the item, unit and physical count. Agree which menu items are affected and who changes their availability. Ask to see how a stock record relates to a sellable item; recipe-level deduction must be verified for your setup.",
        href: "/faq", linkLabel: "Product and setup questions",
      },
      {
        title: "Tell the order-taking team what can be sold",
        owner: "Kitchen team and order taker",
        action: "Check the changed availability at the counter and on the customer menu. Review any order already accepted for that item, agree a customer-approved response and confirm the order reflects what will actually be prepared.",
        href: "/services/restaurant-pos", linkLabel: "POS and order handling",
      },
      {
        title: "Verify the contents before rider collection",
        owner: "Packing team and dispatcher",
        action: "Check the packed items against the agreed order before dispatch. Fleet then handles rider assignment, delivery status and live tracking. Keep any stock correction with the responsible stock team rather than treating a delivery status as proof of a stock adjustment.",
        href: "/services/delivery-management", linkLabel: "Delivery handoffs and rider tracking",
      },
    ],
    exception: "Cancel a sample order after preparation has started. Ask how staff record the cancellation, account for ingredients already used and review the closing count. Verify whether any stock reversal exists and when it applies; returned food and unused ingredients need different operational decisions.",
    evaluationTitle: "Evaluate inventory against the problems behind the count",
    evaluations: [
      { problem: "The recorded quantity differs from the shelf", evaluate: "Are units clear, and who records receipts, usage, waste and corrections?", verify: "Start with a sample count, record a supported adjustment and reconcile the new balance with a physical count. Ask which adjustment details staff can review later." },
      { problem: "The menu still offers something the kitchen cannot make", evaluate: "How does the stock lead communicate availability to every ordering channel?", verify: "Mark a sample menu item unavailable and inspect the counter, website and app views. Check how already accepted orders are handled." },
      { problem: "A cancellation or substitution leaves unclear stock records", evaluate: "Which parts of the process are automatic, and which require a responsible person to make a correction?", verify: "Run a cancelled or changed sample order and compare the before-and-after stock records. Request a separate demonstration of any recipe, expiry or branch-transfer requirement." },
    ],
    preparation: "Bring a short stock list with units, two menu items that share an ingredient and your current counting routine. This makes the demo useful for your kitchen without assuming that every specialist inventory function is included.",
  },
  "delivery-management": {
    heading: "From an accepted order to a tracked delivery",
    summary: "Restrova Fleet provides rider assignment, live rider tracking, delivery statuses and settlement workflows. Delivery starts with the order and the food: the POS team confirms what was ordered, the kitchen checks availability and preparation, and the dispatcher hands a verified package to a rider.",
    scenario: "Example to walk through: an app delivery order reaches the restaurant during the counter rush. Follow it from the order record to packing, rider collection and the end-of-shift payment review.",
    handoffs: [
      {
        title: "Confirm the order before planning dispatch",
        owner: "Order taker and kitchen team",
        action: "Check the items, delivery details and preparation status. Make clear who resolves missing details or a change requested by the customer, so the dispatcher works from the agreed order.",
        href: "/services/restaurant-pos", linkLabel: "POS and preparation workflow",
      },
      {
        title: "Resolve shortages before packing and collection",
        owner: "Stock lead and packing team",
        action: "If an item cannot be prepared, resolve availability and the customer's choice before a rider collects the food. Check the final package against the updated order and identify who tells dispatch about a delay.",
        href: "/services/inventory-management", linkLabel: "Stock and availability handoffs",
      },
      {
        title: "Follow assignment, tracking and settlement",
        owner: "Dispatcher, rider and closing manager",
        action: "Assign the prepared order in Fleet and follow delivery status and live location where connectivity and permissions support them. At closing, review the delivery record and rider payment workflow, including any incomplete delivery.",
        href: "/apps", linkLabel: "Fleet and Admin setup",
      },
    ],
    exception: "Repeat the demo with location permission disabled or the rider briefly offline. Observe what the dispatcher and customer can actually see, how they recognize an outdated position and what happens when the connection returns. Agree a contact procedure for gaps in tracking.",
    evaluationTitle: "Evaluate delivery tools beyond a moving map marker",
    evaluations: [
      { problem: "Staff cannot identify who is taking an order", evaluate: "Who assigns the rider, confirms collection and handles a change of rider?", verify: "Assign a sample order, find it from the dispatcher's view and ask to demonstrate the supported reassignment process." },
      { problem: "Staff or customers cannot tell whether tracking is current", evaluate: "Which devices and permissions are required, and how does the view behave with weak connectivity?", verify: "Follow a test delivery on the intended rider, Admin and customer devices. Compare the last visible position during a connection interruption and after reconnection." },
      { problem: "Delivered orders and rider payments do not reconcile", evaluate: "How are completed, incomplete and cash-collection cases reviewed at shift end?", verify: "Walk through a sample settlement and an incomplete delivery. Confirm how discrepancies, payment corrections and any cash returned are recorded." },
    ],
    preparation: "Bring your branch's delivery area, rider phone models and a sample settlement routine. Confirm Fleet access and onboarding with Restrova, along with the exact tracking views available to your staff and customers.",
  },
};
