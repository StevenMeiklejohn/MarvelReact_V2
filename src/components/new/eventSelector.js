import React from 'react';
const _ = require('lodash');


class EventSelector extends React.Component{

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
    if(this.props.events.length == 0){
      return(
        <div>
          <div className="eventSelector">
            <p class="animated infinite lightSpeedIn delay-2s">Fetching Related</p>
            <p class="animated infinite lightSpeedIn delay-2s">Events...</p>
          </div>
        </div>
      )
    }

    let events = this.props.events;
    // console.log("Event selector events props", events);
    this.flattenEventsObject(events);
    // console.log("Event selector events props post flatten", events);
    let flatEvents = [];
    let orderedEvents = [];
    let ordered_options = [];
    if(events){
      events.forEach(function(element) {
        element.forEach(function(item){
          // console.log(item);
            flatEvents.push(item)
        })
      });
      // console.log(flatEvents);
      orderedEvents = _.sortBy(flatEvents, [function(o) { return o.title; }]);

      orderedEvents.forEach(function(item){
        ordered_options.push(<option key={item.id} value={item.id}>{item.title}</option>)
      })
      this.sorted_options = ordered_options
      // console.log("sorted options", this.sorted_options);
    }

    return(
      <div className="eventSelector">
        <p>Select an Event</p>
      <select onChange={this.props.onChange}>
      {this.sorted_options}
      </select>
      </div>
    )
  }
}

export default EventSelector
