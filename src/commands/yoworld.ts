import Command from '@oclif/command'
require('dotenv').config()
var blessed = require('blessed');

export class MyCommand extends Command {

  async run() {

    //INIT AIRTABLE
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appcKg4FJ08P9Ygxa');


    //PAGINATION FUNCTION
    function paginate(array, page_size, page_number) {

      var sliceIt = array.slice((page_number - 1) * page_size, page_number * page_size);

      return sliceIt;
    }
    

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
    

    //START AIRTABLE LOOP
    base('live').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

      fetchNextPage();

        //MAP RECORD
        var ids = records.map(function(i) {
          return{
            content: i.get('content'),
            boxWidth: i.get('boxWidth'),
            boxHeight: i.get('boxHeight'),
            row: i.get('row'),
            left: i.get('left'),
            valign: i.get('valign')
          } 
        });
      

        //PAGINATE SORT RECORD
        var listCards = paginate(ids, 100, 1)
        

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

          console.log(toTop)

          //CARD
          var boxTwo = blessed.box({
            parent: mainHome,
            top: toTop + '%',
            left: listCards[i].left + '%',
            width: listCards[i].boxWidth + '%',
            height: listCards[i].boxHeight + '%',
            content: listCards[i].content,
            valign: listCards[i].valign,
            padding: 3,
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
              
      
    //END AIRTABLE LOOP
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


  }
}
