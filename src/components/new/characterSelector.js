import React from 'react';
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
    if(this.props.characters.length < 10){
      return(
        <div className="characterSelector">
          <h6 class="animated infinite lightSpeedIn delay-2s">Fetching Characters..</h6>
        </div>
      )
    }
    let characters = this.props.characters;
    console.log("Character props", this.props.characters);



    this.flattenCharactersObject(characters);
    // console.log(characters);
    // console.log(characters.length);
    let flatChars = [];
    let orderedChars = [];
    let ordered_options = [];
    if(characters.length === 15){
      characters.forEach(function(element) {
        element.forEach(function(item){
            flatChars.push(item)
        })
      });
      orderedChars = _.sortBy(flatChars, [function(o) { return o.name; }]);
      console.log("ordered characters", orderedChars);
      console.log("ordered characters type", typeof(orderedChars));
      console.log("ordered characters index 20", orderedChars[20]);
      console.log("ordered characters index 21", orderedChars[21]);
      console.log("ordered characters index 22", orderedChars[22]);

      console.log("ordered characters length", orderedChars.length);


      orderedChars.forEach(function(item){
        console.log("Drop down item", item);
        let itemForDb = {
          "marvelId": item.id,
          "name": item.name,
          "description": item.description,
          "modified": item.modified,
          "resourceURI": item.resourceURI
        }
        console.log("Item for db", itemForDb);
        ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
        // const request = new Request();
        // request.post('/api/marvelCharacters', itemForDb);
      })
      this.sorted_options = ordered_options
    }

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
