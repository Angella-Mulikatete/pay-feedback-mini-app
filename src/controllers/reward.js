const Reward = require('../models/Reward');


export const issueReward = async (req, res) => {
  try {
    const { user, campaign, amount, tokenType, txHash } = req.body;
    const reward = new Reward({ user, campaign, amount, tokenType, txHash });
    await reward.save();
    res.status(201).json(reward);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getUserRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.params.userId }).populate('campaign');
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
