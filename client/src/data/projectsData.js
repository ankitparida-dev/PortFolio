import MovieMateThumbnail from '../assets/images/moviemate-thumbnail.jpg'; // ✅ Import the image

export const projectsData = [
    {
        id: 1,
        title: 'MovieMate',
        icon: '🎬',
        image: MovieMateThumbnail, // ✅ Use imported image
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
        title: 'StudyBuddyMern',
        icon: '📚',
        description: 'A student-focused platform designed to help organize study resources, notes, and learning materials. Built with MERN stack for efficient resource management.',
        fullDescription: 'StudyBuddyMern is a comprehensive study management platform that helps students organize their resources, take notes, and track their learning progress.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/ankitparida-dev/StudyBuddyMern',
        demo: 'https://study-buddy-mern.vercel.app',
        featured: true,
        year: 2024
    },
    {
        id: 3,
        title: 'Cricket_Archieve',
        icon: '🏏',
        description: 'A cricket archive application to track matches, players, and statistics. Built with JavaScript and modern web technologies.',
        fullDescription: 'Cricket_Archieve is a web application that provides comprehensive cricket statistics, match records, and player profiles.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/ankitparida-dev/Cricket_Archieve',
        demo: '#',
        featured: false,
        year: 2024
    },
    {
        id: 4,
        title: 'Quiz_App',
        icon: '❓',
        description: 'An interactive quiz application with multiple-choice questions, scoring, and progress tracking.',
        fullDescription: 'Quiz_App is an engaging quiz platform that tests knowledge across various topics with real-time scoring and feedback.',
        technologies: ['CSS', 'JavaScript', 'HTML'],
        github: 'https://github.com/ankitparida-dev/Quiz_App',
        demo: '#',
        featured: false,
        year: 2024
    },
    {
        id: 5,
        title: 'Todo_App',
        icon: '✅',
        description: 'A simple and efficient todo list application with add, delete, and mark-complete features.',
        fullDescription: 'Todo_App is a clean and intuitive task management application for organizing daily activities and priorities.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/ankitparida-dev/Todo_App',
        demo: '#',
        featured: false,
        year: 2024
    },
    {
        id: 6,
        title: 'Stopwatch',
        icon: '⏱️',
        description: 'A fully functional stopwatch application with start, stop, reset, and lap timing features.',
        fullDescription: 'Stopwatch is a precise timing application with lap tracking, perfect for sports, workouts, and time management.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/ankitparida-dev/Stopwatch',
        demo: '#',
        featured: false,
        year: 2024
    }
];