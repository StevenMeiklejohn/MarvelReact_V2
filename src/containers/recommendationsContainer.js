import React from 'react';
import RecommendedView from './../components/recommendations/recommendedView'
import Request from './../helpers/request'

class RecommendationsContainer extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    recommendations: null
  }
  }

  componentDidMount(){
    console.log(this.props.user);
    const request = new Request();
    request.get("http://localhost:8080/api/recommendations").then((data) => {
      this.setState({recommendations: data._embedded.recommendations})
    })
  }




  render(){

    if(!this.props.user){
      return(
        <div>
          <p>Please log in to view your recommendations.</p>
        </div>
      )
    }

    return(
      <div>
        <RecommendedView recommendations={this.state.recommendations} user={this.props.user}/>
      </div>
    )
  }
}

export default RecommendationsContainer
