const {NeynarAPIClient} =  require('@neynar/nodejs-sdk');
const User = require('../models/User');

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

const publishFeedbackCast = async(userId, content) =>{

    const user = await User.findById(userId);

    if(!user) return;

    const castText = `Feedback submitted,: ${content}`;

    await client.publishCast({})

}