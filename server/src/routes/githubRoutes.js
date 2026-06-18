const express = require('express');
const { getUserProfile, getRepos, getCommitCount } = require('../controllers/githubController');

const router = express.Router();

router.get('/user/:username', getUserProfile);
router.get('/repos/:username', getRepos);
router.get('/commits/:username/:repo', getCommitCount);

module.exports = router;