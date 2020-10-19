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
                                                                                                                                              
               *                          // THE TERMZINE                                                                                     
                                                                                                                                              
                                          Last post with chat: $ nectune yoworld                                                              
                                                                                                                              *               
                                          Get past posts:                                                                                     
                                          Curent month  ----  $ nectune yoworld all                                                           
                                          Past months   ----  $ nectune yoworld [EDITION_ID]                                                  
                                                                                                                                              
                                                                                                                                              
                                                                                                                                              
                                          // THE GAMES                                                                                        
                                                                                                                                              
                                          Last game with chat: $ nectune cocobingo                                                            
              *                                                                                                                               
                                          Get past games:                                                           *                         
                                          Curent month  ----  $ nectune cocobingo all                                                         
                                          Past months   ----  $ nectune cocobingo [EDITION_ID]                                                
                                                                                                                                              
                                   *                                                                                                          
                                                                                                                                              
                                          // THE DEALS                                                                                        
                                                                                                                                              
                                          Last deals: $ nectune peepshow                                                                      
                                                                                                                                       *      
                                          Search deals (max 3 TAGS)   ----  $ nectune peepshow [TAGS]                                         
                                          Read a single deal          ----  $ nectune peepshow [DEAL_ID]                                      
                *                                                                                                                             
                                                                                                                                              
                                                                                                                                              
                                          // POST MESSAGE                                                                                     
                                                                                                                                              
                                          Send messages to chat: $ nectune piou                                                               
                                                                                                                                   *          
                           *                                                                                                                  
                                                                                                                                              
                                          // THE TIMEMACHINE                                                                                  
                                                                                                                                              
                                          Find old content = [EDITION_ID]: $ nectune timemachine                                              
                                                                                                                                              
                                                                                                                            *                 
        *                                                                                                                                     
                                                              New commands soon...                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                      
             
    `)
  }
}