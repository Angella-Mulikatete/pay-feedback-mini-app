// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/MyNFT.sol"; // adjust path if needed

contract MyNFTTest is Test {
    MyNFT nft;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this); // this test contract is the deployer
        user1 = vm.addr(1);
        user2 = vm.addr(2);
        nft = new MyNFT();
    }

    function testMintByOwner() public {
        nft.mint(user1, 1);
        assertEq(nft.ownerOf(1), user1);
    }

    function testFailMintByNonOwner() public {
        vm.prank(user2); // pretend to be user2
        nft.mint(user2, 2); // should revert: "not contract owner"
    }

    function testMintingAndTransferOwnership() public {
        nft.mint(user1, 3);
        nft.transferOwnership(user1);
        vm.prank(user1);
        nft.mint(user2, 4);
        assertEq(nft.ownerOf(4), user2);
    }
}
