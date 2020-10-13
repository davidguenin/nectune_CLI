import Command from '@oclif/command'
const axios = require('axios');
const chalk = require('chalk');
var columnify = require('columnify')
var emoji = require('node-emoji')

export class CocoBingo extends Command {

  // CLI CONFIG
  static args = [
    {name: 'edition'},
  ]

  async run() {

    //GET DATA NECTUNE API
    async function getData(url: string) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          return response.data;
        } 
      } catch (error) {
        console.log('Ouuups no content here...');
      }
    }

    // REQUEST WITH ARGS
    const {args} = this.parse(CocoBingo)    

    if (args.edition && !isNaN(args.edition) ) {
      var nectuneData = await getData('https://www.nectune.com/games/'+ args.edition  +'.json');
    }
    else{
      var nectuneData = await getData('https://www.nectune.com/games.json');
    }
    
    // CUSTOM ERROR IF REQUEST ERROR
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
         console.log(last + "\n")
         console.log( chalk.green(customText( "link_text_ba_left")) +  chalk.bold.yellow(customContent( "link_text"))+ chalk.green(customText( "link_text_ba_right"))  + "\n")

        //GET MESSAGES
         async function logEvery2Seconds(i: number) {
          setTimeout(async () => {
            var messagesData = await getData('https://www.nectune.com/messages.json');
            var messages = messagesData.messages.map(function(i: { name: any; content: any; created_at: any;  tag: any;}) {
              return{
                name: i.name.substring(0, 20),
                content: i.content.substring(0, 220),
                date: i.created_at,
                tag: i.tag
              } 
            });

            //LOOP MESSAGES
            var data = []           
            for (let i = 0 ; i < messages.length ; i++) {
              //GET ONLY MESSAGES THAT HAVE LESS THAN X MINUTES
              var dateMessage = Date.parse(messages[i].date)
              var dateNow = new Date().toString()
              var dateLessMinutes = Date.parse(dateNow)
              dateLessMinutes = dateLessMinutes - (customNumber( "minutes_load_msg") * 60 * 1000)

              if (dateMessage > dateLessMinutes && messages[i].tag == "cocobingo_tchat"){
                data.push({
                  left:"",
                  name: emoji.get(customText( "emoji_message")) + '   ' + chalk.bold(messages[i].name),
                  content: messages[i].content,
                })
                // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
                data.push({
                  name: "",
                  content: "",
                })
              }      
            }

            //DISPLAY MESSAGES WITH COLUMNIFY
            var columns = columnify(
              data,{
              showHeaders: false,
              config:{
                content:{
                  minWidth: customNumber( "min_width_content"),
                  maxWidth: customNumber( "max_width_content"),
                },
                name:{
                  minWidth: customNumber( "min_width_name"),
                  maxWidth: customNumber( "max_width_name")
                },
                left:{
                  minWidth: customNumber( "min_width_left"),
                }
              }
            })
          
            //CHECK BEFORE LOG TO NOT CREATE LINEBREAK
            if (data.length > 0){
              console.log(columns)
            }
            
            logEvery2Seconds(++i);
          }, customNumber( "time_refresh_msg"))
        }
      
        logEvery2Seconds(0);

      }  
    }         
  }
}
