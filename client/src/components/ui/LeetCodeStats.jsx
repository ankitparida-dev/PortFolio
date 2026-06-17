import React, { useState, useEffect } from 'react';
import { fetchLeetCodeStats } from '../../services/leetcodeService';
import { FaCode, FaTrophy, FaFire, FaCheckCircle } from 'react-icons/fa';

const LeetCodeStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeetCodeStats().then(data => {
            setStats(data);
            setLoading(false);
        });
    }, []);

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
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    Unable to fetch LeetCode stats
                </p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
                <FaCode style={{ marginRight: '10px' }} />
                LeetCode Stats
            </h3>

            {/* Main Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
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
                        <span style={{ color: '#4ade80' }}>{stats.easySolved} solved</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.easySolved / 500) * 100, 100)}%`, height: '100%', background: '#4ade80', borderRadius: '4px' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span>📘 Medium</span>
                        <span style={{ color: '#facc15' }}>{stats.mediumSolved} solved</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.mediumSolved / 300) * 100, 100)}%`, height: '100%', background: '#facc15', borderRadius: '4px' }} />
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span>📕 Hard</span>
                        <span style={{ color: '#f87171' }}>{stats.hardSolved} solved</span>
                    </div>
                    <div style={{ background: 'var(--bg-card)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((stats.hardSolved / 100) * 100, 100)}%`, height: '100%', background: '#f87171', borderRadius: '4px' }} />
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <FaTrophy color="var(--neon-green)" size={24} />
                    <div style={{ fontWeight: 'bold', color: 'var(--neon-green)' }}>#{stats.ranking}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Global Rank</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <FaCheckCircle color="var(--neon-green)" size={24} />
                    <div style={{ fontWeight: 'bold', color: 'var(--neon-green)' }}>{stats.acceptanceRate || '84.63%'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Acceptance Rate</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <FaFire color="var(--neon-green)" size={24} />
                    <div style={{ fontWeight: 'bold', color: 'var(--neon-green)' }}>{stats.reputation || 0}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reputation</div>
                </div>
            </div>

            {/* Languages */}
            {stats.languages && stats.languages.length > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>💻 Languages</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {stats.languages.map((lang, i) => (
                            <span key={i} className="skill-tag">{lang.name}: {lang.solved} solved</span>
                        ))}
                    </div>
                </div>
            )}

            {/* View Profile */}
            <div style={{ textAlign: 'center' }}>
                <a href={`https://leetcode.com/u/${stats.username || 'Ankit087-acer'}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    View Full Profile →
                </a>
            </div>
        </div>
    );
};

export default LeetCodeStats;