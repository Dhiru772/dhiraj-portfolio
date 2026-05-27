import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blogs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Custom Markdown to HTML compiler
function renderMarkdownToHtml(markdown: string): string {
  // Escape HTML entities helper
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  let html = markdown;

  // Code blocks (```lang code ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-[#0B0F19] border border-[#38BDF8]/20 p-5 rounded-xl overflow-x-auto font-mono text-sm my-6 text-[#F9FAFB]"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code (`code`)
  html = html.replace(/`([^`\n]+)`/g, '<code class="bg-[#0B0F19] text-[#38BDF8] border border-[#38BDF8]/10 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

  // Headers (##, ###, #)
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#F9FAFB] mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-[#F9FAFB] mt-10 mb-4 border-b border-[#38BDF8]/15 pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-[#F9FAFB] mt-12 mb-6">$1</h1>');

  // Bold (**text**)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Lists (- item)
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-[#9CA3AF] my-2">$1</li>');

  // Links ([text](url))
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#38BDF8] hover:underline">$1</a>');

  // Process paragraphs
  const blocks = html.split('\n\n');
  const processedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (trimmed === '') return '';
    // Skip wrapping if it is a block element
    if (trimmed.startsWith('<pre') || trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
      return trimmed;
    }
    return `<p class="text-[#9CA3AF] leading-relaxed my-4 text-base md:text-lg">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return processedBlocks.filter(b => b !== '').join('\n');
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdownToHtml(post.content);

  return (
    <div className="bg-[#0B0F19] text-[#F9FAFB] min-h-screen py-24 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-[#0EA5E9] transition font-mono group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> back to writing
          </Link>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-[#38BDF8]/10 mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent"></div>
          </div>
        )}

        {/* Post Header */}
        <header className="mb-12 border-b border-[#38BDF8]/10 pb-8">
          <div className="flex gap-4 items-center text-xs text-[#9CA3AF] font-mono mb-4">
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#F9FAFB] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-[#161B26] border border-[#38BDF8]/20 text-[#38BDF8] rounded-full font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div
          className="blog-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
