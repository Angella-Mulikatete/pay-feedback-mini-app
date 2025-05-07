const Campaign = require('../models/Campaign');

exports.listPendingCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ active: true, verified: { $ne: true } });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    campaign.verified = true;
    await campaign.save();
    res.json({ message: 'Campaign verified' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
