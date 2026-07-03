'use client';

import { TimeOfDay } from './recommendationData';

const TIMES: { time: TimeOfDay; label: string; icon: string }[] = [
    { time: 'morning', label: 'Morning', icon: '🌅' },
    { time: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { time: 'evening', label: 'Evening', icon: '🌅' },
    { time: 'lateNight', label: 'Late Night', icon: '🌙' },
];

interface TimeDisplayProps {
    selectedTime: TimeOfDay;
    onTimeChange: (time: TimeOfDay) => void;
}

export default function TimeDisplay({ selectedTime, onTimeChange }: TimeDisplayProps) {
    return (
        <div className="mt-8 p-6 bg-[#1a2332] rounded-lg border border-[#38BDF8]/20">
            <p className="text-sm text-[#A8B8C4] mb-4">What time of day is it?</p>
            <div className="flex gap-3 flex-wrap">
                {TIMES.map(({ time, label, icon }) => (
                    <button
                        key={time}
                        onClick={() => onTimeChange(time)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedTime === time
                                ? 'bg-[#38BDF8] text-[#0B0F19] font-semibold'
                                : 'bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20'
                            }`}
                    >
                        {icon} {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
