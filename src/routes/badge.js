const express = require('express');
const router = express.Router();
const { mintBadge, createBadge  } = require('../controllers/badge');

router.post('/', createBadge);
// Get all feedback for a campaign
router.get('/:mint', mintBadge);

module.exports = router;
