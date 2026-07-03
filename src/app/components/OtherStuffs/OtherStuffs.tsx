"use client";

import Link from "next/link";

export default function OtherStuffs() {
    return (
        <section className="py-20 px-6 bg-[#0B0F19]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">
                    <span className="text-[#38BDF8]">05</span> {'// OTHER STUFFS'}
                </h2>
                <p className="text-[#A8B8C4] mb-12">Fun things to discover and share</p>

                <div className="grid md:grid-cols-1 gap-6 mb-8">
                    <div className="space-y-4">
                        <Link href="/movies" className="block w-full p-6 border-2 border-dashed border-[#38BDF8]/30 rounded-lg hover:border-[#38BDF8] transition text-left">
                            <h3 className="text-lg font-bold text-[#38BDF8]">🎬 Movie World</h3>
                            <p className="text-[#A8B8C4] mt-1">Don&apos;t know what to watch? Explore the Movie World.</p>
                        </Link>

                        <Link href="/music" className="block w-full p-6 border-2 border-dashed border-[#10B981]/30 rounded-lg hover:border-[#10B981] transition text-left">
                            <h3 className="text-lg font-bold text-[#10B981]">🎵 Music World</h3>
                            <p className="text-[#A8B8C4] mt-1">Need a playlist? Enter Music World for mood-based songs.</p>
                        </Link>

                        <div className="p-6 rounded-lg border border-[#fff]/6 text-[#A8B8C4]">More fun stuff coming soon...</div>
                    </div>


                </div>
            </div>
        </section>
    );
}
