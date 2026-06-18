import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    const [filter, setFilter] = useState('all');

    const categories = ['all', 'featured'];

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.featured);

    return (
        <section id="projects" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">PROJECTS</span>
                </h2>
                
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center', 
                    marginBottom: '2rem', 
                    flexWrap: 'wrap' 
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
                            style={{ padding: '8px 20px', cursor: 'pointer' }}
                        >
                            {cat === 'all' ? 'All Projects' : '⭐ Featured Projects'}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div key={project.id || index} className="project-card">
                            <div className="project-icon" style={{ position: 'relative' }}>
                                {project.icon}
                                {project.featured && (
                                    <FaStar style={{ 
                                        position: 'absolute', 
                                        top: 10, 
                                        right: 10, 
                                        color: '#ffd700' 
                                    }} />
                                )}
                            </div>
                            <div className="project-content">
                                <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>
                                    {project.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    {project.description}
                                </p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '1rem', 
                                    marginTop: '1rem',
                                    flexWrap: 'wrap'
                                }}>
                                    {project.github && project.github !== '#' && (
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="project-link"
                                            style={{ 
                                                color: 'var(--neon-green)', 
                                                textDecoration: 'none', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.5rem' 
                                            }}
                                        >
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {project.demo && project.demo !== '#' && (
                                        <a 
                                            href={project.demo} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="project-link"
                                            style={{ 
                                                color: 'var(--neon-green)', 
                                                textDecoration: 'none', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.5rem' 
                                            }}
                                        >
                                            <FaExternalLinkAlt /> Demo
                                        </a>
                                    )}
                                </div>
                                {project.year && (
                                    <div style={{ 
                                        fontSize: '0.7rem', 
                                        color: 'var(--text-secondary)', 
                                        marginTop: '0.5rem' 
                                    }}>
                                        📅 {project.year}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        No projects found.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;