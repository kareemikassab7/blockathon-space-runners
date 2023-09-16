const { ethers } = require("ethers");
const contractABI = require("../NFTHelpers/Game.json");
const { ethereum } = window;
const provider = new ethers.BrowserProvider(ethereum);
const signerUser = await provider.getSigner();

export const mintNFT = async (recepient_address) => {

    const nft_contract_addr = "0x8F13103eb824ADD01632Bd001AC332F8bfD1358D";
    const NFT_contract_user = new ethers.Contract(nft_contract_addr, contractABI.abi, signerUser);

    let receipt;  
    try {
        const call = await NFT_contract_user.mintCollectionNFT(recepient_address,
        {
            gasLimit: 500000,
            gasPrice: ethers.parseUnits("20", "gwei"),
        }      
        );
        receipt = await call.wait();
    } catch(err) {
    console.log(`Error: ${err}`);
    }
    return receipt;
};