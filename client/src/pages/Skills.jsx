import React, { useEffect, useRef } from 'react';
import { FaGithub, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
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

    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">SKILLS</span>
                </h2>
                
                {Object.entries(skillsData).map(([key, category], catIndex) => (
                    <div key={key} className="skills-category" ref={el => skillRefs.current[catIndex] = el} style={{ opacity: 0 }}>
                        <h3>{category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* ✅ GitHub & LeetCode Links */}
                <div style={{ 
                    marginTop: '3rem',
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '2rem'
                }}>
                    {/* GitHub Card */}
                    <div className="card" style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <FaGithub size={50} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>GitHub</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Explore my open-source projects, contributions, and code repositories.
                        </p>
                        <a 
                            href="https://github.com/ankitparida-dev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <FaGithub /> Visit GitHub <FaExternalLinkAlt size={12} />
                        </a>
                    </div>

                    {/* LeetCode Card */}
                    <div className="card" style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <FaCode size={50} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>LeetCode</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Check out my DSA problem-solving journey.
                        </p>
                        <a 
                            href="https://leetcode.com/u/Ankit087-acer/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <FaCode /> Visit LeetCode <FaExternalLinkAlt size={12} />
                        </a>
                    </div>
                </div>

                {/* ✅ LeetCode & GitHub Stats Badges */}
                <div style={{ 
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                }}>
                    <a 
                        href="https://leetcode.com/u/Ankit087-acer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '0.8rem 1.5rem',
                            background: 'var(--bg-card)',
                            borderRadius: '12px',
                            border: '1px solid var(--neon-green)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                            <FaCode size={20} color="var(--neon-green)" />
                            <span style={{ color: 'var(--text-primary)' }}>LeetCode</span>
                            <span style={{ 
                                background: 'var(--neon-green)', 
                                color: '#0a0a0a',
                                padding: '2px 10px',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}>
                                150+ Solved
                            </span>
                            <FaExternalLinkAlt size={12} color="var(--text-secondary)" />
                        </div>
                    </a>

                    <a 
                        href="https://github.com/ankitparida-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '0.8rem 1.5rem',
                            background: 'var(--bg-card)',
                            borderRadius: '12px',
                            border: '1px solid var(--neon-green)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                            <FaGithub size={20} color="var(--neon-green)" />
                            <span style={{ color: 'var(--text-primary)' }}>GitHub</span>
                            <span style={{ 
                                background: 'var(--neon-green)', 
                                color: '#0a0a0a',
                                padding: '2px 10px',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}>
                                8+ Repos
                            </span>
                            <FaExternalLinkAlt size={12} color="var(--text-secondary)" />
                        </div>
                    </a>
                </div>

                {/* View All Projects Link */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <a href="/projects" className="btn-primary" style={{ padding: '10px 28px' }}>
                        View All Projects →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Skills;