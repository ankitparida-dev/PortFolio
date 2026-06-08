import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (formRef.current) observer.observe(formRef.current);

        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setStatus({ type: 'success', message: '✓ Message transmitted successfully! I\'ll get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }, 1000);
    };

    const contactInfo = [
        { icon: FaEnvelope, title: 'Email', value: 'ankit.parida@example.com', link: 'mailto:ankit.parida@example.com' },
        { icon: FaGithub, title: 'GitHub', value: '/ankitparida', link: 'https://github.com/ankitparida' },
        { icon: FaLinkedin, title: 'LinkedIn', value: '/in/ankitparida', link: 'https://linkedin.com/in/ankitparida' },
        { icon: FaTwitter, title: 'Twitter', value: '@ankitparida', link: 'https://twitter.com/ankitparida' },
        { icon: FaInstagram, title: 'Instagram', value: '@ankitparida', link: 'https://instagram.com/ankitparida' },
        { icon: FaMapMarkerAlt, title: 'Location', value: 'India', link: null }
    ];

    return (
        <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">CONTACT_PROTOCOL</span>
                </h2>
                
                <div ref={formRef} style={{ maxWidth: '900px', margin: '0 auto', opacity: 0 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {`>_ Available for freelance work and collaboration. Send me a message!`}
                        </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        {contactInfo.map((item, index) => (
                            <div key={index} className="card" style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}>
                                <div style={{ fontSize: '1.5rem', color: 'var(--neon-green)', marginBottom: '0.5rem' }}>
                                    <item.icon />
                                </div>
                                <h4 style={{ color: 'var(--neon-green)', fontSize: '0.7rem' }}>{item.title}</h4>
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.8rem' }}>
                                        {item.value}
                                    </a>
                                ) : (
                                    <p style={{ fontSize: '0.8rem' }}>{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
                            {`>_ Send a Message`}
                        </h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {status.message && (
                                <div className={status.type === 'success' ? 'success-message' : 'error-message'}>
                                    {status.message}
                                </div>
                            )}
                            <div className="form-group">
                                <label>{'>_ NAME:'}</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                            </div>
                            <div className="form-group">
                                <label>{'>_ EMAIL:'}</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>
                            <div className="form-group">
                                <label>{'>_ MESSAGE:'}</label>
                                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Type your message here..." required></textarea>
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                <FaPaperPlane style={{ marginRight: '8px' }} />
                                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;