
 const Badge = require('../models/Badge');
 const User = require('../models/User')

export const mintBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    // Add badge to user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { badges: badgeId },
    });

    res.status(200).json({ message: 'Badge granted' });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (err) {
    res.status(400).json(err);
  }
};
