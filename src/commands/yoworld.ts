import Command from '@oclif/command'
const fetch = require('node-fetch');
var blessed = require('blessed');


export class YoWorld extends Command {

  // CLI CONFIG
  static args = [
    {name: 'edition'},
  ]

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

    // FETCH WITH ARGS
    const {args} = this.parse(YoWorld)    

    if (args.edition) {
      var nectuneData = await logFetch('https://www.nectune.com/lives/'+ args.edition  +'.json');
    }
    else{
      var nectuneData = await logFetch('https://www.nectune.com/lives.json');
    }

    //MAP CUSTOM VALUES
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

    //BLESSED LAYOUT
    // Create a screen object.
    var screen = blessed.screen({
      smartCSR: true
    });

    screen.key(['escape', 'q', 'C-c'], function(ch: any, key: any) {
      return process.exit(0);
    });

    screen.title = customText( "screen_title");

    // MAIN CONTAINER
    var mainHome = blessed.box({
      top: '0%',
      left: 'center',
      width: customNumber( "main_box_width"),
      scrollable: true,
      alwaysScroll: true, 
      keys: true,
      scrollbar: {
        bg: 'white'
      },
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

    //NOTIFICATION
    var notifHeader = blessed.box({
      parent: liveHeader,
      bottom: customNumber( "notif_bottom"),
      height: customNumber( "notif_height"),
      content: customContent( "notif_content"),
      tags: true,
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
 
    //MAP RECORD
    var listCards = nectuneData.cards.map(function(i: { content: any; width: any; height: any; left: any; valign: any; padding: any; top: any; bg: any; fg: any; border_fg: any; border_bg: any; border_type: any; border_ch: any; }) {
      return{
        content: i.content,
        boxWidth: i.width,
        boxHeight: i.height,
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
    var toTop = 22;

    while (i < listCards.length) {

    if (i == 0){
      toTop = toTop;
    }
    else if (listCards[i].top == 0){
      var toTop = toTop;
    } 
    else if (listCards[i].top == 1){
      var toTop = Number(toTop + listCards[i-1].boxHeight + 1);
    }

    //CARD
    var boxTwo = blessed.box({
      parent: mainHome,
      top: toTop,
      left: listCards[i].left,
      width: listCards[i].boxWidth,
      height: listCards[i].boxHeight,
      content: listCards[i].content,
      valign: listCards[i].valign,
      tags: true,
      shrink: true,
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
