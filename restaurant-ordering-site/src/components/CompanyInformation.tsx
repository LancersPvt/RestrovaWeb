import { businessIdentity } from "@/lib/business-identity";

export default function CompanyInformation() {
  return <section id="company-information" aria-labelledby="company-information-heading" className="seo-card scroll-mt-28">
    <h2 id="company-information-heading" className="text-2xl font-black tracking-tight">Company information</h2>
    <p className="mt-4 leading-7">Restrova is a restaurant technology platform operated by {businessIdentity.legalName}.</p>
    <dl className="mt-6 grid gap-5 text-sm leading-7 sm:grid-cols-2">
      <div><dt className="font-bold">Legal operating company</dt><dd className="mt-1">{businessIdentity.legalName}</dd></div>
      <div><dt className="font-bold">Company website</dt><dd className="mt-1"><a className="font-semibold underline underline-offset-4" href={businessIdentity.companyUrl}>www.lancers.dev</a></dd></div>
      <div className="sm:col-span-2"><dt className="font-bold">Business address</dt><dd className="mt-1"><address className="not-italic">{businessIdentity.address}</address></dd></div>
    </dl>
  </section>;
}
