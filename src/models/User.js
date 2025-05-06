const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    walletaddress:{
        type:String,
        required: true,
        unique: true
    },

    username:{
        type:String,
        required: true,
        unique: true
    },

    profileImage:{
        type: String
    },

    points:{
        type: Number,
        default: 0
    },

    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    lastActivity: Date
});

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.models.User || mongoose.model('User', UserSchema);
