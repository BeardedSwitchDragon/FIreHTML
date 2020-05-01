
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
            default: 'matter',
            matter: {
                enableSleeping: true,
                gravity: {
                    y: 0
                }
            }
        },
        extend: {
            makePlayer: makePlayer
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
}

function create() {
    player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height);

    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

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

    player.play("player_anim");
}

function update() {


    if (rightKey.isDown && player.x < this.sys.canvas.width -
        (player.displayWidth * player.originX)) {

        player.x += player.stats.speed + player.stats.boost;
        console.log(player.stats.speed + player.stats.boost)

    } else if (leftKey.isDown && player.x > 0 +
        (player.displayWidth * player.originX)) {

        player.x -= (player.stats.speed + player.stats.boost);
    }
    if (upKey.isDown) {
        player.y -= (player.stats.speed + player.stats.boost);
    }

    if (downKey.isDown) {
        player.y += player.stats.speed + player.stats.boost;

    }
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
    var player = this.add.sprite(x,y, "player").setOrigin(0.5, 1);
    player.stats = {
        speed: 5,
        boost: 0
    };

    return player;
}
