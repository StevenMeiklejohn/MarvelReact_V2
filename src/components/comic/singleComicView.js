import React from 'react';



class SingleComicView extends React.Component{



  render(){
    if(!this.props.comic){
      return null
    }
    return(
      <React.Fragment>

      <div className="singleComicCoverImageDiv" id="singleComicCoverImageDiv">
        <img className="singleComicCoverImage" src={this.props.comic.images[0].path + ".jpg"} />
      </div>
    </React.Fragment>

    )

  }

}

export default SingleComicView
