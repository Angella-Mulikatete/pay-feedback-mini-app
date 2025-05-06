
const User = require('../models/User');

exports.getUser = async(req , res) => {
    const user = await User.findById(req.params.id).populate('feedbacks').exec();

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
}

exports.createUser = async(req, res) => {
    const {username, points, badges, lastActivity} = req.body;

    const user = await User.create({
        username,
        points,
        badges,
        lastActivity
    });

    res.status(200).json(user);
}