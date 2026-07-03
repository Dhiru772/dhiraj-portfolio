'use client';

import { useState, useEffect } from 'react';
import { Mood, TimeOfDay, MOOD_RECOMMENDATIONS, SONG_RECOMMENDATIONS } from './recommendationData';
import MoodSelector from './MoodSelector';
import RecommendationDisplay from './RecommendationDisplay';
import ShareButton from './ShareButton';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
}

type LanguagePreference = 'Any' | 'Nepali' | 'Hindi' | 'English';
type GenreLean = 'Action' | 'Romance' | 'Comedy' | 'Thriller' | 'Drama' | 'Horror';
type WatchingWith = 'Solo' | 'Friends' | 'Family' | 'Date';
type EnergyLevel = 'easy' | 'intense';

const TIMES: { value: TimeOfDay; label: string; icon: string }[] = [
    { value: 'morning', label: 'Morning', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { value: 'evening', label: 'Evening', icon: '🌇' },
    { value: 'lateNight', label: 'Late Night', icon: '🌙' },
];

const LANGUAGES: { value: LanguagePreference; label: string; flag: string }[] = [
    { value: 'Any', label: 'Any Language', flag: '🌍' },
    { value: 'Nepali', label: 'Nepali', flag: '🇳🇵' },
    { value: 'Hindi', label: 'Hindi', flag: '🇮🇳' },
    { value: 'English', label: 'English', flag: '🇬🇧' },
];

const GENRES: { value: GenreLean; label: string; icon: string }[] = [
    { value: 'Action', label: 'Action', icon: '💥' },
    { value: 'Romance', label: 'Romance', icon: '💖' },
    { value: 'Comedy', label: 'Comedy', icon: '😂' },
    { value: 'Thriller', label: 'Thriller', icon: '🕵️‍♂️' },
    { value: 'Drama', label: 'Drama', icon: '🎭' },
    { value: 'Horror', label: 'Horror', icon: '👻' },
];

const COMPANIONS: { value: WatchingWith; label: string; icon: string }[] = [
    { value: 'Solo', label: 'Solo', icon: '🍿' },
    { value: 'Friends', label: 'Friends', icon: '👥' },
    { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'Date', label: 'Date', icon: '👩‍❤️‍👨' },
];

const GENRE_MAP: Record<GenreLean, number> = {
    Action: 28,
    Romance: 10749,
    Comedy: 35,
    Thriller: 53,
    Drama: 18,
    Horror: 27,
};

interface MoodRecommenderProps {
    mode?: 'full' | 'movies' | 'music';
    initialExpanded?: boolean;
}

export default function MoodRecommender({ mode = 'full', initialExpanded = false }: MoodRecommenderProps) {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
    const [language, setLanguage] = useState<LanguagePreference>('Any');
    const [selectedGenres, setSelectedGenres] = useState<GenreLean[]>([]);
    const [watchingWith, setWatchingWith] = useState<WatchingWith>('Solo');
    const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('easy');
    const [likeText, setLikeText] = useState('');

    // Previews & Status
    const [previewMovieTitle, setPreviewMovieTitle] = useState<string | null>(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    
    // Result states
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    // Fallback status indicators
    const [wasMovieSearchSuccess, setWasMovieSearchSuccess] = useState(false);
    const [wasMovieSearchFallback, setWasMovieSearchFallback] = useState(false);
    const [movieSearchQuery, setMovieSearchQuery] = useState('');
    const [matchedMovieTitle, setMatchedMovieTitle] = useState('');
    const [wasFilterFallback, setWasFilterFallback] = useState(false);

    // Auto-detect time of day
    useEffect(() => {
        const timer = setTimeout(() => {
            const hour = new Date().getHours();
            if (hour < 12) setTimeOfDay('morning');
            else if (hour < 17) setTimeOfDay('afternoon');
            else if (hour < 21) setTimeOfDay('evening');
            else setTimeOfDay('lateNight');
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Debounced movie preview search
    useEffect(() => {
        if (!likeText.trim()) {
            const timer = setTimeout(() => {
                setPreviewMovieTitle(null);
                setPreviewLoading(false);
            }, 0);
            return () => clearTimeout(timer);
        }

        const loadTimer = setTimeout(() => {
            setPreviewLoading(true);
        }, 0);

        const timer = setTimeout(async () => {
            try {
                const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(likeText.trim())}`;
                const res = await fetch(searchUrl);
                if (res.ok) {
                    const data = await res.json();
                    if (data.results && data.results.length > 0) {
                        const firstMovie = data.results[0];
                        const year = firstMovie.release_date ? ` (${firstMovie.release_date.substring(0, 4)})` : '';
                        setPreviewMovieTitle(`Will recommend movies similar to: ${firstMovie.title}${year}`);
                    } else {
                        setPreviewMovieTitle('Movie not found on TMDB');
                    }
                } else {
                    setPreviewMovieTitle(null);
                }
            } catch {
                setPreviewMovieTitle(null);
            } finally {
                setPreviewLoading(false);
            }
        }, 800);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(timer);
        };
    }, [likeText]);

    const handleGenreToggle = (genre: GenreLean) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handleFetchRecommendations = async () => {
        if (!selectedMood) {
            setError('Please choose a mood to get started!');
            return;
        }

        setLoading(true);
        setError(null);
        setSubmitted(true);
        setWasMovieSearchSuccess(false);
        setWasMovieSearchFallback(false);
        setWasFilterFallback(false);
        setMatchedMovieTitle('');
        setMovieSearchQuery('');

        try {
            let fetchedMovies: Movie[] = [];

            // 1. Try Live TMDB similarity query if "Something like..." is filled
            if (likeText.trim()) {
                const searchVal = likeText.trim();
                setMovieSearchQuery(searchVal);
                
                const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(searchVal)}`;
                const searchRes = await fetch(searchUrl, { cache: 'no-store' });
                
                if (searchRes.ok) {
                    const searchData = await searchRes.json();
                    if (searchData.results && searchData.results.length > 0) {
                        const firstMovie = searchData.results[0];
                        const movieId = firstMovie.id;
                        setMatchedMovieTitle(firstMovie.title);

                        const recsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
                        const recsRes = await fetch(recsUrl, { cache: 'no-store' });
                        if (recsRes.ok) {
                            const recsData = await recsRes.json();
                            const recFiltered = (recsData.results || [])
                                .filter((m: Movie) => m.poster_path)
                                .slice(0, 3);
                            
                            if (recFiltered.length > 0) {
                                fetchedMovies = recFiltered;
                                setWasMovieSearchSuccess(true);
                            }
                        }
                    }
                }

                if (fetchedMovies.length === 0) {
                    setWasMovieSearchFallback(true);
                }
            }

            // 2. Fetch mood-based movies if similarity search is empty or returned 0 recommendations
            if (fetchedMovies.length === 0) {
                let genreIds: number[] = [];

                if (selectedGenres.length > 0) {
                    genreIds = selectedGenres.map((g) => GENRE_MAP[g]);
                } else {
                    const config = MOOD_RECOMMENDATIONS[selectedMood][timeOfDay];
                    genreIds = config.genres;
                }

                // Family filter: skip horror (27)
                if (watchingWith === 'Family') {
                    genreIds = genreIds.filter((id) => id !== 27);
                }

                // Language mapping
                let langParam = '';
                if (language === 'Nepali') langParam = '&with_original_language=ne';
                else if (language === 'Hindi') langParam = '&with_original_language=hi';
                else if (language === 'English') langParam = '&with_original_language=en';

                // Watching with booster (Date -> Romance 10749)
                if (watchingWith === 'Date' && !genreIds.includes(10749) && selectedGenres.length === 0) {
                    genreIds = [...genreIds, 10749];
                }

                // Exclude horror if companion is Family
                const excludeParam = watchingWith === 'Family' ? '&without_genres=27' : '';

                // Energy level tweaks: add comedy/family for easy, action/thriller/drama for intense
                if (selectedGenres.length === 0) {
                    if (energyLevel === 'easy') {
                        // Light & easy: boost Comedy/Family
                        genreIds = Array.from(new Set([...genreIds, 35, 10751]));
                    } else {
                        // Intense & deep: boost Thriller/Drama
                        genreIds = Array.from(new Set([...genreIds, 53, 18]));
                    }
                }

                // Discover fetch (random page from 1-3 to vary selections on shuffle)
                const pageNum = Math.floor(Math.random() * 3) + 1;
                const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreIds.join(',')}${excludeParam}${langParam}&sort_by=popularity.desc&page=${pageNum}&region=IN`;
                
                const discoverRes = await fetch(discoverUrl, { cache: 'no-store' });
                
                if (discoverRes.ok) {
                    const discoverData = await discoverRes.json();
                    const results = (discoverData.results || []).filter((m: Movie) => m.poster_path);
                    if (results.length > 0) {
                        fetchedMovies = results.slice(0, 3);
                    }
                }

                // Fallback Chain 1: Drop custom genre filter if 0 results
                if (fetchedMovies.length === 0 && selectedGenres.length > 0) {
                    setWasFilterFallback(true);
                    const defaultGenres = MOOD_RECOMMENDATIONS[selectedMood][timeOfDay].genres.filter(
                        (id) => (watchingWith === 'Family' ? id !== 27 : true)
                    );
                    const discoverUrlFb1 = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${defaultGenres.join(',')}${excludeParam}${langParam}&sort_by=popularity.desc&page=1&region=IN`;
                    const resFb1 = await fetch(discoverUrlFb1, { cache: 'no-store' });
                    if (resFb1.ok) {
                        const dataFb1 = await resFb1.json();
                        const results = (dataFb1.results || []).filter((m: Movie) => m.poster_path);
                        if (results.length > 0) {
                            fetchedMovies = results.slice(0, 3);
                        }
                    }
                }

                // Fallback Chain 2: Drop language restriction if still 0 results
                if (fetchedMovies.length === 0 && langParam !== '') {
                    setWasFilterFallback(true);
                    const defaultGenres = MOOD_RECOMMENDATIONS[selectedMood][timeOfDay].genres.filter(
                        (id) => (watchingWith === 'Family' ? id !== 27 : true)
                    );
                    const discoverUrlFb2 = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${defaultGenres.join(',')}${excludeParam}&sort_by=popularity.desc&page=1&region=IN`;
                    const resFb2 = await fetch(discoverUrlFb2, { cache: 'no-store' });
                    if (resFb2.ok) {
                        const dataFb2 = await resFb2.json();
                        const results = (dataFb2.results || []).filter((m: Movie) => m.poster_path);
                        if (results.length > 0) {
                            fetchedMovies = results.slice(0, 3);
                        }
                    }
                }
            }

            setMovies(fetchedMovies);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedMood(null);
        setSelectedGenres([]);
        setLanguage('Any');
        setWatchingWith('Solo');
        setEnergyLevel('easy');
        setLikeText('');
        setMovies([]);
        setSubmitted(false);
        setWasMovieSearchSuccess(false);
        setWasMovieSearchFallback(false);
        setWasFilterFallback(false);
    };

    // Songs selection logic with fallback
    const getSongs = () => {
        if (!selectedMood) return { songs: [], isFallback: false };
        const baseSongs = SONG_RECOMMENDATIONS[selectedMood][timeOfDay] || [];

        const filtered = baseSongs.filter((song) => {
            if (language === 'Nepali') return song.origin === 'Nepali';
            if (language === 'Hindi') return song.origin === 'Bollywood';
            if (language === 'English') return song.origin === 'Western';
            return true;
        });

        if (filtered.length === 0 && language !== 'Any') {
            return { songs: baseSongs, isFallback: true };
        }
        return { songs: filtered, isFallback: false };
    };

    const songData = getSongs();
    const songs = songData.songs;
    const wasSongFallback = songData.isFallback;

    return (
        <section className="py-12 px-4 bg-[#0B0F19]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">
                    <span className="text-[#38BDF8]">05</span> {'// OTHER STUFFS'}
                </h2>
                <p className="text-[#A8B8C4] mb-12">
                    Fun things to discover and share
                </p>

                {/* Vibe Check Subsection */}
                <div className="mb-12">
                    {!isExpanded ? (
                        // Collapsed Card View
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="w-full p-8 border-2 border-dashed border-[#38BDF8]/40 rounded-xl hover:border-[#38BDF8] transition duration-300 group cursor-pointer"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2 text-[#38BDF8] group-hover:text-[#10B981] transition">
                                    🎬 Wanna watch a movie or listen to tunes?
                                </h3>
                                <p className="text-[#A8B8C4]">
                                    Don&apos;t know what to watch/hear? Let&apos;s curate recommendations perfect for you
                                </p>
                            </div>
                        </button>
                    ) : (
                        // Expanded Full View (Single Screen inputs upfront)
                        <div className="bg-[#0e1626]/80 border border-[#38BDF8]/20 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                            <div className="flex items-center justify-between mb-8 border-b border-[#38BDF8]/10 pb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#38BDF8]">🎬 Vibe Check — Mood-Based Recommender</h3>
                                    <p className="text-[#A8B8C4] mt-1 text-sm">
                                        Configure your filters below and click generate for a personalized suggestion
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsExpanded(false);
                                        handleReset();
                                    }}
                                    className="text-[#A8B8C4] hover:text-[#38BDF8] transition text-2xl leading-none p-2 rounded-lg hover:bg-[#1a2332]"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Upfront Configuration Form */}
                            <div className="space-y-8">
                                {/* 1. Mood selection (Mandatory) */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                        1. How&apos;s your mood? <span className="text-[#38BDF8]">*</span>
                                    </label>
                                    <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
                                </div>

                                {/* Form Grid for other fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Left side inputs */}
                                    <div className="space-y-6">
                                        {/* 2. Time of Day */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                                2. Time of Day (detected)
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {TIMES.map(({ value, label, icon }) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => setTimeOfDay(value)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all duration-200 ${
                                                            timeOfDay === value
                                                                ? 'bg-[#38BDF8] text-[#0B0F19] border-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                                                                : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#38BDF8]/40 hover:text-white'
                                                        }`}
                                                    >
                                                        <span>{icon}</span> {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 3. Language preference */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                                3. Language Preference
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {LANGUAGES.map(({ value, label, flag }) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => setLanguage(value)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all duration-200 ${
                                                            language === value
                                                                ? 'bg-[#10B981] text-white border-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                                                : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#10B981]/40 hover:text-white'
                                                        }`}
                                                    >
                                                        <span>{flag}</span> {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5. Watching With */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                                5. Watching Companion
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {COMPANIONS.map(({ value, label, icon }) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => setWatchingWith(value)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all duration-200 ${
                                                            watchingWith === value
                                                                ? 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]'
                                                                : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#38BDF8]/40 hover:text-white'
                                                        }`}
                                                    >
                                                        <span>{icon}</span> {label}
                                                    </button>
                                                ))}
                                            </div>
                                            {watchingWith === 'Family' && (
                                                <p className="text-[11px] text-yellow-500/80 mt-2">
                                                    ⚠️ Family selected: Horror movies will be automatically filtered out.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right side inputs */}
                                    <div className="space-y-6">
                                        {/* 4. Genre Lean */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                                4. Genre Leans <span className="text-xs text-[#A8B8C4]/60">(Optional multi-select)</span>
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {GENRES.map(({ value, label, icon }) => {
                                                    const isSelected = selectedGenres.includes(value);
                                                    return (
                                                        <button
                                                            key={value}
                                                            type="button"
                                                            onClick={() => handleGenreToggle(value)}
                                                            className={`px-2 py-2 rounded-lg text-[11px] font-semibold flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
                                                                isSelected
                                                                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]'
                                                                    : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#38BDF8]/40 hover:text-white'
                                                            }`}
                                                        >
                                                            <span className="text-lg">{icon}</span>
                                                            <span>{label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* 6. Energy Level */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-3 uppercase tracking-wider">
                                                6. Energy Level Preference
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEnergyLevel('easy')}
                                                    className={`px-3 py-3 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
                                                        energyLevel === 'easy'
                                                            ? 'bg-gradient-to-r from-[#10B981]/20 to-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]'
                                                            : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#38BDF8]/40 hover:text-white'
                                                    }`}
                                                >
                                                    <span className="text-lg">🍃</span>
                                                    <span>Light & Easy</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEnergyLevel('intense')}
                                                    className={`px-3 py-3 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
                                                        energyLevel === 'intense'
                                                            ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#38BDF8]/20 text-[#8B5CF6] border-[#8B5CF6]'
                                                            : 'bg-[#182235]/50 border-white/5 text-[#A8B8C4] hover:border-[#38BDF8]/40 hover:text-white'
                                                    }`}
                                                >
                                                    <span className="text-lg">🧠</span>
                                                    <span>Intense & Deep</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 7. Something like... */}
                                        <div className="p-5 bg-[#131b2e]/40 border border-[#38BDF8]/10 rounded-xl">
                                            <label className="block text-sm font-semibold text-[#A8B8C4] mb-1 uppercase tracking-wider">
                                                7. Recommend Something Like...
                                            </label>
                                            <p className="text-[11px] text-[#A8B8C4]/60 mb-2">
                                                Enter a movie you love for live API suggestions. (Overrides mood for movies)
                                            </p>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={likeText}
                                                    onChange={(e) => setLikeText(e.target.value)}
                                                    placeholder="e.g. Shutter Island, Interstellar..."
                                                    className="w-full bg-[#182235]/80 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#38BDF8] transition duration-200"
                                                />
                                                {previewLoading && (
                                                    <div className="absolute right-3 top-3 animate-pulse text-xs text-[#A8B8C4]">
                                                        🔍 ...
                                                    </div>
                                                )}
                                            </div>
                                            {previewMovieTitle && !previewLoading && (
                                                <div className={`text-[11px] mt-2 font-medium flex items-center gap-1.5 ${
                                                    previewMovieTitle.includes('not found') ? 'text-red-400' : 'text-[#38BDF8]'
                                                }`}>
                                                    <span>{previewMovieTitle.includes('not found') ? '❌' : '🍿'}</span>
                                                    <span>{previewMovieTitle}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Generate action button */}
                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={handleFetchRecommendations}
                                        disabled={loading || !selectedMood}
                                        className="w-full py-4 bg-gradient-to-r from-[#38BDF8] to-[#10B981] text-[#0B0F19] font-bold rounded-xl hover:from-[#38BDF8]/90 hover:to-[#10B981]/90 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_25px_rgba(56,189,248,0.2)] flex items-center justify-center gap-2 text-base uppercase tracking-wider"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#0B0F19]"></div>
                                                <span>Finding Your Vibe...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>✨ Get Recommendations</span>
                                            </>
                                        )}
                                    </button>
                                    {!selectedMood && (
                                        <p className="text-center text-xs text-red-400 mt-2">
                                            * Please choose a mood in Step 1 to unlock recommendations
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Recommendations Display */}
                            {submitted && selectedMood && (
                                <div className="mt-12 pt-8 border-t border-[#38BDF8]/20 scroll-mt-6" id="vibe-results">
                                    <RecommendationDisplay
                                        movies={movies}
                                        songs={songs}
                                        loading={loading}
                                        error={error}
                                        mood={selectedMood}
                                        timeOfDay={timeOfDay}
                                        hideSongs={mode === 'movies'}
                                        hideMovies={mode === 'music'}
                                        wasMovieSearchSuccess={wasMovieSearchSuccess}
                                        wasMovieSearchFallback={wasMovieSearchFallback}
                                        movieSearchQuery={movieSearchQuery}
                                        matchedMovieTitle={matchedMovieTitle}
                                        wasFilterFallback={wasFilterFallback}
                                        wasSongFallback={wasSongFallback}
                                    />

                                    <div className="flex gap-4 flex-wrap justify-center pt-8 border-t border-[#38BDF8]/20 mt-8">
                                        <button
                                            type="button"
                                            onClick={handleFetchRecommendations}
                                            disabled={loading}
                                            className="px-6 py-2 bg-[#38BDF8] text-[#0B0F19] font-semibold rounded-lg hover:bg-[#38BDF8]/80 disabled:opacity-50 transition"
                                        >
                                            🔄 Try Another / Shuffle
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="px-6 py-2 border border-[#38BDF8] text-[#38BDF8] font-semibold rounded-lg hover:bg-[#38BDF8]/10 transition"
                                        >
                                            🧹 Reset Fields
                                        </button>
                                        <ShareButton
                                            mood={selectedMood}
                                            timeOfDay={timeOfDay}
                                            movies={movies}
                                            songs={songs}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* End Vibe Check Subsection */}
            </div>
        </section>
    );
}

