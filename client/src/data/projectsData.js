import MovieMateThumbnail from '../assets/images/moviemate-thumbnail.jpg';

export const projectsData = [
    {
        id: 1,
        title: 'MovieMate',
        icon: '🎬',
        image: MovieMateThumbnail, // Make sure you have this image in your assets/images folder
        description: 'A full-featured movie discovery platform built with React. It integrates with the TMDB API to provide real-time movie data, trending content, and detailed information about films and TV shows.',
        longDescription: 'MovieMate is a comprehensive movie discovery and telemetry platform. It utilizes a dual-database architecture (MongoDB for user data, PostgreSQL for comments) and features real-time WebSocket integration for live discussions.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Socket.io', 'Chart.js'],
        github: 'https://github.com/ankitparida-dev/MovieMate',
        demo: 'https://movie-mate-seven-nu.vercel.app',
        render: 'https://moviemate-l4ts.onrender.com',
        featured: true,
        year: 2024,
        keyFeatures: [
            'Real-time comments and notifications using Socket.io',
            'Dual-database architecture for scalable data management',
            'Advanced analytics dashboard with Chart.js',
            'Secure JWT authentication for user sessions',
            'Responsive, modern UI with dynamic movie fetching'
        ]
    }
];