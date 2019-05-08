import React from 'react'
import MD5 from 'crypto-js/md5'
import DetailsBox from './detailsBox'
import FrontCover from './frontCover'
import WelcomeBox from './welcomeBox'


const api = require('marvel-api');

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      frontCover: null,
      title: null,
      creators: [],
      id: null,
      link: null
    }
    this.getRandomInt = this.getRandomInt.bind(this);
    this.md5 = this.md5.bind(this);
    this.getRandomComic = this.getRandomComic.bind(this);
    this.onPress = this.onPress.bind(this);



    this.marvel = api.createClient({
      publicKey: "7e71a3c8565f24ec32e5c6da8cb7fc01",
      privateKey: "6bf94a0a99016c0933e501fa4f387d2435acccb3"
    });
  }

  componentDidMount(){
    this.getRandomComic();
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  md5(value) {
    // return CryptoJS.MD5(value).toString();
    return MD5(value).toString();
  };

  onPress(){
    console.log("onPress triggered");
    const id = this.state.id;
    this.setState({link: id});
  }

  getRandomComic(){
    // keys for API
    var PRIV_KEY = "6bf94a0a99016c0933e501fa4f387d2435acccb3";
    var API_KEY = "7e71a3c8565f24ec32e5c6da8cb7fc01";
    // create new date object
    var ts = new Date().getTime();
    // generate random in between 1 and 50000
    var randomNumber = this.getRandomInt(1, 10000);
    // target api
    var url = "http://gateway.marvel.com/v1/public/comics/" + randomNumber + "?apikey=7e71a3c8565f24ec32e5c6da8cb7fc01";
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
        this.setState({comic: marvel.data});
        this.setState({frontCover: marvel.data.results[0].thumbnail.path});
        this.setState({title: marvel.data.results[0].title})
        this.setState({id: marvel.data.results[0].id})
        var creatorArray = marvel.data.results[0].creators.items;
        var newArray = this.state.creators.concat(creatorArray);
        this.setState({creators: newArray});
      }
    }
    request.send();
  };


  render(){
    return(
      <React.Fragment>
        <WelcomeBox />
      <div className="resultsDisplay">
        <div className="frontCover">
          <FrontCover cover={this.state.frontCover}
                      getCover={this.getRandomComic}
                      id={this.state.id}
                      onPress={this.onPress}
                      link={this.state.link}/>
        </div>

        <div className="detailsBox">
          <DetailsBox creators={this.state.creators} title={this.state.title}/>
        </div>
      </div>
    </React.Fragment>
    )
}
}

export default Home;
