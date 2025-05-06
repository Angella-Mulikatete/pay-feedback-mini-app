// const asyncHandler = require('express-async-handler');
const Campaign = require('../models/Campaign');

exports.getCampaigns = async(req, res) => {
    const { category, minReward } = req.query;

    const filter = {};

    if(category) filter.category = category;

    if(minReward) filter.rewardAmount = {$gte : minReward};

    const campaigns = await Campaign.find(filter);
    res.json(campaigns);
};

exports.createCampaign = async(req, res) => {
    const {title, description, rewardAmount, category} = req.body;

    const campaign = await Campaign.create({
        title,
        description,
        rewardAmount,
        category
    });

    res.status(200).json(campaign);
}