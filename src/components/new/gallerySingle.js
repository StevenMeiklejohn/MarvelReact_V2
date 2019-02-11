import React from "react";
import Request from './../../helpers/request';
import { Redirect } from 'react-router-dom'
// import { BrowserRouter as Router, Route } from "react-router-dom";

class GallerySingle extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      comic: null,
      id: null
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }


  handleButtonClick(event){
    console.log(event.target.id);
    this.setState({id: event.target.id});
    // let request = new Request();
    // request.get('/comic/' + event.target.id);
  }

  render() {
    if (this.state.id != null) {
      let url = "/comic/" + this.state.id;
      return <Redirect to={url} />
    }
    if(this.props.details){
      console.log(this.props.details);
    return (
        <div className="thumbnails">
        <div class="hovereffect">
          <img class="img-responsive" src={this.props.imageUrl} id={this.props.details.id}/>
            <div class="overlay">
              <h2>{this.props.details.title}</h2>
              <button class="info" onClick={this.handleButtonClick} id={this.props.details.id} href="#">Select</button>
            </div>
          </div>
        </div>
    );
  }
}
}

export default GallerySingle;
