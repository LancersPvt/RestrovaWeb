import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-lg hover-lift card-3d"
        >
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-coral-100 to-amber-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-md">
                        {post.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#F4A261] group-hover:gap-3 transition-all">
                    <span>Read more</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
