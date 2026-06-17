import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
    BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler
);

const SkillsChart = () => {
    const doughnutData = {
        labels: ['Java', 'JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
        datasets: [{
            data: [85, 80, 75, 70, 65, 60],
            backgroundColor: ['#00ff88', '#00cc6a', '#00ffaa', '#00dd77', '#00ee99', '#00bb55'],
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
            }
        }
    };

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

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--neon-green)', marginBottom: '2rem' }}>
                📊 Skills Dashboard
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        🎯 Skill Proficiency
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neon-green)', marginBottom: '1rem', textAlign: 'center' }}>
                        📈 DSA Progress
                    </h4>
                    <div style={{ height: '300px' }}>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsChart;