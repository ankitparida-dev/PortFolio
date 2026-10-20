import React from 'react';
import { FaExternalLinkAlt, FaAward, FaCheckCircle } from 'react-icons/fa';
import { certificationsData } from '../data/certificationsData';

const Certifications = () => {
    return (
        <section id="certifications" style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: 'var(--bg-secondary)'
        }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">CERTIFICATIONS</span>
                </h2>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                        {`>_ Industry-recognized certifications in Full Stack Development`}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto 3rem'
                }}>
                    {certificationsData.map((cert) => (
                        <div
                            key={cert.id}
                            className="card"
                            style={{
                                padding: '0', // Removed padding to allow image to touch edges
                                borderLeft: '4px solid var(--neon-green)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden' // Ensures image stays inside rounded corners
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* ✅ Certificate Image */}
                            <div style={{ 
                                height: '180px', 
                                width: '100%', 
                                backgroundColor: '#fff',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                <img 
                                    src={cert.image} 
                                    alt={cert.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                                />
                            </div>

                            {/* Certificate Details */}
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        background: 'var(--bg-primary)',
                                        width: '45px',
                                        height: '45px',
                                        minWidth: '45px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid var(--neon-green)',
                                        boxShadow: 'var(--neon-green-glow)'
                                    }}>
                                        {cert.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.2rem', fontSize: '1.05rem', lineHeight: '1.3' }}>
                                            {cert.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: '500' }}>
                                            {cert.issuer}
                                        </p>
                                        {cert.authorizedBy && (
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                                Authorized by {cert.authorizedBy}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                                    {cert.skills.map((skill, i) => (
                                        <span key={i} className="tech-tag">{skill}</span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                        📅 {cert.date}
                                    </span>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.85rem' }}>
                                        Verify <FaExternalLinkAlt size={10} />
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

export default Certifications;