class BootScene extends Phaser.Scene {
    constructor() {
        super("bootScene");
    }
    preload() {
        this.load.image("loadingLogo", "assets/fireLoadingLogo.png");
        this.load.image("loadingBar", "assets/loadingBar.png");
    }

    create() {
        this.scene.start("loadingScene");
    }
}
