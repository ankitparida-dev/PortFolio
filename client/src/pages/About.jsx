import React, { useEffect, useRef } from 'react';
import { 
    FaGraduationCap, 
    FaBullseye, 
    FaUsers, 
    FaGamepad 
} from 'react-icons/fa';

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
            content: (
                <>
                    <p><strong>Chitkara University</strong> (Rajpura, India)</p>
                    <p><strong>B.E. in Computer Science and Engineering</strong></p>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        July 2024 — Present
                    </p>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        <strong>Relevant Coursework:</strong> Data Structures & Algorithms (OOP Focus), 
                        Database Management Systems (DBMS), Computer Networks, Operating Systems Foundations, 
                        Backend & API Engineering
                    </p>
                </>
            )
        },
        { 
            icon: FaBullseye, 
            title: 'Summary', 
            content: (
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                    Computer Science and Engineering student with strong fundamentals in Data Structures & Algorithms, 
                    Computer Networks, Operating Systems, and Database Management Systems. Hands-on experience 
                    engineering scalable full-stack web applications and cloud-connected backend services.
                </p>
            )
        },
        { 
            icon: FaUsers, 
            title: 'Soft Skills', 
            content: (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <span className="skill-tag">Active Listening</span>
                    <span className="skill-tag">Team Collaboration</span>
                    <span className="skill-tag">Growth Mindset</span>
                </div>
            )
        },
        { 
            icon: FaGamepad, 
            title: 'Interests & Languages', 
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                    <p><strong>Hobbies:</strong> Following international cricket tournaments, watching WWE.</p>
                    <p><strong>Languages:</strong> Hindi (Native Proficiency), English (Professional Working Proficiency).</p>
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
                            <section.icon 
                                size={40} 
                                className="about-icon"
                                style={{ marginBottom: '1rem' }} 
                            />
                            <h3 style={{ marginBottom: '1rem' }}>{section.title}</h3>
                            {section.content}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;