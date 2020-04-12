import Command from '@oclif/command'
require('dotenv').config()
const fetch = require('node-fetch');
var blessed = require('blessed');

export class MyCommand extends Command {

  async run() {

//     let test;
//   // Replace ./data.json with your JSON feed
//  fetch('https://www.nectune.com/api.json')
//     .then(response => {
//       return response.json()
//     })
//     .then(data => {
//       // Work with JSON data here
//       test = data 
//     })
//     .catch(err => {
//       // Do something for an error here
//     })
    
    async function logFetch(url) {
      try {
        const response = await fetch(url);
        return response.json();
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }
    
    var caca = await logFetch('https://www.nectune.com/api.json');

    console.log (caca)

    // //BLESSED LAYOUT
    // // Create a screen object.
    // var screen = blessed.screen({
    //   smartCSR: true
    // });

    // screen.title = 'Nectune homepage';

    // var mainHome = blessed.box({
    //   top: '0%',
    //   left: 'center',
    //   width: '60%',
    //   height: '100%',
    //   scrollable: true,
    //   keys: true,
    //   alwaysScroll: true,
    //   scrollbar: {
    //     bg: 'blue'
    //   },
    // });

    // screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    //   return process.exit(0);
    // });
    
    // screen.append(mainHome);
    


    //     //MAP RECORD
    //     var ids = records.map(function(i) {
    //       return{
    //         content: i.get('content'),
    //         boxWidth: i.get('boxWidth'),
    //         boxHeight: i.get('boxHeight'),
    //         row: i.get('row'),
    //         left: i.get('left'),
    //         valign: i.get('valign'),
    //         padding: i.get('padding'),
    //       } 
    //     });
      

    //     //PAGINATE SORT RECORD
    //     var listCards = paginate(ids, 100, 1)
        

    //     //LOOP RECORD
    //     var i = 0;
    //     var toTop = 0;

    //     while (i < listCards.length) {

    //     if (i == 1){
    //       var toTop = toTop + listCards[0].boxHeight + 4;
    //     } 
    //     else if (listCards[i].row == 0){
    //       var toTop = toTop;
    //     } 
    //     else{
    //       var toTop = toTop + listCards[i].boxHeight + 4;
    //     }


    //       //CARD
    //       var boxTwo = blessed.box({
    //         parent: mainHome,
    //         top: toTop + '%',
    //         left: listCards[i].left + '%',
    //         width: listCards[i].boxWidth + '%',
    //         height: listCards[i].boxHeight + '%',
    //         content: listCards[i].content,
    //         valign: listCards[i].valign,
    //         padding: listCards[i].padding,
    //         tags: true,
    //         border:{
    //           type: 'bg',
    //           ch:'z',
    //           bg: '#4A70B6',
    //           fg:'#D386B9',
    //         },
    //         style: {
    //           fg: '#000',
    //           bg: '#efefef',
    //           bold: true,
    //         }
    //       });
        
    //     //LOOP RECORD END
    //     i++;
          
    //     }

    //   // Render the screen.
    //   screen.render();
              


  }
}
