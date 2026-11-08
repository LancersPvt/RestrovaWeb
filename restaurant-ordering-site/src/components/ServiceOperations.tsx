import Link from "next/link";
import type { ServiceOperations } from "@/data/serviceOperations";

export function ConnectedServiceWorkflow({ operations }: { operations: ServiceOperations }) {
  return <section id="connected-workflow" className="scroll-mt-28">
    <h2>{operations.heading}</h2>
    <p className="mt-4 max-w-3xl">{operations.summary}</p>
    <p className="mt-4 max-w-3xl">{operations.scenario}</p>
    <ol className="mt-7 grid gap-5 lg:grid-cols-3">{operations.handoffs.map((handoff, index) => <li className="seo-card" key={handoff.title}>
      <p className="text-sm font-bold text-[#a73524]">Handoff {index + 1} · {handoff.owner}</p>
      <h3 className="mt-2">{handoff.title}</h3>
      <p className="mt-3">{handoff.action}</p>
      <p className="mt-4"><Link href={handoff.href}>{handoff.linkLabel}</Link></p>
    </li>)}</ol>
    <div className="mt-6 border-l-4 border-[#a73524] pl-5">
      <h3>Test the exception as well as the routine</h3>
      <p className="mt-3 max-w-3xl">{operations.exception}</p>
    </div>
  </section>;
}

export function ServiceEvaluation({ operations }: { operations: ServiceOperations }) {
  return <section id="operational-checks" className="scroll-mt-28">
    <h2>{operations.evaluationTitle}</h2>
    <p className="mt-4 max-w-3xl">Use these checks in a <Link href="/contact">live Restrova demonstration</Link>. Ask the person who will operate each step to try it, and record what is supported, what needs configuration and what still needs confirmation.</p>
    <div className="mt-7 grid gap-5 lg:grid-cols-3">{operations.evaluations.map((item) => <article className="seo-card" key={item.problem}>
      <h3>{item.problem}</h3>
      <dl className="mt-4 space-y-4">
        <div><dt className="font-bold">How to evaluate it</dt><dd className="mt-1">{item.evaluate}</dd></div>
        <div><dt className="font-bold">Verify in the demo</dt><dd className="mt-1">{item.verify}</dd></div>
      </dl>
    </article>)}</div>
    <p className="mt-6 max-w-3xl">{operations.preparation}</p>
    <p className="mt-4 max-w-3xl">To assess affordability, compare <Link href="/pricing">the fee at your expected sales volume</Link> and confirm hardware, connectivity, onboarding and support scope. Review the <Link href="/faq">setup FAQ</Link> and <Link href="/about">who operates Restrova</Link> before agreeing your requirements.</p>
  </section>;
}
