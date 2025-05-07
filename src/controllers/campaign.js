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

exports.listCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ active: true }).populate('createdBy', 'username');
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.closeCampaign = async(req, res) => {
    try{
        const campaign = await Campaign.findById(req.params.id);

        if(!campaign) return res.status(404).json({ message: 'Campaign not found' });

        if(campaign.createdBy.toString()!= req.user.id) return res.status(403).json({ message: 'Forbidden' });

        campaign.active = false;
        await campaign.save();
        res.json({message: 'Campaign Closed'})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}