const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalPoints:{
        type: Number,
        default: 0
    },
    badges: { type: [String], default: [] },
});

module.exports = mongoose.model('Point', pointSchema);