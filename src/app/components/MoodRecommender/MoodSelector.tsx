'use client';

import { Mood } from './recommendationData';

const MOODS: { mood: Mood; emoji: string; label: string }[] = [
    { mood: 'happy', emoji: '😊', label: 'Happy' },
    { mood: 'sad', emoji: '😢', label: 'Sad / Heartbroken' },
    { mood: 'stressed', emoji: '😤', label: 'Stressed' },
    { mood: 'romantic', emoji: '💕', label: 'Romantic' },
    { mood: 'energetic', emoji: '⚡', label: 'Energetic' },
    { mood: 'chill', emoji: '😎', label: 'Chill' },
    { mood: 'focused', emoji: '🎯', label: 'Focused / Studying' },
    { mood: 'motivated', emoji: '🚀', label: 'Motivated' },
    { mood: 'bored', emoji: '😑', label: 'Bored' },
    { mood: 'nostalgic', emoji: '🕰️', label: 'Nostalgic' },
];

interface MoodSelectorProps {
    selectedMood: Mood | null;
    onSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {MOODS.map(({ mood, emoji, label }) => {
                const isSelected = selectedMood === mood;
                return (
                    <button
                        key={mood}
                        type="button"
                        onClick={() => onSelect(mood)}
                        className={`group relative overflow-hidden rounded-xl p-5 border transition-all duration-300 ${
                            isSelected
                                ? 'bg-gradient-to-br from-[#38BDF8]/30 to-[#10B981]/30 border-[#38BDF8] ring-2 ring-[#38BDF8]/40 shadow-[0_0_15px_rgba(56,189,248,0.25)] scale-[1.03]'
                                : 'bg-[#131b2e]/60 border-[#38BDF8]/15 hover:border-[#38BDF8]/50 hover:bg-[#1e2942]/60 hover:scale-[1.02]'
                        }`}
                    >
                        <div className={`text-3xl mb-2 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {emoji}
                        </div>
                        <div className={`text-xs font-semibold transition-colors duration-300 ${isSelected ? 'text-[#38BDF8]' : 'text-[#A8B8C4] group-hover:text-white'}`}>
                            {label}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/0 to-[#38BDF8]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </button>
                );
            })}
        </div>
    );
}
