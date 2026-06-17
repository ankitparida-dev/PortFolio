import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaClock } from 'react-icons/fa';

const GitHubActivity = ({ username = 'ankitparida-dev' }) => { // ✅ Your correct GitHub username
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('User not found or no repositories');
                }
                return res.json();
            })
            .then(data => {
                setRepos(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('GitHub Error:', err);
                setError(true);
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading GitHub...</p>
            </div>
        );
    }

    if (error || repos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaGithub size={40} style={{ color: 'var(--neon-green)' }} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    {error ? 'User not found' : 'No repositories found'}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    Username: <span style={{ color: 'var(--neon-green)' }}>{username}</span>
                </p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
                <FaGithub style={{ marginRight: '10px' }} />
                GitHub Activity
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {repos.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none' }}>
                        <h4 style={{ color: 'var(--neon-green)' }}>{repo.name}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{repo.description || 'No description'}</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span><FaStar /> {repo.stargazers_count}</span>
                            <span><FaCodeBranch /> {repo.forks_count}</span>
                            <span><FaEye /> {repo.watchers_count}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                            <FaClock /> {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default GitHubActivity;