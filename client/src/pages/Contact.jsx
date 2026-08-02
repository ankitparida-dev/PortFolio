import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaTwitter, FaInstagram } from 'react-icons/fa';
import SocialLinks from '../components/common/SocialLinks';
import { submitContact } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await submitContact(formData);
            setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingTop: '80px' }}>
            <div className="container">
                <h2 className="section-title">
                    <span className="title-text">CONTACT</span>
                </h2>
                
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {`>_ Let's connect! Reach out to me through any of the platforms below.`}
                        </p>
                    </div>
                    
                    {/* Contact Info Cards */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                            <FaEnvelope size={24} color="var(--neon-green)" />
                            <h4 style={{ color: 'var(--neon-green)', marginTop: '0.5rem' }}>Email</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                ankitparida386@gmail.com
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                            <FaGithub size={24} color="var(--neon-green)" />
                            <h4 style={{ color: 'var(--neon-green)', marginTop: '0.5rem' }}>GitHub</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                <a href="https://github.com/ankitparida-dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', textDecoration: 'none' }}>
                                    ankitparida-dev
                                </a>
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                            <FaLinkedin size={24} color="var(--neon-green)" />
                            <h4 style={{ color: 'var(--neon-green)', marginTop: '0.5rem' }}>LinkedIn</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                <a href="https://linkedin.com/in/ankitparida087" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-green)', textDecoration: 'none' }}>
                                    ankitparida087
                                </a>
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                            <FaMapMarkerAlt size={24} color="var(--neon-green)" />
                            <h4 style={{ color: 'var(--neon-green)', marginTop: '0.5rem' }}>Location</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                Panchkula, India
                            </p>
                        </div>
                    </div>
                    
                    {/* Social Links Section */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1rem' }}>
                            Connect With Me
                        </h3>
                        <SocialLinks showLabels={true} />
                    </div>
                    
                    {/* Contact Form */}
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
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>{'>_ EMAIL:'}</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>
                            {/* ✅ Subject Field Added */}
                            <div className="form-group">
                                <label>{'>_ SUBJECT:'}</label>
                                <input 
                                    type="text" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    placeholder="Enter subject (optional)" 
                                />
                            </div>
                            <div className="form-group">
                                <label>{'>_ MESSAGE:'}</label>
                                <textarea 
                                    name="message" 
                                    rows="5" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Type your message here..." 
                                    required
                                />
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