// scripts/sign.js
const {
    Wallet,
    parseEther,
    keccak256,
    hashMessage,
    AbiCoder,
    getBytes,
  } = require("ethers");
  
  // Replace with your actual private key (DO NOT SHARE THIS IN PUBLIC)
  const PRIVATE_KEY = "0xEfbB43f864543ea889d7e675af1c7e8d8acb75a22386e11115bc54614da5f5db8e6832aefd1413d5d68593802B9f60B2924D9A95";
  
  // User and message data
  const user = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const amount = parseEther("0.01");
  const message = "Thank you for the review!";
  const nonce = 0;
  
  async function main() {
    const wallet = new Wallet(PRIVATE_KEY);
  
    // Encode the data just like Solidity would
    const abiCoder = AbiCoder.defaultAbiCoder();
    const encodedData = abiCoder.encode(
      ["address", "uint256", "string", "uint256"],
      [user, amount, message, nonce]
    );
  
    // Hash the encoded data (mimics Solidity keccak256)
    const messageHash = keccak256(getBytes(encodedData));
  
    // Ethereum-style message hash (with prefix)
    const ethSignedHash = hashMessage(getBytes(messageHash));
  
    // Sign the hash
    const signature = await wallet.signMessage(getBytes(messageHash));
  
    console.log("Signature:", signature);
    console.log("Message Hash:", messageHash);
    console.log("Eth Signed Message Hash:", ethSignedHash);
  }
  
  main().catch(console.error);
  