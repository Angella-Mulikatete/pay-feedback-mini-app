// const asyncHandler = require('express-async-handler');
const Campaign = require('../models/Campaign');

export const getCampaigns = async(req, res) => {
    const { category, minReward } = req.query;

    const filter = {};

    if(category) filter.category = category;

    if(minReward) filter.rewardAmount = {$gte : minReward};

    const campaigns = await Campaign.find(filter);
    res.json(campaigns);
};

export const createCampaign = async(req, res) => {
    try{
        // const {title, description, rewardAmount, category} = req.body;

        const campaign = new Campaign(req.body);
        await campaign.save();

        res.status(200).json(campaign);
    }catch(err){
        res.status(400).json(err)
    }
}

export const getCampaignById = async(req, res) =>{
    try{
        const campaign = await Campaign.findById(req.params.id).populate('creator');
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(campaign);
    }catch(err){
        res.status(400).json(err)
    }
}