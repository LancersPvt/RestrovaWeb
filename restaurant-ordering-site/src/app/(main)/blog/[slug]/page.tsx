import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
        };
    }

    return {
        title: `${post.title} | ${siteConfig.name}`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get related posts (other posts in same category or just other posts)
    const relatedPosts = blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

    // If not enough related posts in same category, add others
    if (relatedPosts.length < 2) {
        const otherPosts = blogPosts
            .filter((p) => p.id !== post.id && !relatedPosts.includes(p))
            .slice(0, 2 - relatedPosts.length);
        relatedPosts.push(...otherPosts);
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: {
            "@type": "Person",
            name: post.author,
        },
        datePublished: post.date,
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/logo.png`,
            },
        },
    };

    return (
        <main className="bg-white">
            <Script
                id="ld-blog"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-[#F8E9D0] to-[#FFE5D9] py-16 sm:py-24">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-[#F4A261]/10 blur-3xl" />
                </div>

                <div className="mx-auto max-w-4xl px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#FF6B6B] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/#blog" className="hover:text-[#FF6B6B] transition-colors">
                            Blog
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{post.title}</span>
                    </nav>

                    {/* Category Badge */}
                    <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        {post.category}
                    </span>

                    {/* Title */}
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F4A261] text-white font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="mx-auto max-w-5xl px-6 -mt-12">
                <div className="relative h-96 rounded-3xl border border-[#F4A261]/30 shadow-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            </section>

            {/* Content */}
            <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
                <div className="prose prose-lg prose-slate max-w-none">
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                                .split('\n')
                                .map(line => {
                                    // Convert markdown headers
                                    if (line.startsWith('### ')) {
                                        return `<h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">${line.substring(4)}</h3>`;
                                    }
                                    if (line.startsWith('## ')) {
                                        return `<h2 class="text-3xl font-bold text-slate-900 mt-12 mb-6">${line.substring(3)}</h2>`;
                                    }
                                    if (line.startsWith('# ')) {
                                        return `<h1 class="text-4xl font-bold text-slate-900 mt-8 mb-6">${line.substring(2)}</h1>`;
                                    }
                                    // Convert markdown bold
                                    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
                                    // Convert markdown lists
                                    if (line.startsWith('- ')) {
                                        return `<li class="ml-6 text-gray-700 leading-relaxed">${line.substring(2)}</li>`;
                                    }
                                    // Regular paragraphs
                                    if (line.trim() && !line.startsWith('<')) {
                                        return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`;
                                    }
                                    return line;
                                })
                                .join('\n')
                        }}
                    />
                </div>

                {/* CTA Section */}
                <div className="mt-16 rounded-3xl border border-[#F4A261]/30 bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] p-8 sm:p-12">
                    <h3 className="text-2xl font-bold text-slate-900">
                        Ready to transform your restaurant's online ordering?
                    </h3>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Restrova helps restaurants build branded ordering platforms that increase profits and customer loyalty.
                    </p>
                    <Link
                        href="/#contact"
                        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-8 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                        Get Started Today
                    </Link>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="border-t border-gray-200 bg-gradient-to-br from-[#FFF5E6] to-[#F8E9D0] py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="text-3xl font-bold text-slate-900">Related Articles</h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-lg hover-glow card-3d"
                                >
                                    <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F4A261] px-3 py-1 text-xs font-semibold text-white">
                                        {relatedPost.category}
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-[#FF6B6B] transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                        {relatedPost.excerpt}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                        <span>{relatedPost.author}</span>
                                        <span>•</span>
                                        <span>{relatedPost.readTime}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
