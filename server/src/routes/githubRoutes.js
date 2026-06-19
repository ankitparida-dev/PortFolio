const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get GitHub user profile
router.get('/user/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log(`Fetching GitHub user: ${username}`);
        
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App',
                'Authorization': `token ${process.env.GITHUB_TOKEN}` // ✅ Add token
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('GitHub user error:', error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch user'
        });
    }
});

// Get GitHub repositories
router.get('/repos/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log(`Fetching GitHub repos for: ${username}`);
        
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-App',
                    'Authorization': `token ${process.env.GITHUB_TOKEN}` // ✅ Add token
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('GitHub repos error:', error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch repos'
        });
    }
});

// Get commit count for a repository
router.get('/commits/:username/:repo', async (req, res) => {
    try {
        const { username, repo } = req.params;
        console.log(`Fetching commits for: ${username}/${repo}`);
        
        const response = await axios.get(
            `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-App',
                    'Authorization': `token ${process.env.GITHUB_TOKEN}` // ✅ Add token
                }
            }
        );
        
        let commitCount = 0;
        const linkHeader = response.headers.link;
        if (linkHeader) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
                commitCount = parseInt(match[1]);
            } else if (response.data.length > 0) {
                commitCount = 1;
            }
        } else if (response.data.length > 0) {
            commitCount = 1;
        }
        
        res.json({ commits: commitCount });
    } catch (error) {
        console.error('GitHub commits error:', error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch commits'
        });
    }
});

module.exports = router;