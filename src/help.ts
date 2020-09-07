import Help from '@oclif/plugin-help';
import {Command, Topic} from '@oclif/config';

export default class MyHelpClass extends Help {

  public showHelp() {

    console.log(`
    
░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓  ░▓▓ ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓
 ░▓▓▓▓░▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓░▓▓ ░▓▓      
 ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓   ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ 
 ░▓▓░▓▓▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓░▓▓▓▓ ░▓▓      
░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓   ░▓▓   ░▓▓▓▓▓▓▓ ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓


-  E N T E R T A I N M E N T  O N   Y O U R   T E R M I N A L -


  VERSION
  nectune/0.0.0 darwin-x64 node-v10.16.3


  USAGE
  $ nectune [COMMAND]

  
  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *

  COMMANDS

  yoworld      ======>      NON STOP CONTENT

  peepshow     ======>      HOT DEALS +18 

  cocobingo    ======>      PLAY WIN $$$
  
  timemachine  ======>      FIND OLD CONTENT
  

  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *


    `)
  }
}