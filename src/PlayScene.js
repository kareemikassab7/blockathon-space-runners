import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;

    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    //this.galaxy = this.add.tileSprite(0, height, 2500, width, 'galaxy ').setOrigin(0, 1)
    this.ground = this.add.tileSprite(0, height, 240, 26, 'ground').setOrigin(0, 1)
    this.dino = this.physics.add.sprite(0, height, 'dino-idle').setOrigin(0,1).setCollideWorldBounds(true).setGravityY(5000).setDepth(1).setBodySize(44, 92)
    this.isGameRunning = false; // make this false to stop game later
    this.respawnTime = 0;
    this.coinRespawnTime = 0;
    this.gameSpeed=10; // for moving ground
    this.score = 0; //starting score
    this.coinsCount=0; // number of coins collected

    this.input.keyboard.enabled = true;
    this.game.canvas.focus();

    this.scoreText = this.add.text(width, 0, "00000", {fill: "#800080", font: '900 35px Courier', resolution: 5})
    .setOrigin(1, 0)
    .setAlpha(0);

    this.highScoreText = this.add.text(0, 0, "00000", {fill: "#0FFFFF", font: '900 35px Courier', resolution: 5})
    .setOrigin(1, 0)
    .setAlpha(0);

    this.coinText = this.add.text(240, 0, "00000", {fill: "#a67c00", font: '900 25px Courier', resolution: 5})
    .setOrigin(1, 0)
    .setAlpha(0);

    this.environment = this.add.group();
    this.environment.addMultiple([
      this.add.image(width / 2, 170, 'cloud'),
      this.add.image(width - 80, 80, 'cloud'),
      this.add.image((width / 1.3), 100, 'cloud'),
      this.add.image((width-100), 90, 'planet1'),
      this.add.image((width/3), 130, 'planet2'),
      this.add.image((width/3)-200, 130, 'cloud'),
      //this.add.image((width/1.5), 180, 'alien1'),
    ]);
    this.environment.setAlpha(0);

    this.gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0)
    this.gameOverText = this.add.image(0, 0, 'game-over');
    this.restart = this.add.image(0, 80, 'restart').setInteractive();
    this.gameOverScreen.add([
      this.gameOverText,  this.restart
    ])

    this.obsticles = this.physics.add.group();
    this.coins= this.physics.add.group();    


    //this.createStars();
    this.initAnims();
    this.initColliders();
    this.initCoinCollider();
    this.initStartTrigger();
    this.handleInputs();
    this.handleScore();
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


  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(this.startTrigger, this.dino, () => {
      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, height);
        return;
      }

      this.startTrigger.disableBody(true, true);

      const startEvent =  this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          this.dino.setVelocityX(80);
          this.dino.play('dino-run', 1);

          if (this.ground.width < width) {
            this.ground.width += 17 * 2;
          }

          if (this.ground.width >= 1000) {
            this.ground.width = width;
            this.isGameRunning = true;
            this.dino.setVelocityX(0);
            this.scoreText.setAlpha(1);
            this.coinText.setAlpha(1);
            this.environment.setAlpha(1);
            startEvent.remove();
          }
        }
      });
    }, null, this)
  }

  /*createStars(){
    
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 14,
      setXY: { x: 12, y: 0, stepX: 50 }
  });
  
  this.coins.children.iterate(function (child) {
  
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });

  this.physics.add.collider(this.dino, this.coins);
  this.physics.add.overlap(this.dino, this.coins, this.collectCoins, null, this);

  }

  collectCoins(player, coin){
    coin.disableBody(true,true);
  }*/
  
  placeCoins(){
    let coin;
    coin = this.coins.create(this.game.config.width, this.game.config.height, `coin`)
        .setOrigin(0, 1);
    coin.body.offset.y = +10;
    coin.setImmovable();
  }

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);

    let obsticle;
    if (obsticleNum > 6) {
      const enemyHeight = [20, 50];
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)], `enemy-bird`)
        .setOrigin(0, 1)
        obsticle.play('enemy-dino-fly', 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    } else {
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height, `obsticle-${obsticleNum}`)
        .setOrigin(0, 1);

     obsticle.body.offset.y = +10;
    }

    obsticle.setImmovable();
  }


  initColliders() {
    this.physics.add.collider(this.dino, this.obsticles, () => {
      this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

      const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
      const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;

      this.highScoreText.setText('HI ' + newScore);
      this.highScoreText.setAlpha(1);

      this.physics.pause();
      this.isGameRunning = false;
      this.anims.pauseAll();
      this.dino.setTexture('dino-hurt');
      this.respawnTime = 0;
      this.coinRespawnTime=0;
      this.gameSpeed = 7;
      this.gameOverScreen.setAlpha(1);
      this.score = 0;


      /// call contract 
      //this.coinsCount=0; // wont zero that cuz ur gathering coins ERC20
      //this.hitSound.play();
    }, null, this);
  }


  initCoinCollider(){
    this.physics.add.collider(this.dino, this.coins, () => {
      this.coinsCount += 1;
      console.log("coin count" + this.coinsCount);
      //this.hitSound.play();
      
      //this.coins.children.clear(true, true);
      //let coin= this.coins.getChildren();
      //this.coins.remove(coin,true,true)
      this.physics.add.overlap(this.dino, this.coins, this.collectCoins, null, this);
    }, null, this);
  }

  collectCoins(player, coin){
    coin.disableBody(true,true);
            //update coins text
            const coinCtr = Array.from(String(this.coinsCount), Number);
            for (let i = 0; i < 5 - String(this.coinsCount).length; i++) {
              coinCtr.unshift(0);
            }
            this.coinText.setText("SRN Tokens:" + this.coinsCount);
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000/10, // 10 times per sec
      loop: true,
      callbackScope: this,
      callback: () => { //called each time we call
        if (!this.isGameRunning) { return; } // only if the game is running

        this.score++;
        this.gameSpeed += 0.01

        if (this.score % 100 === 0) {
          //this.reachSound.play();

          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true
          })
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(''));

      }
    })
  }


  handleInputs(){
    console.log("handle inputs called")

    // need to go to main menu with another button
    this.restart.on('pointerdown', () => {
      this.dino.setVelocityY(0);
      this.dino.body.height = 92;
      this.dino.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.coins.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    })
    //jumping
    this.input.keyboard.on('keydown-SPACE',()=>{
     // console.log("read space")
     //this.dino.body.setSize([],92,0)
     this.dino.body.height = 92;
     this.dino.body.offset.y = 0;
     if(!this.dino.body.onFloor()){return;} //uncomment to jump only if on ground
     this.dino.setVelocityY(-1600);
    })

    //ducking
    this.input.keyboard.on('keydown-DOWN', () => {
     // console.log("ducking down")
      if (!this.dino.body.onFloor() || !this.isGameRunning) { return; }
      //this.dino.body.setSize([],58,34)
      this.dino.body.height = 58;
      this.dino.body.offset.y = 34;

    })

    this.input.keyboard.on('keyup-DOWN', () => {
      if (!this.dino.body.onFloor() || !this.isGameRunning) { return; }
      //this.dino.body.setSize([],92,0)
      this.dino.body.height = 92;
      this.dino.body.offset.y = 0;
      //console.log("ducking down")

    })

  }

  update(time,delta){
    if (!this.isGameRunning) { return; }

  this.ground.tilePositionX+= this.gameSpeed;
  Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
  Phaser.Actions.IncX(this.coins.getChildren(), -this.gameSpeed);
  Phaser.Actions.IncX(this.environment.getChildren(), - 1.5);

  this.respawnTime += delta * this.gameSpeed * 0.08;
  if (this.respawnTime >= 1500) {
    this.placeObsticle();
    this.respawnTime = 0;
  }

  this.coinRespawnTime += delta * this.gameSpeed * 0.08;
  if (this.coinRespawnTime >= 200) {
    this.placeCoins();
    this.coinRespawnTime = 0;
  }


  // to clean objects from memory when out of screen // need one for coins
  this.obsticles.getChildren().forEach(obsticle => {
    if (obsticle.getBounds().right < 0) {
      this.obsticles.killAndHide(obsticle);
      //obsticle.destroy()
      //console.log("destroyed")
    }
  })

    // to clean objects from memory when out of screen // need one for coins
    this.coins.getChildren().forEach(coin => {
      if (coin.getBounds().right < 0) {
        this.coins.killAndHide(coin);
        //obsticle.destroy()
        //console.log("destroyed")
      }
    })

  //when clouds go out of bound load them at the start of screen again
  this.environment.getChildren().forEach(env => {
    if (env.getBounds().right < 0) {
      env.x = this.game.config.width + 30;
    }
  })

  if (this.dino.body.deltaAbsY() > 0) {
    this.dino.anims.stop();
    this.dino.setTexture('dino', 0);
  } else {
    this.dino.body.height <= 58 ? this.dino.play('dino-down-anim', true) : this.dino.play('dino-run', true);
  }
  }


}

export default PlayScene;