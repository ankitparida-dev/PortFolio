import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaBullseye, FaHeart, FaRocket } from 'react-icons/fa';
import ProgressRing from '../components/ui/ProgressRing';

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
        { icon: FaGraduationCap, title: 'Education', color: '#00ff88',
          content: (
            <>
                <p><strong>B.Tech in Computer Science Engineering</strong></p>
                <p>CGPA: 8.5/10 | Expected Graduation: 2025</p>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                    Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management
                </p>
            </>
          )},
        { icon: FaBullseye, title: 'Career Objective', color: '#00ff88',
          content: (
            <p>Passionate Computer Science student learning Java, Data Structures & Algorithms, and Full Stack Development. 
            Building scalable web applications and strengthening problem-solving skills for software engineering roles.</p>
          )},
        { icon: FaHeart, title: 'What Drives Me', color: '#00ff88',
          content: (
            <p>I love solving complex problems through code. Whether it's optimizing algorithms or building user-friendly applications, 
            I'm always eager to learn and grow. Technology is my passion, and I believe in using it to make a positive impact.</p>
          )}
    ];

    return (
        <section id="about">
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
                    
                    {/* Progress Rings */}
                    <div className="card" style={{ textAlign: 'center', opacity: 0 }} ref={el => cardsRef.current[3] = el}>
                        <FaRocket size={40} color="#00ff88" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1.5rem' }}>Current Progress</h3>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                            gap: '2rem',
                            justifyContent: 'center'
                        }}>
                            <ProgressRing value={85} label="Java DSA" />
                            <ProgressRing value={78} label="React" />
                            <ProgressRing value={70} label="Node.js" />
                            <ProgressRing value={65} label="System Design" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;