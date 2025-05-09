// const asyncHandler = require('express-async-handler');
//const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const {publishFeedbackCast} = require('../services/farcasterService')

exports.submitFeedback = async(req, res ) => {
   try{
    const {userId, campaignId, feedbackText, rating, pointsEarned, onchainTxHash} = req.body

    const feedbacks = await Feedback.create({
        userId,
        campaignId,
        feedbackText,
        rating,
        pointsEarned, 
        onchainTxHash
    });

    //update user points
    await User.findByIdAndUpdate(userId, {
        $inc: {points:10 },
        $set: { lastActivity : new Date()}
    });

    await publishFeedbackCast(userId, feedbackText);

    res.status(201).json(feedbacks);
   }catch(err){
    res.status(400).json(err)
   }
}

export const getFeedbackForCampaign = async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ campaign: req.params.id }).populate('user');
      res.json(feedbacks);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };