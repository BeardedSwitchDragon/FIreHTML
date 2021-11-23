class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, stats) {

        // console.log(scene);
        console.log(stats);
        super(scene, stats.x, stats.y, stats.name);
        this.speed = 100 + (stats.speed * 20);
        this.damageToDeal = stats.damageToDeal;
        // this.rateOfFire = rateOfFire;
        this.x = stats.x;
        this.y = stats.y;
        console.log(stats);
        this.begin = stats.x;
        this.life = stats.life;
        this.name = stats.name;
        this.isFlipped = stats.isFlipped
        console.log("stats.flipX: " + stats.isFlipped);
        this.isEnemyProjectile = stats.isEnemyProjectile;

        scene.add.sprite(this);
        //console.log(isFlipped);
        
        if (this.isEnemyProjectile) {
            scene.enemyProjectiles.add(this);
        } else {
            scene.projectiles.add(this);
        }
        
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        console.log(this.flipX);

        //(this.flipX);
        if (this.isFlipped) {
            this.speed *= -1;
        }
        console.log("SPEEED " + this.speed);
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
        super(scene, {speed: 8, damageToDeal: 5, x, y, name: "peashooter", life: 400, isFlipped, isEnemyProjectile: false});
        this.play("peashooter_anim", true);
    }
}

class MachineGun extends Projectile {
    constructor(scene, x, y, isFlipped, name="machinegun") {
        super(scene, {speed: 15, damageToDeal: 0.85, x, y, name, life: 800, isFlipped, isEnemyProjectile: false});
        this.play(name + "_anim", true);
        this.randomOffset = Math.random() * 10;
        this.y += this.randomOffset;
        this.scale = 3;
    }
}

class AirSwimmerMachineGun extends MachineGun {
    constructor(scene, x, y, isFlipped) {
        console.log(x);
        // if (isFlipped === true) {
        //     isFlipped = false;
        // } else {
        //     isFlipped = true;
        // };
        // console.log(scene);
        super(scene, x, y, isFlipped);
        this.isEnemyProjectile = true;
        
        this.play("airSwimmerBullet_anim", true);
    }
}

class Shotgun extends Projectile {
    constructor(scene, x, y, isFlipped, bulletNumber) {
        super(scene, {speed: 4, damageToDeal: 12, x, y, name: "shotgun", life: 300, isFlipped, isEnemyProjectile: false});
        this.setFriction(0.1);
        this.play("shotgun_anim", true);
        // console.log(bulletNumber);
        this.body.velocity.y =  50 * (bulletNumber - 1);



    }


}
