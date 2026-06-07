import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.featured);

    const categories = ['all', 'featured'];

    return (
        <section id="projects">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">PROJECTS_DATABASE</span>
                </h2>
                
                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
                            style={{ padding: '8px 20px' }}
                        >
                            {cat === 'all' ? 'All Projects' : 'Featured Projects'}
                        </button>
                    ))}
                </div>
                
                {/* Projects Grid */}
                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-icon" style={{ position: 'relative' }}>
                                {project.icon}
                                {project.featured && <FaStar style={{ position: 'absolute', top: 10, right: 10, color: '#ffd700' }} />}
                            </div>
                            <div className="project-content">
                                <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaGithub /> Code
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaExternalLinkAlt /> Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;