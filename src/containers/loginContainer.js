import React from 'react'
import Login from './../components/login/login'
import Request from './../helpers/request'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from "react-router-dom";

class LoginContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      detailsRetrieved: null,
      detailsSubmitted: null,
      loggedInUser: null,
      redirect: false
    }
    this.handleUserPost = this.handleUserPost.bind(this);
    this.retrieveUserForChecking = this.retrieveUserForChecking.bind(this);
    this.checkUserDetails = this.checkUserDetails.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.setRedirectLoginFail = this.setRedirectLoginFail.bind(this);
    this.renderRedirectLoginFail = this.renderRedirectLoginFail.bind(this);
  }

  setRedirect(){
    this.setState({
      redirect: true
    })
  }
  renderRedirect(){
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  setRedirectLoginFail(){
    this.setState({
      redirect: true
    })
  }
  renderRedirectLoginFail(){
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  handleUserPost(user){
    console.log("handleUserPost called", user);
    const request = new Request();
    request.post('http://localhost:8080/api/users', user).then(()=> {
      window.location = '/users'
      console.log("User post sent");
    })
  }

  checkUserDetails(){
    if(this.state.detailsRetrieved.password === this.state.detailsSubmitted.password){
      this.props.loginUser(this.state.detailsSubmitted.userName);
    }else{
      this.props.setLoginFail();
    }
  }

  retrieveUserForChecking(submittedDetails){
    console.log("Retrieve user for checking args", submittedDetails);
    const request = new Request();
    request.get('http://localhost:8080/api/users/findByUserName/' + submittedDetails.userName)
    .then((data) => {this.setState({detailsRetrieved: data})})
    .then((data)=> {this.props.setloggedInUserInfo(this.state.detailsRetrieved)})
    .then(()=>{this.setState({detailsSubmitted: submittedDetails})})
    .then(()=>{this.checkUserDetails()});
  }




  render(){
    // console.log("loginContainer props", this.props);
    if(this.props.loginComplete){
      return(
        <React.Fragment>
        <div>
        <h4> Great! </h4>
        <h4> You are now logged in! </h4>
        </div>
        <div className="loginButtonDiv">
          {this.renderRedirect()}
          <button className ="loginButton" onClick={this.setRedirect}>Go!</button>
        </div>
        </React.Fragment>
      )
    }

    if(this.props.loginFail){
      return(
        <React.Fragment>
        <div>
        <h4> Sorry </h4>
        <h4> Your user name or password appears to be incorrect </h4>
        </div>
        <div className="loginButtonDiv">
          <Login handleUserPost={this.handleUserPost} handleLogin={this.retrieveUserForChecking}/>
        </div>
        </React.Fragment>
      )
    }

    return(
      <Login handleUserPost={this.handleUserPost} handleLogin={this.retrieveUserForChecking}/>
    )
  }


}





export default LoginContainer
