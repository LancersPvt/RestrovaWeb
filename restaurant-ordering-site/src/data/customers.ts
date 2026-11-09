export type PublicationStatus = "approved" | "pending_approval" | "draft";
export interface Customer {
  slug: string; name: string; logo?: string; profileOnly?: boolean; publicationStatus: PublicationStatus;
  evidenceStatus: "verified" | "draft"; summary: string;
  services: { label: string; href: string }[];
  links: { label: string; href: string }[];
  sections: { heading: string; text: string }[];
}
// Owner-approved publication scope, updated 2026-11-09. No customer results inferred.
export const customers: Customer[] = [
  {
    "slug": "yum-zone",
    "name": "Yum Zone",
    "publicationStatus": "approved",
    "evidenceStatus": "verified",
    "summary": "Yum Zone uses Restrova apps, online ordering, POS, inventory, rider tracking, loyalty and multi-branch management.",
    "services": [
      {
        "label": "Branded Android and iOS ordering apps",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Ordering website",
        "href": "/services/restaurant-ordering-websites"
      },
      {
        "label": "POS and administration",
        "href": "/services/restaurant-pos"
      },
      {
        "label": "Inventory management",
        "href": "/services/inventory-management"
      },
      {
        "label": "Delivery and Restrova Fleet",
        "href": "/services/delivery-management"
      },
      {
        "label": "Loyalty and promotions",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Multi-branch management",
        "href": "/solutions/multi-branch-restaurants"
      }
    ],
    "links": [
      {
        "label": "Yum Zone on Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.restrova.yumzone"
      }
    ],
    "sections": [
      {
        "heading": "Ordering across customer channels",
        "text": "Yum Zone uses branded Android and iOS customer apps and a Restrova ordering website. Its public Android description covers browsing menu categories and prices, available item options, delivery or pickup, favourites and order updates. The website is part of the confirmed scope; a verified public domain is not currently available here."
      },
      {
        "heading": "Counter orders, stock and delivery",
        "text": "POS/order management, inventory and rider tracking are confirmed parts of Yum Zone’s implementation. These services connect the customer-facing channels with the team’s order and fulfilment tools. Specific printer models, recipe deductions and dispatch rules are not established by the public app listing."
      },
      {
        "heading": "Loyalty and more than one branch",
        "text": "Yum Zone also uses loyalty/promotions and multi-branch management. This confirms the capabilities in its setup without specifying branch numbers, promotion rules or customer-retention outcomes. A restaurant comparing a similar setup should demonstrate its own offer conditions and branch access."
      },
      {
        "heading": "Evaluate the complete ordering setup",
        "text": "Start with an item that has options, then follow a sample order into administration. Review availability, delivery responsibility and the closing record. These are practical evaluation tasks for your restaurant, not a claim about measured results at Yum Zone."
      }
    ],
    "logo": "/clients/yum-zone.png"
  },
  {
    "slug": "ash-and-beans",
    "name": "Ash & Beans",
    "publicationStatus": "approved",
    "evidenceStatus": "verified",
    "summary": "Ash & Beans uses Restrova apps, online ordering, POS, inventory, rider tracking, loyalty and multi-branch management.",
    "services": [
      {
        "label": "Branded Android and iOS ordering apps",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Ordering website",
        "href": "/services/restaurant-ordering-websites"
      },
      {
        "label": "POS and administration",
        "href": "/services/restaurant-pos"
      },
      {
        "label": "Inventory management",
        "href": "/services/inventory-management"
      },
      {
        "label": "Delivery and Restrova Fleet",
        "href": "/services/delivery-management"
      },
      {
        "label": "Loyalty and promotions",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Multi-branch management",
        "href": "/solutions/multi-branch-restaurants"
      }
    ],
    "links": [
      {
        "label": "Ash & Beans on Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.restrova.ashandbeans"
      },
      {
        "label": "Ash & Beans on the Apple App Store",
        "href": "https://apps.apple.com/pk/app/ash-beans/id6759486466"
      }
    ],
    "sections": [
      {
        "heading": "A branded route back to the business",
        "text": "Ash & Beans uses Restrova Android and iOS ordering apps together with an ordering website. Its public Android listing describes menu browsing, prices, online ordering, order status and order history. The store links below provide public examples of the customer-facing experience."
      },
      {
        "heading": "Operational scope behind the apps",
        "text": "The confirmed implementation also includes POS/order management, inventory and delivery rider tracking. This establishes the product scope supporting customer orders, without assuming how staff permissions, stock adjustments or delivery exceptions are configured."
      },
      {
        "heading": "Promotions and branch management",
        "text": "Loyalty/promotions and multi-branch management are included in the owner-confirmed setup. No particular reward, redemption rule, location or branch count is inferred. When evaluating these tools, ask to see your intended promotion and the staff responsibilities at each branch."
      },
      {
        "heading": "Plan ownership and maintenance",
        "text": "A branded app needs maintained menu information, working store links and clear support responsibilities. Compare the published experience with your own needs, then agree developer-account ownership, updates and launch testing in writing. Published availability does not promise the same configuration for every customer."
      }
    ],
    "logo": "/clients/ashandbeans.png"
  },
  {
    "slug": "top-spice",
    "name": "Top Spice",
    "publicationStatus": "approved",
    "evidenceStatus": "verified",
    "summary": "Top Spice uses Restrova apps, online ordering, POS, inventory, rider tracking, loyalty and multi-branch management.",
    "services": [
      {
        "label": "Branded Android and iOS ordering apps",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Ordering website",
        "href": "/services/restaurant-ordering-websites"
      },
      {
        "label": "POS and administration",
        "href": "/services/restaurant-pos"
      },
      {
        "label": "Inventory management",
        "href": "/services/inventory-management"
      },
      {
        "label": "Delivery and Restrova Fleet",
        "href": "/services/delivery-management"
      },
      {
        "label": "Loyalty and promotions",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Multi-branch management",
        "href": "/solutions/multi-branch-restaurants"
      }
    ],
    "links": [
      {
        "label": "Top Spice on Google Play",
        "href": "https://play.google.com/store/apps/details?id=com.restrova.topspice"
      },
      {
        "label": "Top Spice on the Apple App Store",
        "href": "https://apps.apple.com/pk/app/top-spice-pakistan/id6796204717"
      }
    ],
    "sections": [
      {
        "heading": "From menu choices to an order",
        "text": "Top Spice uses Restrova’s branded Android and iOS ordering apps and an ordering website. Its Android description includes browsing a breakfast menu, choosing delivery or pickup, adjusting quantities and reviewing the basket. These published customer actions provide a concrete starting point for a demonstration."
      },
      {
        "heading": "POS, inventory and delivery tools",
        "text": "The Restrova owner confirms POS/order management, inventory and rider tracking in Top Spice’s implementation. This combines the ordering channels with operational tools; the exact stock rules, device compatibility and rider-assignment settings remain customer-specific."
      },
      {
        "heading": "Loyalty and branch operations",
        "text": "Top Spice’s confirmed scope includes loyalty/promotions and multi-branch management. The public app also describes promotional-code entry. This does not establish a specific reward campaign, branch number or measured business outcome."
      },
      {
        "heading": "Compare scope before rollout",
        "text": "For a similar implementation, check an item quantity change, an unavailable item and an order correction. Review who receives the order, maintains availability and handles delivery questions. Agree onboarding, support and branch pricing scope before a rollout date."
      }
    ]
  },
  {
    "slug": "fruit-ninja-pakistan",
    "name": "Fruit Ninja Pakistan",
    "publicationStatus": "approved",
    "evidenceStatus": "verified",
    "profileOnly": true,
    "summary": "Fruit Ninja Pakistan is a Restrova customer with a public ordering website and a branded food-ordering app listing.",
    "services": [],
    "links": [
      {
        "label": "Visit Fruit Ninja Pakistan’s ordering website",
        "href": "https://fruitninjapakistan.com/"
      },
      {
        "label": "Fruit Ninja Pakistan on the Apple App Store",
        "href": "https://apps.apple.com/pk/app/fruit-ninja-pakistan/id6783385415"
      }
    ],
    "sections": [
      {
        "heading": "A confirmed Restrova customer",
        "text": "The Restrova owner confirms Fruit Ninja Pakistan as a customer. Its public website uses the Fruit Ninja Pakistan identity, and its iOS listing is published by Lancers Software (Private) Limited. This profile concerns the food business, not the unrelated game."
      },
      {
        "heading": "Explore the public ordering experience",
        "text": "The public app describes fruit bowls, juices and related food items, with browsing, item customization and order tracking. Use the official references above to review the currently published experience. Store availability depends on device and region."
      },
      {
        "heading": "Implementation scope",
        "text": "The customer relationship is confirmed. A feature-by-feature Restrova scope has not been documented here, so this profile does not attribute POS, inventory, loyalty, rider software or multi-branch management to Fruit Ninja Pakistan."
      }
    ]
  },
  {
    "slug": "mandi-valley",
    "name": "Mandi Valley",
    "publicationStatus": "approved",
    "evidenceStatus": "verified",
    "summary": "Mandi Valley uses Restrova for Android and iOS ordering apps, an ordering website, POS/Admin, inventory and delivery operations through Fleet.",
    "services": [
      {
        "label": "Branded Android and iOS ordering apps",
        "href": "/services/restaurant-ordering-apps"
      },
      {
        "label": "Ordering website",
        "href": "/services/restaurant-ordering-websites"
      },
      {
        "label": "POS and administration",
        "href": "/services/restaurant-pos"
      },
      {
        "label": "Inventory management",
        "href": "/services/inventory-management"
      },
      {
        "label": "Delivery and Restrova Fleet",
        "href": "/services/delivery-management"
      }
    ],
    "links": [
      {
        "label": "Order from Mandi Valley",
        "href": "https://mandivalley.com/"
      },
      {
        "label": "Mandi Valley on the Apple App Store",
        "href": "https://apps.apple.com/pk/app/mandi-valley/id6796204041"
      }
    ],
    "sections": [
      {
        "heading": "About the implementation",
        "text": "Mandi Valley brings its customer ordering channels and operational tools together through Restrova. Its public iOS listing describes ordering fresh produce and everyday essentials. This implementation shows how the connected ordering platform can support a food business alongside its restaurant applications."
      },
      {
        "heading": "The scope of the setup",
        "text": "The confirmed scope spans customer ordering, administration, stock and delivery. The branded apps and website provide customer entry points; POS/Admin, inventory and Fleet support the staff side. This account describes the services in use rather than an undocumented account of the business before implementation."
      },
      {
        "heading": "The customer ordering journey",
        "text": "The public Mandi Valley app description explains browsing categories, reviewing product information and prices, choosing quantities and managing a basket. Customers review their order and proceed through checkout, with delivery or pickup where available. These are published app capabilities; availability and fulfilment options depend on the current setup."
      },
      {
        "heading": "From customer order to administration",
        "text": "Mandi Valley uses Restrova POS and administration alongside its ordering channels. In the Restrova workflow, staff review incoming orders and follow preparation and fulfilment. For a similar setup, a demonstration should follow one sample order from the customer channel into Admin, including item choices and the person responsible for the next handoff."
      },
      {
        "heading": "Stock and delivery as part of the same operation",
        "text": "Inventory management and Restrova Fleet are confirmed parts of Mandi Valley's implementation. Stock records help frame availability decisions, while Fleet provides the delivery-management tools. Detailed recipe deductions, branch rules and customer-specific automation should be demonstrated separately rather than inferred from the names of these services."
      },
      {
        "heading": "Restrova solutions used by Mandi Valley",
        "text": "The implementation includes both branded mobile platforms, an ordering website, POS/Admin, inventory and Fleet. Together they cover the customer ordering channel and the operational tools behind it. This case study documents that scope without attributing sales growth, cost savings or delivery-time changes to the software."
      },
      {
        "heading": "Plan a comparable workflow",
        "text": "Bring your product or menu list, order channels, stock units and delivery arrangement to a demo. Ask the team to trace a normal order and a correction through the relevant tools. Agree account ownership, staff access, training and support before setting your launch plan."
      }
    ]
  }
];
export const approvedCustomers = customers.filter(customer => customer.publicationStatus === "approved" && customer.evidenceStatus === "verified");
export const getApprovedCustomer = (slug: string) => approvedCustomers.find(customer => customer.slug === slug);
