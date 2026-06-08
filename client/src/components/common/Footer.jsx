import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <a href="https://github.com/ankitparida" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={20} /></a>
                    <a href="https://linkedin.com/in/ankitparida" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={20} /></a>
                    <a href="https://twitter.com/ankitparida" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter size={20} /></a>
                    <a href="https://instagram.com/ankitparida" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram size={20} /></a>
                    <a href="mailto:ankit@example.com" className="social-icon"><FaEnvelope size={20} /></a>
                </div>
                <p>© 2024 Ankit Parida | Built with React & ❤️</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--neon-green)' }}>
                    {`<Developer />`}
                </p>
            </div>
        </footer>
    );
};

export default Footer;