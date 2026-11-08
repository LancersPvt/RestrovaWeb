import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

import { businessIdentity } from "@/lib/business-identity";
import { siteConfig } from "@/lib/site";
import styles from "./privacy-policy.module.css";

const policyUrl = "https://www.restrova.com/privacy-policy";
const description =
  "Learn how Restrova collects, uses, and protects information across its restaurant management platform, ordering applications, delivery services, and business enquiries.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: policyUrl },
  openGraph: {
    type: "website",
    title: "Privacy Policy | Restrova",
    description,
    url: policyUrl,
    siteName: "Restrova",
    images: [{ url: "/og.png", width: 1728, height: 912, alt: "Restrova" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Restrova",
    description,
    images: ["/og.png"],
  },
  // This draft stays accessible for review, but must not be indexed before approval.
  // See docs/privacy-policy-review.txt before removing this override and the draft notice.
  robots: { index: false, follow: true },
};

function PolicyList({ items }: { items: string[] }) {
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

const sections: { id: string; title: string; content: ReactNode }[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: <>
      <p>Restrova is operated by {businessIdentity.legalName}.</p>
      <p>Restrova provides a restaurant operating system that connects branded customer ordering applications for iOS and Android, restaurant websites and direct ordering, Restrova Admin, live online and walk-in orders, menu and inventory management, sales analytics, and Restrova Fleet delivery management.</p>
      <p>This Privacy Policy explains how personal information is collected, used, shared, stored, and protected in connection with these services, our website, business enquiries, demonstrations, and onboarding. The information involved depends on the service you use, your role, and the restaurant&apos;s configuration.</p>
    </>,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: <>
      <p>We receive information you provide directly, information supplied by restaurants and authorized users, and technical information generated when services are used. Business and operational records may contain personal information.</p>
      <h3>Restaurant owners and business enquiries</h3>
      <PolicyList items={[
        "Full name, restaurant name, contact details, and restaurant location.",
        "Business type and role, number of branches, and daily order volume.",
        "Operational requirements and challenges, pricing preferences, and implementation timeline.",
        "Demonstration requests, preferred meeting arrangements, and related communications.",
      ]} />
      <h3>Customer ordering data</h3>
      <PolicyList items={[
        "Customer contact details, order details, and order history.",
        "Delivery addresses, instructions, and other information needed to fulfil an order.",
        "Transaction records and payment status. Payment providers may separately process payment information under their own privacy policies.",
      ]} />
      <h3>Restaurant administration data</h3>
      <PolicyList items={[
        "Restaurant and branch information and authorized staff information.",
        "Menu, inventory, and stock records; orders and sales; and delivery settlements.",
        "Business analytics and operational data associated with restaurant activity.",
      ]} />
      <h3>Restrova Fleet</h3>
      <PolicyList items={[
        "Rider contact information, delivery assignments, and delivery statuses.",
        "Cash collection and settlement information.",
        "Location information where the relevant feature is enabled and permission is granted, for delivery coordination and tracking. Availability depends on device permissions and service configuration.",
      ]} />
      <h3>Technical information</h3>
      <PolicyList items={[
        "Device and browser information, IP addresses, and usage and diagnostic information.",
        "Cookies and advertising measurement data described in the Cookies and Analytics section.",
        "Campaign and referral information supplied with an enquiry, such as campaign parameters and Facebook click identifiers in the page URL.",
      ]} />
    </>,
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: <>
      <p>We use relevant information for the following purposes:</p>
      <PolicyList items={[
        "Provide and maintain restaurant management services, accounts, and branded ordering experiences.",
        "Process customer orders and support restaurant, menu, inventory, and sales operations.",
        "Coordinate deliveries, communicate delivery progress, and manage settlements.",
        "Review business enquiries, assess service suitability, and arrange software demonstrations and onboarding.",
        "Provide customer support and communicate about accounts, services, and billing.",
        "Understand usage, improve platform reliability, diagnose problems, and maintain security.",
        "Measure advertising and enquiry activity as described below, subject to applicable privacy requirements.",
        "Meet applicable legal obligations and address disputes or misuse of the services.",
      ]} />
    </>,
  },
  {
    id: "meta-lead-forms",
    title: "Facebook and Instagram Lead Forms",
    content: <>
      <p>When you voluntarily submit a Restrova enquiry through a Facebook or Instagram Instant Form, we may receive the information included in that submission. This can include your name and contact details, restaurant information, qualification responses, and demonstration requests.</p>
      <p>We use this information to review your enquiry, assess whether Restrova suits your business requirements, contact you about your interest, and arrange a demonstration or onboarding discussion. We may transfer the enquiry to the authorized enquiry-management services described below.</p>
      <p>Meta also processes information about your use of Facebook and Instagram under its own privacy policy. Submitting an enquiry does not remove your applicable privacy or marketing opt-out rights.</p>
    </>,
  },
  {
    id: "lead-qualification-and-automation",
    title: "Lead Qualification and Automation",
    content: <>
      <p>We may use authorized CRM, scheduling, and automation services, including Google Sheets, Google Workspace, and Make, to manage enquiries. Our website demo workflow sends enquiry and scheduling information to Google Sheets through Google Apps Script.</p>
      <PolicyList items={[
        "Store and organize enquiries and restaurant lead information.",
        "Categorize business requirements and prioritize sales follow-ups.",
        "Arrange product demonstrations and maintain sales communication history.",
      ]} />
      <p>Business qualification may consider restaurant size, branch count, order volume, business role, operational challenges, pricing preferences, and implementation timeline. Automated rules in the website enquiry flow can determine whether the demo scheduling step is offered and how an enquiry is categorized.</p>
      <p>You can contact us if your information is incorrect or you would like the team to review your enquiry. The tools used for a particular enquiry depend on the workflow in place.</p>
    </>,
  },
  {
    id: "communication",
    title: "Communication",
    content: <>
      <p>We may contact customers and business prospects by email, telephone, or WhatsApp about enquiries, demonstrations, onboarding, account administration, and support, using the contact details provided.</p>
      <p>Marketing communications are subject to applicable consent and privacy requirements. You may ask us to stop marketing messages at any time by using an unsubscribe option where provided or contacting us. Withdrawing marketing consent does not prevent necessary service messages or affect processing that was lawful before withdrawal.</p>
    </>,
  },
  {
    id: "restaurant-customer-data",
    title: "Restaurant Customer Data",
    content: <>
      <p>Restaurants using Restrova may determine why and how customer information is processed for their ordering, fulfilment, customer service, and other restaurant operations. In these circumstances, Restrova provides technology services and processes information on the restaurant&apos;s behalf, subject to the relevant arrangements and applicable law.</p>
      <p>A restaurant&apos;s own privacy notice may explain its practices and responsibilities. For a request relating to an order or a restaurant&apos;s use of your information, contact that restaurant first. You may also contact Restrova so we can help direct your enquiry or assist the restaurant as appropriate.</p>
      <p>Restrova separately handles information for its own business enquiries, account administration, support, and website operations as described in this policy.</p>
    </>,
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content: <>
      <p>Relevant information may be shared where needed to provide services and for the purposes described in this policy, including with:</p>
      <PolicyList items={[
        "The relevant restaurant, its authorized staff, and assigned delivery personnel to manage orders, deliveries, and customer support.",
        "Cloud infrastructure and hosting providers supporting the platform.",
        "Payment providers handling transactions and payment status.",
        "Communication, scheduling, CRM, Google Workspace, and automation providers, including Google Sheets and Make where used.",
        "Meta for website advertising measurement through the Meta Pixel, as described below.",
        "Professional advisers or public authorities where disclosure is required by applicable law or necessary to address legal claims and protect rights or security.",
      ]} />
      <p>The information shared depends on the service and purpose. Providers may act on our behalf or have their own responsibilities for processing information; their practices are also governed by applicable terms and privacy notices.</p>
    </>,
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and Analytics",
    content: <>
      <h3>Demo scheduling cookie</h3>
      <p>The website uses a temporary cookie, <code>restrova_demo_draft_v6</code>, to carry enquiry details between the assessment and demo scheduling steps. It helps complete the requested booking flow. Blocking this cookie may prevent scheduling from working correctly.</p>
      <h3>Meta Pixel and advertising measurement</h3>
      <p>This website uses the Meta Pixel to record page views. The demo workflow also sends a Lead event after a qualified demo request has been successfully saved. Meta may receive information about the page visited, browser or device, IP address, and cookie or similar identifiers, and may associate activity with information it holds.</p>
      <p>This supports advertising measurement and understanding how visitors reach and use the website. Campaign parameters and Facebook click identifiers in the page URL may also be stored with an enquiry for attribution. Meta&apos;s processing is explained in the <a href="https://www.facebook.com/privacy/policy/">Meta Privacy Policy</a>.</p>
      <h3>Your choices</h3>
      <p>You can manage or delete cookies through your browser settings and review advertising preferences within your Meta account. These controls may affect functionality and do not necessarily prevent every type of measurement. Applicable consent requirements also apply to advertising technologies; this policy does not itself record or obtain consent.</p>
    </>,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: <>
      <p>Information is retained for as long as reasonably necessary for the relevant service, enquiry, contractual, legitimate business, and legal requirements. The appropriate period depends on the type of information, the purpose for which it was collected, the account or restaurant relationship, and any legal or dispute-related obligations.</p>
      <p>Information should be deleted or anonymized when it is no longer needed, subject to applicable requirements and any necessary backup or recovery processes. You can contact us about retention or request deletion of information relating to you.</p>
    </>,
  },
  {
    id: "data-security",
    title: "Data Security",
    content: <>
      <p>We use safeguards designed to reduce the risk of unauthorized access, loss, misuse, or disclosure. In the website enquiry workflow, these include server-side validation, protected demo-session information, and authenticated forwarding of enquiries to the configured enquiry system.</p>
      <p>Appropriate technical and organizational measures, including access management and responsible handling of information by authorized personnel, depend on the service and the information involved. No internet transmission or storage system can be guaranteed completely secure. Contact us if you believe information connected with Restrova has been compromised.</p>
    </>,
  },
  {
    id: "international-processing",
    title: "International Processing",
    content: <>
      <p>Authorized technology and service providers may store or process information in countries other than the country in which you or your restaurant are located. Privacy laws may differ between those countries.</p>
      <p>International processing is subject to applicable privacy requirements, including any required transfer safeguards. You may contact us for information about the arrangements relevant to your use of the services.</p>
    </>,
  },
  {
    id: "your-privacy-rights",
    title: "User Privacy Rights",
    content: <>
      <p>Depending on your location, the applicable law, and the circumstances, you may have rights to:</p>
      <PolicyList items={[
        "Request access to personal information about you.",
        "Request correction of inaccurate or incomplete information.",
        "Request deletion of information, subject to applicable retention requirements.",
        "Withdraw consent where processing is based on consent.",
        "Object to certain processing activities or request restrictions where applicable.",
        "Raise a concern with Restrova and, where applicable, a relevant privacy authority.",
      ]} />
      <p>To make a request, use the contact information below and explain which service and information your request concerns. We may need to verify your identity and authority before responding. Requests about information controlled by a restaurant may need to be handled by that restaurant, with our assistance where appropriate.</p>
    </>,
  },
  {
    id: "childrens-privacy",
    title: "Children’s Privacy",
    content: <>
      <p>Restrova&apos;s business management services are primarily intended for restaurant operators, authorized employees, delivery personnel, and other relevant users, and are not directed at children.</p>
      <p>Where a restaurant&apos;s customer services involve children&apos;s information, the restaurant and relevant service providers must take account of applicable age, parental consent, and privacy requirements. If you believe a child&apos;s information has been collected or used inappropriately through Restrova, contact us so the concern can be reviewed and appropriate action taken, including deletion where required.</p>
    </>,
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: <>
      <p>Our services may link to or integrate with restaurant websites, payment services, communication platforms, app stores, and other external services. These services may process information under their own privacy policies and terms.</p>
      <p>Review the relevant provider&apos;s privacy information before using its services. This policy describes Restrova&apos;s practices and does not replace the privacy notices of restaurants or independent third parties.</p>
    </>,
  },
  {
    id: "policy-updates",
    title: "Updates to This Policy",
    content: <>
      <p>We may update this policy to reflect changes in our services, information handling, or applicable requirements. The updated version will be published on this page with a revised effective date. Where required, additional notice or consent will be provided or requested.</p>
    </>,
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: <>
      <p>For privacy enquiries or requests about your information, contact Restrova using the details below. Please include enough context to help us find the relevant service or enquiry, without sending unnecessary sensitive information.</p>
      <div className={styles.contactCard}>
        <p className={styles.contactName}>Restrova</p>
        <dl>
          <div><dt>Website</dt><dd><a href="https://www.restrova.com">www.restrova.com</a></dd></div>
          <div><dt>Company website</dt><dd><a href={businessIdentity.companyUrl}>www.lancers.dev</a></dd></div>
          <div><dt>Privacy enquiries</dt><dd><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></dd></div>
          <div><dt>Legal business name</dt><dd>{businessIdentity.legalName}</dd></div>
          <div><dt>Business address</dt><dd><address className="not-italic">{businessIdentity.address}</address></dd></div>
        </dl>
      </div>
    </>,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className={`${styles.page} bg-[#fffaf4] text-[#171816]`}>
      <header className="border-b border-black/8">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#b9402b]">Restrova</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">Learn how Restrova collects, uses, stores, and protects information across our restaurant technology platform.</p>
          <p className="mt-6 text-sm text-black/65"><span className="font-bold text-[#171816]">Effective date:</span> To be confirmed before publication</p>
          <aside aria-label="Draft policy notice" className="mt-8 max-w-3xl rounded-2xl border border-[#e9c4ad] bg-[#fff0e5] px-5 py-4 text-sm leading-6 text-[#713c27]">
            <p className="font-bold">Draft for review — pending approval</p>
            <p className="mt-1">The legal operating company and business address are confirmed. The effective date and complete privacy policy still require owner/legal approval before this policy is marked final.</p>
          </aside>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16 lg:py-14">
        <aside className={styles.sidebar}>
          <nav aria-labelledby="policy-contents" className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 id="policy-contents" className="text-xs font-black uppercase tracking-[.16em] text-black/60">On this page</h2>
            <ol className={`${styles.contents} mt-4`}>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}><span className={styles.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a>
                </li>
              ))}
            </ol>
          </nav>
          <a href={`mailto:${siteConfig.contact.email}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#a63725] underline underline-offset-4">
            <Mail className="h-4 w-4" aria-hidden="true" /> Contact us about privacy
          </a>
        </aside>

        <article aria-label="Privacy policy sections" className={styles.article}>
          {sections.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id} className={styles.section}>
              <h2 id={section.id}><span className={styles.headingNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
              <div className={styles.copy}>{section.content}</div>
            </section>
          ))}
          <a href="#main-content" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#a63725] underline underline-offset-4">Back to top <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </article>
      </div>
    </main>
  );
}
