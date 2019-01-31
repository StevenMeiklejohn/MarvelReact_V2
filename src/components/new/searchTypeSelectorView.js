import React from 'react';
// import Request from './../../helpers/request'
const _ = require('lodash');
// const writeFileP = require("write-file-p");


class SearchTypeSelector extends React.Component{

  constructor(props){
  super(props);
  this.searchOptions = ["Creators", "Events", "Series"];
  this.optionElements = [];
  }




  render(){
    if(!this.props.character){
      return null;
    }

    return(
      <div className="searchOptionSelector">
        <h6>Select a search filter</h6>
      <select onChange={this.props.onChange}>
        <option key="1" value="Creators">Creators</option>
        <option key="2" value="Events">Events</option>
        <option key="2" value="Series">Series</option>
      </select>
      </div>
    )
  }
}

export default SearchTypeSelector
