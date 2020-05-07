class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {

        this.load.image("loadingLogo", "assets/fireLoadingLogo.png");
        this.load.image("loadingBar", "assets/loadingBar.png");
        //this.load.image("loadingBarFill", "assets/loadingBarFill.png");

        this.loadingLogo = this.add.sprite( 400, game.config.height * 0.3, "loadingLogo");

        this.loadingLogo.setOrigin(0.5,0.5);
        this.loadingLogo.scale = 3.5;

        this.loadingBar = this.add.sprite(400, game.config.height * 0.5, "loadingBar");
        this.loadingBar.setOrigin(0.5,0.5);
        this.loadingBar.scale = 5;
        this.loadingBar.displayWidth = 330;
        this.loadingBar.displayHeight = 60;

        // this.loadingBarFill = this.add.sprite(game.config.width / 2, game.config.height * 0.5, "loadingBarFill");
        // this.loadingBarFill.setOrigin(0.5,0.5);
        // this.load.setPreloadSprite(this.loadingBarFill);

        this.loadingBarFill = this.add.graphics();
        this.loadingBarFill.fillStyle(0x222222, 0);
        this.loadingBarFill.fillRect(240, 285, 320, 60);



        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

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

        this.load.spritesheet("shotgun", "assets/shotgunSpritesheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image("ground_bg", "assets/furtherBG.png");
        this.load.image("mountain_bg", "assets/mountain.png");
        this.load.image("logo", "assets/fireLogo.png");
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

        //ANIMATIONS:


        ("lolll");





        this.load.on("progress", (value) => {
            this.loadingBarFill.fillStyle(0xffffff, 1);
            this.loadingBarFill.fillRect(250, 285, 300 * value, 30);
        });

        // this.load.on("complete", (args) => {
        //     this.loadingBarFill.destroy();
        //     this.loadingBar.destroy();
        //     this.loadingLogo.destroy();
        // });
    }

    create() {
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
        ("chungus");

        this.anims.create({
            key: "shotgun_anim",
            frames: this.anims.generateFrameNumbers("shotgun"),
            frameRate: 11,
            repeat: -1
        });

        this.scene.start("introScene");
    }


}
