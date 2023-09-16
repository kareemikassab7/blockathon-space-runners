import { useState, useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import game from "./PreloadScene";
import PlayScene from "./PlayScene";
import { IfOwnsNFT } from './NFTHelpers/GetNFTFromOwner';
import { mintNFT } from "./Utils/dino-utils";
import { CONTRACT_ADDRESS } from './Utils/dino-constants';
export var user = "";

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


function App() {
  const [userAddress, setUserAddress] = useState('');
  const [ownsNFT, setOwnsNFT] = useState(null);
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    // Call the function to get the MetaMask addres
    getMetaMaskAddress()
      .then((address) => {
        setUserAddress(address);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    const checkNFTOwnership = async () => {
      try {
        if (!userAddress) {
          return false;
        }

        const ownsNFT = await IfOwnsNFT(userAddress, CONTRACT_ADDRESS);
        setOwnsNFT(ownsNFT);
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
      }
    };

    checkNFTOwnership();
  }, [userAddress]);

  const mintToken = async () => {
    mintNFT(userAddress);
  }

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
        <button onClick={mintToken}>Mint NFT</button>
    </>
  );
}

export default App;