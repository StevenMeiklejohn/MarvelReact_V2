import React from 'react';
const _ = require('lodash');


class FilteredSelector extends React.Component{

  constructor(props){
  super(props);
  this.flattenEventsObject = this.flattenEventsObject.bind(this);
  this.sorted_options = [];
  }

  flattenEventsObject(object){
      // console.log("pre flattened", object);
      let flattened = _.flattenDeep(object);
      // console.log("flattened", flattened);
  }


  render(){
    // console.log("FilteredSelector props type", this.props.filteredType);
    // console.log("FilteredSelector options prop event", this.props.filteredOptions);
    if(!this.props.filteredType){
      return null;
    }


    if(this.props.filteredType === "event" && this.props.filteredOptions.length > 0){
      console.log("FilteredSelector options prop event", this.props.filteredOptions);
      let options = this.props.filteredOptions[0];
      let optionElements = [];
      options.forEach(function(item){
        optionElements.push(<option key={item.id} value={item.id}>{item.title}</option>)
      })
      this.sorted_options = optionElements;
      // console.log("sorted option elements", this.sorted_options);
    }

    if(this.props.filteredType === "stories" && this.props.filteredOptions.length > 0){
      // console.log("FilteredSelector options prop stories", this.props.filteredOptions);
      let options = this.props.filteredOptions;
      let optionElements = [];
      options.forEach(function(item){
        item.forEach(function(element){
          optionElements.push(<option key={element.id} value={element.id}>{element.title}</option>)
        })
      })
      this.sorted_options = optionElements;
    }

    if(this.props.filteredType === "series" && this.props.filteredOptions.length > 0){
      console.log("FilteredSelector options prop series", this.props.filteredOptions[0]);
      let options = this.props.filteredOptions[0];
      let optionElements = [];
      options.forEach(function(item){
        optionElements.push(<option key={item.id} value={item.id}>{item.title}</option>)
      })
      this.sorted_options = optionElements;
    }



    return(
      <div className="filteredSelector">
        <h6>Select filtered options</h6>
      <select onChange={this.props.onChange}>
      <option> Options....</option>
      {this.sorted_options}
      </select>
      </div>
    )
  }

}

export default FilteredSelector
