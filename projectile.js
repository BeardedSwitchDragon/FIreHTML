class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, damageToDeal, rateOfFire, x, y, name, life, isFlipped) {

        super(scene, x, y, name);
        this.speed = 100 + (speed * 20);
        this.damageToDeal = damageToDeal;
        this.rateOfFire = rateOfFire;
        this.x = x;
        this.y = y;
        this.begin = x;
        console.log(this.x);
        scene.add.sprite(this);
        scene.projectiles.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.flipX = isFlipped;

        console.log(this.flipX);
        if (this.flipX) {
            this.speed *= -1;
            console.log("lolol");
        }
        //console.log(this.body);
        this.body.velocity.x = this.speed;

        console.log("spawned");


    }

    update() {
        if (this.x - this.begin > this.life) {
            this.destroy();
        }
    }

    // shoot() {
    //     console.log(this.x);
    //     var timer = window.setTimeout(function() {
    //         console.log(this.x);
    //         while (this.x < 800) {
    //
    //             this.x += this.speed;
    //             console.log("goiiing")
    //         }
    //         //console.log(this.x);
    //     }, (this.rateOfFire * 1000));
    //     // window.clearTimeout(timer);
    // }


}

class Peashooter extends Projectile {
    constructor(scene, x, y, isFlipped) {
        super(scene, 8, 5, 1, x, y, "peashooter", 400, isFlipped);
        console.log(this.damageToDeal);
        console.log(this.body);
        this.play("peashooter_anim", true);
        console.log("playing anim");
    }
}
