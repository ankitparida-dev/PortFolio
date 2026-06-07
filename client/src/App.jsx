import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
    // Simple routing based on URL path
    const getPage = () => {
        const path = window.location.pathname;
        
        switch(path) {
            case '/about':
                return <About />;
            case '/skills':
                return <Skills />;
            case '/projects':
                return <Projects />;
            case '/contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <ThemeProvider>
            <Navbar />
            {getPage()}
            <Footer />
        </ThemeProvider>
    );
}

export default App;