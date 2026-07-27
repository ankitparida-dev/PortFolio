import MovieMateThumbnail from '../assets/images/moviemate-thumbnail.jpg';
import StopWatchThumbnail from '../assets/images/stopwatch.png';

export const projectsData = [
    {
        id: 1,
        title: 'MovieMate',
        icon: '🎬',
        image: MovieMateThumbnail,
        description: 'A movie discovery application that allows users to browse and search movies using external APIs. Features include movie search, detailed information, and ratings.',
        fullDescription: 'MovieMate is a full-featured movie discovery platform built with React. It integrates with the TMDB API to provide real-time movie data, trending content, and detailed information about films and TV shows.',
        technologies: ['React', 'JavaScript', 'CSS', 'TMDB API'],
        github: 'https://github.com/ankitparida-dev/MovieMate',
        demo: 'https://movie-mate-seven-nu.vercel.app',
        render: 'https://moviemate-l4ts.onrender.com',
        featured: true,
        year: 2024
    },
    {
        id: 2,
        title: 'Stopwatch',
        icon: '⏱️',
        image: StopWatchThumbnail,
        description: 'A fully functional terminal-style stopwatch application with start, pause, lap tracking, and reset features. Built with a clean, modern interface.',
        fullDescription: 'Stopwatch is a precise timing application with lap tracking, keyboard shortcuts (Space, L, R), and a terminal-style interface. Perfect for sports, workouts, and time management.',
        technologies: ['JavaScript', 'HTML', 'CSS', 'React'],
        github: 'https://github.com/ankitparida-dev/Stopwatch',
        demo: 'https://stopwatch-rho-orcin.vercel.app',
        featured: false,
        year: 2024
    },
    {
        id: 3,
        title: 'Todo_App',
        icon: '✅',
        description: 'A simple and efficient todo list application with add, delete, and mark-complete features.',
        fullDescription: 'Todo_App is a clean and intuitive task management application for organizing daily activities and priorities.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/ankitparida-dev/Todo_App',
        demo: '#',
        featured: false,
        year: 2024
    }
];