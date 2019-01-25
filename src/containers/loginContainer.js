import React from 'react'
import Login from './../components/login/login'
import Request from './../helpers/request'

class LoginContainer extends React.Component{

  constructor(props){
    super(props);
    // this.state = {
    //   user: null
    // }
    this.handleUserPost = this.handleUserPost.bind(this);
  }

  handleUserPost(user){
    console.log("handleUserPost called", user);
    const request = new Request();
    request.post('/api/users', user).then(()=> {
      window.location = '/'
    })

  }

  render(){
    return(
      <Login handleUserPost={this.handleUserPost}/>
    )
  }

}





export default LoginContainer
