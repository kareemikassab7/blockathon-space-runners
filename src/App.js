//import { useState } from 'react'
//import React from "react";
import './App.css'
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import game from "./PreloadScene"
/*import PreloadScene from "./PreloadScene";
*/import PlayScene from "./PlayScene";

function App() {

  
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


return(
    <>
        <IonPhaser game={config} initialize={true} />

    </>
)

}

export default App