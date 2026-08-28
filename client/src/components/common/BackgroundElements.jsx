import React, { useEffect, useRef } from 'react';

const BackgroundElements = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            console.log('❌ Container not found');
            return;
        }

        console.log('✅ BackgroundElements mounted - Creating floating elements...');

        // Clear any existing elements
        container.innerHTML = '';

        // Tech Stack with symbols and colors
        const techStack = [
            { symbol: '⚛️', name: 'React', color: '#61DAFB' },
            { symbol: '🟢', name: 'Node.js', color: '#339933' },
            { symbol: '🍃', name: 'MongoDB', color: '#47A248' },
            { symbol: '📦', name: 'Express', color: '#000000' },
            { symbol: '☕', name: 'Java', color: '#007396' },
            { symbol: '🐍', name: 'Python', color: '#3776AB' },
            { symbol: '🐘', name: 'PostgreSQL', color: '#336791' },
            { symbol: '🔧', name: 'Git', color: '#F05032' },
            { symbol: '▲', name: 'Vercel', color: '#000000' },
            { symbol: 'JS', name: 'JavaScript', color: '#F7DF1E' }
        ];

        // Shuffle
        const shuffled = techStack.sort(() => Math.random() - 0.5);

        shuffled.forEach((tech, index) => {
            const el = document.createElement('div');
            
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(0, 0, 0, 0.3);
                padding: 8px 16px;
                border-radius: 30px;
                backdrop-filter: blur(4px);
                border: 1px solid ${tech.color}33;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            `;
            
            // Symbol
            const symbolSpan = document.createElement('span');
            symbolSpan.textContent = tech.symbol;
            symbolSpan.style.cssText = `
                font-size: 20px;
                line-height: 1;
            `;
            
            // Name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = tech.name;
            nameSpan.style.cssText = `
                font-family: 'Segoe UI', sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: ${tech.color};
                letter-spacing: 0.5px;
            `;
            
            wrapper.appendChild(symbolSpan);
            wrapper.appendChild(nameSpan);
            el.appendChild(wrapper);
            
            // Style the floating element
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
                el.style.opacity = '0.7';
            }, 200 + index * 50);
        });

        // Add CSS animation if not exists
        if (!document.getElementById('bg-float-style')) {
            const style = document.createElement('style');
            style.id = 'bg-float-style';
            style.textContent = `
                @keyframes floatElement {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(0.9);
                        opacity: 0;
                    }
                    15% {
                        opacity: 0.7;
                    }
                    80% {
                        opacity: 0.7;
                    }
                    100% {
                        transform: translate(${Math.random() * 250 - 125}px, ${-Math.random() * 350 - 100}px) rotate(${Math.random() * 360}deg) scale(0.8);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Animation styles added');
        }

        console.log(`✅ Created ${container.children.length} floating elements`);

        return () => {
            console.log('🧹 Cleaning up background elements');
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