'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: ''
    });
    const [status, setStatus] = useState<{
        submitting: boolean;
        success: boolean;
        error: string | null;
    }>({
        submitting: false,
        success: false,
        error: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', project: '' });
            // Keep success message visible for 6 seconds
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 6000);
        } catch (err: any) {
            console.error('Contact form submission error:', err);
            setStatus({
                submitting: false,
                success: false,
                error: err.message || 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <section className="py-20 px-6 bg-[#0B0F19]" id="contact">
            <div className="max-w-2xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#F9FAFB] mb-4">
                        Let's build something efficient.
                    </h2>
                    <p className="text-[#9CA3AF]">Have a project in mind? Let's connect.</p>
                </div>

                {/* Contact Card */}
                <div className="bg-[#161B26] border border-[#38BDF8]/20 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                    {/* Glowing effect inside card */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>

                    {status.success && (
                        <div className="mb-6 p-4 bg-[#10B981]/10 border border-[#10B981]/50 rounded-lg text-[#10B981] text-sm flex items-center gap-3 animate-fade-in">
                            <span className="text-lg">✓</span>
                            <span>Message saved successfully! Thank you, I'll get back to you soon.</span>
                        </div>
                    )}

                    {status.error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-3">
                            <span className="text-lg">⚠</span>
                            <span>{status.error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-mono text-[#9CA3AF] mb-2 tracking-wider">
                                NAME
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={status.submitting}
                                className="w-full bg-[#0B0F19]/50 border border-[#38BDF8]/20 text-[#F9FAFB] px-4 py-3 rounded-lg focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] focus:outline-none transition disabled:opacity-50"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-mono text-[#9CA3AF] mb-2 tracking-wider">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={status.submitting}
                                className="w-full bg-[#0B0F19]/50 border border-[#38BDF8]/20 text-[#F9FAFB] px-4 py-3 rounded-lg focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] focus:outline-none transition disabled:opacity-50"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Project Details Field */}
                        <div>
                            <label htmlFor="project" className="block text-xs font-mono text-[#9CA3AF] mb-2 tracking-wider">
                                PROJECT / OPPORTUNITY DETAILS
                            </label>
                            <textarea
                                id="project"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                required
                                disabled={status.submitting}
                                rows={5}
                                className="w-full bg-[#0B0F19]/50 border border-[#38BDF8]/20 text-[#F9FAFB] px-4 py-3 rounded-lg focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] focus:outline-none transition resize-none disabled:opacity-50"
                                placeholder="Tell me about your project or internship opportunity (minimum 5 characters)..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status.submitting}
                            className="w-full px-6 py-3.5 bg-[#38BDF8] text-[#0B0F19] font-semibold rounded-lg hover:bg-[#0EA5E9] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {status.submitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-[#0B0F19]" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <span>Send Message</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Direct Contact & Social Links */}
                <div className="mt-16 text-center space-y-6">
                    <p className="text-[#9CA3AF] text-sm tracking-wider font-mono">CONNECT DIRECTLY</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                        {/* Email */}
                        <a
                            href="mailto:dhirajsharma9848@gmail.com"
                            className="flex flex-col items-center gap-2 p-4 bg-[#161B26] border border-[#38BDF8]/10 hover:border-[#38BDF8]/40 hover:bg-[#161B26]/80 rounded-xl transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-[#38BDF8] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-[#9CA3AF] font-medium font-mono">Email</span>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+977-9840725591"
                            className="flex flex-col items-center gap-2 p-4 bg-[#161B26] border border-[#38BDF8]/10 hover:border-[#38BDF8]/40 hover:bg-[#161B26]/80 rounded-xl transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-[#38BDF8] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-xs text-[#9CA3AF] font-medium font-mono">Call</span>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/Dhiru772"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 p-4 bg-[#161B26] border border-[#38BDF8]/10 hover:border-[#38BDF8]/40 hover:bg-[#161B26]/80 rounded-xl transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-[#38BDF8] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span className="text-xs text-[#9CA3AF] font-medium font-mono">GitHub</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/dhiraj-sharma-504654281/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 p-4 bg-[#161B26] border border-[#38BDF8]/10 hover:border-[#38BDF8]/40 hover:bg-[#161B26]/80 rounded-xl transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-[#38BDF8] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="text-xs text-[#9CA3AF] font-medium font-mono">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

