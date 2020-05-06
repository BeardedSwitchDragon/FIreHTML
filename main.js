




var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    pixelArt: true,
    zoom: 2,
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
    scene: [BootScene, LoadingScene, Intro, MainGame]
};

var game = new Phaser.Game(config);



// var player;
// var leftKey;
// var rightKey;
