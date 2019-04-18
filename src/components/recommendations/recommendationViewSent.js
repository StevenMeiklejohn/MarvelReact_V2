import React, { Component } from 'react';

const api = require('marvel-api');

class RecommendationViewSent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      comic: null,
      sender: null
    }
    this.marvel = api.createClient({
      publicKey: "1a11ffc2c79394bdd4e7a7b8d97c43a9",
      privateKey: "403c5f3406be455684061d92266dea467b382bdc"
    });
    this.search_for_comic = this.search_for_comic.bind(this);
  }

  componentDidMount(){

  }

  search_for_comic(){
    this.marvel.comics.find(376)
    .then(function(res) {
      console.log("single comic return data", res.data[0]);
      this.setState({comic: res.data[0]});
      // console.log(res.data[0]);
    }.bind(this))
    .fail(console.error)
    .done();
  }




  render(){
    this.search_for_comic();

    if(!this.props.recommendation || !this.state.comic){
      return null;
    }



    return(
      <div className="recommendationView">
      <div className="recommendationViewText">
        <h6>Recommended For Id: {this.props.recommendation.recommendedForId}</h6>

        <h6>Date: {this.props.recommendation.date}</h6>
      </div>
        <div className="recommendationViewImage">
          <img className="recommendationThumbnail" src={this.state.comic.images[0].path + "." + this.state.comic.images[0].extension} />
        </div>
      </div>
    )
  }
}

export default RecommendationViewSent
