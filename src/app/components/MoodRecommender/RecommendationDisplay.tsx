'use client';

import { Mood, TimeOfDay, Song } from './recommendationData';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
}

interface RecommendationDisplayProps {
    movies: Movie[];
    songs: Song[];
    loading: boolean;
    error: string | null;
    mood: Mood;
    timeOfDay: TimeOfDay;
    hideSongs?: boolean;
    hideMovies?: boolean;
    wasMovieSearchSuccess?: boolean;
    wasMovieSearchFallback?: boolean;
    movieSearchQuery?: string;
    matchedMovieTitle?: string;
    wasFilterFallback?: boolean;
    wasSongFallback?: boolean;
}

export default function RecommendationDisplay({
    movies,
    songs,
    loading,
    error,
    hideSongs = false,
    hideMovies = false,
    wasMovieSearchSuccess = false,
    wasMovieSearchFallback = false,
    movieSearchQuery = '',
    matchedMovieTitle = '',
    wasFilterFallback = false,
    wasSongFallback = false,
}: RecommendationDisplayProps) {
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-16 space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#38BDF8]"></div>
                <div className="text-sm font-medium text-[#A8B8C4]">Curation in progress... 🎬</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                <p>Couldn&apos;t fetch recommendations: {error}</p>
                <p className="text-sm mt-2">Make sure NEXT_PUBLIC_TMDB_API_KEY is set in .env.local</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Notification center */}
            {(wasMovieSearchSuccess || wasMovieSearchFallback || wasFilterFallback || wasSongFallback) && (
                <div className="space-y-2">
                    {wasMovieSearchSuccess && matchedMovieTitle && (
                        <div className="p-4 bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-lg text-[#38BDF8] flex items-center gap-2 text-sm">
                            <span>✨ Similar to your taste: Showing recommendations based on the movie <strong>{matchedMovieTitle}</strong> instead of your mood.</span>
                        </div>
                    )}
                    
                    {wasMovieSearchFallback && movieSearchQuery && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 flex items-center gap-2 text-sm">
                            <span>⚠️ Couldn&apos;t find matching recommendations for &quot;<strong>{movieSearchQuery}</strong>&quot;. Showing recommendations matching your mood instead.</span>
                        </div>
                    )}

                    {wasFilterFallback && !wasMovieSearchSuccess && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 flex items-center gap-2 text-sm">
                            <span>⚠️ No exact matches found for your filter combination. Displaying the closest mood-based recommendations.</span>
                        </div>
                    )}

                    {wasSongFallback && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 flex items-center gap-2 text-sm">
                            <span>⚠️ No songs found for your selected language filter. Displaying all songs matching your mood.</span>
                        </div>
                    )}
                </div>
            )}
            {/* Movies Section */}
            {!hideMovies && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#38BDF8]">🎬 Movies for You</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group bg-[#1a2332] rounded-lg overflow-hidden border border-[#38BDF8]/20 hover:border-[#38BDF8] transition-all duration-300 hover:scale-105"
                            >
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h4 className="font-semibold text-white mb-2 line-clamp-2">{movie.title}</h4>
                                    <p className="text-xs text-[#A8B8C4] mb-3 line-clamp-2">{movie.overview}</p>
                                    <a
                                        href={`https://www.google.com/search?q=${encodeURIComponent(movie.title)} movie`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-3 py-1 bg-[#38BDF8]/20 text-[#38BDF8] text-xs font-semibold rounded hover:bg-[#38BDF8] hover:text-[#0B0F19] transition"
                                    >
                                        Watch →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Songs Section */}
            {!hideSongs && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#10B981]">🎵 Songs for You</h3>
                    <div className="space-y-3">
                        {songs.map((song, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-[#1a2332] rounded-lg border border-[#10B981]/20 hover:border-[#10B981] transition-all duration-200 hover:bg-[#1a2332]/80"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">
                                            {song.title} — <span className="text-[#A8B8C4]">{song.artist}</span>
                                        </h4>
                                        <p className="text-sm text-[#A8B8C4] mt-1 italic">{song.reason}</p>
                                        <div className="mt-2 text-xs text-[#A8B8C4]">
                                            {song.origin === 'Nepali' && '🇳🇵'} {song.origin === 'Bollywood' && '🎭'}{' '}
                                            {song.origin === 'Western' && '🎬'}
                                        </div>
                                    </div>
                                    <a
                                        href={song.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-4 px-3 py-2 bg-[#10B981]/20 text-[#10B981] text-xs font-semibold rounded hover:bg-[#10B981] hover:text-white transition whitespace-nowrap"
                                    >
                                        Listen →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
