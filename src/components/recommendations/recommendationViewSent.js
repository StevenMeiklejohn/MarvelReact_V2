import React, { Component } from 'react';
import Request from './../helpers/request'

const api = require('marvel-api');

class RecommendationViewSent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      comic: null,
      sender: null,
      recipient: null
    }
    this.marvel = api.createClient({
      publicKey: "7e71a3c8565f24ec32e5c6da8cb7fc01",
      privateKey: "6bf94a0a99016c0933e501fa4f387d2435acccb3"
    });
    this.search_for_comic = this.search_for_comic.bind(this);
    this.getRecipient = this.getRecipient.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount(){
    this.search_for_comic();
    this.getRecipient();
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

  getRecipient(){
    const request = new Request();
    const url = "http://localhost:8080/api/users/" + this.props.recommendation.recommendedForId;
    console.log("Get recipient url", url);
    request.get(url).then((data) => {
      this.setState({recipient: data}, console.log("Got recipient", this.state.recipient))
    })
  }

  handleRemove(){
    const request = new Request();
    const url = "http://localhost:8080/api/recommendations/" + this.props.recommendation.id;
    request.delete(url).then(()=> {
      window.location = '/recommendations'})
  }




  render(){


    if(!this.props.recommendation || !this.state.comic || !this.state.recipient){
      return null;
    }



    return(
      <div className="recommendationView">
      <div className="recommendationViewText">
        <h6>For:{this.state.recipient.firstName + " " + this.state.recipient.lastName}</h6>

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

export default RecommendationViewSent
