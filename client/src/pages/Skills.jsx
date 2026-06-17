import React, { useEffect, useRef } from 'react';
import { skillsData } from '../data/skillsData';
import SkillsChart from '../components/ui/SkillsChart';
import GitHubActivity from '../components/ui/GitHubActivity';
import LeetCodeStats from '../components/ui/LeetCodeStats';

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

    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">SKILLS</span>
                </h2>
                
                {Object.entries(skillsData).map(([key, category], catIndex) => (
                    <div key={key} className="skills-category" ref={el => skillRefs.current[catIndex] = el} style={{ opacity: 0 }}>
                        <h3>{category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}

                <SkillsChart />
                <GitHubActivity username="ankitparida-dev" /> {/* ✅ Your GitHub username */}
                <LeetCodeStats />
            </div>
        </section>
    );
};

export default Skills;