class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, damageToDeal, health, speed) {
        super(scene, x, y, name);

        scene.add.sprite(this);
        scene.enemies.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.sprite(this);
        this.setOrigin(0.5, 0.5);
        //this.flipX = false;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damageToDeal = damageToDeal;
        this.health = health;
        this.name = name;







    }

    travel(target, scene, rotate=false, xOffset=0, yOffset=0) {
        if (Math.abs(target.x - this.x) > xOffset && Math.abs(target.y - this.y) > yOffset) {
            scene.physics.moveToObject(this, target, this.speed);
        }
        if (this.x - target.x < 0) {

            this.flipX = true;
        } else {
            this.flipX = false;
        }


        if (rotate === true) {
            this.flipX = false;
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        }





    }


    takeDamage(damage) {
        this.health -= damage;
    }


    destruct() {

        this.body = null;
        this.play("explosion_anim", true);

        this.on("animationcomplete", this.destroy);
    }

    update() {
        if (this.health <= 0) {
            this.destruct();
        }

    }


}

class AirSwimmer extends Enemy {
    constructor(scene, x, y) {
        super(scene,x,y, 5, 10, 75);
        this.name = "airswimmer";
        this.coolDownTime = 500;
        this.shootTime = 1000;

        this.shootTimer = new Date().getTime();

        this.play("airswimmer_anim", true);

    }
    airSwimmerTravel(target, scene) {
        this.travel(target, scene, false, 300);
    }

    shoot(scene) {
        if (new Date().getTime() - this.shootTimer >= scene.projectileROF.machineGun) {
            const x = this.x;
            const y = this.y;
            //console.log(x);
            
            
            let bullet = new AirSwimmerMachineGun(scene, x, y, !this.flipX);
            //console.log(this.x);
            
        }
    }



}

class Homikazee extends Enemy {
    constructor(scene, x, y) {
        super(scene,x,y, "homikazee", 5, 6, 100);

        this.flipY = true;
        this.flipX = true;


    }








    homikazeeTravel(target, scene) {
        this.travel(target, scene, true);
    }


}
