
import React from 'react'

class FrontCover extends React.Component{

  render(){
    if(this.props.cover){
    return(
      <React.Fragment>
        <div className="randomSuggestion">
      <p>Random Suggestion:</p>
    </div>
      <div className="image">
        <img src={this.props.cover + ".jpg"} />
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
