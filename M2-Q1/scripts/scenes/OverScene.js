export default class OverScene extends Phaser.Scene{

     constructor(){
        super("OverScene");
     }

     init (data) { // get data score from gamescene

        console.log('init', data);
        this.finalScore = data.score;
        
     }
   
     preload() {

        this.load.image('background', "../assets/images/city.png");
        this.load.image('ground', "../assets/images/platform.png");
        this.load.image('gobg', "../assets/images/gameover.png");
        this.load.image('main', "../assets/images/main.png");
        this.load.image('retry', "../assets/images/retry.png");
     }

     create() {

        this.add.image(400,300, 'background');

        this.add.image(400,568, 'ground').setScale(2);

        this.add.image(400,280, 'gobg').setScale(.4);

        this.add.text(400,280, "GAME OVER !", {font: "60px"}).setOrigin(0.5);

        this.add.text(400, 200, 'Score: ' + this.finalScore, {fontSize: '30px', fill:'#FFFFFF' }).setOrigin(0.5);

        let mainImage = this.add.image(750,50, 'main').setScale(1);
        mainImage.setInteractive({ useHandCursor: true });
        mainImage.on('pointerdown', () => this.mainButton());

        let retryImage = this.add.image(750,120, 'retry').setScale(1);
        retryImage.setInteractive({ useHandCursor: true });
        retryImage.on('pointerdown', () => this.retryButton());
     }

     mainButton() {
        this.scene.start("MainMenuScene");
     }
     retryButton() {
        this.scene.start("GameScene");
     }

}