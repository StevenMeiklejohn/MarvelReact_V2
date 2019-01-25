import React from 'react';
import CreatorDetail from './creatorDetail'


class SingleComicDetails extends React.Component{



  render(){


    if(!this.props.comic){
      return null
    }

    const title = this.props.comic.title.replace(/[^A-Z0-9]/ig, " ");

    var creatorNodes = this.props.comic.creators.items.map(function(creator) {
    return(
      <CreatorDetail name={creator.name} role={creator.role}>
      </CreatorDetail>
      );
    });
    console.log("SingleComicDetails comic prop", this.props.comic);
    return(
      <React.Fragment>

      <div className="singleComicDetails" id="singleComicDetails">
        <h5>Title:</h5>
        <h6>{title}</h6>
        <h5>Creative Team:</h5>
        <h6>{creatorNodes}</h6>
      </div>
    </React.Fragment>

    )

  }

}

export default SingleComicDetails
