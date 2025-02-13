import BaseScene from "./BaseScene";

class HighScore extends BaseScene{
    constructor(){
        super("HighScore");
    }

    create(){
        super.create();
        this.add.text(this.game.config.width/2-100, this.game.config.height/2, `HighScore:${localStorage.getItem("bestScore")}`, { fontSize: '32px', fill: '#fff' });
        
        
        this.menuButton = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2+70, 
            'Back', 
            { fontSize: '24px', fill: '#fff', backgroundColor: '#444', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5)
        .setInteractive().setDepth(10)
        
        
        this.menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene')
             // Hide menu when game starts
        });
    }

}

export default HighScore;