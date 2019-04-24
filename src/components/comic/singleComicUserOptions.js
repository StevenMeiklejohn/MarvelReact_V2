import React from 'react';
import CreatorDetail from './creatorDetail'
import Request from './../helpers/request'


class SingleComicUserOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: null,
      recipient: null
    }
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleSubmitRec = this.handleSubmitRec.bind(this);
  }



  componentDidMount(){

    const request = new Request();
    request.get("http://localhost:8080/api/users").then((data) => {
      this.setState({users: data._embedded.users})
    })
  }

  handleUserSelect(event){
    var index = event.target.value;
    console.log("HandleUserSelect Called", index);
    this.setState({recipient: this.state.users[index]})
  }

  handleSubmitRec(event){
    var recommendation = {
      recommendedById: this.props.user.id,
      recommendedForId: this.state.recipient.id,
      comicId: this.props.comic.id,
      date: "today"
    }
    console.log("handleSubmitRec called", recommendation);
    const request = new Request();
    request.post("http://localhost:8080/api/recommendations", recommendation).then(console.log("recommendation posted!"))

  }





  render(){


    if(!this.props.comic||!this.state.users){
      return null
    }

    console.log("SingleComicContainer users state", this.state.users);

    var ordered_options = [];
    this.state.users.forEach(function(user, index){
      ordered_options.push(<option key={user.id} value={index}>{user.userName}</option>)
    })




    return(
    <div className="singleComicUserOptions">
    <div className="eventSelector">
      <p>Select Recipient</p>
    <select onChange={this.handleUserSelect}>
    <option disabled selected value> -- select a user -- </option>
    {ordered_options}
    </select>
    </div>
    <div className="loginButtonDiv">
    <button className ="loginButton" onClick={this.handleSubmitRec}>Send</button>
    </div>
    </div>

    )

  }

}

export default SingleComicUserOptions
