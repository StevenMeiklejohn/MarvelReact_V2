import React from 'react';


class CreatorDetail extends React.Component{



  render(){
    // if(!this.props.comic){
    //   return null
    // }
    // console.log("Creator Detail name", this.props.name);
    // console.log("Creator Detail role", this.props.role);

    return(
      <React.Fragment>

      <div className="details" id="details">
        Name: {this.props.name} - Role: {this.props.role}
      </div>
    </React.Fragment>

    )

  }

}

export default CreatorDetail
