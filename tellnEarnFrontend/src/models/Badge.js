const mongoose = require('mongoose')

const BadgeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{type: String},
    imageUrl: {type: String},
    condition: { type: String }, // e.g., "10 reviews", "5-star avg"
    tokenId: { type: String }, // If minted as NFT
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

export default mongoose.models.Badge || mongoose.model('Badge', BadgeSchema);