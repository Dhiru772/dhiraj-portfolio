'use client';

import Image from 'next/image';

export default function Hero() {
    return (
        <section className="pt-32 pb-16 px-6 bg-[#0B0F19]" id="about">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 items-center">
                {/* Left: Content */}
                <div className="flex flex-col gap-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 w-fit">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                        <span className="text-xs font-mono text-[#10B981]">AVAILABLE FOR INTERNSHIPS & FREELANCE</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] leading-tight">
                        Hungry for new things and always cooking something.
                    </h1>

                    {/* Subtext */}
                    <div className="text-lg text-[#9CA3AF] leading-relaxed space-y-3">
                        <p>Web dev is one of my biggest hobbies — turning ideas into real shit.</p>
                        <p className="italic text-[#A8B8C4]">BCA Scholar specializing in full-stack fundamentals, relational database logic, and algorithmic problem-solving.</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-4 pt-4">
                        <a href="#projects" className="px-6 py-3 bg-[#38BDF8] text-[#0B0F19] font-medium rounded-lg hover:bg-[#0EA5E9] transition text-center cursor-pointer">
                            View Case Studies
                        </a>
                        <a href="#contact" className="px-6 py-3 border border-[#38BDF8] text-[#38BDF8] font-medium rounded-lg hover:bg-[#38BDF8] hover:text-[#0B0F19] transition text-center cursor-pointer">
                            Let's Connect
                        </a>
                    </div>
                </div>

                {/* Right: Terminal */}
                <div className="flex flex-col justify-center items-center">
                    {/* Profile Photo - Circle */}
                    <div className="mb-6 relative">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#38BDF8] shadow-2xl shadow-[#38BDF8]/50">
                            <Image
                                src="/profile.jpg"
                                alt="Dhiraj Sharma"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                    </div>

                    {/* Terminal Window */}
                    <div className="w-full max-w-sm bg-[#161B26] rounded-lg border border-[#38BDF8]/30 overflow-hidden shadow-2xl">
                        {/* Window Controls */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#0B0F19] border-b border-[#38BDF8]/20">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                            <span className="ml-auto text-xs text-[#9CA3AF] font-mono">~/portfolio/stack</span>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 font-mono text-sm space-y-3 bg-[#0B0F19]">
                            <div className="text-[#38BDF8]">$ whoami</div>
                            <div className="text-[#F9FAFB]">fullstack-developer</div>

                            <div className="text-[#38BDF8]">$ cat skills.txt</div>
                            <div className="text-[#10B981]">✓ Backend: PHP, Java</div>
                            <div className="text-[#10B981]">✓ Database: MySQL</div>
                            <div className="text-[#10B981]">✓ Logic: Algorithms</div>
                            <div className="text-[#10B981]">✓ Frontend: React, Next.js</div>

                            <div className="text-[#38BDF8]">$ node index.js</div>
                            <div className="text-[#F9FAFB] opacity-50">▋</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
