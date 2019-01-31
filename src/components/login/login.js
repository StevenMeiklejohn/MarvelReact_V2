import React from 'react';

class Login extends React.Component{

  constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleLoginTry = this.handleLoginTry.bind(this);
  }


  handleSubmit(event){
    event.preventDefault();
    const user = {
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "userName": event.target.userName.value,
      "password": event.target.password.value
    }
    // console.log(user);
    this.props.handleUserPost(user);
  }

  handleLoginTry(event){
    event.preventDefault();
    const user = {
      "userName": event.target.userName.value,
      "password": event.target.password.value
    }
    // console.log("Handle loginTry object", user);
    this.props.handleLogin(user);
  }


  render(){
    return(
      <React.Fragment>
      <div>
        <h4>Login</h4>
      </div>
      <form onSubmit={this.handleLoginTry}>
        <input type="text" placeholder="User Name" name="userName"/>
        <input type="text" placeholder="password" name="password"/>
        <div className="loginButtonDiv">
          <button className ="loginButton" type="submit">Enter</button>
        </div>
      </form>
      <div>
        <h4>Create An Account</h4>
      </div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="First Name" name="firstName"/>
          <input type="text" placeholder="Last Name" name="lastName"/>
          <input type="text" placeholder="User Name" name="userName"/>
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

export default Login
