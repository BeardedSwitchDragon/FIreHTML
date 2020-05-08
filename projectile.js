class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, damageToDeal, x, y, name, life, isFlipped) {

        super(scene, x, y, name);
        this.speed = 100 + (speed * 20);
        this.damageToDeal = damageToDeal;
        // this.rateOfFire = rateOfFire;
        this.x = x;
        this.y = y;
        this.begin = x;
        this.life = life;
        this.name = name;
        this.flipX = isFlipped;
        scene.add.sprite(this);
        scene.projectiles.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);





        (this.flipX);
        if (this.flipX) {
            this.speed *= -1;

        }
        //(this.body);
        this.body.velocity.x = this.speed;




    }

    update() {
        if (((this.x - this.begin) > this.life) || ((this.x - this.begin) < (-this.life))) {

            this.destroy();

        }
    }

    // shoot() {
    //     (this.x);
    //     var timer = window.setTimeout(function() {
    //         (this.x);
    //         while (this.x < 800) {
    //
    //             this.x += this.speed;
    //             ("goiiing")
    //         }
    //         //(this.x);
    //     }, (this.rateOfFire * 1000));
    //     // window.clearTimeout(timer);
    // }


}

class Peashooter extends Projectile {
    constructor(scene, x, y, isFlipped) {
        super(scene, 8, 5, x, y, "peashooter", 400, isFlipped);
        this.play("peashooter_anim", true);
    }
}

class Shotgun extends Projectile {
    constructor(scene, x, y, isFlipped, bulletNumber) {
        super(scene, 4, 10, x, y, "shotgun", 300, isFlipped);
        this.setFriction(0.1);
        this.play("shotgun_anim", true);
        console.log(bulletNumber);
        this.body.velocity.y =  50 * (bulletNumber - 1);
        


    }


}
