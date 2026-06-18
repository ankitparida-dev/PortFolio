import React, { useState, useEffect } from 'react';
import { fetchLeetCodeStats } from '../../services/leetcodeService';
import { FaCode, FaTrophy, FaFire, FaCheckCircle, FaClock, FaStar, FaAward } from 'react-icons/fa';

const LeetCodeStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateTime, setUpdateTime] = useState('');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        const data = await fetchLeetCodeStats();
        setStats(data);
        setUpdateTime(new Date().toLocaleTimeString());
        setLoading(false);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading LeetCode stats...</p>
            </div>
        );
    }

    if (!stats) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaCode size={40} style={{ color: 'var(--neon-green)' }} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Unable to fetch LeetCode stats</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--neon-green)' }}>
                    <FaCode style={{ marginRight: '10px' }} />
                    LeetCode Stats
                </h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Updated: {updateTime}
                </span>
            </div>

            {/* Stats Cards - Including Reputation & Acceptance Rate */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: '1rem', 
                marginBottom: '1.5rem' 
            }}>
                {/* Global Ranking */}
                <div className="card" style={{ textAlign: 'center', borderColor: '#facc15' }}>
                    <FaTrophy size={28} color="#facc15" />
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#facc15' }}>
                        {stats.ranking}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Global Ranking</div>
                </div>

                {/* Reputation */}
                <div className="card" style={{ textAlign: 'center', borderColor: '#f87171' }}>
                    <FaFire size={28} color="#f87171" />
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f87171' }}>
                        {stats.reputation || 0}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Reputation</div>
                </div>

                {/* Acceptance Rate */}
                <div className="card" style={{ textAlign: 'center', borderColor: '#4ade80' }}>
                    <FaCheckCircle size={28} color="#4ade80" />
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80' }}>
                        {stats.acceptanceRate || '0'}%
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Acceptance Rate</div>
                </div>

                {/* Star Rating */}
                <div className="card" style={{ textAlign: 'center', borderColor: '#00ff88' }}>
                    <FaStar size={28} color="#00ff88" />
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00ff88' }}>
                        {stats.starRating || 0}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Star Rating</div>
                </div>
            </div>

            {/* Problems Solved */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem', 
                marginBottom: '1.5rem' 
            }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--neon-green)' }}>{stats.totalSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Solved</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#4ade80' }}>{stats.easySolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Easy</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#facc15' }}>{stats.mediumSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Medium</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#f87171' }}>{stats.hardSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Hard</div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>📊 Problem Solving Progress</h4>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span>📗 Easy</span>
                        <span style={{ color: '#4ade80' }}>{stats.easySolved} / 950</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.easySolved / 950) * 100, 100)}%`, height: '100%', background: '#4ade80', borderRadius: '4px' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span>📘 Medium</span>
                        <span style={{ color: '#facc15' }}>{stats.mediumSolved} / 2069</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.mediumSolved / 2069) * 100, 100)}%`, height: '100%', background: '#facc15', borderRadius: '4px' }} />
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span>📕 Hard</span>
                        <span style={{ color: '#f87171' }}>{stats.hardSolved} / 943</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.hardSolved / 943) * 100, 100)}%`, height: '100%', background: '#f87171', borderRadius: '4px' }} />
                    </div>
                </div>
            </div>

            {/* Languages */}
            {stats.languages && stats.languages.length > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>💻 Languages Used</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {stats.languages.map((lang, i) => (
                            <span key={i} className="skill-tag">{lang.name}: {lang.solved} solved</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Submissions */}
            {stats.recent && stats.recent.length > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>📝 Recent Submissions</h4>
                    {stats.recent.map((sub, i) => (
                        <div key={i} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            padding: '0.3rem 0',
                            borderBottom: i < stats.recent.length - 1 ? '1px solid var(--border)' : 'none',
                            fontSize: '0.9rem'
                        }}>
                            <span>{sub.title}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span className="tech-tag" style={{ fontSize: '0.6rem' }}>{sub.language}</span>
                                <span style={{ 
                                    color: sub.status === 'Accepted' ? '#4ade80' : '#f87171',
                                    fontSize: '0.7rem'
                                }}>
                                    {sub.status === 'Accepted' ? '✅' : '❌'} {sub.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Refresh Button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={fetchData} className="btn-secondary" style={{ padding: '8px 20px' }}>
                    🔄 Refresh Stats
                </button>
                <a href={`https://leetcode.com/u/${stats.username}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginLeft: '1rem', padding: '8px 20px' }}>
                    View Profile →
                </a>
            </div>
        </div>
    );
};

export default LeetCodeStats;