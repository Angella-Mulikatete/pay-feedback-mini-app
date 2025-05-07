const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res) =>{
    const { walletAddress, username, password} = req.body;

    try{
        const existingUser = await User.findOne({walletAddress});

        if(existingUser) return res.status(400).json({
            message: 'User already exists'
        });

        const passwordHash = password? await bcrypt.hash(password, 10): undefined;
        const user = new User({
            walletAddress,
            username,
            passwordHash
        });
        await user.save();

        const token = jwt.sign({id:user._id, walletAddress}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(201).json({ token, user });

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.login = async(req,res)=>{
    const { walletAddress, password } = req.body;

    try{
        const user = await User.findOne({walletAddress});

        if (!user) return res.status(400).json({ message: 'User not found'});

        if(user.passwordHash){
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, walletAddress }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user });

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};