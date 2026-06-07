import React from 'react';
import { skillsData } from '../data/skillsData';

const Skills = () => {
    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">SKILLS_MATRIX</span>
                </h2>
                
                {Object.entries(skillsData).map(([key, category]) => (
                    <div key={key} className="skills-category" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--neon-green)', marginBottom: '1rem', fontSize: '1.3rem' }}>
                            {category.title}
                        </h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                {/* Learning Progress */}
                <div style={{ marginTop: '3rem' }}>
                    <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
                        📈 Learning Journey
                    </h3>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Java DSA</span>
                                <span>80%</span>
                            </div>
                            <div style={{ background: 'var(--bg-card)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: '80%', height: '100%', background: 'var(--gradient)', borderRadius: '5px' }}></div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>React</span>
                                <span>75%</span>
                            </div>
                            <div style={{ background: 'var(--bg-card)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: '75%', height: '100%', background: 'var(--gradient)', borderRadius: '5px' }}></div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Node.js</span>
                                <span>65%</span>
                            </div>
                            <div style={{ background: 'var(--bg-card)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: '65%', height: '100%', background: 'var(--gradient)', borderRadius: '5px' }}></div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>MongoDB</span>
                                <span>60%</span>
                            </div>
                            <div style={{ background: 'var(--bg-card)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: '60%', height: '100%', background: 'var(--gradient)', borderRadius: '5px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;