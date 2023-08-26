const { ethers } = require("ethers");

/**
 * @dev Get public address of the current user
 * @return User public address 
 */
export const getUserAddress = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = await provider.getNetwork().chainId;
    if (chainId === 80001) {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return address;
    } else {
        console.log("Please connect to mumbai testnet");
    }
}