
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    zoom: 2,
    scene: {
        preload: preload,
        create: create,
        update: update,

//slslslls
        physics: {
            default: 'arcade'

        },
        extend: {
            makePlayer: makePlayer,
            shootProjectile: shootProjectile
        }
    }
};

var game = new Phaser.Game(config);

var player;
var leftKey;
var rightKey;

function preload() {
    this.load.spritesheet("player", "assets/alienSpritesheet.png", {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet("player_boosting", "assets/alienSpritesheetBoost.png", {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet("peashooter", "assets/peaShootSpritesheet.png", {
        frameWidth: 32,
        frameHeight: 13
    });
}

function create() {
    player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height / 2);



    //input keys
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    commaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
    this.anims.create({
        key: "player_anim",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 14,
        repeat: -1
    });

    this.anims.create({
        key: "player_boost",
        frames: this.anims.generateFrameNumbers("player_boosting"),
        frameRate: 14,
        repeat: -1

    });
    this.anims.create({
        key: "peashooter_anim",
        frames: this.anims.generateFrameNumbers("peashooter"),
        frameRate: 12,
        repeat: -1

    });

    player.play("player_anim");
}

function update() {


    if (rightKey.isDown && player.x < this.sys.canvas.width -
        (player.displayWidth * player.originX)) {

        player.x += player.stats.speed + player.stats.boost;
        console.log(player.stats.speed + player.stats.boost)
        player.flipX = false;

    } else if (leftKey.isDown && player.x > 0 +
        (player.displayWidth * player.originX)) {

        player.x -= (player.stats.speed + player.stats.boost);
        player.flipX = true;
    }
    if (upKey.isDown) {
        player.y -= (player.stats.speed + player.stats.boost);
    }

    if (downKey.isDown) {
        player.y += player.stats.speed + player.stats.boost;

    }


    if (commaKey.isDown) {
        shootProjectile();
    }

    //README: THIS MUST BE THE LAST TEST (SHIFT TO BOOST)
    if (shiftKey.isDown) {

        player.stats.boost = 3;
        console.log("pressing shift");
        player.play("player_boost", true);
    }
    else {
        player.stats.boost = 0;
        player.x += 0.25;
        player.play("player_anim", true);


    }


}
function makePlayer(x,y) {
    var player = this.add.sprite(x,y, "player").setOrigin(0.5);
    player.stats = {
        speed: 5,
        boost: 0
    };
    player.scale = 2;

    return player;
}


function shootProjectile() {
    let projectile = new Peashooter(this, player.x, player.y);
}
