import React from 'react'

class Details extends React.Component {

  render(){
    return(
      <h4> Name: {this.props.name} - Role: {this.props.role}</h4>
    )
  }
}

export default Details
