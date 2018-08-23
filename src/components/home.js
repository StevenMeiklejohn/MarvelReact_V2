import React from 'react'
import MD5 from 'crypto-js/md5'
import DetailsBox from './../components/detailsBox'
import FrontCover from './../components/frontCover'
import WelcomeBox from './../components/welcomeBox'


const api = require('marvel-api');

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      comic: null,
      frontCover: null,
      title: null,
      creators: [],
      characters:[],
      character: null,
      display: "random_comic"
    }
    this.getRandomInt = this.getRandomInt.bind(this);
    this.md5 = this.md5.bind(this);
    this.getRandomComic = this.getRandomComic.bind(this);



    this.marvel = api.createClient({
      publicKey: "1a11ffc2c79394bdd4e7a7b8d97c43a9",
      privateKey: "403c5f3406be455684061d92266dea467b382bdc"
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

  getRandomComic(){
    // keys for API
    var PRIV_KEY = "403c5f3406be455684061d92266dea467b382bdc";
    var API_KEY = "1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // create new date object
    var ts = new Date().getTime();
    // generate random in between 1 and 50000
    var randomNumber = this.getRandomInt(1, 10000);
    // target api
    var url = "http://gateway.marvel.com:80/v1/public/comics/" + randomNumber + "?apikey=1a11ffc2c79394bdd4e7a7b8d97c43a9";
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
          <FrontCover cover={this.state.frontCover}/>
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
