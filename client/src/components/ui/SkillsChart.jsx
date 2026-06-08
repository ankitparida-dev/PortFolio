import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
    BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler
);

const SkillsChart = () => {
    // Doughnut Chart - Skill Proficiency
    const doughnutData = {
        labels: ['Java', 'JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
        datasets: [{
            data: [85, 80, 75, 70, 65, 60],
            backgroundColor: [
                '#00ff88',
                '#00cc6a',
                '#00ffaa',
                '#00dd77',
                '#00ee99',
                '#00bb55'
            ],
            borderColor: '#0a0a0a',
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
                    color: 'var(--text-primary)',
                    font: { family: 'monospace', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--neon-green)',
                bodyColor: 'var(--text-primary)',
                borderColor: 'var(--neon-green)',
                borderWidth: 1
            }
        }
    };

    // Bar Chart - DSA Progress
    const barData = {
        labels: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'DP'],
        datasets: [{
            label: 'Problems Solved',
            data: [45, 38, 32, 28, 25, 20, 15, 12],
            backgroundColor: '#00ff88',
            borderRadius: 8,
            hoverBackgroundColor: '#00cc6a'
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: 'var(--text-primary)',
                    font: { family: 'monospace', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--neon-green)',
                bodyColor: 'var(--text-primary)'
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(0, 255, 136, 0.1)' },
                ticks: { color: 'var(--text-secondary)' }
            },
            x: {
                grid: { display: false },
                ticks: { color: 'var(--text-secondary)', rotation: 45 }
            }
        }
    };

    // Radar Chart - Skill Comparison
    const radarData = {
        labels: ['DSA', 'Web Dev', 'Problem Solving', 'System Design', 'Database', 'API Design'],
        datasets: [
            {
                label: 'Current Level',
                data: [85, 78, 82, 65, 70, 72],
                backgroundColor: 'rgba(0, 255, 136, 0.2)',
                borderColor: '#00ff88',
                borderWidth: 2,
                pointBackgroundColor: '#00ff88',
                pointBorderColor: '#0a0a0a',
                pointHoverBackgroundColor: '#00cc6a',
                pointHoverBorderColor: '#0a0a0a'
            }
        ]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: 'var(--text-primary)',
                    font: { family: 'monospace', size: 12 }
                }
            }
        },
        scales: {
            r: {
                grid: { color: 'rgba(0, 255, 136, 0.1)' },
                ticks: { color: 'var(--text-secondary)', backdropColor: 'transparent' },
                pointLabels: { color: 'var(--text-primary)', font: { size: 10 } }
            }
        }
    };

    // Line Chart - Learning Progress Over Time
    const lineData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [
            {
                label: 'Java DSA',
                data: [30, 40, 52, 60, 68, 75, 80, 85],
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00ff88',
                pointBorderColor: '#0a0a0a'
            },
            {
                label: 'React',
                data: [20, 32, 45, 55, 65, 70, 73, 78],
                borderColor: '#00cc6a',
                backgroundColor: 'rgba(0, 204, 106, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00cc6a',
                pointBorderColor: '#0a0a0a'
            },
            {
                label: 'Node.js',
                data: [15, 25, 38, 48, 58, 62, 67, 70],
                borderColor: '#00ffaa',
                backgroundColor: 'rgba(0, 255, 170, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00ffaa',
                pointBorderColor: '#0a0a0a'
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'var(--text-primary)',
                    font: { family: 'monospace', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--neon-green)',
                bodyColor: 'var(--text-primary)'
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(0, 255, 136, 0.1)' },
                ticks: { color: 'var(--text-secondary)' },
                title: { display: true, text: 'Proficiency (%)', color: 'var(--neon-green)' }
            },
            x: {
                grid: { display: false },
                ticks: { color: 'var(--text-secondary)' }
            }
        }
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '2rem', fontSize: '1.8rem' }}>
                📊 Interactive Skills Dashboard
            </h3>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Doughnut Chart */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        🎯 Skill Proficiency
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Hover on segments to see details
                    </p>
                </div>

                {/* Radar Chart */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        🔍 Skill Matrix Analysis
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Interactive radar chart showing skill distribution
                    </p>
                </div>
            </div>

            {/* Bar Chart - Full Width */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                    📈 DSA Problems Solved
                </h4>
                <div style={{ height: '350px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Click on bars for detailed information
                </p>
            </div>

            {/* Line Chart - Learning Progress */}
            <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                    📊 Learning Progress Over Time
                </h4>
                <div style={{ height: '350px' }}>
                    <Line data={lineData} options={lineOptions} />
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Track your learning journey with interactive timeline
                </p>
            </div>
        </div>
    );
};

export default SkillsChart;