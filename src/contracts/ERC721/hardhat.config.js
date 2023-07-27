require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545"
    },
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["c3a265c1701040c053bcc180f4f1f38c1ec5001d54181fce9abca792b607879b"],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};