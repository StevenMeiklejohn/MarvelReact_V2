import React from 'react';
import MD5 from 'crypto-js/md5'
import CharacterSelector from './../components/new/characterSelector'
import SearchTypeSelectorView from './../components/new/searchTypeSelectorView'
import CharacterView from './../components/new/characterView'
import EventSelector from './../components/new/eventSelector'
import FilteredSelectorView from './../components/new/filteredSelector'
// const writeFileP = require("write-file-p");

const api = require('marvel-api');

class New extends React.Component{
  // characters: All characters returned from database.
  // character: Character selected from the dropdown.
  // selectedComic:
  // filter: Selected filter option(events/series.stories)
  // filterOptionResults: Array of events/stories/series for a given character.
  // event_series_story_selected: Selection from event/series/story filter.
  // resultComics: Array of comics based on all filters.

  constructor(props){
    super(props);
    this.state = {
      characters:[],
      character: null,
      selectedComic: null,
      filter: null,
      filterOptionResults: [],
      event_series_story_selected: null,
      resultComics: []
    }
    this.get_characters = this.get_characters.bind(this);
    this.get_all_characters = this.get_all_characters.bind(this);
    this.search_for_character = this.search_for_character.bind(this);
    this.handleCharacterSelector = this.handleCharacterSelector.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleEventSelector = this.handleEventSelector.bind(this);
    this.handleFilteredOptionSelector = this.handleFilteredOptionSelector.bind(this);
    this.getIssuesInEvent = this.getIssuesInEvent.bind(this);
    this.get_all_events = this.get_all_events.bind(this);
    this.get_events = this.get_events.bind(this);
    this.get_all_series = this.get_all_series.bind(this);
    this.get_series = this.get_series.bind(this);
    this.get_stories = this.get_stories.bind(this);
    this.get_all_stories = this.get_all_stories.bind(this);
    this.get_all_stories_loop = this.get_all_stories_loop.bind(this);

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
    }.bind(this))
    .fail(console.error)
    .done();
  }

  async get_all_events() {
    this.setState({filterOptionResults: []}, this.get_events(this.state.character.id, 50, 0));
  }

  get_events(id, num_to_get, index_offset){
    console.log("get_events called");
    let events = [];
    this.marvel.characters.events(id, num_to_get, index_offset)
    .then(function(res){
      events.push(res.data);
      // console.log(res.data);
      this.setState({filterOptionResults: events})
    }.bind(this))
    .fail(console.error)
    .done();
  }

  async get_all_series() {
    this.setState({filterOptionResults: []}, this.get_series(this.state.character.id, 50, 0));
  }

  get_series(id, num_to_get, index_offset){
    console.log("get_series called");
    let series = [];
    this.marvel.characters.series(id, num_to_get, index_offset)
    .then(function(res){
      series.push(res.data);
      // console.log(res.data);
      this.setState({filterOptionResults: series})
    }.bind(this))
    .fail(console.error)
    .done();
  }

  async get_all_stories() {
    console.log("Get all stories called");
    this.setState({filterOptionResults: []}, this.get_all_stories_loop);
  }

  async get_all_stories_loop() {
    console.log("get_all_stories_loop called");
    const promises = [];
    for(var i = 0; i < 500; i+=100){
      const getStoriesPromise = this.get_stories(this.state.character.id, 100, i)
      promises.push(getStoriesPromise)
    }
    await Promise.all(promises);
  }

  get_stories(id, num_to_get, index_offset){
    console.log("get_stories called");
    console.log("get_stories this.state.stories", this.state.stories);
    let stories = this.state.filterOptionResults;
    this.marvel.characters.stories(id, num_to_get, index_offset)
    .then(function(res){
      stories.push(res.data);
      // console.log(res.data);
      this.setState({filterOptionResults: stories})
      console.log("After get stories this.state.filterOptionResults", this.state.filterOptionResults);
    }.bind(this))
    .fail(console.error)
    .done();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  md5(value) {
    // return CryptoJS.MD5(value).toString();
    return MD5(value).toString();
  };

  getIssuesInStory(story_id, num_to_get, offset){
    console.log("Get issues in story called. story_id =", story_id );
    var PRIV_KEY = "403c5f3406be455684061d92266dea467b382bdc";
    var API_KEY = "1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // keys for API
    // var PRIV_KEY = "403c5f3406be455684061d92266dea467b382bdc";
    // var API_KEY = "1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // create new date object
    var ts = new Date().getTime();
    // generate random in between 1 and 50000
    var randomNumber = this.getRandomInt(1, 10000);
    // target api
    var url = "https://gateway.marvel.com:443/v1/public/stories/" + story_id + "/comics?limit=" + num_to_get + "&offset=" + offset + "&apikey=1a11ffc2c79394bdd4e7a7b8d97c43a9"
    // var url = "http://gateway.marvel.com:80/v1/public/comics/" + randomNumber + "?apikey=1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // create a hash using md5 function
    var hash = this.md5(ts + PRIV_KEY + API_KEY);
    // modify url with hash
    url += "&ts="+ts+"&hash="+hash;
    // make request
    // ============
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () =>  {
      if (request.status === 200) {
        var jsonString = request.responseText;
        var marvel = JSON.parse(jsonString);
        console.log("getIssuesInStory parsed response", marvel);
        this.setState({resultComics: marvel.data.results});
      }
    }
    request.send();
  };

  getIssuesInEvent(event_id, num_to_get, index_offset){
    let comics = this.state.resultComics;
    console.log(event_id);
    this.marvel.events.comics(event_id, num_to_get, index_offset)
    .then(function(res){
      comics.push(res.data);
      console.log(res.data);
      this.setState({resultComics: comics});
      // this.setState({character: null});
    }.bind(this))
    .fail(console.error)
    .done();
  }


  handleCharacterSelector(event){
    this.search_for_character(event.target.value)
  }

  handleEventSelector(event){
    console.log(event.target.value);
    this.setState({eventComics: []}, this.getIssuesInEvent(event.target.value, 100, 0));
    // this.setState({character: null}, this.getIssuesInEvent(event.target.value, 100, 0))
  }

  handleFilteredOptionSelector(event){
    if(this.state.filter === "stories"){
    console.log(event.target.value);
    this.setState({resultComics: []}, this.getIssuesInStory(event.target.value, 100, 0));
    }
    if(this.state.filter === "event"){
    console.log(event.target.value);
    this.setState({resultComics: []}, this.getIssuesInEvent(event.target.value, 100, 0));
    }
  }

  handleFilterSelect(event){
    console.log("NewContainerHandleFilterSelect value", event.target.value);
    if(event.target.value === "Events"){
      this.setState({filter: "event"}, this.get_all_events)
     }
    if(event.target.value === "Stories"){
      this.setState({filter: "stories"}, this.get_all_stories);
    }
    if(event.target.value === "Series"){
      this.setState({filter: "series"}, this.get_all_series);
    }
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
            <SearchTypeSelectorView
            character={this.state.character}
            onChange={this.handleFilterSelect}
            />
            </div>
          <div>
          <div>
            <FilteredSelectorView
              filteredType={this.state.filter}
              filteredOptions={this.state.filterOptionResults}
              onChange={this.handleFilteredOptionSelector}
            />
          </div>
            <CharacterView
              filter={this.state.filter}
              character={this.state.character}
              eventComics={this.state.resultComics}
              storiesComics={this.state.resultComics}/>
            </div>
        </React.Fragment>
          )
        }
      }

      export default New
