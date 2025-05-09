const mongoose = require('mongoose')

const RewardSchema =  new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    amount: { type: Number },
    tokenType: { type: String, enum: ['USDC', 'Token', 'Points'] },
    txHash: { type: String },
    createdAt: { type: Date, default: Date.now },

});

export default mongoose.models.Reward || mongoose.model('Reward', RewardSchema);