import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaEnvelope, FaUser, FaCalendar, FaLock } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-eevk.onrender.com/api';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, unread: 0 });

    // ✅ Change this to your own password
    const ADMIN_PASSWORD = 'admin123';

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            fetchMessages();
        } else {
            setError('❌ Incorrect password');
        }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/contact`);
            const data = response.data.data || [];
            setMessages(data);
            setStats({
                total: data.length,
                unread: data.filter(m => !m.read).length
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(`${API_URL}/contact/${id}/read`);
            fetchMessages();
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm('Delete this message?')) return;
        try {
            await axios.delete(`${API_URL}/contact/${id}`);
            fetchMessages();
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    // ✅ Login Screen (Shows when not authenticated)
    if (!isAuthenticated) {
        return (
            <section style={{ 
                padding: '80px 0', 
                backgroundColor: 'var(--bg-secondary)', 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container" style={{ maxWidth: '400px' }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <FaLock size={40} color="var(--neon-green)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>
                            🔒 Admin Access
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Enter password to view messages
                        </p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--neon-green)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'monospace',
                                    marginBottom: '1rem'
                                }}
                                autoFocus
                            />
                            {error && (
                                <p style={{ color: '#f87171', marginBottom: '0.5rem' }}>{error}</p>
                            )}
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                🔓 Unlock Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

    // ✅ Admin Dashboard (Shows after login)
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-secondary)' }}>Loading messages...</p>
            </div>
        );
    }

    return (
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>
                        <span className="title-text">📩 MESSAGES</span>
                    </h2>
                    <button 
                        onClick={() => setIsAuthenticated(false)} 
                        className="btn-secondary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                    >
                        🔒 Logout
                    </button>
                </div>
                
                {/* Stats */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', color: 'var(--neon-green)' }}>{stats.total}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Messages</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', color: '#facc15' }}>{stats.unread}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Unread</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <button onClick={fetchMessages} className="btn-secondary" style={{ padding: '8px 20px' }}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            <FaEnvelope size={40} style={{ marginBottom: '1rem' }} />
                            <p>No messages yet</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div 
                                key={msg._id} 
                                className="card" 
                                style={{ 
                                    padding: '1.5rem',
                                    borderLeft: msg.read ? 'none' : '4px solid var(--neon-green)',
                                    opacity: msg.read ? 0.7 : 1
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--neon-green)' }}>
                                            <FaUser style={{ marginRight: '8px' }} />
                                            {msg.name}
                                        </h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <FaEnvelope style={{ marginRight: '4px' }} />
                                            {msg.email}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ 
                                            fontSize: '0.7rem', 
                                            color: 'var(--text-secondary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <FaCalendar />
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </span>
                                        <span style={{ 
                                            display: 'inline-block',
                                            padding: '2px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            marginTop: '4px',
                                            background: msg.read ? 'var(--border)' : 'var(--neon-green)',
                                            color: msg.read ? 'var(--text-secondary)' : '#0a0a0a'
                                        }}>
                                            {msg.read ? 'Read' : '📩 New'}
                                        </span>
                                    </div>
                                </div>
                                
                                <p style={{ 
                                    color: 'var(--text-primary)', 
                                    marginTop: '0.8rem',
                                    padding: '10px',
                                    background: 'var(--bg-primary)',
                                    borderRadius: '8px',
                                    borderLeft: '3px solid var(--neon-green)'
                                }}>
                                    {msg.message}
                                </p>
                                
                                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                                    {!msg.read && (
                                        <button 
                                            onClick={() => markAsRead(msg._id)}
                                            className="btn-secondary"
                                            style={{ padding: '4px 16px', fontSize: '0.8rem' }}
                                        >
                                            <FaCheck /> Mark as Read
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteMessage(msg._id)}
                                        style={{ 
                                            padding: '4px 16px', 
                                            fontSize: '0.8rem',
                                            background: 'transparent',
                                            border: '1px solid #f87171',
                                            borderRadius: '8px',
                                            color: '#f87171',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Admin;