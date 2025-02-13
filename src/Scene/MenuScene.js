import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    constructor() {
        super('MenuScene'); // Pass the scene key
    }

    create() {
        super.create(); // Call the BaseScene create method

        // Add a play button
        let play = this.add.text(this.game.config.width / 2 - 20, this.game.config.height / 2, 'Play', { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene'); 
            })
            .on('pointerover', () => {
                play.setStyle({ fill: '#44ff44' });  // Change text color on hover
            })
            .on('pointerout', () => {
                play.setStyle({ fill: '#fff' });  // Reset text color when not hovering
            });

        let highScore = this.add.text(this.game.config.width / 2 - 50, this.game.config.height / 2 + 40, 'HighScore', { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('HighScore'); 
            })
            .on('pointerover', () => {
                highScore.setStyle({ fill: '#44ff44' });  // Change text color on hover
            })
            .on('pointerout', () => {
                highScore.setStyle({ fill: '#fff' });  // Reset text color when not hovering
            });
    }
}

export default MenuScene;
