'use client';

export default function Skills() {
    const skillCategories = [
        {
            title: "Core Backend & Logic",
            skills: ["PHP", "MySQL", "Basic Java", "Logic & Algorithms", "Database Systems"]
        },
        {
            title: "Web & Interface Fundamentals",
            skills: ["HTML & CSS", "Web Technologies", "System Logic Design", "User Interface Flow", "React"]
        },
        {
            title: "Professional Framework",
            skills: ["Problem Solving", "Team Collaboration", "Technical Presentations", "Event Logic Design", "Next.js"]
        }
    ];

    return (
        <section className="py-20 px-6 bg-[#0B0F19]" id="skills">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">
                        <span className="text-[#38BDF8]">03</span> // ARCHITECTURE MATRIX
                    </h2>
                    <p className="text-[#9CA3AF]">Organized by system layers</p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category, i) => (
                        <div
                            key={i}
                            className="bg-[#161B26] border border-[#38BDF8]/20 rounded-lg p-6 hover:border-[#38BDF8]/50 transition"
                        >
                            {/* Category Title */}
                            <h3 className="text-[#38BDF8] font-bold text-sm font-mono mb-4">
                                {String(i + 1).padStart(2, '0')} / {category.title}
                            </h3>

                            {/* Skills List */}
                            <div className="space-y-2">
                                {category.skills.map((skill, j) => (
                                    <div
                                        key={j}
                                        className="flex items-center gap-3 p-2 rounded hover:bg-[#0B0F19] transition group cursor-pointer"
                                    >
                                        <span className="text-[#10B981] text-xs">◆</span>
                                        <span className="text-[#F9FAFB] text-sm group-hover:text-[#38BDF8] transition">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Category Stats */}
                            <div className="mt-6 pt-6 border-t border-[#38BDF8]/10 text-xs text-[#9CA3AF]">
                                <span className="font-mono">{category.skills.length} core skills</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
