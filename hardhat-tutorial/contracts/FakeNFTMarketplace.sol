// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FakeNFTMarketplace {

    //Maps tokenIDs to their owner
    mapping( uint256 => address) public tokens; 

    uint256 nftPrice = 0.001 ether;

    // purchase() : takes ETH and marks msg.sender address as the owner of that nft
    function purchase (uint256 _tokenId) external payable{
        require(msg.value == nftPrice, "Not enough eth!!");

        //checking whether the given tokenId has already been sold or not
        // address(0) is a default address which is
        // address(0) = 0x0000000000000000000000000000000000000000 ,null
        // so if is belongs to null address it means it is not sold yet
        require(tokens[_tokenId] == address(0), "nft already sold");

        tokens[_tokenId] = msg.sender;
    }
    // grtting price of nft which is 0.001 ether
    function getPrice () external view returns (uint256){
        return nftPrice; 
    }

    //checking whether the given tokenId has already been sold or not
    function available (uint256 _tokenId) external view returns (bool){
        if(tokens[_tokenId] == address(0)){
            return true;
        }
        return false;
    }
}