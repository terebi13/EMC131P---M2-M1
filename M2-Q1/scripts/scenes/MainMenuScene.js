export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super("MainMenuScene");
    }

    preload() { 
        this.load.image('background', "../assets/images/city.png");
        this.load.image('ground', "../assets/images/platform.png");
        this.load.image('playbg', "../assets/images/play.png");
        this.load.image('exit', "../assets/images/exit.png");
    }

    create() {

        this.add.image(400,300, 'background');

        this.add.image(400,568, 'ground').setScale(2);
        this.add.image(400, 200, 'playbg').setScale(1.1);
        
        let playText = this.add.text(400,200, "PLAY", {font: "45px"}).setOrigin(0.5);
        playText.setInteractive({ useHandCursor: true });
        playText.on('pointerdown', () => this.playButton());

        let creditText = this.add.text(310,320,"Credits", {font: "20px"}).setOrigin(0.5);
        creditText.setInteractive({ useHandCursor: true});
        creditText.on('pointerdown', () => this.creditButton());

        let quitImage = this.add.image(50,50, 'exit').setScale(1);
        quitImage.setInteractive({ useHandCursor: true });
        quitImage.on('pointerdown', () => {if (confirm("Quit game?")) {window.close()}});
    }
    
    playButton() {
        this.scene.start("GameScene");
    }

    creditButton() {
        this.scene.start("CreditScene");
    }
}