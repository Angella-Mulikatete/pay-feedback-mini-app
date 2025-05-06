const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbackForCampaign } = require('../controllers/feedback');

router.post('/', submitFeedback);
// Get all feedback for a campaign
router.get('/:id', getFeedbackForCampaign);

module.exports = router;
