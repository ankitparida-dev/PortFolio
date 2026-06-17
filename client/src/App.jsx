import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const MatrixRain = () => {
    useEffect(() => {
        const container = document.createElement('div');
        container.className = 'matrix-container';
        document.body.appendChild(container);

        const chars = '01';
        const columns = Math.floor(window.innerWidth / 25);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 25 + 'px';
            column.style.animationDuration = Math.random() * 5 + 3 + 's';
            column.style.animationDelay = Math.random() * 5 + 's';
            column.style.color = `rgba(0, 255, 136, ${Math.random() * 0.3 + 0.1})`;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length));
                text += '<br>';
            }
            column.innerHTML = text;
            container.appendChild(column);
        }

        return () => { if (container) container.remove(); };
    }, []);

    return null;
};

function App() {
    const getPage = () => {
        const path = window.location.pathname;
        switch(path) {
            case '/about': return <About />;
            case '/skills': return <Skills />;
            case '/projects': return <Projects />;
            case '/contact': return <Contact />;
            default: return <Home />;
        }
    };

    return (
        <ThemeProvider>
            <MatrixRain />
            <Navbar />
            {getPage()}
            <Footer />
        </ThemeProvider>
    );
}

export default App;