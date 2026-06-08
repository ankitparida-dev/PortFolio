import React, { useEffect, useRef } from 'react';
import { skillsData } from '../data/skillsData';
import SkillsChart from '../components/ui/SkillsChart';

const Skills = () => {
    const skillRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const progressData = [
        { name: 'Java DSA', progress: 85 },
        { name: 'React', progress: 78 },
        { name: 'Node.js', progress: 70 },
        { name: 'MongoDB', progress: 60 }
    ];

    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">SKILLS_MATRIX</span>
                </h2>
                
                {Object.entries(skillsData).map(([key, category], catIndex) => (
                    <div key={key} className="skills-category" ref={el => skillRefs.current[catIndex] = el} style={{ opacity: 0 }}>
                        <h3>{category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                {/* Learning Progress Bars */}
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
                        📈 Learning Progress
                    </h3>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {progressData.map((item, index) => (
                            <div key={index} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>{item.name}</span>
                                    <span style={{ color: 'var(--neon-green)' }}>{item.progress}%</span>
                                </div>
                                <div style={{ background: 'var(--bg-card)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                    <div 
                                        style={{ 
                                            width: '0%', 
                                            height: '100%', 
                                            background: 'var(--gradient)', 
                                            borderRadius: '5px',
                                            transition: 'width 1s ease'
                                        }}
                                        ref={el => {
                                            if (el && el.getBoundingClientRect().top < window.innerHeight) {
                                                setTimeout(() => el.style.width = `${item.progress}%`, 100);
                                            }
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Charts */}
                <SkillsChart />
            </div>
        </section>
    );
};

export default Skills;