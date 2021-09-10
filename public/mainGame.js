
class MainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");

    }





    create() {


        const GROUND_HEIGHT = GAMEHEIGHT * 3;
        const GROUND_SCALE = 2;
        console.log(GROUND_HEIGHT / 175);
        this.cameras.main.setBackgroundColor("#F2C0A2");

        // this.clouds = this.add.tileSprite(0,0, game.config.width, GROUND_HEIGHT, "cloud_bg");
        // this.clouds.setOrigin(0,0);
        // //this.clouds.setScale(5,5);
        // this.clouds.tilePositionX = game.config.width / 2;
        // this.clouds.tilePositionY = GAMEHEIGHT / 2;


        this.mountain_bg = this.add.tileSprite(0, 0, game.config.width, GROUND_HEIGHT, "mountain_bg");

        this.mountain_bg.tilePositionY = GROUND_HEIGHT / 5.7;
        this.mountain_bg.scale = 1.6;
        this.mountain_bg.setOrigin(0,0);
        this.mountain_bg.setScrollFactor(0);

        this.ground_bg = this.add.tileSprite(0.5, 0.5, game.config.width, GROUND_HEIGHT, "ground_bg");
        //this.ground_bg.flipY = true;
        this.ground_bg.tilePositionY = GROUND_HEIGHT / 12;
        this.ground_bg.tileScaleY = GROUND_SCALE;
        this.ground_bg.tileScaleX = GROUND_SCALE + 0.1;

        this.ground_bg.setOrigin(0,0);
        this.ground_bg.setScrollFactor(0);

        this.sun = this.add.sprite(2,2, "sun");
        this.sun.setOrigin(0,0);
        this.sun.scale = 3;

        this.spawnedTestEnemy = false;

        // this.mountain_bg.tileScaleX = 1.1;
        // this.mountain_bg.tileScaleY = 1.1;
        //this.mountain_bg.setSize(game.config.width, GROUND_HEIGHT);
        this.enemies = this.add.group();
        this.player = this.makePlayer(GAMEWIDTH / 2, GAMEHEIGHT / 2);
        


        this.canShoot = true;
        this.projectiles = this.add.group();
        this.enemyProjectiles = this.add.group();
        this.powerups = this.add.group();

        this.projectileROF = {
            peashooter: 500,
            shotgun: 750,
            machineGun: 85

        };

        this.testPowerup = new ShotgunPowerup(this, game.config.width * 1.2, GAMEHEIGHT / 2);

        this.playerHealthLabel = this.add.bitmapText(game.config.width * 0.1, GAMEHEIGHT * 0.8, "pixelFont", "hp: " + this.player.health, 50);
        this.playerHealthLabel.setDepth(10);


        //input keys
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.commaKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.periodKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
        this.slashKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);



        var hasStarted = false;

        this.peaTimer = new Date().getTime();
        this.shotTimer = new Date().getTime();
        this.machTimer = new Date().getTime();

        this.machCoolDownTimer = new Date().getTime();
        this.machCoolDownLength = 3000;
        this.machMaxBullets = 30;




        


        this.physics.add.collider(this.projectiles, this.enemies, function(projectile, enemy) {

            enemy.takeDamage(projectile.damageToDeal);
            projectile.destroy();


        });

        this.physics.add.collider(this.enemyProjectiles, this.player, function(projectile, player) {
            player.takeDamage(projectile.damageToDeal);
            projectile.destroy();
        })

        this.physics.add.overlap(this.enemies, this.player, function(enemy, player) {

            if (player.isInvincible === false) {
                enemy.destruct();
                player.takeDamage(10);
                player.playIFrame(hasStarted);
                player.isInvincible = true;

            }


            // if (hasStarted === false) {
            //
            //
            //     hasStarted = true;
            // }
            //(this.iframe.progress);

            // if (this.iframe.progress === 1) {
            //     hasStarted = false;
            //     player.isInvincible = false;
            // }



        });

        this.physics.add.overlap(this.player, this.powerups, function(player, powerup) {
            powerup.destroy();
            console.log(powerup.name);
            switch (powerup.name) {

                case "shotgun_powerup":

                player.availableWeapons.shotgun = true;
                //reversed so first one gets replaced if slots are full
                if (player.weaponSlot.slotTwo === "none") {

                    player.weaponSlot.slotTwo = "shotgun";
                } else if (player.weaponSlot.slotOne === "none") {

                    player.weaponSlot.slotOne = "shotgun"
                }
                break;

                case "machinegun_powerup":

                player.availableWeapons.machineGun = true;
                if (player.weaponSlot.slotOne !== "machinegun") {

                    player.weaponSlot.slotOne = "machinegun";
                } else if (player.weaponSlot.slotTwo !== "machinegun") {

                    player.weaponSlot.sloteTwo = "machinegun"
                }
                break;
                case "locker":

                player.availableWeapons.locker = true;
                if (player.weaponSlot.slotOne !== "locker") {

                    player.weaponSlot.slotOne = "locker";
                } else if (player.weaponSlot.slotTwo !== "locker") {

                    player.weaponSlot.sloteTwo = "locker"
                }
                break;

                default:
                console.log("Weapon unavailable");

            }
        })
        //(this.player.body);
        this.player.play("player_anim");
        this.sun.play("sun_anim");

        //this.player.playIFrame();

        //this.testEnemy.homikazeeTravel(this.player, this);
        //this.cameras.main.startFollow(this.player);
    }


    // canShootAgain() {
    //     return function () {
    //         if (new Date().now - lastCall < projectileROF.peashooter) {
    //             return false;
    //         }
    //         this.lastCall = new Date().now;
    //         (this.lastCall);
    //     //do stuff
    //     }
    // }



    //Calls below code every frame
    update() {



        if (this.player.iFrame != undefined && this.player.iFrame.progress === 1) {
            this.player.isInvincible = false;
        }
        //(this.player.isInvincible);
        this.playerHealthLabel.text = "hp: " + this.player.health;


    // if (this.invincible === true) {
    //     if (this.hasStarted )
    //     this.hasStarted = true;
    //     if (this.iFrameTween.progress === 1) {
    //         this.hasStarted;
    //     }
    //     ("progresss:  " + this.iFrameTween.progress);
    //
    //
    // }

        let width = GAMEWIDTH;
        let height = GAMEHEIGHT;
        this.projectiles.getChildren().forEach(function(projectile) {
            console.log(projectile.name);
            projectile.update();
        });

        for (var enemyIndex = 0; enemyIndex < this.enemies.getChildren().length; enemyIndex++) {
            this.updateEnemies(this.enemies.getChildren()[enemyIndex]);
        }




        this.mountain_bg.tilePositionX += 0.25;
        this.ground_bg.tilePositionX += 0.5;




        if (this.rightKey.isDown) {

            this.player.moveX();
            //(this.player.stats.speed + this.player.stats.boost);
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
        if (this.commaKey.isDown && (new Date().getTime() - this.peaTimer > this.projectileROF.peashooter) && (this.shiftKey.isDown === false)) {

            this.shootProjectile("peashooter");
            this.canShoot = false;
            this.peaTimer = new Date().getTime();
        } else if (this.periodKey.isDown && (this.shiftKey.isDown === false)) {
            console.log(this.player.availableWeapons.machineGun);
            // if (this.player.availableWeapons.shotgun === true) {
            //     this.shootProjectile("shotgun");
            // } else if (this.player.availableWeapons.machineGun === true) {
            //     this.shootProjectile("machineGun");
            // } else if (this.player.availableWeapons.locker === true) {
            //     this.shootProjectile("locker");
            // }
            this.shootProjectile(this.player.weaponSlot.slotOne);
        } else if (this.slashKey.isDown && (this.shiftKey.isDown === false)) {
            this.shootProjectile(this.player.weaponSlot.slotTwo);
        } else if (this.shiftKey.isDown) {

            this.player.boost = 4;
            //("pressing shift");
            this.player.play("player_boost", true);
        }
        else {
            this.player.boost = 0;

            this.player.play("player_anim", true);
        }
        //(this.cameras.main.scrollX + " + " + this.player.x);
        this.cameras.main.scrollX++;
        this.player.x++;
        this.sun.x++;
        this.playerHealthLabel.x++;

        if (this.player.x >= 100 && this.spawnedTestEnemy === false) {
            this.testEnemy = new Homikazee(this, this.player.x * 3.5, GAMEHEIGHT/2);
            this.secondEnemy = new AirSwimmer(this, this.player.x * 3.5, GAMEHEIGHT * 0.5);

            this.testEnemy.scale = 3;
            this.secondEnemy.scale = 3;
            this.spawnedTestEnemy = true;
        }


    }

    makePlayer(x,y) {
        var p = new Player(this, x, y);
        p.setOrigin(0.5);


        return p;
    }

    setInvincible() {
        ("callled");
        this.invincible = true;


    }

    updateEnemies(enemy) {
        if (enemy.body != undefined) {

            switch (enemy.name) {
                case "homikazee":
                enemy.homikazeeTravel(this.player, this);
                break;
                case "airswimmer":
                enemy.airSwimmerTravel(this.player, this);
                enemy.shoot(this);
                break;
                default:
                console.log("enemy not found.");

            }

            enemy.update();
        }
    }


    shootProjectile(projectile_name) {
        let rateOfFire = 0;
        const x = this.player.x + 20;
        const y = this.player.y;
        (this.player.flipX);
        let projectile;

        switch (projectile_name) {
            case "peashooter":
            projectile = new Peashooter(this, x, y, this.player.flipX);

            break;
            case "shotgun":
            if (new Date().getTime() - this.shotTimer >= this.projectileROF.shotgun) {
                for (var trajectory = 0; trajectory <= 2; trajectory++) {
                    console.log(trajectory);
                    projectile = new Shotgun(this, x, y, this.player.flipX, trajectory);

                }
                this.canShoot = false;
                this.shotTimer = new Date().getTime();
            }


            break;

            case "machinegun":

            if (new Date().getTime() - this.machTimer >= this.projectileROF.machineGun) {


                if (this.machMaxBullets > 0) {

                    projectile = new MachineGun(this, x, y, this.player.flipX);
                    this.canShoot = false;
                    this.machTimer = new Date().getTime();
                    this.machCoolDownTimer = new Date().getTime();

                    this.machMaxBullets--;

                } else if (new Date().getTime() - this.machCoolDownTimer >= this.machCoolDownLength) {
                    this.machMaxBullets = 30;
                }

            }
            break;
            default:
                ("gun not found");

        }
        //(this.enemies.getChildren());
        this.physics.add.sprite(projectile);
        //(this.player.x);
    }


}
