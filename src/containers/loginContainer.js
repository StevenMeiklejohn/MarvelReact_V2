import React from 'react'
import Login from './../components/login/login'
import Request from './../helpers/request'

class LoginContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      detailsRetrieved: null,
      detailsSubmitted: null,
      loggedInUser: null
    }
    this.handleUserPost = this.handleUserPost.bind(this);
    this.retrieveUserForChecking = this.retrieveUserForChecking.bind(this);
    this.checkUserDetails = this.checkUserDetails.bind(this);
  }

  handleUserPost(user){
    console.log("handleUserPost called", user);
    const request = new Request();
    request.post('/api/users', user).then(()=> {
      window.location = '/users'
    })
  }

  checkUserDetails(){
    console.log("Check user details called");
    console.log("Retrived password", this.state.detailsRetrieved.password);
    console.log("Submitted password", this.state.detailsSubmitted.password);
    if(this.state.detailsRetrieved.password === this.state.detailsSubmitted.password){
      console.log("Success you are logged in!");
      // console.log("loginContainer props", this.props.route);
      // this.props.setUser(this.state.detailsSubmitted.userName);
    }
  }

  retrieveUserForChecking(submittedDetails){
    console.log("Retrieve user for checking args", submittedDetails);
    const request = new Request();
    request.get('/api/users/findByUserName/' + submittedDetails.userName)
    .then((data) => {this.setState({detailsRetrieved: data})})
    .then(()=>{this.setState({detailsSubmitted: submittedDetails})})
    .then(()=>{this.checkUserDetails()});
}




  render(){
    // if(!this.props.setUser){
    //   console.log("no props found");
    //   return null;
    // }
    console.log("loginContainer props", this.props);
    return(
      <Login handleUserPost={this.handleUserPost} handleLogin={this.retrieveUserForChecking}/>
    )
  }


}





export default LoginContainer
