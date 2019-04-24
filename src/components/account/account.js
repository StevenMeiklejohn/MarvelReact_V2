import React from 'react';

class Account extends React.Component{

  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.directToEditForm = this.directToEditForm.bind(this);
  }

  handleDelete(){
    const url = '/api/users/' + this.props.userInfo.id;
    let request = new Request();
    request.delete(url).then(()=>{
      window.location = '/users';
    })
  }



  directToEditForm(){
    window.location = '/users/edit/' + this.props.userInfo.id;
  }

  render(){
      console.log("AcountView props user info", this.props.userInfo);
  return (
    <React.Fragment>
    <div className="editUserDetails">
      <h4 className="name">
        {this.props.userInfo.firstName} {this.props.userInfo.lastName}
      </h4>
      <h6>Id: {this.props.userInfo.id}</h6>
      <h6>User Name: {this.props.userInfo.userName}</h6>
      <h6>Password: {this.props.userInfo.password}</h6>
    </div>
    <div className="loginButtonDiv">
    <button className ="loginButton" onClick={this.handleDelete}>Delete</button>
    <button className ="loginButton" onClick={this.directToEditForm}>Edit</button>
    <button className ="loginButton" onClick={this.props.handleLogout}>Logout</button>


    </div>

    </React.Fragment>
  )
}
}

export default Account;
