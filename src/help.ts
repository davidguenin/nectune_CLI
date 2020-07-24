import Help from '@oclif/plugin-help';
import {Command, Topic} from '@oclif/config';

export default class MyHelpClass extends Help {

  public showHelp() {

    console.log(`
    
    ░▓▓ ░▓▓ ░▓▓▓▓▓▓ ░▓▓▓▓▓▓ ░▓▓▓▓▓▓ ░▓▓ ░▓▓ ░▓▓ ░▓▓ ░▓▓▓▓▓▓
    ░▓▓▓░▓▓ ░▓▓     ░▓▓       ░▓▓   ░▓▓ ░▓▓ ░▓▓▓░▓▓ ░▓▓    
    ░▓▓▓▓▓▓ ░▓▓▓▓▓  ░▓▓       ░▓▓   ░▓▓ ░▓▓ ░▓▓▓▓▓▓ ░▓▓▓▓▓ 
    ░▓▓░▓▓▓ ░▓▓     ░▓▓       ░▓▓   ░▓▓ ░▓▓ ░▓▓░▓▓▓ ░▓▓    
    ░▓▓ ░▓▓ ░▓▓▓▓▓▓ ░▓▓▓▓▓▓   ░▓▓   ░▓▓▓▓▓▓ ░▓▓ ░▓▓ ░▓▓▓▓▓▓

    **********************
    COMMANDS
    **********************

    yoworld   //===>  To read the media.

    deals     //===>  To have amazing tech deals

    games     //===>  Coming soon

    `)
  }
}