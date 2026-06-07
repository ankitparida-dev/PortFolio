import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        const path = window.location.pathname;
        const currentPage = path === '/' ? 'home' : path.slice(1);
        setActivePage(currentPage);
    }, []);

    const handleClick = (path) => {
        window.location.href = path;
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="logo">
                    <span className="logo-text">{'>_'}</span>
                    <span className="logo-text"> ANKIT</span>
                    <span className="logo-cursor">_</span>
                </a>
                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <button
                            key={link.name}
                            onClick={() => handleClick(link.path)}
                            className={`nav-link ${activePage === link.name.toLowerCase() ? 'active' : ''}`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <button onClick={toggleTheme} className="theme-toggle" style={{ background: 'none', border: `1px solid var(--neon-green)`, padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
                <button className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;