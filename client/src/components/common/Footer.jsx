import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: '🏠 Home', path: '/' },
        { name: '👤 About', path: '/about' },
        { name: '💻 Skills', path: '/skills' },
        { name: '📁 Projects', path: '/projects' },
        { name: '🏆 Certifications', path: '/certifications' },
        { name: '📧 Contact', path: '/contact' },
    ];

    return (
        <footer className="footer" style={{
            background: 'var(--bg-secondary)',
            borderTop: '2px solid var(--neon-green)',
            padding: '3rem 0 2rem',
            marginTop: '2rem'
        }}>
            <div className="container">
                {/* ✅ Navigation Links Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1.2rem',
                    maxWidth: '800px',
                    margin: '0 auto 2rem',
                    padding: '0 1rem'
                }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.6rem',
                                padding: '0.8rem 1.2rem',
                                borderRadius: '12px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                fontFamily: 'monospace',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--neon-green)';
                                e.currentTarget.style.color = 'var(--neon-green)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                                e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)';
                                
                                // Add shine effect
                                const shine = e.currentTarget.querySelector('.shine');
                                if (shine) {
                                    shine.style.left = '100%';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.background = 'var(--bg-card)';
                                
                                const shine = e.currentTarget.querySelector('.shine');
                                if (shine) {
                                    shine.style.left = '-100%';
                                }
                            }}
                        >
                            {/* Shine effect */}
                            <span className="shine" style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)',
                                transition: 'left 0.6s ease',
                                pointerEvents: 'none'
                            }}></span>
                            <span style={{ fontSize: '1.2rem' }}>{link.name.split(' ')[0]}</span>
                            <span>{link.name.split(' ').slice(1).join(' ')}</span>
                        </a>
                    ))}
                </div>

                {/* ✅ Decorative Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <span style={{
                        flex: 1,
                        maxWidth: '100px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--neon-green))'
                    }}></span>
                    <span style={{
                        color: 'var(--neon-green)',
                        fontSize: '1.2rem',
                        fontFamily: 'monospace',
                        letterSpacing: '2px'
                    }}>
                        {`< />`}
                    </span>
                    <span style={{
                        flex: 1,
                        maxWidth: '100px',
                        height: '1px',
                        background: 'linear-gradient(90deg, var(--neon-green), transparent)'
                    }}></span>
                </div>

                {/* ✅ Copyright */}
                <div style={{
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        marginBottom: '0.3rem'
                    }}>
                        © {currentYear} Ankit Parida
                    </p>
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        opacity: '0.6',
                        fontFamily: 'monospace'
                    }}>
                        {`{ Built with MERN & ❤️ }`}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;