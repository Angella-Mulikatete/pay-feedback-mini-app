const Feedback = require('../models/Feedback');
const Reward = require('../models/Reward');
const { create } = require('ipfs-http-client');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + Buffer.from(process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_PROJECT_SECRET).toString('base64'),
  },
});

exports.exportUserDataToIPFS = async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedbacks = await Feedback.find({ userId });
    const rewards = await Reward.find({ userId });

    const data = {
      feedbacks,
      rewards,
      exportedAt: new Date(),
    };

    const { path } = await ipfs.add(JSON.stringify(data));
    const ipfsUrl = `https://ipfs.infura.io/ipfs/${path}`;

    res.json({ ipfsUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
