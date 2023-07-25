import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
    this.ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1)
    this.dino = this.physics.add.sprite(0, height, 'dino-idle').setOrigin(0,1).setCollideWorldBounds(true).setGravityY(5000)

    this.gameSpeed=10; // for moving ground
    this.input.keyboard.enabled = true;
    this.game.canvas.focus();


    this.initAnims();
    this.handleInputs();
  }

  initAnims() {
    this.anims.create({
      key: 'dino-run',
      frames: this.anims.generateFrameNumbers('dino', {start: 2, end: 3}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'dino-down-anim',
      frames: this.anims.generateFrameNumbers('dino-down', {start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-dino-fly',
      frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })
  }

  handleInputs(){
    console.log("handle inputs called")

    //jumping
    this.input.keyboard.on('keydown-SPACE',()=>{
     // console.log("read space")
     this.dino.body.height = 92;
     this.dino.body.offset.y = 0;
     if(!this.dino.body.onFloor()){return;} 
     this.dino.setVelocityY(-1600);
    })

    //ducking
    this.input.keyboard.on('keydown-DOWN', () => {
      console.log("ducking down")

      if (!this.dino.body.onFloor() || !this.isGameRunning) { return; }
      this.dino.body.height = 58;
      this.dino.body.offset.y = 34;

    })

    this.input.keyboard.on('keyup-DOWN', () => {
      if (!this.dino.body.onFloor() || !this.isGameRunning) { return; }
      this.dino.body.height = 92;
      this.dino.body.offset.y = 0;
      console.log("ducking down")

    })

  }

  update(){
  this.ground.tilePositionX+= this.gameSpeed;

  if (this.dino.body.deltaAbsY() > 0) {
    this.dino.anims.stop();
    this.dino.setTexture('dino', 0);
  } else {
    this.dino.body.height <= 58 ? this.dino.play('dino-down-anim', true) : this.dino.play('dino-run', true);
  }
  }


}

export default PlayScene;