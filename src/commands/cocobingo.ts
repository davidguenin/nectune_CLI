import Command from '@oclif/command'
const axios = require('axios');
const chalk = require('chalk');
var columnify = require('columnify')
var emoji = require('node-emoji')
import cli from 'cli-ux'

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

      //CUSTOM VALUES
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
        console.log(last + "\n")
        console.log( chalk.green(customText( "link_text_ba_left")) +  chalk.bold.yellow(customContent( "link_text"))+ chalk.green(customText( "link_text_ba_right"))  + "\n")

        //LOOP MESSAGES
        function returnMessages(dataName: any){
          var columns = columnify(
            dataName,{
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
          console.log(columns)
        }

        var messages = nectuneData.messages.slice(0, customNumber( "number_messages")).map(function(i: { name: any; content: any; created_at: any;  tag: any;}) {
          return{
            name: i.name.substring(0, 20),
            content: i.content.substring(0, 200),
            date: i.created_at,
            tag: i.tag
          } 
        });

        var data = []           
        for (let i = 0 ; i < messages.length; i++) {
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
        
        returnMessages(data)

        //LOAD MORE MESSAGES
        for (let i = 0 ; i < 100; i++) {

          //LAST DATE CHECK
          var dateNew = new Date().toString()
          var dateNewParse = Date.parse(dateNew)

          // IF PROMPT LAUNCH REQUEST
          var loadMore =  await cli.anykey(customContent( "keypress_load_messages"))
          if(loadMore !== undefined){
            var messagesData = await getData('https://www.nectune.com/messages.json?tag=cocobingo');
            var messages = messagesData.messages.map(function(i: { name: any; content: any; created_at: any;  tag: any;}) {
              return{
                name: i.name.substring(0, 20),
                content: i.content.substring(0, 200),
                date: i.created_at,
                tag: i.tag
              } 
            });

            //STORE DATE MESSAGES
            var msg = []
            for (let i = 0 ; i < messages.length; i++) {
              var you = Date.parse(messages[i].date)
              msg.push(you)
            }

            // FILTER THE LAST NEVER READ => COMPARE DATES
            var lastMessages = msg.filter(msg=> msg > dateNewParse)

            //START RENDER
            var dataMessages = []           
            for (let i = 0 ; i < lastMessages.length; i++) {
              // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
              dataMessages.push({
              name: "",
              content: "",
            })
              dataMessages.push({
                left:"",
                name: emoji.get(customText( "emoji_message")) + '   ' + chalk.bold(messages[i].name),
                content: messages[i].content,
              })
   
            }

            if (lastMessages.length > 0){
              console.log('\n')
              //REVERSE ARRAY TO HAVE THE LASTEST MESSAGE AT THE BOTTOM
              const reversed = dataMessages.reverse();
              returnMessages(dataMessages)
              console.log('\n')
            }
            else{
              console.log(customContent( "keypress_no_message"))
            }
                           
          }
        }
      }  
    }         
  }
}
