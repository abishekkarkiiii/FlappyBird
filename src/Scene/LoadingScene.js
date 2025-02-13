class LoadingScene extends Phaser.Scene{
    constructor(){
        super({key:'Loading'})

    }
    preload(){
        this.load.image('sky','/sky.png');
        this.load.image('bird','/bird.png');
        this.load.image('pipe','/pipe.png');
        this.load.image('pausebutton','/pause.png')
        this.load.spritesheet("birdd", "/birdSprite.png", {
            frameWidth: 128/8,
            frameHeight: 48/3,
        });
        this.load.image('pause','/pause.png');

    }

    create(){
       this.scene.start('MenuScene')
    }


}
export default LoadingScene;