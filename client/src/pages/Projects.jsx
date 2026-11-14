import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaServer, FaCheckCircle, FaStar } from 'react-icons/fa';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    return (
        <section id="projects" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">PROJECTS</span>
                </h2>

                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    {projectsData.map((project) => (
                        <div 
                            key={project.id} 
                            className="card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 0,
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                marginBottom: '3rem',
                                backgroundColor: 'var(--bg-card)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--neon-green)';
                                e.currentTarget.style.boxShadow = 'var(--shadow)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Top Section: Image */}
                            <div style={{ 
                                height: '350px', 
                                width: '100%', 
                                backgroundColor: 'var(--bg-secondary)',
                                position: 'relative',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                                    />
                                ) : (
                                    <div style={{ 
                                        width: '100%', height: '100%', display: 'flex', 
                                        alignItems: 'center', justifyContent: 'center', fontSize: '6rem' 
                                    }}>
                                        {project.icon}
                                    </div>
                                )}
                                {project.featured && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        backgroundColor: 'var(--bg-primary)',
                                        color: 'var(--neon-green)',
                                        padding: '8px 16px',
                                        borderRadius: '30px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        border: '1px solid var(--neon-green)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: 'var(--neon-green-glow)'
                                    }}>
                                        <FaStar /> FEATURED PROJECT
                                    </div>
                                )}
                            </div>

                            {/* Bottom Section: Details */}
                            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '2rem', color: 'var(--neon-green)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                                            {project.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                            📅 {project.year}
                                        </p>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                            <FaExternalLinkAlt size={12} /> Live Demo
                                        </a>
                                        {project.render && (
                                            <a href={project.render} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                                <FaServer size={12} /> Backend API
                                            </a>
                                        )}
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                            <FaGithub size={14} /> Source Code
                                        </a>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
                                    
                                    {/* Key Features */}
                                    <div>
                                        <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '1rem' }}>KEY FEATURES</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {project.keyFeatures.map((feature, idx) => (
                                                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    <FaCheckCircle style={{ color: 'var(--neon-green)', marginTop: '4px', minWidth: '14px' }} size={14} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '1rem' }}>TECH STACK</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="tech-tag" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

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