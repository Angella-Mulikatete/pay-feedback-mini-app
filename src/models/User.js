const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },

    points:{
        type: Number,
        default: 0
    },

    badges: [String],
    lastActivity: Date
});

module.exports = mongoose.model('User', UserSchema);
