export default class CreditScene extends Phaser.Scene{

    constructor() {
        super("CreditScene")
    }

    preload() {

        this.load.image('background', "../assets/images/city.png");
        this.load.image('ground', "../assets/images/platform.png");
        this.load.image('back', "../assets/images/back.png");
    }

    create() {

        this.add.image(400,300, 'background');

        this.add.image(400,310, 'ground').setScale(5.5);

        this.add.text(400, 250, "CREDITS:", {font: "30px Avenir Next LT Pro"}).setOrigin(0.5);
        this.add.text(400, 300,"Debbie Shane L. Getigan", {font: "35px Avenir Next LT Pro"}).setOrigin(0.5);
        this.add.text(400, 340,"A223", {font: "30px Avenir Next LT Pro"}).setOrigin(0.5);
        this.add.text(400, 370,"BSEMC", {font: "30px Avenir Next LT Pro"}).setOrigin(0.5);

        let backImage = this.add.image(50,50, 'back').setScale(1);
        backImage.setInteractive({ useHandCursor: true });
        backImage.on('pointerdown', () => this.backButton());
    }
    backButton() {

        this.scene.start("MainMenuScene")
    }
}