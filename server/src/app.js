const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const githubRoutes = require('./routes/githubRoutes');

const app = express();

app.use(express.json());

// Updated CORS to allow all origins during development
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/contact', contactRoutes);
app.use('/api/github', githubRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Portfolio API is running' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running!' });
});

module.exports = app;