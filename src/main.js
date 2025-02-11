import Phaser, { Physics } from "phaser"

import MainScene from "./Scene/MainScene"
import LoadingScene from "./Scene/LoadingScene"
const conf={
  type:Phaser.AUTO,
  width:1000,
  height:600,
  scene:[
    LoadingScene,MainScene
  ],
  parent:'game',
  dom:{createContainer:true},
  physics:{
    default:'arcade',
    arcade:{
      debug:true,
      gravity:{
        // y:170
      }
    }

  }

}

const game=new Phaser.Game(conf)