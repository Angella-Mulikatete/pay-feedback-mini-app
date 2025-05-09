// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "D:\mnt\d\MINIAPP\base-foundry\base-foundry\src\Review_Reward.sol";

contract ReviewRewardTest is Test {
    ReviewReward public reviewReward;
    address public appAddress = address(this); // Simulating the mini app address (owner)
    address public user = vm.addr(1); // Simulating a user wallet
    address public trustedSigner = vm.addr(2); // Backend wallet that signs

    uint256 public userPrivateKey = 1;
    uint256 public signerPrivateKey = 2;

    function setUp() public {
        // Deploy contract with trusted signer
        reviewReward = new ReviewReward(trustedSigner);
        // Fund the contract with ETH
        vm.deal(address(reviewReward), 1 ether);
    }

    function testUserCanClaimReward() public {
        string memory message = "Thanks for the review!";
        uint256 amount = 0.01 ether;
        uint256 nonce = reviewReward.nonces(user);

        // Get signature
        bytes32 messageHash = reviewReward.getMessageHash(user, amount, message, nonce);
        bytes32 ethSignedMessageHash = reviewReward.getEthSignedMessageHash(messageHash);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Fund user with ETH to pay for gas (in simulation)
        vm.deal(user, 0.1 ether);

        // Simulate user calling the contract
        vm.prank(user);
        reviewReward.claimReward(amount, message, signature);

        // Assert balance increased
        assertEq(user.balance, 0.01 ether);
    }
}
