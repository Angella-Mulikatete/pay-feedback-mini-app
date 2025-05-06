const express = require('express');
const router = express.Router();
const { issueReward, getUserRewards } = require('../controllers/reward');

router.post('/', issueReward);
// Get all feedback for a campaign
router.get('/:userId', getUserRewards);

module.exports = router;
