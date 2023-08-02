
const { ethers } = require("ethers");

const abi = require("./Game.json")
const key = require("./key.json")

const provider = new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const signer = new ethers.Wallet(key.account, provider)

export const IfOwnsNFT = async (accountAddress, contractAddress) => {
    let account_addr = await accountAddress;
    let contract_addr = await contractAddress;

    if (!account_addr || !contract_addr) {
        console.log("Inputs not provided yet.");
        return false;
    }
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