import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaBullseye, FaHeart, FaRocket, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const About = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const sections = [
        { 
            icon: FaGraduationCap, 
            title: 'Education', 
            color: '#00ff88',
            content: (
                <>
                    <p><strong>Chitkara University</strong></p>
                    <p><strong>B.E. in Computer Science and Engineering</strong></p>
                    <p style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>
                        CGPA: 9.10 / 10.00
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        July 2024 — Present
                    </p>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        <strong>Relevant Coursework:</strong> Data Structures & Algorithms (OOP Focus), Database Management Systems (DBMS), Backend & API Engineering, Computer Networks, Operating Systems Foundations
                    </p>
                </>
            )
        },
        { 
            icon: FaBullseye, 
            title: 'Summary', 
            color: '#00ff88',
            content: (
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                    Computer Science and Engineering student with a <strong style={{ color: 'var(--neon-green)' }}>9.10 CGPA</strong> and hands-on expertise building full-stack applications using the MERN stack. Proven ability to write clean backend logic and engineer scalable software solutions to solve complex challenges.
                </p>
            )
        },
        { 
            icon: FaHeart, 
            title: 'What Drives Me', 
            color: '#00ff88',
            content: (
                <>
                    <p>I love solving complex problems through code. Whether it's optimizing algorithms or building user-friendly applications, I'm always eager to learn and grow.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                        <span className="skill-tag">Clear Communication</span>
                        <span className="skill-tag">Team Collaboration</span>
                        <span className="skill-tag">Fast Learner</span>
                        <span className="skill-tag">Analytical Problem Solving</span>
                    </div>
                </>
            )
        },
        { 
            icon: FaRocket, 
            title: 'Contact & Connect', 
            color: '#00ff88',
            content: (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <FaPhone color="var(--neon-green)" /> +91 8146990416
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <FaEnvelope color="var(--neon-green)" /> ankitparida386@gmail.com
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <FaMapMarkerAlt color="var(--neon-green)" /> Panchkula, India
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <FaLinkedin color="var(--neon-green)" /> <a href="https://linkedin.com/in/ankitparida087" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>ankitparida087</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <FaGithub color="var(--neon-green)" /> <a href="https://github.com/ankitparida-dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>ankitparida-dev</a>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="about" style={{ minHeight: '100vh', padding: '80px 0' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">ABOUT_ME</span>
                </h2>
                
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {sections.map((section, index) => (
                        <div 
                            key={index}
                            className="card"
                            ref={el => cardsRef.current[index] = el}
                            style={{ marginBottom: '1.5rem', textAlign: 'center', opacity: 0 }}
                        >
                            <section.icon size={40} color={section.color} style={{ marginBottom: '1rem' }} />
                            <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>{section.title}</h3>
                            {section.content}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;