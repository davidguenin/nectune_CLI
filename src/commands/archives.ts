import Command from '@oclif/command'
const fetch = require('node-fetch');
var blessed = require('blessed');

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

    //MAP CUSTOM VALUES
    var customValues = nectuneData.custom_values.map(function(i) {
      return{
        title: i.title,
        value: i.value,
        content: i.content,
      } 
    });

    //RETURN A CUSTOM VALUE STRING -> VALUE
    function customText(title){
      var findTitle = customValues.find(obj => {
        return obj.title === title
      })
      return findTitle.value; 
    }

    //RETURN A CUSTOM VALUE NUMBER -> VALUE
    function customNumber(title){
      var findTitle = customValues.find(obj => {
        return obj.title === title
      })
      return parseInt(findTitle.value); 
    }

    //MAP RECORD
    var listLives = nectuneData.lives.map(function(i) {
      return{
        tagline: i.tagline,
        edition: i.edition,
        date: i.date,
      } 
    });

    //BLESSED LAYOUT
    // Create a screen object.
    var screen = blessed.screen({
      smartCSR: true
    });

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

    screen.title = customText( "screen_title");

    // MAIN CONTAINER
    var mainHome = blessed.box({
      top:  '0%',
      left: 'center',
      width: customNumber( "main_box_width"),
      scrollable: true,
      alwaysScroll: true, 
      keys: true
    });
    
    screen.append(mainHome);
    
    //HEADER
    var liveHeader = blessed.box({
      parent: mainHome,
      top: customText( "header_top") + '%',
      left: customNumber( "header_left"),
      height: customText( "header_height") + '%',
      valign: customText( "header_valign"),
      content: nectuneData.header,
    });

    //LEFT
    var left = blessed.box({
      top: customText( "left_top"),
      left: customText( "left_left"),
      height: customText( "left_height") + '%',
      width: customText( "left_width") + '%',
      content:  nectuneData.left,
    });

    screen.append(left);

    //RIGHT
    var right = blessed.box({
      top: customText( "right_top"),
      right: customText( "right_right"),
      height: customText( "right_height") + '%',
      width: customText( "right_width") + '%',
      content:  nectuneData.right,
    });

    screen.append(right);

    var i = 0;
    var toTop = 22;
    var totalHeight = [];

    while (i < listLives.length) {

      //Calc toTop   
      if (i == 0){
        toTop = toTop;
      }
      else{
        var toTop = toTop + totalHeight[i-1] + 1;
      } 

    //Push to total height array   
     var cardtHeight = customNumber( "card_height") 
     totalHeight.push(cardtHeight)

    var card = blessed.box({
      parent: mainHome,
      top: toTop,
      height: cardtHeight,
      width: customNumber( "card_width"),
      padding: customNumber( "card_padding"),
      tags: true,
      shrink: true,
      scrollable: true,
      alwaysScroll: true,
      border:{
        type: customText( "card_border"),
        fg: customText( "card_border_color")
      }
    });

    var cardEdition = blessed.box({
      parent: card,
      left: customNumber( "card_edition_left"),
      tags: true,
      shrink: true,
      content: customText( "card_edition_content") +  listLives[i].edition ,
    });


    var cardTitle = blessed.box({
      parent: card,
      left: customNumber( "card_title_left"),
      tags: true,
      shrink: true,
      content: listLives[i].tagline,
    });

    var cardDate = blessed.box({
      parent: card,
      right: customNumber( "card_date_right"),
      tags: true,
      shrink: true,
      content: listLives[i].date, 
    });

      i++;
    }

    screen.render();

  }
}
