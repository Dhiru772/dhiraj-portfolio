export type Mood = 'happy' | 'sad' | 'stressed' | 'romantic' | 'energetic' | 'chill' | 'focused' | 'motivated' | 'bored' | 'nostalgic';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'lateNight';

export interface Song {
    title: string;
    artist: string;
    reason: string;
    link: string;
    origin: 'Nepali' | 'Bollywood' | 'Western';
}

export interface MovieRecommendationConfig {
    genres: number[];
    keywords: string;
    reason: string;
}

// TMDB Genre IDs
export const TMDB_GENRES = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    thriller: 53,
    war: 10752,
    western: 37,
};

// Mood → TMDB search config for each time of day
export const MOOD_RECOMMENDATIONS: Record<Mood, Record<TimeOfDay, MovieRecommendationConfig>> = {
    happy: {
        morning: {
            genres: [35, 10751], // Comedy, Family
            keywords: 'feel-good uplifting lighthearted',
            reason: 'Start your day with pure vibes',
        },
        afternoon: {
            genres: [35, 10749], // Comedy, Romance
            keywords: 'fun entertaining positive',
            reason: 'Afternoon pick-me-up energy',
        },
        evening: {
            genres: [10749, 10402], // Romance, Music
            keywords: 'celebration party joy',
            reason: 'Wind down with good feelings',
        },
        lateNight: {
            genres: [35, 16], // Comedy, Animation
            keywords: 'heartwarming funny feel-good',
            reason: 'Late night laugh therapy',
        },
    },
    sad: {
        morning: {
            genres: [18], // Drama
            keywords: 'thoughtful introspective emotional',
            reason: 'Process your feelings in the light',
        },
        afternoon: {
            genres: [18, 14], // Drama, Fantasy
            keywords: 'bittersweet melancholic cathartic',
            reason: 'Afternoon deep dive',
        },
        evening: {
            genres: [18, 10749], // Drama, Romance
            keywords: 'heartbreak redemption hope',
            reason: 'Evening contemplation energy',
        },
        lateNight: {
            genres: [18, 80], // Drama, Crime
            keywords: 'dark moody introspective',
            reason: 'Late night soul-searching',
        },
    },
    stressed: {
        morning: {
            genres: [10751, 35], // Family, Comedy
            keywords: 'lighthearted calming uplifting',
            reason: 'De-stress before the day',
        },
        afternoon: {
            genres: [12, 28], // Adventure, Action
            keywords: 'escapism thrilling empowering',
            reason: 'Channel that energy productively',
        },
        evening: {
            genres: [14, 16], // Fantasy, Animation
            keywords: 'dreamy soothing magical',
            reason: 'Escape into another world',
        },
        lateNight: {
            genres: [18], // Drama
            keywords: 'relaxing meditative calming',
            reason: 'Slow down and let go',
        },
    },
    romantic: {
        morning: {
            genres: [10749], // Romance
            keywords: 'sweet love wholesome',
            reason: 'Morning love energy',
        },
        afternoon: {
            genres: [10749, 35], // Romance, Comedy
            keywords: 'romantic comedy charming',
            reason: 'Afternoon butterflies',
        },
        evening: {
            genres: [10749, 18], // Romance, Drama
            keywords: 'passionate intimate emotional',
            reason: 'Evening romance mode',
        },
        lateNight: {
            genres: [10749, 18], // Romance, Drama
            keywords: 'sensual slow intimate',
            reason: 'Late night mood',
        },
    },
    energetic: {
        morning: {
            genres: [28, 35], // Action, Comedy
            keywords: 'pumped adrenaline funny',
            reason: 'Attack the day with this',
        },
        afternoon: {
            genres: [28, 12], // Action, Adventure
            keywords: 'explosive thrilling dynamic',
            reason: 'Afternoon surge',
        },
        evening: {
            genres: [28, 878], // Action, Sci-Fi
            keywords: 'high-octane intense epic',
            reason: 'Channel that fire',
        },
        lateNight: {
            genres: [28, 53], // Action, Thriller
            keywords: 'intense fast-paced edge-of-seat',
            reason: 'Can\'t sleep? Watch this',
        },
    },
    chill: {
        morning: {
            genres: [16, 10751], // Animation, Family
            keywords: 'cozy relaxing aesthetic',
            reason: 'Slow morning vibes',
        },
        afternoon: {
            genres: [14, 10749], // Fantasy, Romance
            keywords: 'dreamy peaceful beautiful',
            reason: 'Afternoon zen mode',
        },
        evening: {
            genres: [18, 16], // Drama, Animation
            keywords: 'soothing meditative calm',
            reason: 'Unwind properly',
        },
        lateNight: {
            genres: [18], // Drama
            keywords: 'lo-fi study vibe ambient',
            reason: 'Background movie energy',
        },
    },
    focused: {
        morning: {
            genres: [18, 80], // Drama, Crime
            keywords: 'intelligent gripping thought-provoking',
            reason: 'Lock in your focus',
        },
        afternoon: {
            genres: [878, 12], // Sci-Fi, Adventure
            keywords: 'mind-bending complex cerebral',
            reason: 'Deep afternoon focus',
        },
        evening: {
            genres: [80, 53], // Crime, Thriller
            keywords: 'suspenseful captivating riveting',
            reason: 'Evening deep work',
        },
        lateNight: {
            genres: [18, 99], // Drama, Documentary
            keywords: 'educational enlightening fascinating',
            reason: 'Late night learning mode',
        },
    },
    motivated: {
        morning: {
            genres: [18, 12], // Drama, Adventure
            keywords: 'inspiring empowering triumph',
            reason: 'Morning motivation shot',
        },
        afternoon: {
            genres: [28, 18], // Action, Drama
            keywords: 'determined ambitious powerful',
            reason: 'Afternoon pump-up',
        },
        evening: {
            genres: [18], // Drama
            keywords: 'success perseverance courage',
            reason: 'Evening inspiration',
        },
        lateNight: {
            genres: [18, 12], // Drama, Adventure
            keywords: 'aspirational motivating heroic',
            reason: 'Late night dreams',
        },
    },
    bored: {
        morning: {
            genres: [35, 16], // Comedy, Animation
            keywords: 'absurd quirky unexpected',
            reason: 'Break the monotony',
        },
        afternoon: {
            genres: [12, 28], // Adventure, Action
            keywords: 'wild crazy unpredictable',
            reason: 'Afternoon excitement',
        },
        evening: {
            genres: [35, 10749], // Comedy, Romance
            keywords: 'witty hilarious entertaining',
            reason: 'Evening laugh fest',
        },
        lateNight: {
            genres: [27, 53], // Horror, Thriller
            keywords: 'thrilling twisted surprising',
            reason: 'Late night surprise me',
        },
    },
    nostalgic: {
        morning: {
            genres: [10751, 16], // Family, Animation
            keywords: 'heartwarming childhood memory',
            reason: 'Morning nostalgia',
        },
        afternoon: {
            genres: [18, 10749], // Drama, Romance
            keywords: 'retro classic timeless',
            reason: 'Afternoon throwback',
        },
        evening: {
            genres: [18], // Drama
            keywords: 'vintage golden age classic',
            reason: 'Evening trip down memory lane',
        },
        lateNight: {
            genres: [18, 10402], // Drama, Music
            keywords: '90s 80s retro aesthetic',
            reason: 'Late night memory mode',
        },
    },
};

// Hand-curated songs (since TMDB doesn't have music)
export const SONG_RECOMMENDATIONS: Record<Mood, Record<TimeOfDay, Song[]>> = {
    happy: {
        morning: [
            {
                title: 'Good as Hell',
                artist: 'Lizzo',
                reason: 'Pure confidence boost',
                link: 'https://open.spotify.com/search/Good%20as%20Hell%20Lizzo',
                origin: 'Western',
            },
            {
                title: 'Walking on Sunshine',
                artist: 'Katrina & The Waves',
                reason: 'Instant mood lift',
                link: 'https://open.spotify.com/search/Walking%20on%20Sunshine',
                origin: 'Western',
            },
            {
                title: 'Dheere Dheere',
                artist: 'Yo Yo Honey Singh',
                reason: 'Nepali party energy',
                link: 'https://open.spotify.com/search/Dheere%20Dheere%20Honey%20Singh',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Shut Up and Dance',
                artist: 'Walk the Moon',
                reason: 'Afternoon vibe shift',
                link: 'https://open.spotify.com/search/Shut%20Up%20and%20Dance',
                origin: 'Western',
            },
            {
                title: 'Happy',
                artist: 'Pharrell Williams',
                reason: 'Literally the song',
                link: 'https://open.spotify.com/search/Happy%20Pharrell',
                origin: 'Western',
            },
            {
                title: 'Junoon',
                artist: 'Malika Samuels',
                reason: 'Bollywood happy anthems',
                link: 'https://open.spotify.com/search/Malika%20Samuels',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Sunday Best',
                artist: 'Surfaces',
                reason: 'Smooth evening feels',
                link: 'https://open.spotify.com/search/Sunday%20Best%20Surfaces',
                origin: 'Western',
            },
            {
                title: 'Guri Guri',
                artist: 'Yama Buddha',
                reason: 'Nepali sunset vibes',
                link: 'https://open.spotify.com/search/Guri%20Guri%20Yama%20Buddha',
                origin: 'Nepali',
            },
            {
                title: 'Chaleya',
                artist: 'Ranbir Kapoor',
                reason: 'Modern Bollywood smooth',
                link: 'https://open.spotify.com/search/Chaleya%20Animal',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Light It Up',
                artist: 'Marshmello ft. Bastille',
                reason: 'Late night chill energy',
                link: 'https://open.spotify.com/search/Light%20It%20Up%20Marshmello',
                origin: 'Western',
            },
            {
                title: 'Kupido',
                artist: 'Yama Buddha',
                reason: 'Nepali night mode',
                link: 'https://open.spotify.com/search/Kupido%20Yama%20Buddha',
                origin: 'Nepali',
            },
            {
                title: 'Befikra',
                artist: 'Tiger Shroff',
                reason: 'Chill Bollywood late night',
                link: 'https://open.spotify.com/search/Befikra%20MS%20Dhoni',
                origin: 'Bollywood',
            },
        ],
    },
    sad: {
        morning: [
            {
                title: 'Skinny Love',
                artist: 'Bon Iver',
                reason: 'Morning introspection',
                link: 'https://open.spotify.com/search/Skinny%20Love%20Bon%20Iver',
                origin: 'Western',
            },
            {
                title: 'Someone Like You',
                artist: 'Adele',
                reason: 'Process it early',
                link: 'https://open.spotify.com/search/Someone%20Like%20You%20Adele',
                origin: 'Western',
            },
            {
                title: 'Suna Suna',
                artist: 'Yama Buddha',
                reason: 'Nepali melancholy',
                link: 'https://open.spotify.com/search/Suna%20Suna%20Yama%20Buddha',
                origin: 'Nepali',
            },
        ],
        afternoon: [
            {
                title: 'Hurt',
                artist: 'Johnny Cash',
                reason: 'Raw and real',
                link: 'https://open.spotify.com/search/Hurt%20Johnny%20Cash',
                origin: 'Western',
            },
            {
                title: 'The Night We Met',
                artist: 'Lord Huron',
                reason: 'Afternoon melancholy',
                link: 'https://open.spotify.com/search/The%20Night%20We%20Met',
                origin: 'Western',
            },
            {
                title: 'Raaz',
                artist: 'Arijit Singh',
                reason: 'Bollywood heartache',
                link: 'https://open.spotify.com/search/Raaz%20Arijit%20Singh',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Mad World',
                artist: 'Gary Jules',
                reason: 'Evening reflection',
                link: 'https://open.spotify.com/search/Mad%20World%20Gary%20Jules',
                origin: 'Western',
            },
            {
                title: 'Choti Si Badmaasi',
                artist: 'Jagjit Singh',
                reason: 'Classic Bollywood sadness',
                link: 'https://open.spotify.com/search/Choti%20Si%20Badmaasi',
                origin: 'Bollywood',
            },
            {
                title: 'Ekanaya',
                artist: 'Loshan',
                reason: 'Nepali soulful sadness',
                link: 'https://open.spotify.com/search/Ekanaya%20Loshan',
                origin: 'Nepali',
            },
        ],
        lateNight: [
            {
                title: 'Black',
                artist: 'Pearl Jam',
                reason: 'Late night rawness',
                link: 'https://open.spotify.com/search/Black%20Pearl%20Jam',
                origin: 'Western',
            },
            {
                title: 'Samjhana',
                artist: 'Shushant KC',
                reason: 'Nepali nostalgia sadness',
                link: 'https://open.spotify.com/search/Samjhana%20Shushant',
                origin: 'Nepali',
            },
            {
                title: 'Tum Agar Saath Ho',
                artist: 'Alka Yagnik',
                reason: 'Lonely Bollywood nights',
                link: 'https://open.spotify.com/search/Tum%20Agar%20Saath%20Ho',
                origin: 'Bollywood',
            },
        ],
    },
    stressed: {
        morning: [
            {
                title: 'Breathe',
                artist: 'The Prodigy',
                reason: 'Release the tension',
                link: 'https://open.spotify.com/search/Breathe%20Prodigy',
                origin: 'Western',
            },
            {
                title: 'Weightless',
                artist: 'Marconi Union',
                reason: 'Scientifically calming',
                link: 'https://open.spotify.com/search/Weightless%20Marconi%20Union',
                origin: 'Western',
            },
            {
                title: 'Rhythm of the Rain',
                artist: 'Mukti',
                reason: 'Nepali calm',
                link: 'https://open.spotify.com/search/Rhythm%20of%20the%20Rain%20Mukti',
                origin: 'Nepali',
            },
        ],
        afternoon: [
            {
                title: 'High and Dry',
                artist: 'Radiohead',
                reason: 'Afternoon release',
                link: 'https://open.spotify.com/search/High%20and%20Dry',
                origin: 'Western',
            },
            {
                title: 'Let It Go',
                artist: 'James Bay',
                reason: 'Drop the worry',
                link: 'https://open.spotify.com/search/Let%20It%20Go%20James%20Bay',
                origin: 'Western',
            },
            {
                title: 'Dil Dilwale',
                artist: 'Shah Rukh Khan',
                reason: 'Bollywood release',
                link: 'https://open.spotify.com/search/Dil%20Dilwale',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Nuvole Bianche',
                artist: 'Ludovico Einaudi',
                reason: 'Evening meditation',
                link: 'https://open.spotify.com/search/Nuvole%20Bianche',
                origin: 'Western',
            },
            {
                title: 'Sukha',
                artist: 'Ravi Shankar',
                reason: 'Classical Indian peace',
                link: 'https://open.spotify.com/search/Sukha%20Ravi%20Shankar',
                origin: 'Bollywood',
            },
            {
                title: 'Mero Manau',
                artist: 'Diwas Gurung',
                reason: 'Nepali evening peace',
                link: 'https://open.spotify.com/search/Mero%20Manau%20Diwas',
                origin: 'Nepali',
            },
        ],
        lateNight: [
            {
                title: 'Clair de Lune',
                artist: 'Claude Debussy',
                reason: 'Classical sleep aid',
                link: 'https://open.spotify.com/search/Clair%20de%20Lune',
                origin: 'Western',
            },
            {
                title: 'Aa Bhi Ja',
                artist: 'Mohammad Rafi',
                reason: 'Vintage Bollywood calm',
                link: 'https://open.spotify.com/search/Aa%20Bhi%20Ja',
                origin: 'Bollywood',
            },
            {
                title: 'Lamjhana',
                artist: 'Loshan',
                reason: 'Nepali late night',
                link: 'https://open.spotify.com/search/Lamjhana%20Loshan',
                origin: 'Nepali',
            },
        ],
    },
    romantic: {
        morning: [
            {
                title: 'Put Your Records On',
                artist: 'Corinne Bailey Rae',
                reason: 'Morning love sweetness',
                link: 'https://open.spotify.com/search/Put%20Your%20Records%20On',
                origin: 'Western',
            },
            {
                title: 'Lucky',
                artist: 'Jason Mraz ft. Colbie Caillat',
                reason: 'Feel-good romance',
                link: 'https://open.spotify.com/search/Lucky%20Jason%20Mraz',
                origin: 'Western',
            },
            {
                title: 'Meri Aashiyan',
                artist: 'Loshan',
                reason: 'Nepali romance sweet',
                link: 'https://open.spotify.com/search/Meri%20Aashiyan%20Loshan',
                origin: 'Nepali',
            },
        ],
        afternoon: [
            {
                title: 'Perfect',
                artist: 'Ed Sheeran',
                reason: 'Afternoon swoon',
                link: 'https://open.spotify.com/search/Perfect%20Ed%20Sheeran',
                origin: 'Western',
            },
            {
                title: 'Love on the Brain',
                artist: 'Rihanna',
                reason: 'Smooth afternoon',
                link: 'https://open.spotify.com/search/Love%20on%20the%20Brain',
                origin: 'Western',
            },
            {
                title: 'Tujhe Dekha',
                artist: 'Shah Rukh Khan',
                reason: 'Classic Bollywood romance',
                link: 'https://open.spotify.com/search/Tujhe%20Dekha',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'At Last',
                artist: 'Etta James',
                reason: 'Evening magic',
                link: 'https://open.spotify.com/search/At%20Last%20Etta%20James',
                origin: 'Western',
            },
            {
                title: 'Best Day of My Life',
                artist: 'American Authors',
                reason: 'Celebration evening',
                link: 'https://open.spotify.com/search/Best%20Day%20of%20My%20Life',
                origin: 'Western',
            },
            {
                title: 'Deepika',
                artist: 'Arijit Singh',
                reason: 'Bollywood evening passion',
                link: 'https://open.spotify.com/search/Deepika%20Arijit',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Skinny Love Acoustic',
                artist: 'Bon Iver',
                reason: 'Late night intimacy',
                link: 'https://open.spotify.com/search/Skinny%20Love%20Acoustic',
                origin: 'Western',
            },
            {
                title: 'Aaj Phir Tum',
                artist: 'AR Rahman',
                reason: 'Romantic Bollywood night',
                link: 'https://open.spotify.com/search/Aaj%20Phir%20Tum',
                origin: 'Bollywood',
            },
            {
                title: 'Rahat',
                artist: 'Mukti',
                reason: 'Nepali intimate evening',
                link: 'https://open.spotify.com/search/Rahat%20Mukti',
                origin: 'Nepali',
            },
        ],
    },
    energetic: {
        morning: [
            {
                title: 'Wake Me Up',
                artist: 'Avicii',
                reason: 'Morning power surge',
                link: 'https://open.spotify.com/search/Wake%20Me%20Up%20Avicii',
                origin: 'Western',
            },
            {
                title: 'Pumped Up Kicks',
                artist: 'Foster the People',
                reason: 'Early morning pump',
                link: 'https://open.spotify.com/search/Pumped%20Up%20Kicks',
                origin: 'Western',
            },
            {
                title: 'Item Number',
                artist: 'Honey Singh',
                reason: 'Nepali/Bollywood energy',
                link: 'https://open.spotify.com/search/Item%20Number%20Honey',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Can\'t Hold Us',
                artist: 'Macklemore & Ryan Lewis',
                reason: 'Afternoon surge',
                link: 'https://open.spotify.com/search/Cant%20Hold%20Us',
                origin: 'Western',
            },
            {
                title: 'Turn Down for What',
                artist: 'DJ Snake & Lil Jon',
                reason: 'High energy drop',
                link: 'https://open.spotify.com/search/Turn%20Down%20for%20What',
                origin: 'Western',
            },
            {
                title: 'Breezy',
                artist: 'Badshah',
                reason: 'Bollywood banger',
                link: 'https://open.spotify.com/search/Badshah%20Breezy',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Don\'t Stop Believin\'',
                artist: 'Journey',
                reason: 'Evening rally',
                link: 'https://open.spotify.com/search/Don%27t%20Stop%20Believin',
                origin: 'Western',
            },
            {
                title: 'Starboy',
                artist: 'The Weeknd ft. Daft Punk',
                reason: 'Evening momentum',
                link: 'https://open.spotify.com/search/Starboy%20Weeknd',
                origin: 'Western',
            },
            {
                title: 'Dil Ka Rishta',
                artist: 'Vishal & Shekhar',
                reason: 'Bollywood evening rush',
                link: 'https://open.spotify.com/search/Dil%20Ka%20Rishta',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                reason: 'Late night drive energy',
                link: 'https://open.spotify.com/search/Blinding%20Lights',
                origin: 'Western',
            },
            {
                title: 'Disco Mami',
                artist: 'Honey Singh',
                reason: 'Late night party',
                link: 'https://open.spotify.com/search/Disco%20Mami',
                origin: 'Bollywood',
            },
            {
                title: 'Yo Yo Ma',
                artist: 'Yama Buddha',
                reason: 'Nepali night banger',
                link: 'https://open.spotify.com/search/Yo%20Yo%20Ma%20Yama',
                origin: 'Nepali',
            },
        ],
    },
    chill: {
        morning: [
            {
                title: 'Riptide',
                artist: 'Vance Joy',
                reason: 'Chill morning start',
                link: 'https://open.spotify.com/search/Riptide%20Vance%20Joy',
                origin: 'Western',
            },
            {
                title: 'Banana Pancakes',
                artist: 'Jack Johnson',
                reason: 'Lazy morning vibe',
                link: 'https://open.spotify.com/search/Banana%20Pancakes',
                origin: 'Western',
            },
            {
                title: 'Birthe',
                artist: 'Phanendra',
                reason: 'Nepali chill morning',
                link: 'https://open.spotify.com/search/Birthe%20Phanendra',
                origin: 'Nepali',
            },
        ],
        afternoon: [
            {
                title: 'Do Not Disturb',
                artist: 'Drake',
                reason: 'Afternoon calmness',
                link: 'https://open.spotify.com/search/Do%20Not%20Disturb%20Drake',
                origin: 'Western',
            },
            {
                title: 'L-O-V-E',
                artist: 'Nat King Cole',
                reason: 'Smooth afternoon',
                link: 'https://open.spotify.com/search/L-O-V-E%20Nat%20King%20Cole',
                origin: 'Western',
            },
            {
                title: 'Raaz Raaz',
                artist: 'Loshan',
                reason: 'Bollywood chill',
                link: 'https://open.spotify.com/search/Raaz%20Raaz%20Loshan',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Golden Hour',
                artist: 'JVKE',
                reason: 'Evening soft glow',
                link: 'https://open.spotify.com/search/Golden%20Hour%20JVKE',
                origin: 'Western',
            },
            {
                title: 'Cigarette Daydreams',
                artist: 'Cage The Elephant',
                reason: 'Evening dreaming',
                link: 'https://open.spotify.com/search/Cigarette%20Daydreams',
                origin: 'Western',
            },
            {
                title: 'Ek Tha Raja',
                artist: 'Mukti',
                reason: 'Nepali evening chill',
                link: 'https://open.spotify.com/search/Ek%20Tha%20Raja%20Mukti',
                origin: 'Nepali',
            },
        ],
        lateNight: [
            {
                title: 'Night Shift',
                artist: 'Lucy Spraggan',
                reason: 'Late night drift',
                link: 'https://open.spotify.com/search/Night%20Shift%20Lucy',
                origin: 'Western',
            },
            {
                title: 'Chanda Mama',
                artist: 'Various Artists',
                reason: 'Vintage Bollywood calm',
                link: 'https://open.spotify.com/search/Chanda%20Mama',
                origin: 'Bollywood',
            },
            {
                title: 'Aamaa',
                artist: 'Loshan',
                reason: 'Nepali night peace',
                link: 'https://open.spotify.com/search/Aamaa%20Loshan',
                origin: 'Nepali',
            },
        ],
    },
    focused: {
        morning: [
            {
                title: 'Clair de Lune',
                artist: 'Claude Debussy',
                reason: 'Morning focus lock',
                link: 'https://open.spotify.com/search/Clair%20de%20Lune',
                origin: 'Western',
            },
            {
                title: 'Study Beats',
                artist: 'Lo-fi Hip Hop',
                reason: 'Lo-fi focus mode',
                link: 'https://open.spotify.com/search/Lo-fi%20Hip%20Hop',
                origin: 'Western',
            },
            {
                title: 'Padhai Ka Mausam',
                artist: 'Focus Playlist',
                reason: 'Bollywood study vibe',
                link: 'https://open.spotify.com/search/Study%20Bollywood',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Deep Focus',
                artist: 'Spotify Focus Playlist',
                reason: 'Afternoon deep work',
                link: 'https://open.spotify.com/search/Deep%20Focus',
                origin: 'Western',
            },
            {
                title: 'Chasing Pavements',
                artist: 'Adele',
                reason: 'Focused afternoon',
                link: 'https://open.spotify.com/search/Chasing%20Pavements',
                origin: 'Western',
            },
            {
                title: 'Lagaan Theme',
                artist: 'AR Rahman',
                reason: 'Bollywood epic focus',
                link: 'https://open.spotify.com/search/Lagaan%20Rahman',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Focus',
                artist: 'The Score',
                reason: 'Evening concentration',
                link: 'https://open.spotify.com/search/Focus%20The%20Score',
                origin: 'Western',
            },
            {
                title: 'Work It Out',
                artist: 'Brian McKnight',
                reason: 'Evening problem solving',
                link: 'https://open.spotify.com/search/Work%20It%20Out%20McKnight',
                origin: 'Western',
            },
            {
                title: 'Taare Zameen Par',
                artist: 'Shankar Ehsaan Loy',
                reason: 'Bollywood inspiration focus',
                link: 'https://open.spotify.com/search/Taare%20Zameen%20Par',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Night Study',
                artist: 'Ambient Music',
                reason: 'Late night focus zone',
                link: 'https://open.spotify.com/search/Night%20Study%20Ambient',
                origin: 'Western',
            },
            {
                title: 'Raat Ki Purani Kahani',
                artist: 'Instrumental',
                reason: 'Bollywood night focus',
                link: 'https://open.spotify.com/search/Raat%20Ki%20Purani',
                origin: 'Bollywood',
            },
            {
                title: 'Aatma',
                artist: 'Loshan',
                reason: 'Nepali deep night focus',
                link: 'https://open.spotify.com/search/Aatma%20Loshan',
                origin: 'Nepali',
            },
        ],
    },
    motivated: {
        morning: [
            {
                title: 'Eye of the Tiger',
                artist: 'Survivor',
                reason: 'Morning champion energy',
                link: 'https://open.spotify.com/search/Eye%20of%20the%20Tiger',
                origin: 'Western',
            },
            {
                title: 'We Will Rock You',
                artist: 'Queen',
                reason: 'Legendary morning pump',
                link: 'https://open.spotify.com/search/We%20Will%20Rock%20You',
                origin: 'Western',
            },
            {
                title: 'Mundian To Bach Ke',
                artist: 'Panjabi MC',
                reason: 'Indian motivational anthem',
                link: 'https://open.spotify.com/search/Mundian%20To%20Bach',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Lose Yourself',
                artist: 'Eminem',
                reason: 'Afternoon unstoppable',
                link: 'https://open.spotify.com/search/Lose%20Yourself',
                origin: 'Western',
            },
            {
                title: 'Stronger',
                artist: 'Kanye West',
                reason: 'Afternoon power move',
                link: 'https://open.spotify.com/search/Stronger%20Kanye',
                origin: 'Western',
            },
            {
                title: 'Chaleya',
                artist: 'Ranbir Kapoor',
                reason: 'Bollywood motivation',
                link: 'https://open.spotify.com/search/Chaleya%20Animal',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Don\'t Give Up',
                artist: 'Peter Gabriel ft. Kate Bush',
                reason: 'Evening perseverance',
                link: 'https://open.spotify.com/search/Don%27t%20Give%20Up',
                origin: 'Western',
            },
            {
                title: 'Believer',
                artist: 'Imagine Dragons',
                reason: 'Evening determination',
                link: 'https://open.spotify.com/search/Believer%20Imagine%20Dragons',
                origin: 'Western',
            },
            {
                title: 'Zor Ka Jhatka',
                artist: 'Sholay',
                reason: 'Classic Bollywood grit',
                link: 'https://open.spotify.com/search/Zor%20Ka%20Jhatka',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Champion',
                artist: 'Fall Out Boy',
                reason: 'Late night win mentality',
                link: 'https://open.spotify.com/search/Champion%20Fall%20Out%20Boy',
                origin: 'Western',
            },
            {
                title: 'Aaj Kal Tere Bina',
                artist: 'Instrumental Version',
                reason: 'Bollywood night inspiration',
                link: 'https://open.spotify.com/search/Aaj%20Kal%20Tere%20Bina',
                origin: 'Bollywood',
            },
            {
                title: 'Sagarmatha',
                artist: 'Yama Buddha',
                reason: 'Nepali summit climb energy',
                link: 'https://open.spotify.com/search/Sagarmatha%20Yama',
                origin: 'Nepali',
            },
        ],
    },
    bored: {
        morning: [
            {
                title: 'Crazy in Love',
                artist: 'Beyoncé ft. Jay-Z',
                reason: 'Break the boredom NOW',
                link: 'https://open.spotify.com/search/Crazy%20in%20Love',
                origin: 'Western',
            },
            {
                title: 'That\'s What I Want',
                artist: 'Lil Nas X',
                reason: 'Morning chaos energy',
                link: 'https://open.spotify.com/search/Thats%20What%20I%20Want',
                origin: 'Western',
            },
            {
                title: 'Besharam Rang',
                artist: 'Shah Rukh Khan',
                reason: 'Bollywood bold vibes',
                link: 'https://open.spotify.com/search/Besharam%20Rang',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Uptown Funk',
                artist: 'Mark Ronson ft. Bruno Mars',
                reason: 'Afternoon funk injection',
                link: 'https://open.spotify.com/search/Uptown%20Funk',
                origin: 'Western',
            },
            {
                title: 'Break Stuff',
                artist: 'Limp Bizkit',
                reason: 'Raw afternoon release',
                link: 'https://open.spotify.com/search/Break%20Stuff',
                origin: 'Western',
            },
            {
                title: 'Dilbar',
                artist: 'Satyameva Jayate',
                reason: 'Bollywood party banger',
                link: 'https://open.spotify.com/search/Dilbar%20Satyameva',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Stayin Alive',
                artist: 'Bee Gees',
                reason: 'Evening twist energy',
                link: 'https://open.spotify.com/search/Stayin%20Alive',
                origin: 'Western',
            },
            {
                title: 'Twist and Shout',
                artist: 'The Beatles',
                reason: 'Classic boredom buster',
                link: 'https://open.spotify.com/search/Twist%20and%20Shout',
                origin: 'Western',
            },
            {
                title: 'Gal Banke',
                artist: 'Housefull',
                reason: 'Bollywood comedy vibes',
                link: 'https://open.spotify.com/search/Gal%20Banke%20Housefull',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Toxicity',
                artist: 'System of a Down',
                reason: 'Late night chaos vibes',
                link: 'https://open.spotify.com/search/Toxicity',
                origin: 'Western',
            },
            {
                title: 'Bom Diggy',
                artist: 'Sonu Ke Titu',
                reason: 'Bollywood late night fun',
                link: 'https://open.spotify.com/search/Bom%20Diggy',
                origin: 'Bollywood',
            },
            {
                title: 'Mero Sansar',
                artist: 'Yama Buddha',
                reason: 'Nepali wild night',
                link: 'https://open.spotify.com/search/Mero%20Sansar%20Yama',
                origin: 'Nepali',
            },
        ],
    },
    nostalgic: {
        morning: [
            {
                title: 'Don\'t Stop Believin\'',
                artist: 'Journey',
                reason: 'Timeless morning nostalgia',
                link: 'https://open.spotify.com/search/Don%27t%20Stop%20Believin',
                origin: 'Western',
            },
            {
                title: 'Mr. Brightside',
                artist: 'The Killers',
                reason: 'Comeback classic',
                link: 'https://open.spotify.com/search/Mr%20Brightside',
                origin: 'Western',
            },
            {
                title: 'Aao Milo Chale',
                artist: 'Lata Mangeshkar',
                reason: 'Golden age Bollywood',
                link: 'https://open.spotify.com/search/Aao%20Milo%20Chale',
                origin: 'Bollywood',
            },
        ],
        afternoon: [
            {
                title: 'Mr. Jones',
                artist: 'Counting Crows',
                reason: 'Afternoon throwback',
                link: 'https://open.spotify.com/search/Mr%20Jones%20Counting',
                origin: 'Western',
            },
            {
                title: 'Under Pressure',
                artist: 'Queen ft. David Bowie',
                reason: 'Legendary afternoon',
                link: 'https://open.spotify.com/search/Under%20Pressure',
                origin: 'Western',
            },
            {
                title: 'Kal Ho Naa Ho',
                artist: 'Shah Rukh Khan',
                reason: 'Classic Bollywood memory',
                link: 'https://open.spotify.com/search/Kal%20Ho%20Naa%20Ho',
                origin: 'Bollywood',
            },
        ],
        evening: [
            {
                title: 'Black',
                artist: 'Pearl Jam',
                reason: 'Evening reflection classic',
                link: 'https://open.spotify.com/search/Black%20Pearl%20Jam',
                origin: 'Western',
            },
            {
                title: 'Wonderwall',
                artist: 'Oasis',
                reason: 'Evening nostalgia ride',
                link: 'https://open.spotify.com/search/Wonderwall',
                origin: 'Western',
            },
            {
                title: 'Dil Ka Paisa',
                artist: 'Sholay Classics',
                reason: 'Vintage Bollywood evening',
                link: 'https://open.spotify.com/search/Dil%20Ka%20Paisa',
                origin: 'Bollywood',
            },
        ],
        lateNight: [
            {
                title: 'Fast Car',
                artist: 'Tracy Chapman',
                reason: 'Late night memories',
                link: 'https://open.spotify.com/search/Fast%20Car%20Tracy',
                origin: 'Western',
            },
            {
                title: 'Pehli Nazar Mein',
                artist: 'Atif Aslam',
                reason: 'Bollywood memory lane',
                link: 'https://open.spotify.com/search/Pehli%20Nazar%20Mein',
                origin: 'Bollywood',
            },
            {
                title: 'Sidhanta',
                artist: 'Loshan',
                reason: 'Nepali golden memories',
                link: 'https://open.spotify.com/search/Sidhanta%20Loshan',
                origin: 'Nepali',
            },
        ],
    },
};
