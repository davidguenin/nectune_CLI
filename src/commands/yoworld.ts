import Command from '@oclif/command'
require('dotenv').config()
const fetch = require('node-fetch');
var blessed = require('blessed');



export class MyCommand extends Command {

  async run() {


    
    //FETCH DATA NECTUNE API
    async function logFetch(url) {
      try {
        const response = await fetch(url);
        return response.json();
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }
    
    var nectuneData = await logFetch('https://www.nectune.com/api.json');



    //BLESSED LAYOUT
    // Create a screen object.
    var screen = blessed.screen({
      smartCSR: true
    });

    screen.title = 'Nectune homepage';

    var mainHome = blessed.box({
      top: '0%',
      left: 'center',
      width: '60%',
      height: '100%',
      scrollable: true,
      keys: true,
      alwaysScroll: true,
      scrollbar: {
        bg: 'blue'
      },
    });

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });
    
    screen.append(mainHome);
    


    //MAP RECORD
    var listCards = nectuneData.cards.map(function(i) {
      return{
        content: i.content,
        boxWidth: i.width,
        boxHeight: i.height,
        row: i.row,
        left: i.left,
        valign: i.valign,
        padding: i.padding,
      } 
    });
      

    //LOOP RECORD
    var i = 0;
    var toTop = 0;

    while (i < listCards.length) {

    if (i == 1){
      var toTop = toTop + listCards[0].boxHeight + 4;
    } 
    else if (listCards[i].row == 0){
      var toTop = toTop;
    } 
    else{
      var toTop = toTop + listCards[i].boxHeight + 4;
    }


    //CARD
    var boxTwo = blessed.box({
      parent: mainHome,
      top: toTop + '%',
      left: listCards[i].left + '%',
      width: listCards[i].boxWidth + '%',
      height: listCards[i].boxHeight + '%',
      content: listCards[i].content,
      valign: listCards[i].valign,
      padding: listCards[i].padding,
      tags: true,
      border:{
        type: 'bg',
        ch:'z',
        bg: '#4A70B6',
        fg:'#D386B9',
      },
      style: {
        fg: '#000',
        bg: '#efefef',
        bold: true,
      }
    });
  
  //LOOP RECORD END
  i++;
    
  }

  // Render the screen.
  screen.render();
              

  }
}
