const { ethers } = require("hardhat");

async function main() {
    // Get the signer account to mint the NFT
    const [deployer] = await ethers.getSigners();

    // Replace with the actual contract address after deployment
    const contractAddress = "0x8F13103eb824ADD01632Bd001AC332F8bfD1358D";
    const tokenId = 1; // The desired token ID to mint

    // Get the contract instance
    const Game = await ethers.getContractFactory("Game");
    const contract = await Game.attach(contractAddress);

    try {
        console.log("Minting NFT...");
        const tx = await contract.mintCollectionNFT(deployer.address, tokenId);
        await tx.wait();
        console.log(`NFT minted successfully with transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Script error:", error);
        process.exit(1);
    });
