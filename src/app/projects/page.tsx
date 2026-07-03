import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';

interface Project {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    coverImage: string;
    badge: string;
    status: string;
}

export default function ProjectsPage() {
    const projects: Project[] = getAllProjects();

    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Link
                href="/"
                aria-label="Back to home"
                className="fixed top-4 left-4 z-50 inline-flex items-center justify-center w-10 h-10 bg-[#0B0F19]/60 text-[#38BDF8] rounded-full border border-[#38BDF8]/20 hover:bg-[#0B0F19]/80 transition"
            >
                ←
            </Link>
            {/* Header */}
            <div className="px-6 py-20 bg-gradient-to-b from-[#161B26] to-[#0B0F19]">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-bold text-[#F9FAFB] mb-4">
                        <span className="text-[#38BDF8]">02</span> // PROJECTS
                    </h1>
                    <p className="text-lg text-[#9CA3AF] max-w-2xl">
                        Case studies in engineering, architecture, and algorithmic logic. Each project represents a deep exploration of problem-solving and technical excellence.
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <Link key={project.slug} href={`/projects/${project.slug}`}>
                                <div className="group h-full bg-[#161B26] border border-[#38BDF8]/20 rounded-lg overflow-hidden hover:border-[#38BDF8] transition-all duration-300 hover:shadow-lg hover:shadow-[#38BDF8]/20 cursor-pointer">
                                    {/* Project Thumbnail */}
                                    {project.coverImage ? (
                                        <div className="w-full h-48 relative overflow-hidden border-b border-[#38BDF8]/20">
                                            <img
                                                src={project.coverImage.startsWith('/') ? project.coverImage : `/${project.coverImage}`}
                                                alt={project.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-br from-[#38BDF8]/10 to-[#10B981]/10 flex items-center justify-center border-b border-[#38BDF8]/20 group-hover:border-[#38BDF8]/50 transition relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#38BDF8]/5 to-transparent group-hover:via-[#38BDF8]/10 transition-all"></div>
                                            <div className="text-center relative z-10">
                                                <div className="text-4xl mb-2">📊</div>
                                                <div className="text-[#38BDF8] font-mono text-sm mb-1">{project.badge}</div>
                                                <div className="text-xs text-[#9CA3AF]">Project Details</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-[#F9FAFB] mb-2 group-hover:text-[#38BDF8] transition">
                                            {project.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">
                                            {project.excerpt}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2 py-1 bg-[#38BDF8]/10 text-[#38BDF8] rounded border border-[#38BDF8]/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="text-xs px-2 py-1 bg-[#10B981]/10 text-[#10B981] rounded border border-[#10B981]/30">
                                                    +{project.tags.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-[#38BDF8]/10">
                                            <span className="text-xs text-[#6B7280]">
                                                {new Date(project.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-[#10B981]/20 text-[#10B981] rounded">
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-4 text-[#38BDF8] text-sm font-mono group-hover:translate-x-2 transition-transform">
                                            View Details →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
