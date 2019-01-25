import React from 'react';
import Details from './details';

class DetailsBox extends React.Component {


  render(){

    if(!this.props.comic){
      return null
    }

    var creatorNodes = this.props.creators.map(function(creator) {
      const name = creator.name.replace(/[^A-Z0-9]/ig, " ");
      const role = creator.role.replace(/[^A-Z0-9]/ig, " ")
    return(
      <Details name={name} role={role}>
      </Details>
      );
    });
    const title = this.props.title.replace(/[^A-Z0-9]/ig, " ");
    return(
      <div className="details">
        <h4>Title:</h4>
        <h4>{this.props.title}</h4>
        <h4>Creative Team</h4>
        {creatorNodes}
      </div>
    )
  }
}

export default DetailsBox;
