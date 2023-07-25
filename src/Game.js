import Phaser from 'phaser';

import eagle from "./assets/dino-hurt-L.png";
import ground from "./assets/mario-sprite-ground.png"
class Game extends Phaser.Scene {
    constructor() {
      super('Game');
    }

preload(){
this.load.image("eagle", eagle);
this.load.image("ground", ground);
}

create(){
    this.test = this.add.image(400,200,"eagle")
    this.test = this.add.image(400,400,"ground")
}


}

export default Game;