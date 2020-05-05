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
    
    var nectuneData = await logFetch('https://www.nectune.com/api.json?token='+process.env.API_NECTUNE_KEY);



    //BLESSED LAYOUT
    // Create a screen object.
    var screen = blessed.screen({
      smartCSR: true
    });

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    screen.title = 'Nectune homepage';

    var mainHome = blessed.box({
      top: '0%',
      left: 'center',
      width: '75%',
      height: '100%',
      scrollable: true,
      keys: true,
      alwaysScroll: true,
      scrollbar: {
        bg: 'blue'
      },
    });
    
    screen.append(mainHome);
    
    
    //HEADER
    var liveHeader = blessed.box({
      parent: mainHome,
      top: '0',
      left: 'center',
      height: '35%',
      valign: 'middle',
      content: nectuneData.header,
    });


    //LEFT
    var left = blessed.box({
      top: '0',
      left: '0',
      height: '100%',
      width: '12.5%',
      content:  nectuneData.left,
    });

    screen.append(left);

    //RIGHT
    var right = blessed.box({
      top: '0',
      right: '0',
      height: '100%',
      width: '12.5%',
      content:  nectuneData.right,
    });

    screen.append(right);

    

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
        top: i.top,
        bg: i.bg,
        fg: i.fg,
        border_fg: i.border_fg,
        border_bg: i.border_bg,
        border_type: i.border_type,
        border_ch: i.border_ch,
      } 
    });
      

    //LOOP RECORD
    var i = 0;
    var toTop = 35;

    while (i < listCards.length) {

    if (i == 0){
      toTop = toTop;
    }
    else if (listCards[i].top == 0){
      var toTop = toTop;
    } 
    else if (listCards[i].top == 1){
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
      tags: true,
      border:{
        type: listCards[i].border_type,
        ch: listCards[i].border_ch,
        bg: listCards[i].border_bg,
        fg: listCards[i].border_fg,
      },
      style: {
        fg: listCards[i].fg,
        bg: listCards[i].bg,
      },
      padding: {
        left: listCards[i].padding,
        right: listCards[i].padding,
        bottom: listCards[i].padding,
        top: listCards[i].padding
      }
    });
  
  //LOOP RECORD END
  i++;
    
  }

  // Render the screen.
  screen.render();
              

  }
}
