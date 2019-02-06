import React from 'react';
// import Request from './../../helpers/request'
const _ = require('lodash');
// const writeFileP = require("write-file-p");


class SearchTypeSelector extends React.Component{

  constructor(props){
  super(props);
  }




  render(){
    if(!this.props.character){
      return null;
    }

    return(
      <div className="searchOptionSelector">
        <h6>Select a search filter</h6>
      <select onChange={this.props.onChange}>
        <option> Options....</option>
        <option key="1" value="Stories">Stories</option>
        <option key="2" value="Events">Events</option>
        <option key="3" value="Series">Series</option>
      </select>
      </div>
    )
  }
}

export default SearchTypeSelector
