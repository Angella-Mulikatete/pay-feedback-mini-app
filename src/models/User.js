const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fid:{
        type: Number,
        unique: true
    },
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

    socialHandle:{
        type: String
    }, //warpcast username

    points:{
        type: Number,
        default: 0
    },

    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    lastActivity: Date
});

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.models.User || mongoose.model('User', UserSchema);
