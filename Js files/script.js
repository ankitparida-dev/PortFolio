// Theme toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.querySelector('.theme-toggle');
            const body = document.body;
            
            // Check for saved theme preference or default to dark
            const savedTheme = localStorage.getItem('theme') || 'dark';
            body.setAttribute('data-theme', savedTheme);
            
            themeToggle.addEventListener('click', function() {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
            
            // Create matrix background effect
            const matrixBg = document.querySelector('.matrix-bg');
            const chars = '01';
            const columns = Math.floor(window.innerWidth / 20);
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.style.position = 'absolute';
                column.style.top = '-100px';
                column.style.left = (i * 20) + 'px';
                column.style.width = '2px';
                column.style.fontFamily = 'Courier New, monospace';
                column.style.fontSize = '16px';
                column.style.color = 'var(--accent)';
                column.style.textShadow = '0 0 5px var(--accent)';
                column.style.animation = `fall ${Math.random() * 5 + 3}s linear infinite`;
                column.style.animationDelay = (Math.random() * 5) + 's';
                
                let content = '';
                for (let j = 0; j < 30; j++) {
                    content += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
                }
                column.innerHTML = content;
                
                matrixBg.appendChild(column);
            }
            
            // Add CSS for falling animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    0% { top: -100px; opacity: 1; }
                    100% { top: 100vh; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Navigation highlighting
            const navLinks = document.querySelectorAll('.nav-link');
            
            function removeActiveClasses() {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                });
            }
            
            function setActiveLink() {
                let fromTop = window.scrollY + 100;
                
                navLinks.forEach(link => {
                    let section = document.querySelector(link.hash);
                    
                    if (section && 
                        section.offsetTop <= fromTop &&
                        section.offsetTop + section.offsetHeight > fromTop
                    ) {
                        removeActiveClasses();
                        link.classList.add('active-nav');
                    }
                });
            }
            
            window.addEventListener('scroll', setActiveLink);
            
            // Animate skill bars when they come into view
            const skillBars = document.querySelectorAll('.skill-progress');
            
            function animateSkillBars() {
                skillBars.forEach(bar => {
                    const barTop = bar.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (barTop < windowHeight - 100) {
                        bar.style.width = bar.style.width;
                    }
                });
            }
            
            window.addEventListener('scroll', animateSkillBars);
            animateSkillBars(); // Run once on page load
        });