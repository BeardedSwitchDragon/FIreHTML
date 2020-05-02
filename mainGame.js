
class MainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");

    }

    preload() {
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

    create() {
        this.player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height / 2);



        //input keys
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.commaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);

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

        this.player.play("player_anim");
    }

    update() {


        if (this.rightKey.isDown && this.player.x < this.sys.canvas.width -
            (this.player.displayWidth * this.player.originX)) {

            this.player.x += this.player.stats.speed + this.player.stats.boost;
            console.log(this.player.stats.speed + this.player.stats.boost)
            this.player.flipX = false;

        } else if (this.leftKey.isDown && this.player.x > 0 +
            (this.player.displayWidth * this.player.originX)) {

            this.player.x -= (this.player.stats.speed + this.player.stats.boost);
            this.player.flipX = true;
        }
        if (this.upKey.isDown) {
            this.player.y -= (this.player.stats.speed + this.player.stats.boost);
        }

        if (this.downKey.isDown) {
            this.player.y += this.player.stats.speed + this.player.stats.boost;

        }

//README: THIS MUST BE THE LAST TEST (SHIFT TO BOOST)
        if (this.commaKey.isDown) {
            shootProjectile();
        } else if (this.shiftKey.isDown) {

            this.player.stats.boost = 3;
            console.log("pressing shift");
            this.player.play("player_boost", true);
        }
        else {
            this.player.stats.boost = 0;
            this.player.x += 0.25;
            this.player.play("player_anim", true);


        }


    }
    makePlayer(x,y) {
        var p = this.add.sprite(x,y, "player").setOrigin(0.5);
        p.stats = {
            speed: 5,
            boost: 0
        };
        p.scale = 2;

        return p;
    }


    shootProjectile() {
        let projectile = new Peashooter(this, this.player.x, player.y);
    }


}
