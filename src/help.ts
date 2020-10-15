import Help from '@oclif/plugin-help';
import {Command, Topic} from '@oclif/config';

export default class MyHelpClass extends Help {

  public showHelp() {

    console.log(`
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                       ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓  ░▓▓ ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓                                   *    
       *                                ░▓▓▓▓░▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓░▓▓ ░▓▓                                              
                                        ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓   ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓                                         
                                        ░▓▓░▓▓▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓░▓▓▓▓ ░▓▓                                              
                                       ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓   ░▓▓   ░▓▓▓▓▓▓▓ ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓                                        
                                                                                                                                             
                                                                                                                                             
                                       -  E N T E R T A I N M E N T  O N   Y O U R   T E R M I N A L -             *                         
                          *                                                                                                                  
                                                                                                                                             
                                                                   USAGE                                                                     
                                                            $ nectune [COMMAND]                                                              
                                                                                                                                             
                                         ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁     COMMANDS      ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁                                         
                                                                                                                                             
               *                                                                                                                             
                                          $ nectune yoworld  ===>  The termzine                                                              
                                                                                                                                             
                                          Get all the posts:                                                                  *              
                                          Curent month  ----  $ nectune yoworld all                                                          
                                          Past months   ----  $ nectune yoworld [EDITION_ID]                                                 
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                          $ nectune cocobingo  ===>  The games                                                               
                                                                                                                                             
                                          Get all the posts:                                                                                 
                                          Curent month  ----  $ nectune cocobingo all                                                        
              *                           Past months   ----  $ nectune cocobingo [EDITION_ID]                                               
                                                                                                                    *                        
                                                                                                                                             
                                                                                                                                             
                                          $ nectune peepshow  ===>  The deals                                                                
                                   *                                                                                                         
                                          Search deals (max 3 TAGS)   ----  $ nectune peepshow [TAGS]                                        
                                          Read a single deal          ----  $ nectune peepshow [DEAL_ID]                                     
                                                                                                                                             
                                                                                                                                             
                                                                                                                                       *     
                                          $ nectune piou  ===>  Send messages to chat                                                        
                                                                                                                                             
                *                                                                                                                            
                                                                                                                                             
                                          $ nectune timemachine  ===>  Find old content = [EDITION_ID]                                       
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                             New commands soon...                                                  *         
                           *                                                                                                                 
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
             
    `)
  }
}