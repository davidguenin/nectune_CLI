import Command from '@oclif/command'
const fetch = require('node-fetch');

export default class Timemachine extends Command {

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

    var nectuneData = await logFetch('https://www.nectune.com/timemachine.json');

    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another argument :)')
    }

    else{

      //MAP RECORD
      var listLives = nectuneData.list.map(function(i: { tagline: any; edition: any; date: any; }) {
        return{
          tagline: i.tagline,
          edition: i.edition,
          date: i.date,
        } 
      });

      //LOOP RECORD
      for (let i = 0 ; i < listLives.length ; i++) {
      console.log(listLives[i].tagline);

      }
    }

  }
}
