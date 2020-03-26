import Command from '@oclif/command'
require('dotenv').config()
var blessed = require('blessed');

export class MyCommand extends Command {

  async run() {


    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appcKg4FJ08P9Ygxa');

    //PAGINATION
    //https://stackoverflow.com/questions/42761068/paginate-javascript-array
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

    // Create a box perfectly centered horizontally and vertically.
    var mainHome = blessed.box({
      top: '0%',
      left: 'center',
      width: '50%',
      height: '100%',
      text: 'Hello {bold}world{/bold}!',
      tags: true,
      scrollable: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: '#f0f0f0'
        }
      }
    });

    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });


    // Append our box to the screen.
    screen.append(mainHome );
    

    base('Yoworld').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

        //MAP RECORD
        //https://stackoverflow.com/questions/23036023/javascript-array-of-objects-get-single-value
        var ids = records.map(function(i) {
          return i.get('Name - Lastname');
        });

        var tt = paginate(ids, 5, 1)


        var number = 0;
        var i = 0;
        while (i < tt.length) {
          
          var boxTwo = blessed.box({
            parent: mainHome,
            top: (i * 10) + '%',
            left: 'center',
            width: '100%',
            height: '10%',
            content: 'Hello' + i,
            tags: true,
            border: {
              type: 'line'
            },
            style: {
              fg: '#000',
              bg: '#efefef',
              border: {
                fg: '#000'
              },
            }
        });

          i++;

      
        }





      // Render the screen.
      screen.render();
              
      //console.log(paginate(ids, 1, 1).join("\n"));

      console.log(tt)
        


    }, function done(err) {
        if (err) { console.error(err); return; }
    });


  }
}
