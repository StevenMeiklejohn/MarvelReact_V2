import React from 'react';
import thanosGif from './../../images/thanos.gif';
import comicGif from './../../images/comicCrop.gif';
// import Request from './../../helpers/request'
const _ = require('lodash');
// const writeFileP = require("write-file-p");



class CharacterSelector extends React.Component{

  constructor(props){
  super(props);
  this.flattenCharactersObject = this.flattenCharactersObject.bind(this);
  this.sorted_options = [];
  }

  flattenCharactersObject(object){
      let flattened = _.flattenDeep(object);
  }



  render(){
    console.log("Character Selector character props", this.props.characters);
    // if(this.props.characters.length < 10){
    if(this.props.characters.length < 2){
      return(
        <div className="holding">
          <img src={comicGif} />
        </div>
      )
    }
    let characters = this.props.characters;
    console.log("Character props", this.props.characters);


// #############################################
// Use this code when fetching data from the API
// #############################################
    // this.flattenCharactersObject(characters);
    // let flatChars = [];
    // let orderedChars = [];
    // let ordered_options = [];
    // if(characters.length === 15){
    //   characters.forEach(function(element) {
    //     element.forEach(function(item){
    //         flatChars.push(item)
    //     })
    //   });
    //   orderedChars = _.sortBy(flatChars, [function(o) { return o.name; }]);
    //
    //   orderedChars.forEach(function(item){
    //     let itemForDb = {
    //       "marvelId": item.id,
    //       "name": item.name,
    //       "description": item.description,
    //       "modified": item.modified,
    //       "resourceURI": item.resourceURI
    //     }
    //     ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
    //   })
    //   this.sorted_options = ordered_options
    //   console.log("sorted options", this.sorted_options);
    // }
    // #####################################################
    // #####################################################


    // #########################################
    // Use this code if using data from db.
    // ########################################
    let flatChars = [];
    if(characters.length === 2){
      for(var element of characters){
        var topElementArray = element._embedded.marvelCharacters;
        // console.log("topArrayElement", topElementArray);
        for(var arrayElement of topElementArray){
          // console.log("arrayElement", arrayElement);
          flatChars.push(arrayElement);
        }
      }
      console.log("Data acquisition complete", flatChars);
      var orderedChars = _.sortBy(flatChars, [function(o) { return o.name; }]);
      console.log("Ordered Data", orderedChars);
      var ordered_options = [];
        orderedChars.forEach(function(item){
          let itemForDb = {
            "marvelId": item.id,
            "name": item.name,
            "description": item.description,
            "modified": item.modified,
            "resourceURI": item.resourceURI
          }
          ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
        })
        this.sorted_options = ordered_options
        console.log("sorted options", this.sorted_options);
      }
      // ##############################################
      // ##############################################






      // ###########################################
      // Code used for testing data fetch from DB.
      // ###########################################

    // if(characters.length === 2){
    //   characters.forEach((element._embedded.marvelCharacters) => {
    //     console.log("element._embedded.marvelCharacters", element._embedded.marvelCharacters);
    //     console.log("First loop element._embedded.marvelCharacters", element._embedded.marvelCharacters);
    //     characters.forEach((element._embedded) =>{
    //       console.log("Second loop element ._embedded", element2._embedded);
    //       characters.forEach((element3) => {
    //       console.log("Third loop element ._embedded.marvelCharacters", element3._embedded.marvelCharacters);
    //       })
    //     })
    //   })
    // }

      // for(var characterObject in characters){
      //   console.log("characterObject", characterObject);
      //    for(var characterArray in characterObject){
      //      console.log("characterArray", characterArray);
      //         for(var character in characterArray){
      //           flatChars.push(character);
      //         }
      //     }
      // }
      // this.setState({characters: flatChars}, console.log("data formatting complete"));
    // }
    // ###############################################
    // ###############################################


    return(

      <div className="characterSelector">
        <h6>Select a Character</h6>
      <select onChange={this.props.onChange}>
      {this.sorted_options}
      </select>

      </div>
    )
  }
}

export default CharacterSelector
