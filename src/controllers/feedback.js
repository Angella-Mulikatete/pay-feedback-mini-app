// const asyncHandler = require('express-async-handler');
//const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

exports.submitFeedback = async(req, res ) => {
    const {userId, campaignId, feedbackText, rating} = req.body

    const feedbacks = await Feedback.create({
        userId,
        campaignId,
        feedbackText,
        rating
    });

    //update user points
    await User.findByIdAndUpdate(userId, {
        $inc: {points:10 },
        $set: { lastActivity : new Date()}
    });

    res.status(201).json(feedbacks);
}