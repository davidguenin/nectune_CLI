import Command from '@oclif/command'
const fetch = require('node-fetch');
const chalk = require('chalk');
var columnify = require('columnify')

export default class Timemachine extends Command {

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

    var nectuneData = await logFetch('https://www.nectune.com/timemachine.json');

    // RETURN LOGS
    if (nectuneData == null){
      console.log('Try another argument :)')
    }

    else{

      //MAP RECORD
      var listLives = nectuneData.list.map(function(i: { tagline: any; edition: any; date: any; }) {
        return{
          tagline: i.tagline,
          edition: i.edition,
          date: i.date,
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
      

      //LOOP MESSAGES
      var data = []
          
      for (let i = 0 ; i < listLives.length ; i++) {
        data.push({
          left: "",
          edition: 'Edition => ' + listLives[i].edition,
          title: listLives[i].tagline,
          date: listLives[i].date,
        })
        // CREATE A MARGIN BOTTOM WITH BLANK COLUMN
        data.push({
          left: "",
          edition: "",
          title: "",
          date: "",
        })
      }

      var columns = columnify(
        data,{
          showHeaders: false,
          config:{
            left:{
              minWidth: customNumber( "min_width_left"),
            },
            edition:{
              minWidth: customNumber( "min_width_edition"),
            },
            title:{
              minWidth: customNumber( "min_width_title"),
            },
            date:{
              minWidth: customNumber( "min_width_date"),
            }
          }
        },
        
      )
    
      console.log(columns)

    }
  }
}
