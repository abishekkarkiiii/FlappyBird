class LoadingScene extends Phaser.Scene{
    constructor(){
        super({key:'Loading'})

    }
    preload(){
        this.load.image('sky','/sky.png');
        this.load.image('bird','/bird.png');
        this.load.image('pipe','/pipe.png')
    }

    create(){
       this.scene.start('MainScene')
    }


}
export default LoadingScene;