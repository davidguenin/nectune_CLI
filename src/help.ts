import Help from '@oclif/plugin-help';
import {Command, Topic} from '@oclif/config';

export default class MyHelpClass extends Help {
  public showHelp() {
    console.log('Display my custom command help!')
  }
}