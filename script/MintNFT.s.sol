// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/MyNFT.sol"; // Adjust if your contract path differs

contract MintNFTScript is Script {
    function run() external {
        // Load deployer's private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy contract
        MyNFT nft = new MyNFT();

        // Mint token ID 1 to a specified user address
        address recipient = vm.envAddress("RECIPIENT");
        nft.mint(recipient, 1);

        console2.log("NFT minted to:", recipient);
        console2.log("Token ID:", 1);
        console2.log("Deployed contract address:", address(nft));

        vm.stopBroadcast();
    }
}
