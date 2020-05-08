class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y);
        this.x = x;
        this.y = y;
        scene.add.sprite(this);
        scene.powerups.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.texture = name;
        this.name = name;
    }
}
class ShotgunPowerup extends Powerup {
    constructor(scene, x, y) {
        super(scene, x, y, "shotgun_powerup");
        this.scale = 2;
        this.play("shotgun_powerup_anim");

    }
}
