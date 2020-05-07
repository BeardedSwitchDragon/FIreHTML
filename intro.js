class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    create() {
        
        this.scene.start("mainGame");

    }
}
