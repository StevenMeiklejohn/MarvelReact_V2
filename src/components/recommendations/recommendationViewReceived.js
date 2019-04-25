import React from 'react';
import Request from './../helpers/request'

const api = require('marvel-api');

class RecommendationViewReceived extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      comic: null,
      sender: null,
      recipient: null,
      redirect: false
    }
    this.marvel = api.createClient({
      publicKey: "7e71a3c8565f24ec32e5c6da8cb7fc01",
      privateKey: "6bf94a0a99016c0933e501fa4f387d2435acccb3"
    });
    this.search_for_comic = this.search_for_comic.bind(this);
    this.getSender = this.getSender.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

  }

  componentDidMount(){
    this.search_for_comic();
    this.getSender();
    console.log("recommendedById", this.props.recommendation.recommendedById);
  }



  search_for_comic(){
    this.marvel.comics.find(this.props.recommendation.comicId)
    .then(function(res) {
      console.log("single comic return data", res.data[0]);
      this.setState({comic: res.data[0]});
      console.log("Sent comic fetched", res.data[0]);
    }.bind(this))
    .fail(console.error)
    .done();
  }

  getSender(){
    const request = new Request();
    const url = "http://localhost:8080/api/users/" + this.props.recommendation.recommendedById;
    console.log("Get sender url", url);
    request.get(url).then((data) => {
      this.setState({sender: data}, console.log("Got sender", this.state.sender))
    })
  }

  handleRemove(){
    const request = new Request();
    const url = "http://localhost:8080/api/recommendations/" + this.props.recommendation.id;
    request.delete(url).then(()=> {
      this.forceUpdate()})
  }


  render(){
    if(!this.props.recommendation || !this.state.comic || !this.state.sender){
      return null;
    }
    return(
      <div className="recommendationView">
      <div className="recommendationViewText">
        <h6>From:{this.state.sender.firstName + " " + this.state.sender.lastName}</h6>

        <h6>Date:{this.props.recommendation.date}</h6>
        <h6>{this.state.comic.title}</h6>
      </div>
        <div className="recommendationViewImage">
          <img className="recommendationThumbnail" src={this.state.comic.images[0].path + "." + this.state.comic.images[0].extension} />
        </div>
        <div className="removeButtonDiv">
            <button className ="loginButton" onClick={this.handleRemove}>Remove</button>
        </div>
      </div>
    )
  }
}

export default RecommendationViewReceived
