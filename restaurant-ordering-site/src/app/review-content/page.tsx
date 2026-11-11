import Link from "next/link";
import {notFound} from "next/navigation";
import {localPreviewEnabled} from "@/lib/local-preview";
import {editorialArticles} from "@/lib/editorial";
import {seoPages} from "@/data/seoPages";

export const metadata = {
  title: "Private editorial review",
  robots: {index: false, follow: false},
};

export default function ReviewContentIndex() {
  if (!localPreviewEnabled()) notFound();
  const clusters = [...new Set(editorialArticles.map(article => article.cluster))];
  const types = [...new Set(seoPages.map(page => page.pageType))];
  return <main className="seo-content mx-auto max-w-6xl space-y-8 p-6 md:p-10">
    <header>
      <p>LOCAL REVIEW ONLY</p>
      <h1>Restaurant content review library</h1>
      <p>{editorialArticles.length} article records and {seoPages.length} programmatic records.
        Review status is separate from whether a body has been written.
        This library and its previews return 404 in production.</p>
    </header>
    <nav aria-label="Review sections" className="flex flex-wrap gap-4">
      <a href="#articles">Article clusters</a><a href="#pages">Programmatic pages</a>
    </nav>
    <section id="articles" className="space-y-8">
      <h2>Article clusters</h2>
      {clusters.map(cluster => {
        const articles = editorialArticles.filter(article => article.cluster === cluster);
        return <section key={cluster}>
          <h3>Cluster {cluster}: {articles[0].primaryKeyword}</h3>
          <ul className="list-disc space-y-3 pl-6">{articles.map(article =>
            <li key={article.id}>
              <Link href={"/review-content/" + article.id}>{article.title}</Link>
              <span className="block text-sm">{article.body.trim().split(/\s+/).length} words · {article.publicationStatus.replaceAll("_", " ")}
                {article.blockers.length > 0 ? " · review blockers remain" : ""}</span>
            </li>)}</ul>
        </section>;
      })}
    </section>
    <section id="pages" className="space-y-8">
      <h2>Programmatic pages</h2>
      {types.map(type => <section key={type}>
        <h3>{type.replaceAll("_", " ")}</h3>
        <ul className="list-disc space-y-3 pl-6">{seoPages.filter(page => page.pageType === type).map(page =>
          <li key={page.id}>
            <Link href={"/review-content/" + page.id}>{page.title}</Link>
            <span className="block text-sm">{page.publicationStatus.replaceAll("_", " ")}
              {page.mappedTo ? " · consolidate with " + page.mappedTo : ""}
              {page.pageType === "website_template" && !page.previewUrl ? " · approved working preview required" : ""}</span>
          </li>)}</ul>
      </section>)}
    </section>
  </main>;
}
