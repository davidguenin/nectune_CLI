import Command from '@oclif/command'
const axios = require('axios');
var columnify = require('columnify')
const chalk = require('chalk');
var emoji = require('node-emoji')

export class PeepShow extends Command {

  // CLI CONFIG
  static args = [
    {name: 'tag_one'},
    {name: 'tag_two'},
    {name: 'tag_three'}
  ]

  async run() {

    //GET DATA NECTUNE API
    async function getData(url: string) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          return response.data;
        } 
      } catch (error) {
        console.log('Ouuups no content here...');
      }
    }

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // FETCH WITH ARGS
    const {args} = this.parse(PeepShow)    

    if (args.tag_one && !isNaN(args.tag_one) ) {
       var nectuneData = await getData('https://www.nectune.com/deals/' + args.tag_one  +'.json');
    }
    else if (args.tag_one && !args.tag_two && !args.tag_three) {
      var nectuneData = await getData('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one));
    }
    else if (args.tag_one && args.tag_two && !args.tag_three) {
      var nectuneData = await getData('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one) +'&tag_two='+ capitalizeFirstLetter(args.tag_two));
    }
    else if (args.tag_one && args.tag_two && args.tag_three) {
      var nectuneData = await getData('https://www.nectune.com/deals.json/?tag_one='+ capitalizeFirstLetter(args.tag_one) +'&tag_two='+ capitalizeFirstLetter(args.tag_two) +'&tag_three='+ capitalizeFirstLetter(args.tag_three));
    }
    else{
      var nectuneData = await getData('https://www.nectune.com/deals.json');
    }
    

    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another command :-)')
    }

    else{

      //MAP RECORD
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
        
      //RETURN SINGLE DEAL
      if (args.tag_one && !isNaN(args.tag_one) ) {

        //RETURN HEADER
        console.log(customContent( "header_single"));

        console.log( "   " + emoji.get(nectuneData.emoji) + "    " +  chalk.bold.magenta(nectuneData.tagline) + "   -   " + nectuneData.company + "\n\n")
        var contentBreak = nectuneData.content.match(/\b[\w']+(?:[^\w]+[\w']+){0,20}\b/g).join('\n');
        var contentBreak = contentBreak.replace(/^/gm, "   ");
        console.log(contentBreak + "\n\n\n" )
        console.log("   " + "Link:\n" + "   "+ nectuneData.link + "\n")
      }
      
      //LOOP RECORD
      else{

        //RETURN HEADER
        console.log(customContent( "header"));

        //INDEX COMMANDS
        console.log(
          '\n' +
          chalk.bold(customText( "arg_txt_one").toUpperCase()) + ' ' + chalk.magenta(customText( "arg_code_one")) +
          chalk.bold(customText( "arg_txt_two").toUpperCase()) + ' ' +  chalk.magenta(customText( "arg_code_two"))
          + 
          '\n\n'
          )

        //MAP RECORDS
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

        var data = []
          
          for (let i = 0 ; i < listDeals.length ; i++) {
            data.push({
              left:"",
              tagline: emoji.get(listDeals[i].emoji) + "    " +  chalk.bold(listDeals[i].tagline),
              tags: chalk.bold.magenta("TAGS:" ) + " " +  chalk.underline(listDeals[i].tag_one) + "  " + chalk.underline(listDeals[i].tag_two) + "  " + chalk.underline(listDeals[i].tag_three),
              company: listDeals[i].company,
              id: chalk.bold.magenta("ID:" ) + " " + listDeals[i].id,
            })
            // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
            data.push({
              left:"",
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
            left:{
              minWidth: customNumber( "min_width_left"),
            },
            tagline:{
              minWidth: customNumber( "min_width_tagline"),
              maxWidth: customNumber( "max_width_tagline"),
            },
            tags:{
              minWidth: customNumber( "min_width_tags"),
              maxWidth: customNumber( "max_width_tags"),
            },
            company:{
              minWidth: customNumber( "min_width_company"),
              maxWidth: customNumber( "max_width_company"),
            },
            id:{
              minWidth: customNumber( "min_width_id"),
              maxWidth: customNumber( "max_width_id"),
            }
          }
        })
      
        console.log(columns)

      }
    }             
  }
}
