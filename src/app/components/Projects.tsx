'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            // Fetch projects from the API
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data.slice(0, 2)); // Show first 2 projects on homepage
        };
        loadProjects();
    }, []);

    return (
        <section className="py-20 px-6 bg-[#0B0F19]" id="projects">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">
                        <span className="text-[#38BDF8]">02</span> // PROJECTS
                    </h2>
                    <p className="text-[#9CA3AF]">Case studies in engineering and logic</p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project: any, i: number) => (
                        <Link key={i} href={`/projects/${project.slug}`}>
                            <div
                                className="group bg-[#161B26] border border-[#38BDF8]/20 rounded-lg p-6 hover:border-[#38BDF8] transition-all duration-300 hover:shadow-lg hover:shadow-[#38BDF8]/20 cursor-pointer h-full"
                            >
                                {/* Visual Placeholder */}
                                <div className="w-full h-32 bg-gradient-to-br from-[#38BDF8]/10 to-[#10B981]/10 rounded-lg mb-6 flex items-center justify-center border border-[#38BDF8]/20 group-hover:border-[#38BDF8]/50 transition">
                                    <div className="text-center">
                                        <div className="text-[#38BDF8] font-mono text-sm mb-2">{project.badge}</div>
                                        <div className="text-xs text-[#9CA3AF]">click to explore</div>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-[#F9FAFB] mb-2 group-hover:text-[#38BDF8] transition">{project.title}</h3>

                                {/* Description */}
                                <p className="text-sm text-[#9CA3AF] mb-4 leading-relaxed line-clamp-2">{project.excerpt}</p>

                                {/* Badge */}
                                <div className="inline-block px-3 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-medium rounded-full mb-4">
                                    {project.badge}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag: string, j: number) => (
                                        <span
                                            key={j}
                                            className="px-2 py-1 text-xs bg-[#0B0F19] border border-[#38BDF8]/30 text-[#38BDF8] rounded font-mono hover:bg-[#38BDF8] hover:text-[#0B0F19] transition"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="mt-4 text-[#38BDF8] text-sm font-mono group-hover:translate-x-2 transition-transform">
                                    View Details →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Projects CTA */}
                <div className="mt-12 text-center">
                    <Link href="/projects">
                        <button className="px-8 py-3 bg-gradient-to-r from-[#38BDF8] to-[#10B981] text-[#0B0F19] font-bold rounded-lg hover:shadow-lg hover:shadow-[#38BDF8]/50 transition-all duration-300">
                            View All Projects →
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
