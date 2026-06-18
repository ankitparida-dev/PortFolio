import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Radar } from 'react-chartjs-2';
import { fetchLeetCodeStats } from '../../services/leetcodeService';

ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
    BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler
);

const SkillsChart = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateTime, setUpdateTime] = useState('');
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000);
        
        // Check theme on mount and when it changes
        const checkTheme = () => {
            setIsDark(!document.body.classList.contains('light'));
        };
        checkTheme();
        
        // Observe theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        
        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    const fetchData = async () => {
        const data = await fetchLeetCodeStats();
        setStats(data);
        setUpdateTime(new Date().toLocaleTimeString());
        setLoading(false);
    };

    // Get theme-aware colors
    const getTextColor = () => isDark ? '#e6edf3' : '#052e16';
    const getSecondaryTextColor = () => isDark ? '#8b949e' : '#166534';
    const getGridColor = () => isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const getCardBg = () => isDark ? '#0f1419' : '#ffffff';

    if (loading || !stats) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading DSA progress...</p>
            </div>
        );
    }

    // Calculate DSA topic progress based on LeetCode stats
    const totalSolved = stats.totalSolved || 0;
    const easySolved = stats.easySolved || 0;
    const mediumSolved = stats.mediumSolved || 0;
    const hardSolved = stats.hardSolved || 0;

    const dsaTopics = {
        arrays: Math.round((easySolved * 0.25) + (mediumSolved * 0.15) + (hardSolved * 0.05)),
        strings: Math.round((easySolved * 0.20) + (mediumSolved * 0.12) + (hardSolved * 0.05)),
        linkedLists: Math.round((easySolved * 0.10) + (mediumSolved * 0.15) + (hardSolved * 0.10)),
        stacks: Math.round((easySolved * 0.08) + (mediumSolved * 0.10) + (hardSolved * 0.05)),
        queues: Math.round((easySolved * 0.07) + (mediumSolved * 0.08) + (hardSolved * 0.05)),
        trees: Math.round((easySolved * 0.10) + (mediumSolved * 0.18) + (hardSolved * 0.25)),
        graphs: Math.round((easySolved * 0.08) + (mediumSolved * 0.12) + (hardSolved * 0.25)),
        dp: Math.round((easySolved * 0.05) + (mediumSolved * 0.10) + (hardSolved * 0.20))
    };

    // 1. Doughnut Chart - Problem Distribution
    const doughnutData = {
        labels: [`Easy (${easySolved})`, `Medium (${mediumSolved})`, `Hard (${hardSolved})`],
        datasets: [{
            data: [easySolved, mediumSolved, hardSolved],
            backgroundColor: ['#4ade80', '#facc15', '#f87171'],
            borderColor: getCardBg(),
            borderWidth: 2,
            hoverOffset: 10
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: getTextColor(),
                    font: { family: 'monospace', size: 12 },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: getCardBg(),
                titleColor: '#00ff88',
                bodyColor: getTextColor(),
                borderColor: '#00ff88',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        let value = context.parsed || 0;
                        let total = context.dataset.data.reduce((a, b) => a + b, 0);
                        let percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return `${label}: ${value} problems (${percentage}%)`;
                    }
                }
            }
        }
    };

    // 2. Bar Chart - DSA Topic-wise Progress
    const barData = {
        labels: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'DP'],
        datasets: [{
            label: 'Problems Solved',
            data: [
                dsaTopics.arrays,
                dsaTopics.strings,
                dsaTopics.linkedLists,
                dsaTopics.stacks,
                dsaTopics.queues,
                dsaTopics.trees,
                dsaTopics.graphs,
                dsaTopics.dp
            ],
            backgroundColor: [
                'rgba(0, 255, 136, 0.8)',
                'rgba(0, 204, 106, 0.8)',
                'rgba(0, 255, 170, 0.8)',
                'rgba(0, 221, 119, 0.8)',
                'rgba(0, 238, 153, 0.8)',
                'rgba(0, 187, 85, 0.8)',
                'rgba(0, 170, 68, 0.8)',
                'rgba(0, 153, 51, 0.8)'
            ],
            borderColor: '#00ff88',
            borderWidth: 1,
            borderRadius: 8,
            hoverBackgroundColor: '#00ff88'
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: getCardBg(),
                titleColor: '#00ff88',
                bodyColor: getTextColor(),
                borderColor: '#00ff88',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return `Problems Solved: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            y: {
                grid: { color: getGridColor() },
                ticks: { color: getSecondaryTextColor() },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Problems Solved',
                    color: '#00ff88'
                }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: getSecondaryTextColor(), 
                    rotation: 45,
                    font: { size: 10 }
                }
            }
        }
    };

    // 3. Radar Chart - DSA Skill Matrix
    const radarData = {
        labels: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'DP'],
        datasets: [{
            label: 'Your DSA Progress',
            data: [
                Math.min((dsaTopics.arrays / 20) * 100, 100),
                Math.min((dsaTopics.strings / 20) * 100, 100),
                Math.min((dsaTopics.linkedLists / 15) * 100, 100),
                Math.min((dsaTopics.stacks / 15) * 100, 100),
                Math.min((dsaTopics.queues / 15) * 100, 100),
                Math.min((dsaTopics.trees / 20) * 100, 100),
                Math.min((dsaTopics.graphs / 15) * 100, 100),
                Math.min((dsaTopics.dp / 15) * 100, 100)
            ],
            backgroundColor: isDark ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 201, 126, 0.2)',
            borderColor: '#00ff88',
            borderWidth: 2,
            pointBackgroundColor: '#00ff88',
            pointBorderColor: getCardBg(),
            pointHoverBackgroundColor: '#00cc6a',
            pointHoverBorderColor: getCardBg()
        }]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: getTextColor(),
                    font: { family: 'monospace', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: getCardBg(),
                titleColor: '#00ff88',
                bodyColor: getTextColor(),
                borderColor: '#00ff88',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return `Proficiency: ${Math.round(context.parsed.r)}%`;
                    }
                }
            }
        },
        scales: {
            r: {
                grid: { color: getGridColor() },
                ticks: { 
                    color: getSecondaryTextColor(), 
                    backdropColor: 'transparent',
                    stepSize: 20
                },
                pointLabels: { 
                    color: getTextColor(), 
                    font: { size: 11 }
                },
                min: 0,
                max: 100
            }
        }
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--neon-green)' }}>📊 DSA Skill Matrix</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Last updated: {updateTime}
                </span>
            </div>
            
            {/* Stats Summary */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem', 
                marginBottom: '2rem' 
            }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--neon-green)' }}>{totalSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Solved</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#4ade80' }}>{easySolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Easy</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#facc15' }}>{mediumSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Medium</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', color: '#f87171' }}>{hardSolved}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Hard</div>
                </div>
            </div>

            {/* Charts Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Doughnut Chart - Problem Distribution */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        🎯 Problem Distribution
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Radar Chart - DSA Skill Matrix */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        🔍 DSA Skill Matrix
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Shows proficiency percentage per topic
                    </p>
                </div>
            </div>

            {/* Bar Chart - Full Width */}
            <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                    📈 DSA Topic-wise Progress
                </h4>
                <div style={{ height: '350px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Hover on bars for details | Updates automatically when you solve problems
                </p>
            </div>

            {/* Refresh Button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={fetchData} className="btn-secondary" style={{ padding: '8px 20px' }}>
                    🔄 Refresh Stats
                </button>
            </div>
        </div>
    );
};

export default SkillsChart;