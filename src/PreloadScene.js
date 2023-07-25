import Phaser from 'phaser'; /*
import jumpAudio from './assets/jump.m4a';
import hitAudio from './assets/hit.m4a';
import reachAudio from './assets/reach.m4a';*/
import dino_hurt from './assets/dino-hurt-L.png';
import groundImg from './assets/ground-L.png';
import dino_idleImg from './assets/dino-idle-L.png';
import restartImg from './assets/retry.png';
import gameOverImg from './assets/game-over-P2.png';
import cloudImg from './assets/cloud-L.png';
import starImg from './assets/stars-L.png';
import moonImg from './assets/moon-L.png';
import dinoImg from './assets/dino-run-L.png';
import dino_downImg from './assets/dino-down-L.png';
import enemy_birdImg from './assets/ufo-L.png';
import obsticle_1Img from './assets/cactuses_small_1-L.png';
import obsticle_2Img from './assets/cactuses_small_2-L.png';
import obsticle_3Img from './assets/cactuses_small_3-L.png';
import obsticle_4Img from './assets/cactuses_big_1-L.png';
import obsticle_5Img from './assets/cactuses_big_2-L.png';
import obsticle_6Img from './assets/cactuses_big_3-L.png';
import galaxy from './assets/galaxy.png';

//import test from  "./assets/test1.png";
class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    /*
    this.load.audio('jump', jumpAudio);
    this.load.audio('hit', hitAudio);
    this.load.audio('reach', reachAudio);*/



    //this.load.image('test1', test );
    this.load.image('ground', groundImg);
    this.load.image('dino-idle', dino_idleImg);
    this.load.image('dino-hurt', dino_hurt);
    this.load.image('restart', restartImg);
    this.load.image('game-over', gameOverImg);
    this.load.image('cloud', cloudImg);
    this.load.image('galaxy', galaxy);
    this.load.spritesheet('star', starImg, {
      frameWidth: 9,
      frameHeight: 9
    });

    this.load.spritesheet('moon', moonImg, {
      frameWidth: 20,
      frameHeight: 40
    });

    this.load.spritesheet('dino', dinoImg, {
      frameWidth: 87,
      frameHeight: 94
    });

    this.load.spritesheet('dino-down', dino_downImg, {
      frameWidth: 118,
      frameHeight: 94
    });

    this.load.spritesheet('enemy-bird', enemy_birdImg, {
      frameWidth: 92,
      frameHeight: 77
    });

    this.load.image('obsticle-1', obsticle_1Img);
    this.load.image('obsticle-2', obsticle_2Img);
    this.load.image('obsticle-3', obsticle_3Img);
    this.load.image('obsticle-4', obsticle_4Img);
    this.load.image('obsticle-5', obsticle_5Img);
    this.load.image('obsticle-6', obsticle_6Img);
  }

  create() {
        this.scene.start('PlayScene');
  }
}

export default PreloadScene;
