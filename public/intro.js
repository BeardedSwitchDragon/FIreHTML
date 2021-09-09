class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");

    }

    create() {

        game.scale.pageAlignHorizontally = true;
        game.scale.refresh();


        this.cameras.main.setBackgroundColor("#F2C0A2");
        this.logo = this.add.image(GAMEWIDTH / 2, GAMEHEIGHT * 0.35, "logo");
        this.logo.scale = 4;


        this.playButton = this.add.sprite(GAMEWIDTH / 2, GAMEHEIGHT * 0.6, "playButton");
        //this.playButton.setOrigin(0.5, 0.5);
        this.add.existing(this.playButton);
        this.playButton.setScale(2.2);
        //this.playButton.setDepth(2);


        this.testPointer = this.input.activePointer;




        this.playButton.setInteractive();
        this.input.enableDebug(this.playButton);

        this.playLabel = this.add.bitmapText(this.playButton.x, this.playButton.y, "pixelFont", "PLAY", 50);
        this.playLabel.setOrigin(0.5);
        console.log(this.playLabel.y);




        // this.hoveredPlayButton.setInteractive();

        this.playButton.on("pointerover", () => {
            this.playButton.setFrame(1);
            this.playLabel.alpha = 0.5;
            console.log(this.testPointer.x);

        });

        this.playButton.on("pointerout", () => {
            this.playLabel.alpha = 1;
            this.playButton.setFrame(0);


        });

        this.playButton.on("pointerdown", () => {
            this.playButton.destroy();
            this.playLabel.destroy();
            this.logo.destroy();
            this.scene.start("mainGame");
        })



    }
}
