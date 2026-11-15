import React, { useEffect, useRef } from 'react';
import { FaGithub, FaCode, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { skillsData } from '../data/skillsData';

const Skills = () => {
    const skillRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    // ✅ Categorized strictly based on your Resume
    const skillsData = {
        languages: {
            title: '💻 Programming Languages',
            skills: ['JavaScript (ES6+)', 'Java (DSA Focus)', 'HTML5', 'CSS3']
        },
        backend: {
            title: '⚙️ Backend & Storage',
            skills: ['Node.js', 'Express.js', 'MongoDB + Mongoose', 'PostgreSQL + Prisma ORM', 'RESTful APIs', 'Postman']
        },
        frontend: {
            title: '🎨 Frontend Tools',
            skills: ['React.js', 'Axios', 'Chart.js / Recharts']
        },
        ecosystem: {
            title: '🛠️ Developer Ecosystem',
            skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Socket.io', 'Jest + Supertest']
        },
        softSkills: {
            title: '🤝 Soft Skills',
            skills: ['Active Listening', 'Team Collaboration', 'Growth Mindset']
        }
    };

    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">SKILLS</span>
                </h2>
                
                {/* Map through the categories */}
                {Object.entries(skillsData).map(([key, category], catIndex) => (
                    <div 
                        key={key} 
                        className="skills-category" 
                        ref={el => skillRefs.current[catIndex] = el} 
                        style={{ opacity: 0 }}
                    >
                        <h3>{category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Links Section */}
                <div style={{ 
                    marginTop: '4rem',
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '2rem'
                }}>
                    {/* GitHub Card */}
                    <div className="card" style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <FaGithub size={40} color="var(--neon-green)" />
                        <h3 style={{ color: 'var(--neon-green)', margin: 0 }}>GitHub</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Explore my open-source projects, commits, and code repositories.
                        </p>
                        <a 
                            href="https://github.com/ankitparida-dev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ padding: '8px 24px', marginTop: 'auto' }}
                        >
                            Visit GitHub
                        </a>
                    </div>

                    {/* LeetCode Card */}
                    <div className="card" style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <FaCode size={40} color="var(--neon-green)" />
                        <h3 style={{ color: 'var(--neon-green)', margin: 0 }}>LeetCode</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Check out my Data Structures & Algorithms problem-solving journey.
                        </p>
                        <a 
                            href="https://leetcode.com/u/Ankit087-acer/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ padding: '8px 24px', marginTop: 'auto' }}
                        >
                            Visit LeetCode
                        </a>
                    </div>
                </div>

                {/* View All Projects Link */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a href="/projects" className="btn-primary" style={{ padding: '12px 32px' }}>
                        View All Projects →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Skills;