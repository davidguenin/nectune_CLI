import Command from '@oclif/command'
const axios = require('axios');
import cli from 'cli-ux'

export default class Message extends Command {

  async run() {

   const name = await cli.prompt('Your name')
   const tag = await cli.prompt('Tag')
   const message = await cli.prompt('Your message')
   // "press any key to continue"
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
          console.log("pouet");
      } catch (err) {
          console.error("oups");
      }
  };
      
  sendMessage();
    
  }
}
