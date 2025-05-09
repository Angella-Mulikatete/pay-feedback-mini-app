const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    feedbackText:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    onchainTxHash: {
        type: String // if proof-of-feedback is store onchain
    },
    pointsEarned:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema)