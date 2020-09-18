import Command from '@oclif/command'
const fetch = require('node-fetch');

export class YoWorld extends Command {

  // CLI CONFIG
  static args = [
    {name: 'edition'},
  ]

  async run() {

    //FETCH DATA NECTUNE API
    async function logFetch(url: string) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return response.json();
        } else {
          console.log('Ouuups no content here...');
        }
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

    // FETCH WITH ARGS
    const {args} = this.parse(YoWorld)    

    if (args.edition && !isNaN(args.edition) ) {
      var nectuneData = await logFetch('https://www.nectune.com/lives/'+ args.edition  +'.json');
    }
    else{
      var nectuneData = await logFetch('https://www.nectune.com/lives.json');
    }
    
    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another argument :)')
    }
    
    else{

      //MAP RECORD
      var listCards = nectuneData.cards.map(function(i: { content: any; }) {
        return{
          content: i.content
        } 
      });

      if (args.edition == "all" || !isNaN(args.edition)){
        //LOOP RECORD
        for (let i = 0 ; i < listCards.length ; i++) {
          var content = listCards[i].content
          console.log(content)
        }
      }
      
      else{
        //LAST LIVE ITEM
        var last = listCards[0].content
        console.log(last)
      }
      
    }
              
  }
}
