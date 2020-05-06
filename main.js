




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
    scene: [Intro, MainGame]
};

var game = new Phaser.Game(config);

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ["VT323"]
    }

};

// var player;
// var leftKey;
// var rightKey;
