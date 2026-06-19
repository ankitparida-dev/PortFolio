import React, { useState, useEffect } from 'react';
import { FaCode, FaProjectDiagram, FaClock } from 'react-icons/fa';
import { fetchLeetCodeStats } from '../services/leetcodeService';
import SocialLinks from '../components/common/SocialLinks';
import profileImg from '../assets/images/profile.jpg';

const Home = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        problemsSolved: 0,
        projectsCompleted: 0,
        codingHours: 0
    });

    const phrases = [
        'Full Stack Developer',
        'Java DSA Enthusiast',
        'Problem Solver',
        'Tech Explorer'
    ];

    // Typing animation
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

    // Fetch LeetCode and GitHub stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                
                const leetcodeData = await fetchLeetCodeStats();
                
                const githubRes = await fetch('https://api.github.com/users/ankitparida-dev/repos?per_page=100');
                const githubData = await githubRes.json();
                
                const totalProjects = Array.isArray(githubData) ? githubData.length : 0;
                const problemsSolved = leetcodeData?.totalSolved || 0;
                
                // Calculate coding hours (approximately 2 minutes per submission)
                const totalSubmissions = leetcodeData?.totalSubmissions || 0;
                const codingHours = totalSubmissions > 0 ? Math.round((totalSubmissions * 2) / 60) : 0;
                
                setStats({
                    problemsSolved: problemsSolved,
                    projectsCompleted: totalProjects,
                    codingHours: codingHours || 30
                });
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    problemsSolved: 130,
                    projectsCompleted: 8,
                    codingHours: 30
                });
                setLoading(false);
            }
        };
        
        fetchStats();
    }, []);

    const statsData = [
        { number: stats.problemsSolved, label: 'Problems Solved', icon: <FaCode /> },
        { number: stats.projectsCompleted + '+', label: 'Projects', icon: <FaProjectDiagram /> },
        { number: stats.codingHours + '+', label: 'Coding Hours', icon: <FaClock /> }
    ];

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
                    
                    {/* Stats Cards */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        {statsData.map((stat, index) => (
                            <div key={index} className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--neon-green)', marginBottom: '0.5rem' }}>
                                    {stat.icon}
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--neon-green)' }}>
                                    {loading ? '...' : stat.number}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* ✅ Social Links - Larger and more visible */}
                    <div style={{ 
                        marginTop: '2.5rem',
                        padding: '2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        border: '1px solid var(--neon-green)',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <h3 style={{ 
                            textAlign: 'center', 
                            color: 'var(--neon-green)', 
                            marginBottom: '1.5rem',
                            fontFamily: 'monospace',
                            fontSize: '1.3rem'
                        }}>
                            {`>_ Connect With Me`}
                        </h3>
                        <SocialLinks showLabels={true} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;