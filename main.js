


//BIIIG thanks to KingCosmic & samme on discord for helping me solve a bunch of bugs
const GAMEWIDTH = window.innerWidth - 200;
const GAMEHEIGHT = 600;
var config = {
    type: Phaser.AUTO,
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
