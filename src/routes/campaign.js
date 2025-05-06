const express = require('express')
const router = express.Router();

const {getCampaigns, createCampaign} = require('../controllers/campaign');

router.route('/')
.get(getCampaigns)
.post(createCampaign);

module.exports = router;