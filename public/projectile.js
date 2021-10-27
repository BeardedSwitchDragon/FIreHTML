class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor({scene, speed, damageToDeal, x, y, name, life, isFlipped, isEnemyProjectile}) {

        console.log(scene);
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
        this.isEnemyProjectile = isEnemyProjectile;

        scene.add.sprite(this);
        console.log(isFlipped);
        
        if (isEnemyProjectile) {
            scene.enemyProjectiles.add(this);
        } else {
            scene.projectiles.add(this);
        }
        
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
        super({scene, speed: 8, damageToDeal: 5, x, y, name: "peashooter", life: 400, isFlipped, isEnemyProjectile: false});
        this.play("peashooter_anim", true);
    }
}

class MachineGun extends Projectile {
    constructor(scene, x, y, isFlipped, name="machinegun") {
        super({scene, speed: 15, damageToDeal: 0.85, x, y, name, life: 800, isFlipped, isEnemyProjectile: false});
        this.play(name + "_anim", true);
        this.randomOffset = Math.random() * 10;
        this.y += this.randomOffset;
        this.scale = 3;
    }
}

class AirSwimmerMachineGun extends MachineGun {
    constructor(scene, x, y, isFlipped) {
        if (isFlipped === true) {
            isFlipped = false;
        } else {
            isFlipped = true;
        };
        console.log(scene);
        super({scene, speed: 12, damageToDeal: 0.9, x, y, name: "airSwimmerBullet", life: 760, isFlipped, isEnemyProjectile: false});
        this.isEnemyProjectile = true;
        
        this.play("airSwimmerBullet" + "_anim", true);
    }
}

class Shotgun extends Projectile {
    constructor(scene, x, y, isFlipped, bulletNumber) {
        super({scene, speed: 4, damageToDeal: 12, x, y, name: "shotgun", life: 300, isFlipped, isEnemyProjectile: false});
        this.setFriction(0.1);
        this.play("shotgun_anim", true);
        console.log(bulletNumber);
        this.body.velocity.y =  50 * (bulletNumber - 1);



    }


}
