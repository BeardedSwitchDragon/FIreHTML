const GAMEWIDTH = window.innerWidth / 2;
const GAMEHEIGHT = window.innerHeight * 0.65;


class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");

    }

    preload() {
        this.load.spritesheet("playButton", "buttonSpritesheet2.png", {
            frameWidth: 85,
            frameHeight: 49
        });

    }

    create() {
        this.playButton = this.add.sprite(650, GAMEHEIGHT * 0.6, "playButton");
        //this.playButton.setOrigin(0.5, 0.5);
        this.add.existing(this.playButton);
        this.playButton.setScale(2.2);
        this.playButton.setDepth(2);

        this.playButton.setInteractive();

        this.playButton.on("pointerdown", () => {
            this.playButton.setFrame(1);
            console.log(this.testPointer.x);

        });


    }


}




var config = {
    type: Phaser.CANVAS, //<-- Pixel art tilesprites render better in canvas than WebGL
    mode: Phaser.Scale.FIT,
    width: GAMEWIDTH,
    height: GAMEHEIGHT,
    pixelArt: true,
    // zoom: 2,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update,
//
//slslslls
        physics: {
            default: 'arcade',
            debug: true


        },
//         extend: {
//             makePlayer: makePlayer,
//             shootProjectile: shootProjectile
//         }
//     }
    scene: [Intro],
    canvas: document.querySelector("game")
};


var game = new Phaser.Game(config);
