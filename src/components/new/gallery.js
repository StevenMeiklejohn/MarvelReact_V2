import React from "react";

class Gallery extends React.Component {
  renderImage(imageUrl) {
    // return (
    //   <div>
    //     <img src={imageUrl.thumbnail.path + ".jpg"} />
    //   </div>
    // );
    return (
      <div class="hovereffect">
        <img class="img-responsive" src={imageUrl.thumbnail.path + ".jpg"}/>
          <div class="overlay">
            <h2>{imageUrl.title}</h2>
            <a class="info" href="#">Select</a>
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
// Gallery.propTypes = {
//   imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// };
export default Gallery;
