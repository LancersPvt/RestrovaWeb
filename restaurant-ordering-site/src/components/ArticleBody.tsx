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
  const blocks = content.split(/\n\s*\n/);
  return <div className="space-y-6">{blocks.map((block, i) => {
    if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
    if (block.startsWith("## ")) return <h2 id={articleHeadingId(block.slice(3), i + startIndex)} className="scroll-mt-28" key={i}>{block.slice(3)}</h2>;
    if (block.startsWith("- ")) return <ul key={i} className="list-disc space-y-3 pl-6">{block.split("\n").map((line, j) => <li key={j}><Inline text={line.replace(/^- /, "")} /></li>)}</ul>;
    if (block.startsWith("|")) {
      const lines = block.split("\n");
      const rows = lines.map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      // Accept only complete tables; malformed content remains escaped paragraph text.
      if (rows.length >= 3 && lines.every((line) => /^\|.*\|$/.test(line.trim())) && rows.every((row) => row.length === rows[0].length) && rows[1].every((cell) => /^:?-{3,}:?$/.test(cell))) {
        const caption = blocks.slice(0, i).reverse().find((part) => part.startsWith("## "))?.slice(3) || "Comparison checklist";
        const captionId = `article-table-${i + startIndex}`;
        return <div key={i} role="region" aria-labelledby={captionId} tabIndex={0} className="max-w-full overflow-x-auto rounded-2xl border border-black/15 focus-visible:outline-2 focus-visible:outline-offset-2">
          <table className="w-full min-w-[34rem] border-collapse text-left text-base">
            <caption id={captionId} className="sr-only">{caption}</caption>
            <thead className="bg-[#fff0e8]"><tr>{rows[0].map((cell, j) => <th key={j} scope="col" className="p-4"><Inline text={cell} /></th>)}</tr></thead>
            <tbody>{rows.slice(2).map((row, j) => <tr key={j} className="border-t border-black/10">{row.map((cell, k) => k === 0 ? <th scope="row" key={k} className="p-4 font-medium"><Inline text={cell} /></th> : <td key={k} className="p-4"><Inline text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>;
      }
    }
    return <p key={i}><Inline text={block} /></p>;
  })}</div>;
}
