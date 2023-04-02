import MainMenuScene from './scenes/MainMenuScene.js'; //imports
import GameScene from './scenes/GameScene.js';
import CreditScene from './scenes/CreditScene.js';
import OverScene from './scenes/OverScene.js';

let mainMenuScene = new MainMenuScene();
let gameScene = new GameScene();
let creditScene = new CreditScene();
let overScene = new OverScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

game.scene.add("MainMenuScene", mainMenuScene);
game.scene.add("GameScene", gameScene);
game.scene.add("CreditScene", creditScene);
game.scene.add("OverScene", overScene);

game.scene.start("MainMenuScene");

