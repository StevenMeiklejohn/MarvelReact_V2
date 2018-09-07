import React from 'react';
import RecommendedView from './../components/recommendations/recommendedView'

class RecommendationsContainer extends React.Component{

  constructor(props){
  super(props);
  }


  render(){
    return(
      <div>
    <RecommendedView />
  </div>
    )
  }
}

export default RecommendationsContainer
