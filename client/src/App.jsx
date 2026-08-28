import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackgroundElements from './components/common/BackgroundElements'; // ✅ New import
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
    const getPage = () => {
        const path = window.location.pathname;
        switch(path) {
            case '/about': return <About />;
            case '/skills': return <Skills />;
            case '/projects': return <Projects />;
            case '/contact': return <Contact />;
            case '/admin': return <Admin />;
            default: return <Home />;
        }
    };

    return (
        <ThemeProvider>
            <BackgroundElements /> {/* ✅ Replaces MatrixRain - Full Stack theme */}
            <Navbar />
            {getPage()}
            <Footer />
        </ThemeProvider>
    );
}

export default App;