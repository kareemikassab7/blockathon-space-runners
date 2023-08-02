import { useState, useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import game from "./PreloadScene";
import PlayScene from "./PlayScene";
import { IfOwnsNFT } from './NFTHelpers/GetNFTFromOwner';

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
  const [contractAddress, setContractAddress] = useState('0x1E92Ca3c16cD85d6df6Fb3b6B85B413BDa67B939'); // Replace with your actual contract address
  const [ownsNFT, setOwnsNFT] = useState(null);
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    // Call the function to get the MetaMask address
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
    </>
  );
}

export default App;