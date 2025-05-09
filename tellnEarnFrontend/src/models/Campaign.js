const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    media:{
        type:[String] //links to images/files etc
    },
    description: String,

    rewardType:{
        type: String,
        enum: ['USDC', 'Token', 'Points'],
        default: 'Points'
    },
    rewardAmount: {
        type: Number,
        required: true
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    category: String,
    status: {
        type: String,
        enum: ['active', 'paused', 'ended'],
        default: 'active'
    },
    active:{
        type:Boolean,
        default: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);