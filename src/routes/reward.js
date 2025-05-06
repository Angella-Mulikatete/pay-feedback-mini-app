const express = require('express');
const router = express.Router();
const { issueReward, getUserRewards } = require('../controllers/reward');

router.post('/', issueReward);
router.get('/:userId', getUserRewards);

module.exports = router;
