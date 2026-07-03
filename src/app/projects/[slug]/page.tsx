import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.excerpt,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    const allProjects = getAllProjects();

    if (!project) {
        notFound();
    }

    // Get related projects (exclude current project)
    const relatedProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 2);

    const renderInlineBold = (text: string) => {
        const regex = /\*\*(.+?)\*\*/g;
        const parts = [] as Array<string | ReactNode>;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            parts.push(
                <strong key={match.index} className="font-semibold text-[#F9FAFB]">
                    {match[1]}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Link
                href="/projects"
                aria-label="Back to projects"
                className="fixed top-4 left-4 z-50 inline-flex items-center justify-center w-10 h-10 bg-[#0B0F19]/60 text-[#38BDF8] rounded-full border border-[#38BDF8]/20 hover:bg-[#0B0F19]/80 transition"
            >
                ←
            </Link>
            {/* Header */}
            <div className="px-6 py-12 bg-gradient-to-b from-[#161B26] to-[#0B0F19]">
                <div className="max-w-4xl mx-auto">
                    {project.slug !== 'barber-shop-platform' && (
                        <Link
                            href="/projects"
                            className="inline-flex items-center text-[#38BDF8] hover:text-[#10B981] transition mb-6"
                        >
                            ← Back to Projects
                        </Link>
                    )}

                    <h1 className="text-5xl font-bold text-[#F9FAFB] mb-4">{project.title}</h1>

                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <span className="text-sm px-3 py-1 bg-[#38BDF8]/20 text-[#38BDF8] rounded border border-[#38BDF8]/30">
                            {project.badge}
                        </span>
                        <span className="text-sm px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded border border-[#10B981]/30">
                            {project.status}
                        </span>
                        <span className="text-sm text-[#9CA3AF]">
                            {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>

                    <p className="text-lg text-[#9CA3AF] mb-6">{project.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] rounded border border-[#38BDF8]/20"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Project Thumbnail */}
                    {project.coverImage ? (
                        <div className="w-full h-96 relative mb-12 overflow-hidden rounded-lg border border-[#38BDF8]/20">
                            <img
                                src={project.coverImage.startsWith('/') ? project.coverImage : `/${project.coverImage}`}
                                alt={project.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-96 bg-gradient-to-br from-[#38BDF8]/10 to-[#10B981]/10 rounded-lg mb-12 flex items-center justify-center border border-[#38BDF8]/20">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📊</div>
                                <div className="text-[#38BDF8] font-mono text-sm mb-2">{project.badge}</div>
                                <div className="text-[#9CA3AF]">Project Visualization</div>
                            </div>
                        </div>
                    )}

                    {/* Markdown Content */}
                    <div className="prose prose-invert max-w-none mb-16">
                        <div className="markdown-content text-[#9CA3AF]">
                            {project.content.split('\n').map((line, i) => {
                                // Handle headings
                                if (line.startsWith('## ')) {
                                    return (
                                        <h2 key={i} className="text-3xl font-bold text-[#F9FAFB] mt-8 mb-4">
                                            {renderInlineBold(line.replace('## ', ''))}
                                        </h2>
                                    );
                                }
                                if (line.startsWith('### ')) {
                                    return (
                                        <h3 key={i} className="text-2xl font-bold text-[#F9FAFB] mt-6 mb-3">
                                            {renderInlineBold(line.replace('### ', ''))}
                                        </h3>
                                    );
                                }
                                if (line.startsWith('- ')) {
                                    return (
                                        <li key={i} className="ml-6 mb-2 text-[#9CA3AF]">
                                            {renderInlineBold(line.replace('- ', ''))}
                                        </li>
                                    );
                                }
                                if (line.startsWith('```')) {
                                    return null; // Handle code blocks specially
                                }
                                if (line.trim() === '') {
                                    return <div key={i} className="mb-4"></div>;
                                }
                                return (
                                    <p key={i} className="mb-4 leading-relaxed text-[#9CA3AF]">
                                        {renderInlineBold(line)}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Related Projects */}
                    {relatedProjects.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-[#38BDF8]/20">
                            <h2 className="text-2xl font-bold text-[#F9FAFB] mb-8">Other Projects</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {relatedProjects.map((relProject) => (
                                    <Link key={relProject.slug} href={`/projects/${relProject.slug}`}>
                                        <div className="group bg-[#161B26] border border-[#38BDF8]/20 rounded-lg p-6 hover:border-[#38BDF8] transition-all duration-300 cursor-pointer">
                                            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2 group-hover:text-[#38BDF8] transition">
                                                {relProject.title}
                                            </h3>
                                            <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">
                                                {relProject.excerpt}
                                            </p>
                                            <span className="text-[#38BDF8] text-sm font-mono group-hover:translate-x-2 transition-transform">
                                                View Project →
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </main >
    );
}
