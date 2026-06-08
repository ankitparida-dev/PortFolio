import React, { useEffect, useRef, useState } from 'react';

const ProgressRing = ({ value, label, max = 100, size = 120, color = '#00ff88' }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const ref = useRef(null);
    
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentValue / max) * circumference;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        let start = 0;
                        const end = value;
                        const duration = 2000;
                        const increment = end / (duration / 16);
                        
                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= end) {
                                setCurrentValue(end);
                                clearInterval(timer);
                            } else {
                                setCurrentValue(Math.floor(start));
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
        <div ref={ref} style={{ textAlign: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(0, 255, 136, 0.1)"
                    strokeWidth="8"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
            </svg>
            <div style={{ marginTop: '-70px', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-green)' }}>
                {currentValue}%
            </div>
            <div style={{ marginTop: '50px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {label}
            </div>
        </div>
    );
};

export default ProgressRing;