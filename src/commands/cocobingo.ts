import Command from '@oclif/command'
const fetch = require('node-fetch');
const chalk = require('chalk');
var columnify = require('columnify')
var emoji = require('node-emoji')

export class CocoBingo extends Command {

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
    const {args} = this.parse(CocoBingo)    

    if (args.edition && !isNaN(args.edition) ) {
      var nectuneData = await logFetch('https://www.nectune.com/games/'+ args.edition  +'.json');
    }
    else{
      var nectuneData = await logFetch('https://www.nectune.com/games.json');
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

      //RETURN HEADER
      console.log(chalk.yellow.bold(customContent( "header")));
      console.log(chalk.green.bold(customContent( "header_two")));

      if (args.edition == "all" || !isNaN(args.edition)){
        //LOOP RECORD
        for (let i = 0 ; i < listCards.length ; i++) {
          var content = listCards[i].content
          console.log(content)
        }
      }
      
      else{

        // MAP MESSAGES
        var messages = nectuneData.messages.map(function(i: { name: any; content: any; }) {
          return{
            name: i.name,
            content: i.content.substring(0, 125),
          } 
        });

        //LAST LIVE ITEM
        var last = listCards[0].content
        console.log(last + "\n")

        console.log(chalk.bold.bgBlack(customContent( "link_text")) + "\n")

        //LOOP MESSAGES
        var data = []
          
        for (let i = 0 ; i < messages.length ; i++) {
          data.push({
            name: emoji.get(customText( "emoji_message")) + '   ' + chalk.bold(messages[i].name),
            content: messages[i].content,
          })
          // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
          data.push({
            name: "",
            content: "",
          })
        }

        var columns = columnify(
          data,{
          showHeaders: false,
          config:{
            content:{
              minWidth: customNumber( "min_width_content"),
            },
            name:{
              minWidth: customNumber( "min_width_name"),
              maxWidth: customNumber( "max_width_name")
            }
          }
        })
      
        console.log(columns)

      }
      
    }
              
  }
}
