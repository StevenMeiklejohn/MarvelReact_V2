import React from 'react'
import EditUserView from './../components/user/editUserView'
import Request from './../helpers/request'

class EditUserContainer extends React.Component{

  constructor(props){
    super(props);
    // this.state = {
    //   user: null
    // }
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  handleUserUpdate(user){
    console.log("handleUserPost called", user);
    const request = new Request();
    request.put('http://localhost:8080/api/users/' + this.props.id, user).then(()=> {
      window.location = '/users'
    })

  }

  render(){
    return(
      <EditUserView handleUserUpdate={this.handleUserUpdate} id={this.props.id}/>
    )
  }

}





export default EditUserContainer
