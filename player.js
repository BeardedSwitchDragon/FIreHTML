class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.name = "player";
        scene.add.sprite(this);
        scene.physics.add.sprite(this);
        scene.physics.world.enableBody(this);
        scene.add.existing(this);

        this.health = 50;
        this.speed = 5;
        this.boost = 0;
        this.x = x;
        this.y = y;
        this.scale = 2;

        this.scene = scene;

    }

    boost() {
        this.boost = 3;
    }

    moveX(direction=1) {
        this.x += (this.speed + this.boost) * direction;
    }
    moveY(direction=1) {
        this.y += (this.speed + this.boost) * direction;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    playIFrame(hasStarted) {
        console.log("adadadada");
        return this.scene.tweens.add({
            targets: this.scene.player,
            alpha: 0.2,
            ease: 'Cubic.easeOut',
            onComplete: function() {
                console.log("alalaCOMPLETEad;sda;d;as");

            },
            duration: 50,
            repeat: 3,
            yoyo: true
        });
        // if (this.iFrameTween.progress === 1) {
        //     hasStarted = true;
        // }
    }

}
