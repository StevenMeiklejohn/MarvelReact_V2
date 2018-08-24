import React from 'react';
const _ = require('lodash');


class CharacterSelector extends React.Component{

  constructor(props){
  super(props);
  this.flattenCharactersObject = this.flattenCharactersObject.bind(this);
  this.sorted_options = [];
  }

  flattenCharactersObject(object){
      // console.log("pre flattened", object);
      let flattened = _.flattenDeep(object);
      // console.log("flattened", flattened);
  }


  render(){
    if(this.props.characters.length < 10){
      return(
        <div className="characterSelector">
          <p class="animated infinite lightSpeedIn delay-2s">Fetching Characters..</p>
          <p class="animated infinite lightSpeedIn delay-2s">Haud Yer Horses..</p>
        </div>
      )
    }
    let characters = this.props.characters;
    // console.log(characters);
    // console.log(typeof characters);
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

      orderedChars.forEach(function(item){
        ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
      })
      this.sorted_options = ordered_options
    }

    return(
      <div className="characterSelector">
        <p>Select a Character</p>
      <select onChange={this.props.onChange}>
      {this.sorted_options}
      </select>
      </div>
    )
  }
}

export default CharacterSelector
