import Help from '@oclif/plugin-help';
import {Command, Topic} from '@oclif/config';

export default class MyHelpClass extends Help {

  public showHelp() {

    console.log(`



                             ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓  ░▓▓▓  ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓                              
                             ░▓▓▓▓ ░▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓  ░▓▓▓  ░▓▓▓▓ ░▓▓▓  ░▓▓▓▓▓▓▓▓▓      *                       
            *                 ░▓▓▓▓▓░▓▓▓  ░▓▓▓         ░▓▓▓        ░▓▓▓     ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓░▓▓▓  ░▓▓▓                                     
                              ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓    ░▓▓▓        ░▓▓▓     ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓                                
                              ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓    ░▓▓▓        ░▓▓▓     ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓▓                                
                              ░▓▓▓░▓▓▓▓▓  ░▓▓▓         ░▓▓▓        ░▓▓▓     ░▓▓▓  ░▓▓▓  ░▓▓▓░▓▓▓▓▓  ░▓▓▓                                     
                             ░▓▓▓ ░▓▓▓▓  ░▓▓▓▓▓▓▓▓▓   ░▓▓▓▓▓▓▓▓▓    ░▓▓▓     ░▓▓▓▓▓▓▓▓▓  ░▓▓▓ ░▓▓▓▓  ░▓▓▓▓▓▓▓▓▓                              
                             ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓   ░▓▓▓▓▓▓▓▓▓    ░▓▓▓     ░▓▓▓▓▓▓▓▓▓  ░▓▓▓  ░▓▓▓  ░▓▓▓▓▓▓▓▓▓                              
                                                                                                                                             
                                                                                                                         *                   
                *                     -  E N T E R T A I N M E N T  O N   Y O U R   T E R M I N A L -                                        
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                   USAGE                                                                     
                                                            $ nectune [COMMAND]                                                              
   *                                                                                                                                         
                                                                                                                                             
                                                                                                                                             
                                         ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁     COMMANDS      ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁                                         
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                            *                
                   *                    yoworld      ======>      NON STOP CONTENT                                                           
                                                                                                                                       *     
                                        Get all the posts:                                                                                   
                                        Curent month  ----  $ nectune yoworld all                                                            
                                        Past months ----  $ nectune yoworld [EDITION_ID]                                                     
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                        cocobingo    ======>     PLAY WIN $$$                                                                
                                                                                                                                             
                                        Get all the posts:                                                                                   
                                        Curent month  ----  $ nectune cocobingo all                                                          
                                        Past months ----  $ nectune cocobingo [EDITION_ID]                                                   
                                                                                                                                             
                                                                                                                             *               
                    *                                                                                                                        
                                                                                                                                             
                                        peepshow     ======>      HOT DEALS +18CONTENT                                                       
                                                                                                                                             
   *                                    Search deals (max 3 TAGS)   ----  $ nectune yoworld [TAGS]                                           
                                        Read a single deal        ----  $ nectune yoworld [DEAL_ID]                                          
                                                                                                                                             
                                                                                                                                             
                                                                                                                                           * 
                                                                                                                       *                     
                      *                 timemachine  ======>      FIND OLD CONTENT = [EDITION_ID]                                            
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                                                                                                             
                                                             New commands soon...                                                            
                                                                                                                                             
                                                                                                                                             
             *                                                                                                                          *                               

        
             
             
    `)
  }
}