const express = require('express');
const axios = require('axios');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET user GitHub profile
router.get('/user/:username', protect, async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'GitHub user not found' });
  }
});

// GET user's repositories
router.get('/repos/:username', protect, async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching repositories' });
  }
});

// GET contributors of a repo
router.get('/contributors/:owner/:repo', protect, async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contributors' });
  }
});

module.exports = router;
