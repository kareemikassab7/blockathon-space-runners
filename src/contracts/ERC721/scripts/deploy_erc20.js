const hardhat = require("hardhat");

async function main() {
    // Hardhat helper to get the ethers contractFactory object
    const SRNERC20 = await hardhat.ethers.getContractFactory('SRN');

    // Deploy the contract
    console.log('Deploying Game...');
    const erc20 = await SRNERC20.deploy();
    let addr = await erc20.getAddress();
    console.log(`Game deployed to: ${addr}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
