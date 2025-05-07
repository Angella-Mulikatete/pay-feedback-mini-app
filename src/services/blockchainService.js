const {ethers} = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress= process.env.CONTRACT_ADDRESS;

const contractABI = require('../contracts/FeedbackCampaignABI.json');
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

exports.submitFeedbackOnchain = async(userWallet, campaignId) => {
    const tx = await contract.submitFeedback(campaignId, feedbackHash, { from: userWallet});
    await tx.wait();
}

exports.claimRewardOnchain = async (userWallet, feedbackId) => {
    const tx = await contract.claimReward(feedbackId, { from: userWallet });
    await tx.wait();
    return tx.hash;
};