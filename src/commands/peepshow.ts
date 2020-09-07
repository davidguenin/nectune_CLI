import Command from '@oclif/command'
const fetch = require('node-fetch');
var blessed = require('blessed');


export class PeepShow extends Command {

  // CLI CONFIG
  static args = [
    {name: 'tag_one'},
    {name: 'tag_two'},
    {name: 'tag_three'}
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
    const {args} = this.parse(PeepShow)    

    if (args.tag_one && !args.tag_two && !args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ args.tag_one);
    }
    else if (args.tag_one && args.tag_two && !args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ args.tag_one +'&tag_two='+ args.tag_two);
    }
    else if (args.tag_one && args.tag_two && args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ args.tag_one +'&tag_two='+ args.tag_two +'&tag_three='+ args.tag_three);
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

    //RETURN A CUSTOM VALUE CONTENT
    function customContent(title){
      var findTitle = customValues.find(obj => {
        return obj.title === title
      })
      return findTitle.content; 
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
        tag_one: i.tag_one,
        tag_two: i.tag_two,
        tag_three: i.tag_three,
        mention: i.mention,
        color: i.color,
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
      contentHeight = 10 + customNumber( "box_container_height")
    }
    else{
      contentHeight = (contentlines * 5 ) + calclineBreaks + customNumber( "box_container_height")
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
      width: customNumber( "box_container_width"),
      top: toTop,
      padding: customNumber( "box_container_padding"),
      tags: true,
      shrink: true,
      scrollable: true,
      alwaysScroll: true,
      border: customText( "box_container_border"),
      style:{
        border:{
          fg: customText( "box_container_border_color")
        }
      }
    });

    //TITLE
    var boxTitle = blessed.box({
      parent: boxContainer,
      content: '{bold}{' + listDeals[i].color + '-bg}' + listDeals[i].tagline + '{/}',
      top: customNumber( "box_title_top"),
      left: customNumber( "box_title_left"),
      tags: true,
      shrink: true,
    });

    //TAGS
    var boxCategory = blessed.box({
      parent: boxContainer,
      content: listDeals[i].tag_one + ' ' +  listDeals[i].tag_two + ' ' +  listDeals[i].tag_three,
      top: customNumber( "box_category_top"),
      right: customNumber( "box_category_right"),
      tags: true,
      shrink: true,
    });
    
    //CONTENT
    var boxContent = blessed.box({
      parent: boxContainer,
      content: listDeals[i].content,
      top: customNumber( "box_content_top"),
      tags: true,
      shrink: true,
    });

    //LINK
    var boxLink = blessed.box({
      parent: boxContainer,
      content: '-> ' + listDeals[i].link ,
      bottom: customNumber( "box_link_bottom"),
      left: customNumber( "box_link_left"),
      tags: true,
      shrink: true,
    });

    //PRICE
    var boxPrice = blessed.box({
      parent: boxContainer,
      content: listDeals[i].price + ' $ ' + listDeals[i].mention,
      bottom: customNumber( "box_price_bottom"),
      right: customNumber( "box_price_right"),
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
