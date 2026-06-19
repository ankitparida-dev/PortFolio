import React from 'react';
import { socialLinks } from '../../data/socialData';

const SocialLinks = ({ className = '', iconSize = 28, showLabels = true }) => {
    return (
        <div className={`social-links ${className}`} style={{ 
            display: 'flex', 
            gap: '1.2rem', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem'
        }}>
            {socialLinks.map((social) => (
                <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '50px',
                        border: '2px solid var(--neon-green)',
                        color: 'var(--neon-green)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'transparent',
                        minWidth: '140px',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        fontFamily: 'monospace'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--neon-green)';
                        e.currentTarget.style.color = '#0a0a0a';
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.4)';
                        e.currentTarget.style.borderColor = 'var(--neon-green)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--neon-green)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = 'var(--neon-green)';
                    }}
                >
                    <social.icon size={iconSize} />
                    {showLabels && (
                        <span style={{ 
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px'
                        }}>
                            {social.name}
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;