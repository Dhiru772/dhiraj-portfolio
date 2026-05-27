'use client';

export default function Timeline() {
    const timeline = [
        {
            year: "2027",
            title: "Bachelor of Computer Applications (BCA)",
            description: "Tribhuvan University",
            status: "current",
            icon: "🎓"
        },
        {
            year: "2024",
            title: "Academic Milestone",
            description: "Development of algorithmic and system logic projects (EMS & Barber Shop platform)",
            status: "milestone",
            icon: "⚙️"
        },
        {
            year: "2023",
            title: "Professional Growth",
            description: "Academic presentations, active seminar volunteering, and peer tutoring on technical frameworks",
            status: "active",
            icon: "📚"
        }
    ];

    return (
        <section className="py-20 px-6 bg-[#0B0F19]">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">
                        <span className="text-[#38BDF8]">04</span> // TIMELINE JOURNEY
                    </h2>
                    <p className="text-[#9CA3AF]">Progression and milestones</p>
                </div>

                {/* Timeline Container */}
                <div className="space-y-6">
                    {timeline.map((item, i) => (
                        <div key={i} className="flex gap-6 md:gap-8">
                            {/* Timeline Node */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all ${item.status === "current"
                                        ? "border-[#38BDF8] bg-[#38BDF8]/20 text-[#38BDF8]"
                                        : "border-[#10B981] bg-[#10B981]/20 text-[#10B981]"
                                    }`}>
                                    {item.icon}
                                </div>
                                {i < timeline.length - 1 && (
                                    <div className="w-0.5 h-12 bg-gradient-to-b from-[#38BDF8] to-[#10B981] mt-2"></div>
                                )}
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 pt-1">
                                <div className="bg-[#161B26] border border-[#38BDF8]/20 rounded-lg p-6 hover:border-[#38BDF8]/50 transition-all hover:shadow-lg hover:shadow-[#38BDF8]/10">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-[#10B981] text-sm font-mono font-bold">{item.year}</span>
                                        <span className={`text-xs font-mono px-2 py-1 rounded-full ${item.status === "current"
                                                ? "bg-[#38BDF8]/20 text-[#38BDF8]"
                                                : "bg-[#10B981]/20 text-[#10B981]"
                                            }`}>
                                            {item.status === "current" ? "CURRENT" : "COMPLETED"}
                                        </span>
                                    </div>
                                    <h3 className="text-[#F9FAFB] font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
