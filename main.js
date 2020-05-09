


//BIIIG thanks to KingCosmic & samme on discord for helping me solve a bunch of bugs
const GAMEWIDTH = window.innerWidth / 2;
const GAMEHEIGHT = window.innerHeight * 0.65;
var config = {
    type: Phaser.CANVAS, // <--- Pixel art tilesprites render better in canvas than WebGL.
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
    scene: [BootScene, LoadingScene, Intro, MainGame],
    canvas: document.querySelector("game")
};


var game = new Phaser.Game(config);

// var player;
// var leftKey;
// var rightKey;
