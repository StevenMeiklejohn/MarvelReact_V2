import React from 'react';
const _ = require('lodash');


class TitleSelector extends React.Component{

  constructor(props){
  super(props);
  this.flattenTitleObject = this.flattenTitleObject.bind(this);
  this.sorted_options = [];
  }

  flattenTitleObject(object){
      // console.log("pre flattened", object);
      let flattened = _.flattenDeep(object);
      // console.log("flattened", flattened);
  }


  render(){
    if(this.props.titles.length == 0){
      return(
        <div>
          {/* <p class="animated infinite lightSpeedIn delay-2s">No events</p> */}
        </div>
      )
    }
    let titles = this.props.titles;
    console.log("TITLE selector events props", titles);
    this.flattenEventsObject(titles);
    console.log("TITLE selector events props post flatten", titles);
    let flatTitles = [];
    let orderedTitles = [];
    let ordered_options = [];
    if(titles){
      titles.forEach(function(element) {
        element.forEach(function(item){
          console.log(item);
            flatTitles.push(item)
        })
      });
      console.log(flatTitles);
      orderedTitles = _.sortBy(flatTitles, [function(o) { return o.title; }]);

      orderedTitles.forEach(function(item){
        ordered_options.push(<option key={item.id} value={item.title}>{item.title}</option>)
      })
      this.sorted_options = ordered_options
      console.log("sorted options", this.sorted_options);
    }

    return(
      <div className="titleSelector">
        <p>Select a Title</p>
      <select onChange={this.props.onChange}>
      {this.sorted_options}
      </select>
      </div>
    )
  }
}

export default TitleSelector
