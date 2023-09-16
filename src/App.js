import { useState, useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import game from "./PreloadScene";
import PlayScene from "./PlayScene";
import { IfOwnsNFT } from './NFTHelpers/GetNFTFromOwner';
export var user = "";
const { ethers } = require("ethers");
const abi = require("./NFTHelpers/SRN.json");
const contractABI = require("./NFTHelpers/Game.json")
const key = require("./NFTHelpers/key.json")
const nft_provider = new ethers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78');
const treasuryWallet = new ethers.Wallet(key.account_kareem, nft_provider)

function getMetaMaskAddress() {
  return new Promise((resolve, reject) => {
    // Check if MetaMask is installed and the provider is available
    if (typeof window.ethereum !== 'undefined') {
      // Request access to the provider (MetaMask)
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          // Accounts will be an array of addresses
          const address = accounts[0];
          user = address;
          resolve(address);
        })
        .catch((error) => {
          // Handle errors
          reject(error);
        });
    } else {
      // If MetaMask is not installed or not available
      reject(new Error('Please install MetaMask to use this feature.'));
    }
  });
}

const getUserAddress = async() => {
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

///////// we need to mint an nft here
const nft_contract_addr = "0x8F13103eb824ADD01632Bd001AC332F8bfD1358D";
const NFT_contract = new ethers.Contract(nft_contract_addr, contractABI.abi, treasuryWallet);


function App() {
  const [userAddress, setUserAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('0x8F13103eb824ADD01632Bd001AC332F8bfD1358D'); // Replace with your actual contract address
  const [ownsNFT, setOwnsNFT] = useState(null);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [mintNFT, setMintNFT] = useState(null);

  useEffect(() => {
    // Call the function to get the MetaMask addres
    getMetaMaskAddress()
      .then((address) => {
        setUserAddress(address);
        console.log("User Address is: "+ address)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    const checkNFTOwnership = async () => {
      try {
        if (!userAddress) {
          console.log("User address not available yet.");
          return false;
        }

        const ownsNFT = await IfOwnsNFT(userAddress, contractAddress);
        console.log("Owns NFT:", ownsNFT);
        setOwnsNFT(ownsNFT);
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
      }
    };

    checkNFTOwnership();
  }, [userAddress, contractAddress]);
//////////////
///////////////////

//////////////// mint function //////////
useEffect(() => {
  const mintNFT = async () => {
  let receipt;  
    try { 
  
  let recepient_address = userAddress ;//"0xF85f851479DD529D5C36648A51fd5696eeC7f290";
  let tokenId=77;
  
  console.log ("calling mint...")
  
  const call = await NFT_contract.mintCollectionNFT(recepient_address,
    {
        gasLimit: 500000,
        gasPrice: ethers.parseUnits("20", "gwei"),
    }      
    );
    receipt = await call.wait();
  console.log(JSON.stringify(receipt));
  console.log("minted to: "+ recepient_address);
    } catch(err) {
      console.log(`Error: ${err}`);
    }
    return receipt;
  };
  setMintNFT(() => mintNFT);
  mintNFT();
  }, [userAddress]);

  ////////////////////
  useEffect(() => {
    if (ownsNFT !== null && !gameInitialized) {
      // Initialize the game once the ownership check is complete
      setGameInitialized(true);
    }
  }, [ownsNFT, gameInitialized]);

  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 340,
    pixelArt: true,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [game, PlayScene]
  };

  return (
    <>
      <h1>Dino Game</h1>
      {userAddress ? (
        <p>User Address: {userAddress}</p>
      ) : (
        <p>Connect your MetaMask to see your address.</p>
      )}

      {ownsNFT === null ? (
        <p>Checking NFT ownership...</p>
      ) : ownsNFT ? (
        gameInitialized && <IonPhaser game={config} />
      ) : (
        <p>You do not own the NFT from this contract. Please acquire the NFT to play the game.</p>
      )}
        <button onClick={() => mintNFT()}>Mint NFT</button>
    </>
  );
}

export default App;