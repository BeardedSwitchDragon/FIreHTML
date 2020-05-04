
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
        //this.load.image("cloud_bg", "assets/cloud.png");

        this.load.spritesheet("sun", "assets/sunSpritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("homikazee", "assets/homikazeeSpritesheet.png", {
            frameWidth: 32,
            frameHeight: 17
        });
        this.load.spritesheet("explosion", "assets/explosionSpritesheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        const GROUND_HEIGHT = game.config.height * 3;
        this.cameras.main.setBackgroundColor("#F2C0A2");

        // this.clouds = this.add.tileSprite(0,0, game.config.width, GROUND_HEIGHT, "cloud_bg");
        // this.clouds.setOrigin(0,0);
        // //this.clouds.setScale(5,5);
        // this.clouds.tilePositionX = game.config.width / 2;
        // this.clouds.tilePositionY = game.config.height / 2;


        this.mountain_bg = this.add.tileSprite(0, 0, game.config.width, GROUND_HEIGHT, "mountain_bg");

        this.mountain_bg.tilePositionY = 240;
        this.mountain_bg.setOrigin(0,0);
        this.mountain_bg.setScrollFactor(0);

        this.ground_bg = this.add.tileSprite(0.5, 0.5, game.config.width, GROUND_HEIGHT, "ground_bg");
        //this.ground_bg.flipY = true;

        this.ground_bg.setOrigin(0,0);
        this.ground_bg.setScrollFactor(0);

        this.sun = this.add.sprite(2,2, "sun");
        this.sun.setOrigin(0,0);
        this.sun.scale = 3;


        // this.mountain_bg.tileScaleX = 1.1;
        // this.mountain_bg.tileScaleY = 1.1;
        //this.mountain_bg.setSize(game.config.width, GROUND_HEIGHT);
        this.enemies = this.add.group();
        this.player = this.makePlayer(this.sys.canvas.width / 2, this.sys.canvas.height / 2);
        this.testEnemy = new Homikazee(this, this.sys.canvas.width * 1.25, this.sys.canvas.height/2);


        this.testEnemy.scale = 3;


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

        this.anims.create({
            key: "sun_anim",
            frames: this.anims.generateFrameNumbers("sun"),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "explosion_anim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "homikazee_anim",
            frames: this.anims.generateFrameNumbers("homikazee"),
            frameRate: 12,
            repeat: -1
        });
        this.testEnemy.play("homikazee_anim");


        this.physics.add.collider(this.projectiles, this.enemies, function(projectile, enemy) {
            console.log("collision is working");
            console.log(projectile.body);
            console.log(enemy.body);
            console.log(projectile.damageToDeal);
            enemy.takeDamage(projectile.damageToDeal);
            projectile.destroy();


        });
        //console.log(this.player.body);

        this.physics.add.collider(this.enemies, this.player, function(enemy, player) {

            enemy.destruct();
            player.takeDamage(10);
            console.log(player.health);
        })
        //console.log(this.player.body);
        this.player.play("player_anim");
        this.sun.play("sun_anim");

        //this.testEnemy.travel(this.player, this);
        //this.cameras.main.startFollow(this.player);
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
        if (this.testEnemy.body != undefined) {
            this.testEnemy.travel(this.player, this);
            this.testEnemy.update();
    }

        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height;
        this.projectiles.getChildren().forEach(function(projectile) {
            projectile.update();
        });
        //If testEnemy isn't 'falsey' it will run.



        this.mountain_bg.tilePositionX += 0.25;
        this.ground_bg.tilePositionX += 0.5;




        if (this.rightKey.isDown) {

            this.player.moveX();
            //console.log(this.player.stats.speed + this.player.stats.boost);
            this.player.flipX = false;

        } else if (this.leftKey.isDown) {

            this.player.moveX(-1);
            this.player.flipX = true;
        }
        if (this.upKey.isDown) {
            this.player.moveY(-1);
        }

        if (this.downKey.isDown) {
            this.player.moveY();

        }

        if (this.player.x <= this.cameras.main.scrollX) {
            this.player.x = this.cameras.main.scrollX + 10;
        } else if (this.player.x >= width -
            (this.player.displayWidth * this.player.originX)  + this.cameras.main.scrollX) {
                this.player.x -= 20;
            }

//README: THIS MUST BE THE LAST TEST (SHIFT TO BOOST)
        if (this.commaKey.isDown && (new Date().getTime() - this.startTimer > this.projectileROF.peashooter)) {
            console.log("adsdads")
            this.shootProjectile();
            this.canShoot = false;
            this.startTimer = new Date().getTime();
        } else if (this.shiftKey.isDown) {

            this.player.boost = 3;
            //console.log("pressing shift");
            this.player.play("player_boost", true);
        }
        else {
            this.player.boost = 0;

            this.player.play("player_anim", true);


        }
        //console.log(this.cameras.main.scrollX + " + " + this.player.x);
        this.cameras.main.scrollX++;
        //this.player.x += 0.25;
        this.sun.x++;


    }

    makePlayer(x,y) {
        var p = new Player(this, x, y);
        p.setOrigin(0.5);


        return p;
    }


    shootProjectile() {
        let rateOfFire = 0;
        const x = this.player.x;
        const y = this.player.y;
        console.log(this.player.flipX);
        let projectile = new Peashooter(this, x, y, this.player.flipX);
        //console.log(this.enemies.getChildren());
        this.physics.add.sprite(projectile);
        //console.log(this.player.x);
    }


}
