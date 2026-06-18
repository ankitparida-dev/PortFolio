import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaClock, FaCode, FaUsers, FaGitCommit } from 'react-icons/fa';

const GitHubActivity = ({ username = 'ankitparida-dev' }) => {
    const [repos, setRepos] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [updateTime, setUpdateTime] = useState('');
    const [totalCommits, setTotalCommits] = useState(0);
    const [commitData, setCommitData] = useState([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            
            // Fetch profile
            const profileRes = await fetch(`https://api.github.com/users/${username}`);
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
            }

            // Fetch ALL repos
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`);
            let reposData = [];
            if (reposRes.ok) {
                reposData = await reposRes.json();
                setRepos(Array.isArray(reposData) ? reposData : []);
            }

            // Fetch commit count for each repository
            let totalCommitCount = 0;
            const repoCommitData = [];
            
            for (const repo of reposData) {
                try {
                    // Get commit count using the commits API
                    const commitsRes = await fetch(
                        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`
                    );
                    
                    let commitCount = 0;
                    if (commitsRes.ok) {
                        // Get total count from Link header
                        const linkHeader = commitsRes.headers.get('Link');
                        if (linkHeader) {
                            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                            if (match) {
                                commitCount = parseInt(match[1]);
                            } else {
                                // Check if there's at least one commit
                                const data = await commitsRes.clone().json();
                                if (Array.isArray(data) && data.length > 0) {
                                    commitCount = 1;
                                }
                            }
                        } else {
                            // No pagination, check if there's at least one commit
                            const data = await commitsRes.clone().json();
                            if (Array.isArray(data) && data.length > 0) {
                                commitCount = 1;
                            }
                        }
                    }
                    
                    totalCommitCount += commitCount;
                    repoCommitData.push({
                        name: repo.name,
                        commits: commitCount,
                        language: repo.language,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        watchers: repo.watchers_count,
                        updated: repo.updated_at,
                        url: repo.html_url,
                        hasCommits: commitCount > 0
                    });
                } catch (e) {
                    console.log(`Could not fetch commits for ${repo.name}`);
                    repoCommitData.push({
                        name: repo.name,
                        commits: 0,
                        language: repo.language,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        watchers: repo.watchers_count,
                        updated: repo.updated_at,
                        url: repo.html_url,
                        hasCommits: false
                    });
                }
            }
            
            setTotalCommits(totalCommitCount);
            setCommitData(repoCommitData);
            setUpdateTime(new Date().toLocaleTimeString());
            setLoading(false);
        } catch (err) {
            console.error('GitHub Error:', err);
            setError(true);
            setLoading(false);
        }
    };

    // Calculate total stats
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Fetching GitHub repositories and commits...</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>This may take a moment</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaGithub size={40} style={{ color: 'var(--neon-green)' }} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    Unable to fetch GitHub data. Please try again later.
                </p>
                <button onClick={fetchData} className="btn-secondary" style={{ marginTop: '1rem', padding: '8px 20px' }}>
                    🔄 Retry
                </button>
            </div>
        );
    }

    if (repos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaGithub size={40} style={{ color: 'var(--neon-green)' }} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    No repositories found for {username}
                </p>
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>
                    Visit GitHub →
                </a>
            </div>
        );
    }

    // Get repositories with commits
    const reposWithCommits = commitData.filter(repo => repo.hasCommits);
    const reposWithoutCommits = commitData.filter(repo => !repo.hasCommits);

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--neon-green)' }}>
                    <FaGithub style={{ marginRight: '10px' }} />
                    GitHub Activity
                </h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <FaClock style={{ marginRight: '4px' }} />
                    Updated: {updateTime}
                </span>
            </div>

            {/* Profile Stats Cards */}
            {profile && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaUsers size={24} color="var(--neon-green)" />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-green)' }}>{profile.followers}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Followers</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaStar size={24} color="#facc15" />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#facc15' }}>{totalStars}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Stars</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaCodeBranch size={24} color="#4ade80" />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>{totalForks}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Forks</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center', borderColor: totalCommits > 0 ? 'var(--neon-green)' : 'var(--border)' }}>
                        <FaGitCommit size={24} color={totalCommits > 0 ? '#00ff88' : 'var(--text-secondary)'} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: totalCommits > 0 ? '#00ff88' : 'var(--text-secondary)' }}>
                            {totalCommits > 0 ? totalCommits : '0'}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Commits</div>
                    </div>
                </div>
            )}

            {/* Commit Stats by Repository - Only show if there are commits */}
            {reposWithCommits.length > 0 && (
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>
                        <FaGitCommit style={{ marginRight: '8px' }} />
                        Commits by Repository ({totalCommits} total)
                    </h4>
                    {reposWithCommits.map((repo, index) => (
                        <div 
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: index < reposWithCommits.length - 1 ? '1px solid var(--border)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <span style={{ color: 'var(--neon-green)' }}>📝</span>
                                <a 
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                                >
                                    {repo.name}
                                </a>
                                {repo.language && (
                                    <span className="tech-tag" style={{ fontSize: '0.6rem' }}>
                                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', marginRight: '4px' }}></span>
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    ⭐ {repo.stars}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    🔀 {repo.forks}
                                </span>
                                <span style={{ 
                                    fontSize: '0.9rem', 
                                    fontWeight: 'bold', 
                                    color: 'var(--neon-green)'
                                }}>
                                    {repo.commits} commits
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Message when no commits found */}
            {reposWithCommits.length === 0 && repos.length > 0 && (
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    <FaGitCommit size={30} color="var(--text-secondary)" />
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        No commits found in any repository yet.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Start committing to see your activity here!
                    </p>
                </div>
            )}

            {/* All Repositories Grid */}
            <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem' }}>
                📦 All Repositories ({repos.length})
            </h4>
            <div className="projects-grid">
                {repos.map(repo => {
                    const commitInfo = commitData.find(c => c.name === repo.name);
                    return (
                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-card" style={{ textDecoration: 'none' }}>
                            <div className="project-content">
                                <h4 style={{ color: 'var(--neon-green)', marginBottom: '0.3rem' }}>
                                    {repo.name}
                                    {commitInfo && commitInfo.commits > 0 && (
                                        <span style={{ fontSize: '0.6rem', color: 'var(--neon-green)', marginLeft: '0.5rem' }}>
                                            ({commitInfo.commits} commits)
                                        </span>
                                    )}
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', minHeight: '40px' }}>
                                    {repo.description || 'No description'}
                                </p>
                                <div className="project-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {repo.language && (
                                        <span className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88' }}></span>
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FaStar style={{ color: '#facc15' }} /> {repo.stargazers_count}
                                    </span>
                                    <span className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FaCodeBranch style={{ color: '#4ade80' }} /> {repo.forks_count}
                                    </span>
                                    <span className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FaEye /> {repo.watchers_count}
                                    </span>
                                    {commitInfo && commitInfo.commits > 0 && (
                                        <span className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--neon-green)' }}>
                                            <FaGitCommit /> {commitInfo.commits}
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    <FaClock style={{ marginRight: '4px' }} />
                                    {new Date(repo.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Refresh Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={fetchData} className="btn-secondary" style={{ padding: '8px 24px' }}>
                    🔄 Refresh
                </button>
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginLeft: '1rem', padding: '8px 24px', textDecoration: 'none' }}>
                    View GitHub →
                </a>
            </div>
        </div>
    );
};

export default GitHubActivity;