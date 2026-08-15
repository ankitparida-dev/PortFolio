const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const githubRoutes = require('./routes/githubRoutes');

const app = express();

app.use(express.json());

// ✅ CORS - Allow all origins for production
app.use(cors({
    origin: '*',  // ✅ Allow all origins (temporary fix for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/github', githubRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Portfolio API is running',
        timestamp: new Date().toISOString()
    });
});

// Home route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Portfolio API is running!',
        endpoints: {
            health: '/api/health',
            contact: '/api/contact',
            github: '/api/github'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Server error'
    });
});

module.exports = app;