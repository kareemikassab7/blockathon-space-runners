// nftUtils.js

import { Alchemy, Network } from "alchemy-sdk";
const { ethers } = require("ethers");
//const fs = require("fs");

const abi = require("./Game.json")
const key = require("./key.json")



const provider = new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const signer = new ethers.Wallet(key.account, provider)

export const IfOwnsNFT = async (accountAddress, contractAddress) => {
    console.log("heeeeeeeeeeeeeeere")
    //try {
    let account_addr = await accountAddress;
    let contract_addr = await contractAddress;

    if (!account_addr || !contract_addr) {
        console.log("Inputs not provided yet.");
        return false;
    }
    console.log("con", contract_addr, "   acc", account_addr);

    const contract = new ethers.Contract(contract_addr, abi.abi, signer);
    const balance = await contract.balanceOf(account_addr);
    console.log(Number(balance))

    if (balance > 0) {
        // The account owns at least one NFT from the contract
        console.log('The account owns NFTs from the contract.');
        return true;
        // You can further retrieve the token IDs owned by the account and check if they match the NFT in question.
    } else {
        console.log('The account does not own any NFT from the contract.');
        return false
    }
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