// nftUtils.js

import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "XnYsgkad_ym1FYlOslEstnMu3l284qOw",
    network: Network.POLYGONZKEVM_TESTNET,
};

const alchemy = new Alchemy(config);

export const IfOwnsNFT = async (ownerAddress, NFT_Contract) => {
    // Get all NFTs
    const ownedNfts = await alchemy.nft.getNftsForOwner(ownerAddress);

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
    }

    return foundNFT;
};
