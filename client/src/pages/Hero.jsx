import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    
    const phrases = [
        'Full Stack Developer',
        'Java DSA Enthusiast', 
        'Problem Solver',
        'Tech Explorer'
    ];

    useEffect(() => {
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;

        const type = () => {
            const fullText = phrases[currentPhrase];
            if (isDeleting) {
                setText(fullText.substring(0, currentChar - 1));
                currentChar--;
            } else {
                setText(fullText.substring(0, currentChar + 1));
                currentChar++;
            }

            if (!isDeleting && currentChar === fullText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }

            if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        };

        type();
    }, []);

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1>
                        <span className="logo-text">Ankit Parida</span>
                        <span className="logo-cursor">_</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#00ff88', marginBottom: '1rem', minHeight: '60px' }}>
                        {`>_ ${text}`}
                        <span className="logo-cursor">|</span>
                    </p>
                    <p>Passionate developer crafting secure, scalable applications. Currently mastering Java DSA and Full Stack Development.</p>
                    <div className="hero-buttons">
                        <a href="#contact" className="btn-primary">{'>_'} Contact Me</a>
                        <a href="#projects" className="btn-secondary">{'>_'} View Work</a>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com/in/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="mailto:ankit@example.com" className="social-icon"><FaEnvelope /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;