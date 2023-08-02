// nftUtils.js

import { Alchemy, Network } from "alchemy-sdk";
const { ethers } = require("ethers");
//const fs = require("fs");

//const abi = require("./ABI.json")


const config = {
    apiKey: "XnYsgkad_ym1FYlOslEstnMu3l284qOw",
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(config);



export const IfOwnsNFT = async (ownerAddress, NFT_Contract) => {
    // Get all NFTs
    /*const ownedNfts = await alchemy.nft.getNftsForOwner(ownerAddress);

    let foundNFT = null;

    for (const nft of ownedNfts) {
        if (nft.contract.address === NFT_Contract) {
            foundNFT = nft;
            break; // We found the NFT, no need to continue searching
        }
    }

    if (foundNFT) {
        console.log("NFT found!");
        console.log("Title:", foundNFT.title);
        console.log("Description:", foundNFT.description);
        console.log("Token URI:", foundNFT.tokenUri.raw);
        // Add more properties you want to display
    } else {
        console.log("NFT not found with the predetermined contract address.");
    }*/

    return true;
};

/*
async function checkNFTOwnership(userAddress, contractAddress) {
    try {
        // Connect to the ERC721 contract
        const provider = new ethers.providers.JsonRpcProvider(); // Use your preferred provider here
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Call the balanceOf function to get the number of NFTs owned by the user
        const balance = await contract.balanceOf(userAddress);

        // If the balance is greater than 0, the user owns NFTs
        return balance.toNumber() > 0;
    } catch (error) {
        console.error("Error checking NFT ownership:", error);
        return false;
    }
}*/