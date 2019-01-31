import React from 'react';
import MD5 from 'crypto-js/md5'
import CharacterSelector from './../components/new/characterSelector'
import CharacterView from './../components/new/characterView'
import EventSelector from './../components/new/eventSelector'
// const writeFileP = require("write-file-p");

const api = require('marvel-api');

class New extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      characters:[],
      character: null,
      events:[],
      event: null,
      eventComics: [],
      selectedComic: null
    }
    this.get_characters = this.get_characters.bind(this);
    this.get_all_characters = this.get_all_characters.bind(this);
    this.search_for_character = this.search_for_character.bind(this);
    this.handleCharacterSelector = this.handleCharacterSelector.bind(this);
    this.handleEventSelector = this.handleEventSelector.bind(this);
    this.getIssuesInEvent = this.getIssuesInEvent.bind(this);

    this.marvel = api.createClient({
      publicKey: "1a11ffc2c79394bdd4e7a7b8d97c43a9",
      privateKey: "403c5f3406be455684061d92266dea467b382bdc"
    });
  }

  componentDidMount(){
    this.get_all_characters();

  }


//   get_all_characters_from_db(){
//     let orderedChars = [];
//     let request = new Request();
//     request.get('/api/marvelCharacters?page=1&size=1500').then((data) => {
//       orderedChars = _.sortBy(data._embedded, [function(o) { return o.name; }]);
//       console.log("data from db", orderedChars);
//       // this.setState({pirates: data._embedded.pirates})
// })



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
    await Promise.all(promises);
  }




  get_characters(num_to_get, index_offset){
    let chars = this.state.characters;
    this.marvel.characters.findAll(num_to_get, index_offset)
    .then(function(res){
      chars.push(res.data);
      this.setState({characters: chars});
      console.log(this.state.characters);
    }.bind(this))
    .fail(console.error)
    .done();
  }

  search_for_character(character){
    this.marvel.characters.findByName(character)
    .then(function(res) {
      this.setState({character: res.data[0]}, this.get_all_events);
      // console.log(res.data[0]);
    }.bind(this))
    .fail(console.error)
    .done();
  }

  async get_all_events() {

    this.setState({events: []}, this.get_events(this.state.character.id, 50, 0));
    ;
  }


  get_events(id, num_to_get, index_offset){
    let events = this.state.events;
    this.marvel.characters.events(id, num_to_get, index_offset)
    .then(function(res){
      events.push(res.data);
      // console.log(res.data);
      this.setState({events: events});
    }.bind(this))
    .fail(console.error)
    .done();
  }

  getIssuesInEvent(event_id, num_to_get, index_offset){
    let comics = this.state.eventComics;
    console.log(event_id);
    this.marvel.events.comics(event_id, num_to_get, index_offset)
    .then(function(res){
      comics.push(res.data);
      console.log(res.data);
      this.setState({eventComics: comics});
      this.setState({character: null});
    }.bind(this))
    .fail(console.error)
    .done();
  }


  handleCharacterSelector(event){
    // console.log(event.target.value);
    // console.log(event.target.key);
    this.search_for_character(event.target.value)
  }

  handleEventSelector(event){
    console.log(event.target.value);
    this.setState({eventComics: []});
    this.setState({character: null}, this.getIssuesInEvent(event.target.value, 100, 0))

  }

  render(){
    return(
      <React.Fragment>
        <p>Create a new recommendation using the tools below!</p>
        <div>
          <CharacterSelector
            characters={this.state.characters}
            onChange={this.handleCharacterSelector}/>
          </div>
          <div>
            <EventSelector
              events={this.state.events}
              onChange={this.handleEventSelector}/>
            </div>
            <div>
              <CharacterView
                character={this.state.character}
                eventComics={this.state.eventComics}/>
              </div>
            </React.Fragment>
          )
        }
      }

      export default New
