import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const { darkMode, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Skills', path: '/skills' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Set active page based on URL
        const path = window.location.pathname;
        const currentPage = path === '/' ? 'home' : path.slice(1);
        setActivePage(currentPage);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (path, name) => {
        window.location.href = path;
        setActivePage(name.toLowerCase());
        setIsOpen(false);
    };

    // Close mobile menu on window resize (if screen becomes large)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            background: 'var(--navbar-bg)',
            backdropFilter: 'blur(12px)',
            border: '2px solid var(--navbar-border)',
            borderRadius: '60px',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}>
            <div className="navbar-container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem 2rem',
            }}>
                {/* Logo */}
                <a href="/" className="logo" style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                }}>
                    <span className="logo-text" style={{
                        background: 'var(--gradient)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}>{'>_'}</span>
                    <span className="logo-text" style={{
                        background: 'var(--gradient)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}> ANKIT</span>
                    <span className="logo-cursor" style={{
                        animation: 'blink 1s infinite',
                        color: 'var(--neon-green)',
                    }}>_</span>
                </a>

                {/* Desktop Menu */}
                <div className={`nav-menu ${isOpen ? 'active' : ''}`} style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                        position: 'fixed',
                        left: isOpen ? '0' : '-100%',
                        top: '70px',
                        flexDirection: 'column',
                        background: 'var(--navbar-bg)',
                        backdropFilter: 'blur(12px)',
                        width: '100%',
                        textAlign: 'center',
                        transition: '0.3s',
                        padding: '2rem 0',
                        gap: '1.5rem',
                        borderBottom: '2px solid var(--navbar-border)',
                        maxHeight: 'calc(100vh - 70px)',
                        overflowY: 'auto',
                    }
                }}>
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.path, link.name);
                            }}
                            className={`nav-link ${activePage === link.name.toLowerCase() ? 'active' : ''}`}
                            style={{
                                textDecoration: 'none',
                                color: 'var(--text-primary)',
                                fontFamily: 'monospace',
                                fontWeight: '500',
                                transition: 'all 0.3s',
                                position: 'relative',
                                padding: '0.5rem 0',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                '@media (max-width: 768px)': {
                                    fontSize: '1.2rem',
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--neon-green)';
                                e.currentTarget.style.textShadow = 'var(--neon-green-glow)';
                            }}
                            onMouseLeave={(e) => {
                                if (activePage !== link.name.toLowerCase()) {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.textShadow = 'none';
                                }
                            }}
                        >
                            {link.name}
                            {activePage === link.name.toLowerCase() && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: '0',
                                    width: '100%',
                                    height: '2px',
                                    background: 'var(--neon-green)',
                                    boxShadow: 'var(--neon-green-glow)',
                                    borderRadius: '2px',
                                }} />
                            )}
                        </a>
                    ))}
                    
                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="theme-toggle" style={{
                        background: 'transparent',
                        border: '1px solid var(--neon-green)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: 'var(--neon-green)',
                        padding: '0.5rem 1rem',
                        borderRadius: '40px',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--neon-green)';
                        e.currentTarget.style.color = 'var(--bg-primary)';
                        e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--neon-green)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}>
                        {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-menu" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: '1px solid var(--neon-green)',
                        fontSize: '1.3rem',
                        cursor: 'pointer',
                        color: 'var(--neon-green)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        '@media (max-width: 768px)': {
                            display: 'block',
                        }
                    }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: -1,
                    }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;