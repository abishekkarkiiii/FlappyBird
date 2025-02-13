class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key); // Pass the scene key
    }

    create() {
        this.add.image(0, 0, 'sky')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width, this.game.config.height);
    }
}

export default BaseScene;
