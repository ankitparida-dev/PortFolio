import React from 'react';
import SocialLinks from './SocialLinks';

const Footer = () => {
    return (
        <footer className="footer" style={{
            background: 'var(--bg-secondary)',
            borderTop: '2px solid var(--neon-green)',
            padding: '2.5rem 0',
            textAlign: 'center'
        }}>
            <div className="container">
                <h4 style={{ 
                    color: 'var(--neon-green)', 
                    marginBottom: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                }}>
                    {`>_ Find me on`}
                </h4>
                <SocialLinks showLabels={true} />
                
                <div style={{ 
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border)'
                }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        © 2026 Ankit Parida | Built with MERN & ❤️
                    </p>
                    <p style={{ 
                        fontSize: '0.8rem', 
                        marginTop: '0.5rem', 
                        color: 'var(--neon-green)',
                        fontFamily: 'monospace'
                    }}>
                        {`<Developer />`}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;