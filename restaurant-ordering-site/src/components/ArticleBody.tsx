import Link from "next/link";
export const articleHeadingId = (text: string, index: number) => `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
export const articleSections = (content: string) => content.split(/\n\s*\n/).flatMap((block, index) => block.startsWith("## ") ? [{ title: block.slice(3), id: articleHeadingId(block.slice(3), index) }] : []);
function Inline({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\]\((?:\/(?!\/)|https:\/\/)[^\s)]+\))/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(((?:\/(?!\/)|https:\/\/)[^\s)]+)\)$/);
    if (!link) return part;
    return link[2].startsWith("https://")
      ? <a key={i} href={link[2]}>{link[1]}</a>
      : <Link key={i} href={link[2]}>{link[1]}</Link>;
  })}</>;
}
// A small renderer for the deliberately limited, repository-owned article format.
// React escapes text; grouped lists are valid HTML and body headings never add an H1.
export default function ArticleBody({ content, startIndex = 0 }: { content: string; startIndex?: number }) {
  return <div className="space-y-6">{content.split(/\n\s*\n/).map((block, i) => {
    if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
    if (block.startsWith("## ")) return <h2 id={articleHeadingId(block.slice(3), i + startIndex)} className="scroll-mt-28" key={i}>{block.slice(3)}</h2>;
    if (block.startsWith("- ")) return <ul key={i} className="list-disc space-y-3 pl-6">{block.split("\n").map((line, j) => <li key={j}><Inline text={line.replace(/^- /, "")} /></li>)}</ul>;
    return <p key={i}><Inline text={block} /></p>;
  })}</div>;
}
