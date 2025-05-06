const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    rewardAmount: {
        type: Number,
        required: true
    },
    category: String,
    active:{
        type:Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);