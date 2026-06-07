import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaProjectDiagram, FaAward } from 'react-icons/fa';
import profileImg from '../assets/images/image.png';

const Home = () => {
    const stats = [
        { number: '100+', label: 'Problems Solved', icon: <FaCode /> },
        { number: '5+', label: 'Projects', icon: <FaProjectDiagram /> },
        { number: '3', label: 'Certifications', icon: <FaAward /> }
    ];

    return (
        <section id="home" className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    {/* Profile Image */}
                    <div className="profile-container">
                        <img 
                            src={profileImg} 
                            alt="Ankit Parida" 
                            className="profile-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/250x250?text=Ankit';
                            }}
                        />
                    </div>
                    
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        <span className="gradient-text">Ankit Parida</span>
                        <span className="logo-cursor">_</span>
                    </h1>
                    
                    <p style={{ fontSize: '1.2rem', color: 'var(--neon-green)', marginBottom: '1rem' }}>
                        {`>_ Full Stack Developer | Java DSA Enthusiast`}
                    </p>
                    
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        Passionate developer crafting secure, scalable applications. 
                        Currently mastering Java DSA and Full Stack Development.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <a href="/contact" className="btn-primary">{'>_'} Get In Touch</a>
                        <a href="/projects" className="btn-secondary">{'>_'} View Work</a>
                    </div>
                    
                    {/* Stats */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--neon-green)', borderRadius: '8px', minWidth: '120px' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--neon-green)' }}>{stat.number}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stat.icon} {stat.label}</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="https://github.com/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com/in/ankitparida" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="mailto:ankit@example.com" className="social-icon"><FaEnvelope /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;