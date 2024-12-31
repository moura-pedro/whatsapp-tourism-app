const express = require('express');
const Activity = require('../models/activity'); // Adjust the path if necessary

const router = express.Router();

// Get all activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

module.exports = router;
