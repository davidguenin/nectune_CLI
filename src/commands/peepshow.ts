import Command from '@oclif/command'
const fetch = require('node-fetch');
var columnify = require('columnify')
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
var emoji = require('node-emoji')

export class PeepShow extends Command {

  // CLI CONFIG
  static args = [
    {name: 'tag_one'},
    {name: 'tag_two'},
    {name: 'tag_three'}
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

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // FETCH WITH ARGS
    const {args} = this.parse(PeepShow)    

    if (args.tag_one && !isNaN(args.tag_one) ) {
       var nectuneData = await logFetch('https://www.nectune.com/deals/' + args.tag_one  +'.json');
    }
    else if (args.tag_one && !args.tag_two && !args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one));
    }
    else if (args.tag_one && args.tag_two && !args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one) +'&tag_two='+ capitalizeFirstLetter(args.tag_two));
    }
    else if (args.tag_one && args.tag_two && args.tag_three) {
      var nectuneData = await logFetch('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one) +'&tag_two='+ capitalizeFirstLetter(args.tag_two) +'&tag_three='+ capitalizeFirstLetter(args.tag_three));
    }
    else{
      var nectuneData = await logFetch('https://www.nectune.com/deals.json');
    }
    

    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another argument :)')
    }

    //RETURN SINGLE DEAL
    else if (args.tag_one && !isNaN(args.tag_one) ) {
      console.log( "\n" + emoji.get(nectuneData.emoji) + "    " +  chalk.bold.bgBlack.whiteBright(nectuneData.tagline) + "  -  " + nectuneData.company + "\n")
      var contentBreak = nectuneData.content.match(/\b[\w']+(?:[^\w]+[\w']+){0,20}\b/g).join('\n');
      console.log(contentBreak + "\n\n" )
      console.log("Link:\n " + nectuneData.link + "\n\n")
      console.log(nectuneData.tag_one + "    " + nectuneData.tag_two + "    " + nectuneData.tag_three + "\n\n")
    }
    
    else{
      //MAP RECORD
      var listDeals = nectuneData.deals.map(function(i: { content: any; tagline: any; id: { toString: () => any; }; link: any; tag_one: any; tag_two: any; tag_three: any; company: any; emoji: any; }) {
        return{
          content: i.content,
          tagline: i.tagline.substring(0, 60),
          company: i.company,
          emoji: i.emoji,
          id: i.id.toString(),
          link: i.link,
          tag_one: i.tag_one,
          tag_two: i.tag_two,
          tag_three: i.tag_three,
        } 
      });

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

      //RETURN NOTIFICATION
      console.log(chalk.bold.red(customText( "notification")));

      //RETURN HEADER
      console.log(customContent( "header"));

      //INDEX COMMANDS
      console.log(
        '\n\ '+ customText( "ch_deco_one") + '  ' +
        chalk.bold(customText( "arg_txt_one")) + ' ' + chalk.bold.bgBlack(customText( "arg_code_one")) 
        + '  ' +customText( "ch_deco_two") + '  ' +
        chalk.bold(customText( "arg_txt_two")) + ' ' +  chalk.bold.bgBlack(customText( "arg_code_two"))
        + '  ' + customText( "ch_deco_one")  +
         '\n\n\n'
        )

      //LOOP RECORD
      var data = []
        
        for (let i = 0 ; i < listDeals.length ; i++) {
          data.push({
            tagline: emoji.get(listDeals[i].emoji) + "    " +  chalk.bold.magenta(listDeals[i].tagline),
            tags: chalk.bold.bgBlack("TAGS:" ) + " " +  chalk.bold(listDeals[i].tag_one) + "  " + chalk.bold(listDeals[i].tag_two) + "  " + chalk.bold(listDeals[i].tag_three),
            company: listDeals[i].company,
            id: chalk.bold.bgBlack("ID:" ) + " " + chalk.bold(listDeals[i].id),
          })
          // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
          data.push({
            tagline: "",
            tags: "",
            id: ""
          })
        }

      var columns = columnify(
        data,{
        showHeaders: false,
        minWidth: customNumber( "min_width"),
        config:{
          tagline:{
            minWidth: customNumber( "min_width_tagline"),
          },
          tags:{
            minWidth: customNumber( "min_width_tags"),
          },
        }
      })
    
      console.log(columns)

      //ANIMATION
      const rainbow = chalkAnimation.neon(customContent( "animation"));
      setTimeout(() => {
          rainbow.stop(); // Animation stops
      }, customNumber( "animation_stop"));

    }             
  }
}
