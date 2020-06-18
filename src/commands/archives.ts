import Command from '@oclif/command'
const fetch = require('node-fetch');

export default class Archives extends Command {

  async run() {

    //FETCH DATA NECTUNE API
    async function logFetch(url) {
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

    var nectuneData = await logFetch('https://www.nectune.com/lives-list.json');

    //MAP RECORD
    var listLives = nectuneData.lives.map(function(i) {
      return{
        tagline: i.tagline,
        edition: i.edition,
        date: i.date,
      } 
    });

    function paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    console.log(paginate(listLives, 2, 1));

    var i = 0;
    while (i < listLives.length) {
      console.log(listLives[i].edition + listLives[i].tagline + listLives[i].date );
      i++;
    }

  }
}
