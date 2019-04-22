import React from 'react'
import Request from './../helpers/request'
import UserList from './../components/user/userList'

class UsersContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users: [],
      toggle: false
    }

  }

  componentWillMount(){

  }

  componentDidMount(){

    const request = new Request();
    request.get("http://localhost:8080/api/users").then((data) => {
      this.setState({users: data._embedded.users})
    })
  }

  render(){
    if(this.state.user == 0){
      return null;
    }
    return(
      <UserList users={this.state.users}/>
    )
  }

}





export default UsersContainer
