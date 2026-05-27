import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blogs';

export const metadata = {
  title: "Blog // Dhiraj Sharma",
  description: "Insights on database architectures, full-stack web engineering, and algorithmic problem-solving.",
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <div className="bg-[#0B0F19] text-[#F9FAFB] min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-[#0EA5E9] transition font-mono group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> back to home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 border-b border-[#38BDF8]/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#38BDF8]">05</span> // WRITING & LOGIC
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed">
            Notes, tutorials, and reflections on engineering robust software and mastering databases.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-[#161B26] border border-[#38BDF8]/10 rounded-xl">
            <p className="text-[#9CA3AF]">No posts found yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-[#161B26] border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#38BDF8]/5"
              >
                {/* Cover Image Placeholder / Gradient */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#38BDF8]/20 to-[#10B981]/20">
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Decorative glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] to-transparent"></div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex gap-4 items-center text-xs text-[#9CA3AF] font-mono mb-3">
                      <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-[#F9FAFB] mb-3 group-hover:text-[#38BDF8] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer (Tags & Action) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#38BDF8]/5">
                    {/* Tags */}
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] bg-[#0B0F19] border border-[#38BDF8]/20 text-[#38BDF8] rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-mono text-[#38BDF8] hover:text-[#0EA5E9] transition flex items-center gap-1 group/btn"
                    >
                      Read post <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
