import React from 'react';
import Request from './../../helpers/request.js'

class EditUserView extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    user: null
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const request = new Request();
    request.get("http://localhost:8080/api/users/" + this.props.id).then((data) => {
      this.setState({user: data})
    })
  }


  handleSubmit(event){
    event.preventDefault();
    const user = {
      "id": this.props.id,
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "userName": event.target.userName.value,
      "password": event.target.password.value
    }
    console.log(user);
    this.props.handleUserUpdate(user);
  }


  render(){

    if(!this.state.user){
      return null;
    }

    return(
      <React.Fragment>
      <div>
        <h4>Update Your Details</h4>
      </div>
      <div className="editForm">
        <form onSubmit={this.handleSubmit}>
          <h6>Current Value: {this.state.user.firstName}</h6>
          <input type="text" placeholder="First Name" name="firstName" id="firstName" />
          <h6>Current Value: {this.state.user.lastName}</h6>
          <input type="text" placeholder="Last Name" name="lastName"/>
          <h6>Current Value: {this.state.user.userName}</h6>
          <input type="text" placeholder="User Name" name="userName"/>
          <h6>Current Value: {this.state.user.password}</h6>
          <input type="text" placeholder="Password" name="password"/>
          <div className="loginButtonDiv">
            <button className ="loginButton" type="submit">Save</button>
          </div>
        </form>
      </div>
      </React.Fragment>
    )
  }
}

export default EditUserView
