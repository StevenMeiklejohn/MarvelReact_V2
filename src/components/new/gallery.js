import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Gallery extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      comic: null
    }
  }
  renderImage(imageUrl) {
    return (
      <div class="hovereffect">
        <img class="img-responsive" src={imageUrl.thumbnail.path + ".jpg"}/>
          <div class="overlay">
            <h2>{imageUrl.title}</h2>
            <button class="info" href="#">Select</button>

          </div>
        </div>
    )
  }

  render() {
    if(this.props.detailsArray.length > 0){
      console.log(this.props.detailsArray);
    return (
        <div className="thumbnails">
          {this.props.detailsArray.map(imageUrl => this.renderImage(imageUrl))}
        </div>
    );
  }
}
}

export default Gallery;
