
const User = require('../models/User');

exports.getUser = async(req , res) => {
    const user = await User.findById(req.params.id).populate('feedbacks').exec();

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
}

export const createUser = async(req, res) => {
   try{
    const {walletaddress, username, profileImage, socialHandle} = req.body;

    const newUser = await User.create({
        walletaddress,
        username,
        profileImage,
        socialHandle
    });

    await newUser.save()

    res.status(201).json(newUser);
   }catch(err){
    res.status(400).json(err);
   }
}