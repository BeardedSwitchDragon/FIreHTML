class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, damageToDeal, health, speed) {
        super(scene, x, y, name);

        scene.add.sprite(this);
        scene.enemies.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.sprite(this);
        this.setOrigin(0.5, 0.5);
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
            this.flipX = true;
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
}

class AirSwimmer extends Enemy {
    constructor(scene, x, y) {
        super(scene,x,y, 5, 10, 75);
        this.name = "airswimmer";

        this.play("airswimmer_anim");

    }
    airSwimmerTravel(target, scene) {
        this.travel(target, scene, false, 300);
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

    update() {

        if (this.health <= 0) {
            this.destruct();
        }


    }
}
