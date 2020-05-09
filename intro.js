class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");

    }

    create() {


        this.cameras.main.setBackgroundColor("#F2C0A2");
        this.logo = this.add.image(GAMEWIDTH / 2, GAMEHEIGHT * 0.35, "logo");
        this.logo.scale = 4;


        this.playButton = this.add.sprite(650, GAMEHEIGHT * 0.6, "playButton");
        //this.playButton.setOrigin(0.5, 0.5);
        this.playButton.setScale(2.2);
        this.playButton.setDepth(2);

        console.log(this.playButton);
        console.log(GAMEWIDTH / 2);
        this.testPointer = this.input.activePointer;




        this.playButton.setInteractive();
        this.input.enableDebug(this.playButton);

        // this.hoveredPlayButton.setInteractive();

        this.playButton.on("pointerdown", () => {
            this.playButton.setFrame(1);
            console.log(this.testPointer.x);

        });

        this.playButton.on("pointerout", () => {
            this.playButton.setFrame(0);


        });

        // this.scene.start("mainGame");

    }
}
