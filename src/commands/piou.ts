import Command from '@oclif/command'
const axios = require('axios');
import cli from 'cli-ux'
const chalk = require('chalk');

export default class Piou extends Command {

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

    var nectuneData = await getData('https://www.nectune.com/new_message_informations.json');

    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another argument :)')
    }

    else{

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
      console.log(customContent( "header"));
    
      //POST MESSAGE
      const name = await cli.prompt(customText( "text_name"))
      const tag = await cli.prompt(customText( "text_tag"))
      const message = await cli.prompt(customText( "text_message"))
      await cli.anykey()

        const data = {
          message:{
            name: name,
            content: message,
            tag: tag
          }
        };
      
      const sendMessage = async () => {
          try {
              const res = await axios.post('https://www.nectune.com/messages', data);
              console.log(customText( "message_success"));
          } catch (err) {
              console.error(customText( "message_error"));
          }
      };
          
      sendMessage();
    
    }
  }
}
