import React from "react";
import Request from './../../helpers/request';
import { Redirect } from 'react-router-dom'
// import { BrowserRouter as Router, Route } from "react-router-dom";

class Gallery extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      comic: null,
      id: null
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  renderImage(comic) {
    return (
      <div class="hovereffect">
        <img class="img-responsive" src={comic.thumbnail.path + ".jpg"} id={comic.id}/>
          <div class="overlay">
            <h2>{comic.title}</h2>
            <button class="info" onClick={this.handleButtonClick} id={comic.id} href="#">Select</button>

          </div>
        </div>
    )
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
    if(this.props.detailsArray.length > 0){
      console.log(this.props.detailsArray);
    return (
        <div className="thumbnails">
          {this.props.detailsArray.map(comic => this.renderImage(comic))}
        </div>
    );
  }
}
}

export default Gallery;
