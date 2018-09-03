import React from "react";

class Gallery extends React.Component {
  renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl} />
      </div>
    );
  }

  render() {
    if(this.props.imageUrls.length > 0){
    return (
      <div className="gallery">
        <div className="images">
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}
}
// Gallery.propTypes = {
//   imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// };
export default Gallery;
