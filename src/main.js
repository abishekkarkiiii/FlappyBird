import Phaser, { Physics } from "phaser"

import MainScene from "./Scene/MainScene"
import LoadingScene from "./Scene/LoadingScene"
import MenuScene from "./Scene/MenuScene"
import BaseScene from "./Scene/BaseScene"
import HighScore from "./Scene/HighScore"
console.log(MainScene)
const conf={
  type:Phaser.AUTO,
  width:1000,
  height:600,
  pixelArt:true,
  scene:[
    new LoadingScene(),MainScene,MenuScene,BaseScene,HighScore
  ],
  parent:'game',
  dom:{createContainer:true},
  physics:{
    default:'arcade',
    arcade:{
      debug:false,
      gravity:{
        // y:170
      }
    }

  }

}

const game=new Phaser.Game(conf)