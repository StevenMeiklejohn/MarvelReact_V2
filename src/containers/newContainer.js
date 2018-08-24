import React from 'react';
import MD5 from 'crypto-js/md5'
import CharacterSelector from './../components/new/characterSelector'
import CharacterView from './../components/new/characterView'
const api = require('marvel-api');

class New extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      characters:[],
      character: null
    }
    this.get_characters = this.get_characters.bind(this);
    this.get_all_characters = this.get_all_characters.bind(this);
    this.search_for_character = this.search_for_character.bind(this);
    this.handleCharacterSelector = this.handleCharacterSelector.bind(this);

    this.marvel = api.createClient({
      publicKey: "1a11ffc2c79394bdd4e7a7b8d97c43a9",
      privateKey: "403c5f3406be455684061d92266dea467b382bdc"
    });
  }

  componentDidMount(){
    this.get_all_characters();
  }

  getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


md5(value) {
  // return CryptoJS.MD5(value).toString();
  return MD5(value).toString();
};


async get_all_characters() {
  const promises = [];
  for(var i = 0; i < 1500; i+=100){
    const getCharacterPromise = this.get_characters(100, i)
    promises.push(getCharacterPromise)
  }
  this.setState({fetching_characters: false});
  await Promise.all(promises)

}

get_characters(num_to_get, index_offset){
  let chars = this.state.characters;
  this.marvel.characters.findAll(num_to_get, index_offset)
  .then(function(res){
    chars.push(res.data);
    this.setState({characters: chars});
    // console.log(this.state.characters);
  }.bind(this))
  .fail(console.error)
  .done();
}

search_for_character(character){
  this.marvel.characters.findByName(character)
  .then(function(res) {
    this.setState({character: res.data[0]});
    console.log(this.state.character[0]);
    // console.log("Search for character results", res.data[0]);
    // return this.marvel.characters.comics(res.data[0].id);
  }.bind(this))
  .fail(console.error)
  .done();
}

handleCharacterSelector(event){
  console.log(event.target.value);
  console.log(event.target.key);
  this.search_for_character(event.target.value);

}


  render(){
    return(
      <React.Fragment>
      <div>
        <p>Create a new recommendation using the tools below!</p>
        <CharacterSelector
          characters={this.state.characters}
          onChange={this.handleCharacterSelector}/>
      </div>
      <div>
        <CharacterView
          character={this.state.character}/>
      </div>
    </React.Fragment>
    )
  }
}

export default New
