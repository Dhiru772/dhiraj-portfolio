'use client';

import { useState, useEffect } from 'react';

interface Comment {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
}

interface CommentSectionProps {
    slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch comments from API
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/comments/${slug}`);
                if (!response.ok) throw new Error('Failed to fetch comments');
                const data = await response.json();
                setComments(data.comments || []);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setErrorMessage('Failed to load comments');
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch(`/api/comments/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment = await response.json();
            setComments([newComment, ...comments]);

            setName('');
            setEmail('');
            setMessage('');
            setSuccessMessage('Comment posted successfully!');

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error posting comment:', error);
            setErrorMessage('Failed to post comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-20 pt-12 border-t border-[#38BDF8]/10">
            <h2 className="text-3xl font-bold text-[#F9FAFB] mb-8">Comments & Reviews</h2>

            {/* Comment Form */}
            <div className="bg-[#161B26] border border-[#38BDF8]/10 rounded-xl p-8 mb-12">
                <h3 className="text-xl font-semibold text-[#F9FAFB] mb-6">Leave a Review</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name Input */}
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0B0F19] border border-[#38BDF8]/20 rounded-lg text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#38BDF8] transition"
                            disabled={isSubmitting}
                        />

                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0B0F19] border border-[#38BDF8]/20 rounded-lg text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#38BDF8] transition"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Message Textarea */}
                    <textarea
                        placeholder="Share your thoughts, feedback, or review..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 bg-[#0B0F19] border border-[#38BDF8]/20 rounded-lg text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#38BDF8] transition resize-none"
                        disabled={isSubmitting}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#38BDF8] text-[#0B0F19] font-semibold rounded-lg hover:bg-[#0EA5E9] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {errorMessage}
                    </div>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {isLoading ? (
                    <p className="text-[#9CA3AF] text-center py-8">Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p className="text-[#9CA3AF] text-center py-8">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-[#161B26] border border-[#38BDF8]/10 rounded-xl p-6 hover:border-[#38BDF8]/30 transition"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-[#F9FAFB]">{comment.name}</h4>
                                    <p className="text-xs text-[#9CA3AF] font-mono">{comment.date}</p>
                                </div>
                            </div>

                            <p className="text-[#9CA3AF] leading-relaxed">{comment.message}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
