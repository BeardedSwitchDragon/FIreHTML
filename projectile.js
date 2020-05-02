class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, speed, damageToDeal, rateOfFire, x, y, name) {

        super(scene, x, y, name);
        this.speed = 0;
        this.damageToDeal = 0;
        this.rateOfFire = 0;
        this.x = x;
        this.y = y;
        scene.add.existing(this);


    }


}

class Peashooter extends Projectile {
    constructor(scene, x, y) {
        super(scene, 8, 5, 1, x, y, "peashooter");
        console.log("created");
        this.play("peashooter_anim", true);
        console.log("playing anim");
    }
}
