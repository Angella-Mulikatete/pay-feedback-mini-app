const express = require('express')
const router = express.Router();

const {getCampaigns, createCampaign, getCampaignById} = require('../controllers/campaign');

// router.route('/')
// .get(getCampaigns)
// .post(createCampaign);

router.post('/', createCampaign);

// Get all campaigns
router.get('/', getCampaigns);

// Get a single campaign by ID
router.get('/:id', getCampaignById);

module.exports = router;