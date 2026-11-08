import { siteConfig } from "@/lib/site";

// Business identity confirmed by the owner on 27 October 2026.
// Confirmation of these facts does not finalize the privacy policy.
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Plot No. 70/5, Faizan Street, Range Road, Shalley Valley",
  addressLocality: "Rawalpindi",
  postalCode: "46000",
  addressCountry: "PK",
} as const;

export const businessIdentity = {
  legalName: "LANCERS SOFTWARE (PRIVATE) LIMITED",
  companyUrl: "https://www.lancers.dev/",
  organizationId: `${siteConfig.url}/#organization`,
  brandId: `${siteConfig.url}/#brand`,
  websiteId: `${siteConfig.url}/#website`,
  postalAddress,
  address: `${postalAddress.streetAddress}, ${postalAddress.addressLocality}, ${postalAddress.postalCode}, Pakistan`,
} as const;

// One legal operator definition. Existing software provider and article
// publisher references keep resolving to the same stable organization ID.
export const siteIdentitySchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": businessIdentity.organizationId,
    name: businessIdentity.legalName,
    legalName: businessIdentity.legalName,
    url: businessIdentity.companyUrl,
    description: "Operator of Restrova, a restaurant technology platform for restaurant businesses in Pakistan.",
    address: businessIdentity.postalAddress,
    brand: { "@id": businessIdentity.brandId },
    contactPoint: { "@type": "ContactPoint", contactType: "Restrova enquiries", email: siteConfig.contact.email },
  },
  {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": businessIdentity.brandId,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": businessIdentity.websiteId,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    inLanguage: "en-PK",
    publisher: { "@id": businessIdentity.organizationId },
    about: { "@id": businessIdentity.brandId },
  },
];
