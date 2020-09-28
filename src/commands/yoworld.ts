import Command from '@oclif/command'
const fetch = require('node-fetch');
const chalk = require('chalk');

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
      console.log('Try another command :-)')
    }
    
    else{

      //MAP RECORD
      var listCards = nectuneData.cards.map(function(i: { content: any; }) {
        return{
          content: i.content
        } 
      });

      var customValues = nectuneData.custom_values.map(function(i: { title: any; value: any; content: any; }) {
        return{
          title: i.title,
          value: i.value,
          content: i.content,
        } 
      });

      //RETURN A CUSTOM VALUE STRING -> VALUE
      function customText(title: string){
        var findTitle = customValues.find((obj: { title: any; }) => {
          return obj.title === title
        })
        return findTitle.value; 
      }

      //RETURN A CUSTOM VALUE CONTENT
      function customContent(title: string){
        var findTitle = customValues.find((obj: { title: any; }) => {
          return obj.title === title
        })
        return findTitle.content; 
      }

      //RETURN A CUSTOM VALUE NUMBER -> VALUE
      function customNumber(title: string){
        var findTitle = customValues.find((obj: { title: any; }) => {
          return obj.title === title
        })
        return parseInt(findTitle.value); 
      }

      //RETURN NOTIFICATION
      console.log(chalk.bold.red(customText( "notification")));

      //DEFINE DATE OF THE DAY
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var today  = new Date();
      var dateToday = today.toLocaleDateString("en-US", options)

      //RETURN HEADER
      console.log(customContent( "header"));
      console.log((customContent( "header_mention_left") + dateToday + customContent( "header_mention_right")).toUpperCase() + '\n\n')

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

      //RETURN FOOTER
      console.log('\n\n' + customContent( "footer")+ '\n\n');
      
    }
              
  }
}
