import Command from '@oclif/command'
const fetch = require('node-fetch');
var blessed = require('blessed');


export class Deals extends Command {

  // CLI CONFIG
  static args = [
    {name: 'edition'},
  ]

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

    // FETCH WITH ARGS
    const {args} = this.parse(Deals)    

    if (args.edition) {
      var nectuneData = await logFetch('https://www.nectune.com/deals/'+ args.edition  +'.json');
    }
    else{
      var nectuneData = await logFetch('https://www.nectune.com/deals.json');
    }

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

    //MAP DEALS
    var listDeals = nectuneData.deals.map(function(i) {
      return{
        content: i.content,
        tagline: i.tagline,
        price: i.price.toString(),
        link: i.link,
        category: i.category,
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

    var mainHome = blessed.box({
      top:  customText( "main_box_top") + '%',
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
      top: '0%',
      left: 25,
      height: '35%',
      valign: 'middle',
      content: nectuneData.header,
    });

    //LEFT
    var left = blessed.box({
      top: '0',
      left: '0',
      height: '100%',
      width: '10%',
      content:  nectuneData.left,
    });

    screen.append(left);

    //RIGHT
    var right = blessed.box({
      top: '0',
      right: '0',
      height: '100%',
      width: '10%',
      content:  nectuneData.right,
    });

    screen.append(right);
 
    //LOOP RECORD
    var i = 0;
    var toTop = 22;
    var totalHeight = [];

    while (i < listDeals.length) {

    //Calc Height
    var contentHeight = 0
    var content = listDeals[i].content
    var contentLength = content.length
    var contentlines = Math.round(contentLength / 135) 
    var lineBreaks = (content.match(/\n/g)||[]).length
    var calclineBreaks = Math.round(lineBreaks / 2)
    
    if (contentlines <= 1){
      contentHeight = 10
    }
    else{
      contentHeight = (contentlines * 5 ) + calclineBreaks
    }

    //Push to total height array
    totalHeight.push(contentHeight)

    //Calc toTop
    if (i == 0){
      toTop = toTop;
    }
    else{
      var toTop = toTop  + totalHeight[i-1] + 1; 
    }

    //CONTAINER
    var boxContainer = blessed.box({
      parent: mainHome,
      height: contentHeight,
      width: 125,
      top: toTop,
      padding: 1,
      tags: true,
      shrink: true,
      scrollable: true,
      alwaysScroll: true,
      border: 'line',
      style:{
        border:{
          fg: '#6D6D6D'
        }
      }
    });

    //TITLE
    var boxTitle = blessed.box({
      parent: boxContainer,
      content: '{bold}{#1F6EC3-bg}' + listDeals[i].tagline + '{/}',
      top: 0,
      left: 0,
      tags: true,
      shrink: true,
    });

    //CATEGORY
    var boxCategory = blessed.box({
      parent: boxContainer,
      content: listDeals[i].category,
      top: 0,
      right: 0,
      tags: true,
      shrink: true,
    });
    
    //CONTENT
    var boxContent = blessed.box({
      parent: boxContainer,
      content: listDeals[i].content,
      top: 3,
      tags: true,
      shrink: true,
    });

    //LINK
    var boxLink = blessed.box({
      parent: boxContainer,
      content: '-> ' + listDeals[i].link ,
      bottom: 0,
      tags: true,
      shrink: true,
    });

    //PRICE
    var boxPrice = blessed.box({
      parent: boxContainer,
      content: listDeals[i].price + ' $',
      bottom: 0,
      right: 0,
      tags: true,
      shrink: true,
    });
  
  //LOOP RECORD END
  i++;
    
  }

  // Render the screen.
  screen.render();
              
  }
}
