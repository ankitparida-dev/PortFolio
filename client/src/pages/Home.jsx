import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import SocialLinks from '../components/common/SocialLinks';
import profileImg from '../assets/images/image2.png';

const Home = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Updated phrases
    const phrases = [
        'Full Stack Developer',
        'MERN Stack Developer',
        'Java DSA Enthusiast',
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

    // Fetch GitHub repos
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const githubRes = await fetch('https://api.github.com/users/ankitparida-dev/repos?sort=updated&per_page=100');
                const githubData = await githubRes.json();
                
                const filteredRepos = Array.isArray(githubData) 
                    ? githubData.filter(repo => 
                        !repo.fork && 
                        repo.name !== 'Todo_App' && 
                        repo.name !== 'Quiz_App' &&
                        !repo.name.toLowerCase().includes('ankitparida')
                      )
                    : [];
                
                setRepos(filteredRepos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setRepos([]);
                setLoading(false);
            }
        };
        
        fetchRepos();
    }, []);

    const featuredProjects = repos.slice(0, 6);

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
                        <a href="/projects" className="btn-secondary">{'>_'} View All Projects</a>
                        <a href="https://github.com/ankitparida-dev" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            <FaGithub style={{ marginRight: '6px' }} /> GitHub
                        </a>
                    </div>

                    {/* GitHub Activity / Featured Projects */}
                    <div style={{ 
                        marginTop: '2rem',
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
                            <FaGithub style={{ marginRight: '10px' }} />
                            Recent Projects
                        </h3>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div className="spinner"></div>
                                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading projects...</p>
                            </div>
                        ) : featuredProjects.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                <p>No projects found</p>
                            </div>
                        ) : (
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                                gap: '1.5rem' 
                            }}>
                                {featuredProjects.map((repo) => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'block',
                                            padding: '1.2rem',
                                            background: 'var(--bg-primary)',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border)',
                                            textDecoration: 'none',
                                            color: 'var(--text-primary)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--neon-green)';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = 'var(--neon-green-glow)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h4 style={{ 
                                                color: 'var(--neon-green)', 
                                                marginBottom: '0.5rem',
                                                fontSize: '1rem'
                                            }}>
                                                {repo.name}
                                            </h4>
                                            <FaExternalLinkAlt size={14} color="var(--text-secondary)" />
                                        </div>
                                        <p style={{ 
                                            color: 'var(--text-secondary)', 
                                            fontSize: '0.85rem',
                                            marginBottom: '0.8rem',
                                            minHeight: '40px'
                                        }}>
                                            {repo.description || 'No description available'}
                                        </p>
                                        <div style={{ 
                                            display: 'flex', 
                                            gap: '1rem',
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            {repo.language && (
                                                <span>
                                                    <span style={{ 
                                                        display: 'inline-block', 
                                                        width: '8px', 
                                                        height: '8px', 
                                                        borderRadius: '50%', 
                                                        background: '#00ff88',
                                                        marginRight: '4px'
                                                    }}></span>
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span><FaStar style={{ color: '#facc15', marginRight: '4px' }} /> {repo.stargazers_count}</span>
                                            <span>🔀 {repo.forks_count}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                        
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <a href="/projects" className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                                View All Projects →
                            </a>
                        </div>
                    </div>
                    
                    {/* Social Links */}
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