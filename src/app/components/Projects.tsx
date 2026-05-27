'use client';

export default function Projects() {
    const projects = [
        {
            title: "Barber Shop Platform",
            description: "A full-stack platform with intelligent recommendation algorithm that personalizes service suggestions based on user preferences and history.",
            tags: ["PHP", "MySQL", "Algorithm Logic"],
            badge: "Algorithmic Logic",
            focus: "6th-semester project focusing on intelligent service recommendations",
            visual: "Algorithm Flow"
        },
        {
            title: "Event Management System (EMS)",
            description: "Comprehensive system for managing events with sophisticated database architecture designed to optimize reliability and user flows.",
            tags: ["PHP", "MySQL", "Relational Database"],
            badge: "Data Architecture",
            focus: "Enterprise-grade database schema design",
            visual: "Database Schema"
        }
    ];

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
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="group bg-[#161B26] border border-[#38BDF8]/20 rounded-lg p-6 hover:border-[#38BDF8] transition-all duration-300 hover:shadow-lg hover:shadow-[#38BDF8]/20"
                        >
                            {/* Visual Placeholder */}
                            <div className="w-full h-32 bg-gradient-to-br from-[#38BDF8]/10 to-[#10B981]/10 rounded-lg mb-6 flex items-center justify-center border border-[#38BDF8]/20 group-hover:border-[#38BDF8]/50 transition">
                                <div className="text-center">
                                    <div className="text-[#38BDF8] font-mono text-sm mb-2">{project.visual}</div>
                                    <div className="text-xs text-[#9CA3AF]">interactive visualization</div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">{project.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-[#9CA3AF] mb-4 leading-relaxed">{project.description}</p>

                            {/* Focus */}
                            <p className="text-xs text-[#10B981] mb-4">{project.focus}</p>

                            {/* Badge */}
                            <div className="inline-block px-3 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-medium rounded-full mb-4">
                                {project.badge}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        className="px-2 py-1 text-xs bg-[#0B0F19] border border-[#38BDF8]/30 text-[#38BDF8] rounded font-mono hover:bg-[#38BDF8] hover:text-[#0B0F19] transition"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
