class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, damageToDeal, health) {
        super(scene, x, y, name);

        scene.add.sprite(this);
        scene.enemies.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.sprite(this);
        this.x = x;
        this.y = y;
        this.damageToDeal = damageToDeal;
        this.health = health;
        (this.body);


    }
}

class Homikazee extends Enemy {
    constructor(scene, x, y) {
        super(scene,x,y, "homikazee", 5, 6);
        this.speed = 100;
        

    }

    travel(target, scene) {
        scene.physics.moveToObject(this, target, this.speed);
        if ((this.x - target.x) < 0) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    destruct() {
        (this.body);
        this.body = null;
        this.play("explosion_anim", true);
        ("animation worked");
        this.on("animationcomplete", this.destroy);
    }

    update() {
        (this.health);
        if (this.health <= 0) {
            this.destruct();
        }


    }
}
