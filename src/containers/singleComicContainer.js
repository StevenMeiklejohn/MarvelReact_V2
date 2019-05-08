import React, {Component} from 'react';
import MD5 from 'crypto-js/md5'
import SingleComicView from './../components/comic/singleComicView'
import SingleComicDetails from './../components/comic/SingleComicDetails'
import SingleComicUserOptions from './../components/comic/singleComicUserOptions'
// const _ = require('lodash');
// const writeFileP = require("write-file-p");
const api = require('marvel-api');


class SingleComicContainer extends Component {
  constructor(props){
    super(props);
    this.state = {comic: null};
    this.marvel = api.createClient({
      publicKey: "7e71a3c8565f24ec32e5c6da8cb7fc01",
      privateKey: "6bf94a0a99016c0933e501fa4f387d2435acccb3"
    });
    this.search_for_comic = this.search_for_comic.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    console.log("single comic container", this.props.id);
    this.search_for_comic(this.props.id);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  md5(value) {
    // return CryptoJS.MD5(value).toString();
    return MD5(value).toString();
  };


  search_for_comic(comicMarvelId){
    this.marvel.comics.find(comicMarvelId)
    .then(function(res) {
      console.log("single comic return data", res.data[0]);
      this.setState({comic: res.data[0]});
      // console.log(res.data[0]);
    }.bind(this))
    .fail(console.error)
    .done();
  }



  render(){

    return (
      <React.Fragment>
      <div>
       <SingleComicView comic = {this.state.comic}/>
      </div>
      <div>
       <SingleComicDetails comic = {this.state.comic}/>
       </div>
       <div>
        <SingleComicUserOptions comic = {this.state.comic} user = {this.props.user}/>
        </div>

     </React.Fragment>
    )
  }
}


export default SingleComicContainer;
