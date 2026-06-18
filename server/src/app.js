const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const githubRoutes = require('./routes/githubRoutes'); // ADD THIS
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/github', githubRoutes); // ADD THIS

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
        message: 'Welcome to Portfolio API',
        endpoints: {
            health: '/api/health',
            contact: {
                submit: 'POST /api/contact',
                getAll: 'GET /api/contact'
            },
            github: {
                user: 'GET /api/github/user/:username',
                repos: 'GET /api/github/repos/:username',
                commits: 'GET /api/github/commits/:username/:repo'
            }
        }
    });
});

// Error handler
app.use(errorHandler);

module.exports = app;