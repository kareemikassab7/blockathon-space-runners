const hardhat = require("hardhat");

async function main() {
  // Hardhat helper to get the ethers contractFactory object
  const NonFunToken = await hardhat.ethers.getContractFactory('Game');

  // Deploy the contract
  console.log('Deploying Game...');
  const nonFunToken = await NonFunToken.deploy();
  let addr = await nonFunToken.getAddress();
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
