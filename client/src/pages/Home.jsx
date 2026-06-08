import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaProjectDiagram, FaAward, FaUsers, FaClock } from 'react-icons/fa';
import StatsCard from '../components/ui/StatsCard';
import profileImg from '../assets/images/profile.jpg';

const Home = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

    const phrases = [
        'Full Stack Developer',
        'Java DSA Enthusiast',
        'Problem Solver',
        'Tech Explorer'
    ];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];
            
            setDisplayText(isDeleting 
                ? fullText.substring(0, displayText.length - 1)
                : fullText.substring(0, displayText.length + 1)
            );
            
            setTypingSpeed(isDeleting ? 50 : 100);
            
            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };
        
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, typingSpeed]);

    return (
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Profile Image */}
                    <div className="profile-wrapper">
                        <div className="profile-glow"></div>
                        <img 
                            src={profileImg} 
                            alt="Ankit Parida" 
                            className="profile-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/250x250?text=AK';
                            }}
                        />
                    </div>
                    
                    <h1 className="glitch" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        <span className="gradient-text">Ankit Parida</span>
                        <span className="logo-cursor">_</span>
                    </h1>
                    
                    <div className="typing-container">
                        <span className="typed-text">{displayText}</span>
                        <span className="typed-cursor"></span>
                    </div>
                    
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Passionate developer crafting secure, scalable applications. 
                        Currently mastering Java DSA and Full Stack Development.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        <a href="/contact" className="btn-primary">{'>_'} Get In Touch</a>
                        <a href="/projects" className="btn-secondary">{'>_'} View Work</a>
                    </div>
                    
                    {/* Animated Stats Cards */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <StatsCard icon={<FaCode />} label="Problems Solved" value="150" />
                        <StatsCard icon={<FaProjectDiagram />} label="Projects Completed" value="8" />
                        <StatsCard icon={<FaAward />} label="Certifications" value="5" />
                        <StatsCard icon={<FaClock />} label="Coding Hours" value="500" />
                    </div>
                    
                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="https://github.com/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
                        <a href="https://linkedin.com/in/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
                        <a href="mailto:ankit@example.com" className="social-icon"><FaEnvelope size={20} /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;