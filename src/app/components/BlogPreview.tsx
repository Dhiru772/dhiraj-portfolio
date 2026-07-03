import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blogs';

export default function BlogPreview() {
    const posts = getAllBlogPosts().slice(0, 3);

    return (
        <section className="py-20 px-6 bg-[#0B0F19]" id="blog">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">
                        <span className="text-[#38BDF8]">03</span> // LATEST BLOGS
                    </h2>
                    <p className="text-[#9CA3AF]">Insights on engineering, database architecture, and problem-solving.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="group flex flex-col bg-[#161B26] border border-[#38BDF8]/20 rounded-lg overflow-hidden hover:border-[#38BDF8] transition-all duration-300"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4 text-xs text-[#9CA3AF] font-mono">{post.date}</div>
                                <h3 className="text-xl font-bold text-[#F9FAFB] mb-3 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] bg-[#0B0F19] border border-[#38BDF8]/20 text-[#38BDF8] rounded px-2 py-1 font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-[#38BDF8]/10 p-4">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-xs font-mono text-[#38BDF8] hover:text-[#0EA5E9] transition flex items-center gap-1"
                                >
                                    Read post →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
