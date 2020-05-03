
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
        this.load.image("ground_bg", "assets/furtherBG.png");
        this.load.image("mountain_bg", "assets/mountain.png");
    }

    create() {
        const GROUND_HEIGHT = game.config.height * 3;
        this.cameras.main.setBackgroundColor("#F2C0A2");
        this.ground_bg = this.add.tileSprite(0.5, 0.5, game.config.width, GROUND_HEIGHT, "ground_bg");
        //this.ground_bg.flipY = true;

        this.ground_bg.setOrigin(0,0);
        this.ground_bg.setScrollFactor(0);

        this.mountain_bg = this.add.tileSprite(0, 0, game.config.width, GROUND_HEIGHT, "mountain_bg");
        this.mountain_bg.setTileScale(3, 4);
        this.mountain_bg.tilePositionY = 450;
        this.mountain_bg.setOrigin(0,0);
        this.mountain_bg.setScrollFactor(0);
        // this.mountain_bg.tileScaleX = 1.1;
        // this.mountain_bg.tileScaleY = 1.1;
        //this.mountain_bg.setSize(game.config.width, GROUND_HEIGHT);
        this.player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height / 2);


        this.canShoot = true;
        this.projectiles = this.add.group();
        this.projectileROF = {
            peashooter: 1000

        };

        //input keys
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.commaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.startTimer = new Date().getTime();
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


    // canShootAgain() {
    //     return function () {
    //         if (new Date().now - lastCall < projectileROF.peashooter) {
    //             return false;
    //         }
    //         this.lastCall = new Date().now;
    //         console.log(this.lastCall);
    //     //do stuff
    //     }
    // }

    update() {

        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height;
        this.projectiles.getChildren().forEach(function(projectile) {
            if (projectile.x > width) {
                projectile.destroy();
            }
        });

        this.ground_bg.tilePositionX += 0.1;
        this.mountain_bg.tilePositionX += 0.2;



        if (this.rightKey.isDown && this.player.x < width -
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
        if (this.commaKey.isDown && (new Date().getTime() - this.startTimer > this.projectileROF.peashooter)) {
            console.log("adsdads")
            this.shootProjectile();
            this.canShoot = false;
            this.startTimer = new Date().getTime();
        } else if (this.shiftKey.isDown) {

            this.player.stats.boost = 3;
            console.log("pressing shift");
            this.player.play("player_boost", true);
        }
        else {
            this.player.stats.boost = 0;

            this.player.play("player_anim", true);


        }
        this.player.x += 0.25;


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
        let rateOfFire = 0;
        const x = this.player.x;
        const y = this.player.y;
        let projectile = new Peashooter(this, x, y);
        console.log(this.player.x);
    }


}
