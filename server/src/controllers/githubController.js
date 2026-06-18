const axios = require('axios');

// @desc    Get GitHub user profile
// @route   GET /api/github/user/:username
const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://api.github.com/users/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch user'
        });
    }
};

// @desc    Get GitHub repositories
// @route   GET /api/github/repos/:username
const getRepos = async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`
        );
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch repos'
        });
    }
};

// @desc    Get commit count for a repository
// @route   GET /api/github/commits/:username/:repo
const getCommitCount = async (req, res) => {
    try {
        const { username, repo } = req.params;
        const response = await axios.get(
            `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`
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
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Failed to fetch commits'
        });
    }
};

module.exports = { getUserProfile, getRepos, getCommitCount };