import React from 'react';
import { FaGraduationCap, FaBullseye, FaHeart, FaRocket } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">ABOUT_ME</span>
                </h2>
                
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Education Card */}
                    <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <FaGraduationCap size={40} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>Education</h3>
                        <p><strong>B.Tech in Computer Science Engineering</strong></p>
                        <p>CGPA: 8.5/10 | Expected Graduation: 2025</p>
                        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management, Operating Systems
                        </p>
                    </div>
                    
                    {/* Objective Card */}
                    <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <FaBullseye size={40} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>Career Objective</h3>
                        <p>Passionate Computer Science student learning Java, Data Structures & Algorithms, and Full Stack Development. 
                        Building scalable web applications and strengthening problem-solving skills for software engineering roles.</p>
                    </div>
                    
                    {/* What Drives Me */}
                    <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <FaHeart size={40} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>What Drives Me</h3>
                        <p>I love solving complex problems through code. Whether it's optimizing algorithms or building user-friendly applications, 
                        I'm always eager to learn and grow. Technology is my passion, and I believe in using it to make a positive impact.</p>
                    </div>
                    
                    {/* Current Focus */}
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaRocket size={40} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>Current Focus</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            <span className="skill-tag">Java DSA</span>
                            <span className="skill-tag">React Mastery</span>
                            <span className="skill-tag">Node.js</span>
                            <span className="skill-tag">MongoDB</span>
                            <span className="skill-tag">System Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;