import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    <a href="https://github.com/ankitparida" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}><FaGithub /></a>
                    <a href="https://linkedin.com/in/ankitparida" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}><FaLinkedin /></a>
                    <a href="https://twitter.com/ankitparida" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}><FaTwitter /></a>
                    <a href="mailto:ankit@example.com" style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}><FaEnvelope /></a>
                </div>
                <p>© 2024 Ankit Parida | Built with React & ❤️</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{`<Developer />`}</p>
            </div>
        </footer>
    );
};

export default Footer;