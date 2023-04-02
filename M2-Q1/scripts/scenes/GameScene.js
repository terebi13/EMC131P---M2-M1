export default class GameScene extends Phaser.Scene{

    constructor() {
        super("GameScene");
    }

    init () {

        this.player;
        this.platforms;
        this.stars;
        this.cursors;
        this.scoreText;
        this.score=0;
        this.i;
        // this.finalScore = data.score;
        this.color = ['0xE81616','0xE87F16','0xF2E515','0x21C002','0x0081F3','0x4B0082','0xAE0DFF'];
    }

    preload () {
        this.load.image('background', "../assets/images/city.png");
        this.load.image('ground', "../assets/images/platform.png");
        this.load.image('star', "../assets/images/star.png");
        this.load.image('bomb', "../assets/images/bomb.png");
        this.load.spritesheet('dude', "../assets/images/catcher.png",
           { frameWidth: 50, frameHeight: 49} 
        );

    }

    create() {
        this.add.image(400,300, 'background');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400,568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    
        this.player = this.physics.add.sprite(100, 400, 'dude');
    
        this.player.setBounce(.3);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player,this.platforms);

        this.anims.create({
        key: 'left',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 1,
        });
    
        this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 20
        });
    
        this.anims.create({
        key: 'right',
        frames: [ { key: 'dude', frame: 2 } ],
        frameRate: 1,
        });

        this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
        });

        this.stars.children.iterate(function (child)  {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

        function collectStar (player, star) {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('Stars Collected: ' + this.score);
  
        if (this.stars.countActive(true) < 10) {
            this.stars.create(Phaser.Math.RND.between(0, 700), Phaser.Math.RND.between(0, 500), 'star');
        }

        this.player.setTint(this.color[0]);
        this.color.shift();
        if(this.color.length===0) {
            this.color.push('0xE81616','0xE87F16','0xF2E515','0x21C002','0x0081F3','0x4B0082','0xAE0DFF');
        }
 
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        if(this.score % 5 == 0){
            this.player.scale += 0.1;
            
            this.bomb = this.bombs.create(x, 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
       }
       } 

       this.bombs = this.physics.add.group();

       this.physics.add.collider(this.bombs, this.platforms);
       this.physics.add.overlap(this.player, this.bombs, hitBomb, null, this);

       function hitBomb (player, bomb) {
        
        this.physics.pause();
        this.player.setTint('0xE81616');
        this.player.anims.play('turn');
        this.gameOver = true;

        if(this.gameOver = true) {
            this.scene.start("OverScene", { score: this.score});
        }
    }
    this.scoreText = this.add.text(16, 16, 'Stars Collected: 0', {fontSize: '30px', fill:'#FFFFFF' });
    
    this.cursors = this.input.keyboard.createCursorKeys();
}


    update () {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

}