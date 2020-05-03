class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, damageToDeal, health) {
        super(scene, x, y, name);

        scene.add.sprite(this);
        scene.enemies.add(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.x = x;
        this.y = y;
        this.damageToDeal = damageToDeal;
        this.health = health;

        console.log("spawned enemy");

    }
}

class Homikazee extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene,x,y "homikazee");
        this.speed = 5;

    }

    travel(target, scene) {
        scene.physics.moveToObject(this, target, this.speed);
    }

    destruct() {
        this.destroy();
    }
}
