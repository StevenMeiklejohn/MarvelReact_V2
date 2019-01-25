
import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


class FrontCover extends React.Component{

  render(){

    if (this.props.link != null) {
      let url = "/comic/" + this.props.link;
      return <Redirect to={url} />
    }
    if(this.props.cover){
    return(
      <React.Fragment>
        <div className="randomSuggestion">
      <p>Random Suggestion:</p>
    </div>
      <div className="image">
      <div className="my_wrapper">
        <img src={this.props.cover + ".jpg"} onClick={()=>this.props.onPress()}/>
        </div>
      </div>
    </React.Fragment>
    )
  }else{
    this.props.getCover
    return(
    <React.Fragment>
      <p class="animated infinite lightSpeedIn delay-2s">Fetching..</p>
    </React.Fragment>
  )
  }
}
}

export default FrontCover
