import React, { useEffect, useRef } from 'react';

const BackgroundElements = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = '';

        const techStack = [
            { symbol: '⚛️', name: 'React' },
            { symbol: '🟢', name: 'Node.js' },
            { symbol: '🍃', name: 'MongoDB' },
            { symbol: '📦', name: 'Express' },
            { symbol: '☕', name: 'Java' },
            { symbol: '🐍', name: 'Python' },
            { symbol: '🐘', name: 'PostgreSQL' },
            { symbol: '🔧', name: 'Git' },
            { symbol: '▲', name: 'Vercel' },
            { symbol: '🔥', name: 'Firebase' },
            { symbol: '🐳', name: 'Docker' },
            { symbol: '☁️', name: 'AWS' },
            { symbol: 'TS', name: 'TypeScript' },
            { symbol: '🎨', name: 'Tailwind' },
            { symbol: 'JS', name: 'JavaScript' }
        ];

        const shuffled = techStack.sort(() => Math.random() - 0.5);

        shuffled.forEach((tech, index) => {
            const el = document.createElement('div');

            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(255, 255, 255, 0.03);
                padding: 8px 16px;
                border-radius: 30px;
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            `;

            const symbolSpan = document.createElement('span');
            symbolSpan.textContent = tech.symbol;
            symbolSpan.style.cssText = `font-size: 20px; line-height: 1;`;

            const nameSpan = document.createElement('span');
            nameSpan.textContent = tech.name;
            nameSpan.style.cssText = `
                font-family: 'Segoe UI', sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: #ffffff;
                letter-spacing: 0.5px;
            `;

            wrapper.appendChild(symbolSpan);
            wrapper.appendChild(nameSpan);
            el.appendChild(wrapper);

            el.style.cssText = `
                position: absolute;
                top: ${Math.random() * 90 + 5}%;
                left: ${Math.random() * 90 + 5}%;
                opacity: 0;
                animation: floatElement ${20 + Math.random() * 20}s linear infinite;
                animation-delay: ${index * 0.5}s;
                pointer-events: none;
                user-select: none;
                z-index: 0;
            `;

            container.appendChild(el);

            setTimeout(() => {
                el.style.opacity = '0.25';
            }, 200 + index * 50);
        });

        if (!document.getElementById('bg-float-style')) {
            const style = document.createElement('style');
            style.id = 'bg-float-style';
            style.textContent = `
                @keyframes floatElement {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(0.9);
                        opacity: 0;
                    }
                    15% { opacity: 0.25; }
                    80% { opacity: 0.25; }
                    100% {
                        transform: translate(${Math.random() * 250 - 125}px, ${-Math.random() * 350 - 100}px) rotate(${Math.random() * 360}deg) scale(0.8);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        return () => {
            container.innerHTML = '';
            const style = document.getElementById('bg-float-style');
            if (style) style.remove();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                background: 'transparent'
            }}
        />
    );
};

export default BackgroundElements;