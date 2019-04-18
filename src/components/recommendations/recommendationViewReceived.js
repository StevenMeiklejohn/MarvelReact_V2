import React from 'react';

class RecommendationViewReceived extends React.Component{




  render(){
    if(!this.props.recommendation){
      return null;
    }
    return(
      <div className="recommendationView">
        <h6>Recommended By: {this.props.recommendation.recommendedById}</h6>
        <h6>Comic Id: {this.props.recommendation.comicId}</h6>
        <h6>Date: {this.props.recommendation.date}</h6>

      </div>
    )
  }
}

export default RecommendationViewReceived
