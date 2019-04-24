import React from 'react';
import RecommendationViewSent from './recommendationViewSent';
import RecommendationViewReceived from './recommendationViewReceived';


class RecommendedView extends React.Component{


  render(){

    if(!this.props.recommendations){
      return null;
    }

    const recObjectsSent = this.props.recommendations.map((object) => {
      if(object.recommendedById === this.props.user.id){
      return <RecommendationViewSent key={object.id} recommendation={object} user={this.props.user}/>
    }
    })

    const recObjectsReceived = this.props.recommendations.map((object) => {
      if(object.recommendedForId === this.props.user.id){
      return <RecommendationViewReceived key={object.id} recommendation={object} user={this.props.user}/>
    }
    })

    return(
      <div className="recommendedDisplay">
      <div className="sent">
      <h1>Sent</h1>
      {recObjectsSent}
      </div>

      <div className="received">
      <h1>Received</h1>
      {recObjectsReceived}
      </div>

      </div>
    )
  }
}

export default RecommendedView
