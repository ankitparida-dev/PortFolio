import React, { useState, useEffect, useRef } from 'react';

const StatsCard = ({ icon, label, value, suffix = '+' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        let start = 0;
                        const end = parseInt(value);
                        const duration = 2000;
                        const increment = end / (duration / 16);
                        
                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= end) {
                                setCount(end);
                                clearInterval(timer);
                            } else {
                                setCount(Math.floor(start));
                            }
                        }, 16);
                        
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <div ref={ref} className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '2rem', color: 'var(--neon-green)', marginBottom: '0.5rem' }}>
                {icon}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--neon-green)' }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</div>
        </div>
    );
};

export default StatsCard;