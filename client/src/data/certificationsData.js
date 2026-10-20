// ✅ Import the images
import pythonImg from '../assets/images/pythonfoundation.png';
import cybersecurityImg from '../assets/images/cybersecurity.png';
import networkingImg from '../assets/images/networking.png';
import genaiImg from '../assets/images/generativeai.png';
import dataImg from '../assets/images/datafundamentals.png';

export const certificationsData = [
    {
        id: 1,
        title: 'Python Foundation',
        issuer: 'Infosys Springboard',
        icon: '🐍',
        image: pythonImg, // ✅ Added image
        category: 'Programming',
        date: 'Jul 2025',
        link: 'https://infyspringboard.onwingspan.com',
        skills: ['Python', 'OOP', 'Scripting'],
        featured: true
    },
    {
        id: 2,
        title: 'Networking Basics',
        issuer: 'Cisco',
        icon: '🌐',
        image: networkingImg, // ✅ Added image
        category: 'Networking',
        date: 'Nov 2025',
        link: 'https://www.credly.com/users/ankit-parida.868952c5/edit/badges/credly',
        skills: ['Protocols', 'IPv4', 'Wireless Access'],
        featured: true
    },
    {
        id: 3,
        title: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        icon: '🔒',
        image: cybersecurityImg, // ✅ Added image
        category: 'Security',
        date: 'Jan 2025',
        link: 'https://www.credly.com/users/ankit-parida.868952c5/edit/badges/credly',
        skills: ['Threat Detection', 'Privacy', 'Best Practices'],
        featured: true
    },
    {
        id: 4,
        title: 'Data Fundamentals',
        issuer: 'IBM',
        icon: '📊',
        image: dataImg, // ✅ Added image
        category: 'Data',
        date: 'Oct 2025',
        link: 'https://www.credly.com/badges/7b66e136-7a1e-4e68-852d-3d49e19a868f',
        credentialId: 'PWID-B0246400',
        skills: ['Data Analysis', 'Databases', 'Watson Studio'],
        featured: true
    },
    {
        id: 5,
        title: 'Generative AI: Prompt Engineering',
        issuer: 'Coursera',
        authorizedBy: 'IBM',
        icon: '🎯',
        image: genaiImg, // ✅ Added image
        category: 'AI/ML',
        date: 'Mar 2026',
        link: 'https://www.credly.com/badges/c5c3647a-2918-4a48-93f0-2953315266e7/linked_in_profile',
        credentialId: 'PWID-B0901100',
        skills: ['Prompt Engineering', 'LLMs', 'AI Tools'],
        featured: true
    }
];