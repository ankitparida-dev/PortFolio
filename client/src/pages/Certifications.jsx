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
                {/* Section Title */}
                <h2 className="section-title">
                    <span className="title-text">CERTIFICATIONS</span>
                </h2>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.05rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {`>_ Industry-recognized certifications in Full Stack Development`}
                    </p>
                </div>

                {/* Certificates Grid */}
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
                                padding: '1.8rem',
                                borderLeft: '4px solid var(--neon-green)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                position: 'relative',
                                overflow: 'hidden'
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
                            {/* Header - Icon and Title */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    fontSize: '1.8rem',
                                    background: 'var(--bg-primary)',
                                    width: '60px',
                                    height: '60px',
                                    minWidth: '60px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid var(--neon-green)',
                                    boxShadow: 'var(--neon-green-glow)'
                                }}>
                                    {cert.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        color: 'var(--neon-green)',
                                        marginBottom: '0.3rem',
                                        fontSize: '1.05rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {cert.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem',
                                        fontWeight: '500',
                                        marginBottom: '0.2rem'
                                    }}>
                                        {cert.issuer}
                                    </p>
                                    {cert.authorizedBy && (
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.75rem',
                                            fontStyle: 'italic'
                                        }}>
                                            Authorized by {cert.authorizedBy}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Category Badge */}
                            <div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                    color: 'var(--neon-green)',
                                    borderRadius: '20px',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    border: '1px solid var(--neon-green)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {cert.category}
                                </span>
                            </div>

                            {/* Skills */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.4rem'
                            }}>
                                {cert.skills.map((skill, i) => (
                                    <span key={i} className="tech-tag">{skill}</span>
                                ))}
                            </div>

                            {/* Footer - Date and Link */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 'auto',
                                paddingTop: '0.8rem',
                                borderTop: '1px solid var(--border)'
                            }}>
                                <span style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'monospace'
                                }}>
                                    📅 {cert.date}
                                </span>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'var(--neon-green)',
                                        fontSize: '0.8rem',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(3px)';
                                        e.currentTarget.style.textShadow = 'var(--neon-green-glow)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.textShadow = 'none';
                                    }}
                                >
                                    Verify <FaExternalLinkAlt size={10} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    <div className="card" style={{
                        textAlign: 'center',
                        padding: '1.5rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <FaAward size={32} color="var(--neon-green)" />
                        <div style={{
                            fontSize: '2rem',
                            color: 'var(--neon-green)',
                            fontWeight: 'bold',
                            marginTop: '0.5rem'
                        }}>
                            {certificationsData.length}
                        </div>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace'
                        }}>
                            Certifications
                        </div>
                    </div>

                    <div className="card" style={{
                        textAlign: 'center',
                        padding: '1.5rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <FaCheckCircle size={32} color="var(--neon-green)" />
                        <div style={{
                            fontSize: '2rem',
                            color: 'var(--neon-green)',
                            fontWeight: 'bold',
                            marginTop: '0.5rem'
                        }}>
                            100%
                        </div>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace'
                        }}>
                            Verified
                        </div>
                    </div>

                    <div className="card" style={{
                        textAlign: 'center',
                        padding: '1.5rem',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        <span style={{ fontSize: '2rem' }}>🏆</span>
                        <div style={{
                            fontSize: '2rem',
                            color: 'var(--neon-green)',
                            fontWeight: 'bold',
                            marginTop: '0.5rem'
                        }}>
                            5
                        </div>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace'
                        }}>
                            Domains
                        </div>
                    </div>
                </div>

                {/* LinkedIn CTA */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '3rem'
                }}>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}>
                        View all certifications on LinkedIn
                    </p>
                    <a
                        href="https://linkedin.com/in/ankitparida087"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none'
                        }}
                    >
                        View on LinkedIn <FaExternalLinkAlt size={12} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Certifications;