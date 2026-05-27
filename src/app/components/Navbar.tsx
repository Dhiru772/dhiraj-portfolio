'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F19]/80 border-b border-[#161B26]">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left: Monogram with Cat mascot */}
                <Link href="/" className="relative font-mono text-sm font-bold text-[#F9FAFB] hover:text-[#38BDF8] transition group pt-4 pb-1">
                    <div className="absolute -top-6 left-1 w-12 h-12 pointer-events-none transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-6 origin-bottom animate-cat-breath">
                        <img src="/cat.png" alt="Cat Mascot" className="w-full h-full object-contain" />
                    </div>
                    dhiru.dev
                </Link>

                {/* Center: Nav Links (Desktop) */}
                <div className="hidden md:flex gap-8 text-sm text-[#9CA3AF]">
                    <a href="#about" className="hover:text-[#38BDF8] transition">About</a>
                    <a href="#projects" className="hover:text-[#38BDF8] transition">Projects</a>
                    <a href="#skills" className="hover:text-[#38BDF8] transition">Skills</a>
                    <Link href="/blog" className="hover:text-[#38BDF8] transition">Blog</Link>
                    <a href="#contact" className="hover:text-[#38BDF8] transition">Contact</a>
                </div>

                {/* Right: CTA Link */}
                <Link href="/blog" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8] text-[#0B0F19] text-sm font-medium rounded-full hover:bg-[#0EA5E9] transition">
                    Blog / Philosophy
                </Link>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[#F9FAFB] p-2"
                    title="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#161B26] border-b border-[#161B26] md:hidden">
                        <div className="flex flex-col gap-4 p-6 text-sm text-[#9CA3AF]">
                            <a href="#about" onClick={() => setIsOpen(false)}>About</a>
                            <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
                            <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
                            <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
                            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
