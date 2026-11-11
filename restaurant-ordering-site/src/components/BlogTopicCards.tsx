import Link from "next/link";
import { blogTopics, getTopicArticles } from "@/lib/blog-topics";

export default function BlogTopicCards() {
  return <section aria-labelledby="blog-topics-heading" id="blog-topics" className="scroll-mt-24">
    <h2 id="blog-topics-heading" className="text-3xl font-black">Restaurant guides: explore 10 topics</h2>
    <p className="mt-4 max-w-3xl leading-7 text-black/70">Choose a topic to read practical articles on buying, launching and running restaurant software.</p>
    <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogTopics.map(topic => <li key={topic.id}>
        <Link href={`/blog/topics/${topic.slug}`} className="flex h-full min-h-28 flex-col justify-between gap-3 rounded-xl border border-black/15 bg-white px-5 py-5 text-[#171816] transition-colors hover:bg-[#fffaf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a73524]">
          <h3 className="text-lg font-bold underline underline-offset-4">{topic.title}</h3>
          <span className="text-sm text-black/70">{getTopicArticles(topic.id).length} articles <span aria-hidden="true">→</span></span>
        </Link>
      </li>)}
    </ul>
  </section>;
}
