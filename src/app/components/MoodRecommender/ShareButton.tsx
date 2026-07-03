'use client';

import { useState } from 'react';
import { Mood, TimeOfDay, Song } from './recommendationData';

const MOOD_EMOJI: Record<Mood, string> = {
    happy: '😊',
    sad: '😢',
    stressed: '😤',
    romantic: '💕',
    energetic: '⚡',
    chill: '😎',
    focused: '🎯',
    motivated: '🚀',
    bored: '😑',
    nostalgic: '🕰️',
};

interface Movie {
    id: number;
    title: string;
}

interface ShareButtonProps {
    mood: Mood;
    timeOfDay: TimeOfDay;
    movies: Movie[];
    songs: Song[];
}

export default function ShareButton({ mood, timeOfDay, movies, songs }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const generateShareText = () => {
        const movieTitles = movies.map((m) => m.title).join(', ');
        const songTitles = songs
            .slice(0, 2)
            .map((s) => `${s.title} by ${s.artist}`)
            .join(', ');

        const text = `I'm feeling ${MOOD_EMOJI[mood]} *${mood}* this ${timeOfDay}

🎬 Movies: ${movieTitles || 'Loading...'}
🎵 Songs: ${songTitles || 'Loading...'}

Check out my vibe check → https://dhirajportfolio.com
What's your mood today? #VibeCheck`;

        return text;
    };

    const handleShare = async () => {
        const text = generateShareText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert('Failed to copy. Please try again.');
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`px-6 py-2 font-semibold rounded transition-all ${copied
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30'
                }`}
        >
            {copied ? '✓ Copied!' : '📢 Share Vibe'}
        </button>
    );
}
