import { productVideos } from "@/data/productVideos";
import JsonLd from "@/components/JsonLd";

export default function ProductVideos({ page }: { page: string }) {
  const videos = productVideos.filter(video => video.page === page);
  if (!videos.length) return null;
  return <section id="product-demonstrations" className="seo-content space-y-8" aria-labelledby="product-demonstrations-heading">
    <h2 id="product-demonstrations-heading">Watch Restrova in action</h2>
    {videos.map(video => <article className="seo-card" key={video.id}>
      <h3>{video.title}</h3>
      <p className="mt-4">{video.summary}</p>
      <p className="mt-3 text-sm">Published on YouTube: <time dateTime={video.uploadDate}>{video.uploadDate.slice(0, 10)}</time></p>
      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe className="absolute inset-0 h-full w-full border-0" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} width="560" height="315" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      </div>
      <p className="mt-4"><a href={`https://www.youtube.com/watch?v=${video.id}`} className="underline underline-offset-4">Watch {video.title} on YouTube</a></p>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", "@id": `https://www.restrova.com/${page === "services" ? "services" : `services/${page}`}#video-${video.id}`, name: video.title, description: video.summary, thumbnailUrl: video.thumbnailUrl, uploadDate: video.uploadDate, embedUrl: `https://www.youtube.com/embed/${video.id}` }} />
    </article>)}
  </section>;
}
