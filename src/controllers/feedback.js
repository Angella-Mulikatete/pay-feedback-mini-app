// const asyncHandler = require('express-async-handler');
//const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

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

    res.status(201).json(feedbacks);
   }catch(err){
    res.status(400).json(err)
   }
}