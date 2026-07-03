import MoodRecommender from '@/app/components/MoodRecommender/MoodRecommender';
import Link from 'next/link';

export default function MoviesPage() {
    return (
        <div className="bg-[#0B0F19] text-[#F9FAFB] min-h-screen">
            <main className="max-w-5xl mx-auto py-16 px-6">
                <Link href="/" className="text-sm text-[#A8B8C4] mb-6 inline-block">← Back home</Link>
                <h1 className="text-4xl font-bold text-[#38BDF8] mb-4">Movie World</h1>
                <p className="text-[#A8B8C4] mb-8">Find movies matched to your mood.</p>

                <div className="bg-[#071026] rounded-lg p-6 border border-[#38BDF8]/6">
                    <MoodRecommender mode="movies" initialExpanded />
                </div>
            </main>
        </div>
    );
}
