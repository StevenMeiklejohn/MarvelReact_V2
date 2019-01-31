import React from 'react';

class Account extends React.Component{

  constructor(props){
    super(props);
  }

  // const {id, firstName, lastName, userName, password } = props.userInfo;
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

    </React.Fragment>
  )
}
}

export default Account;
