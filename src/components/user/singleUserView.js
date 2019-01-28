import React  from 'react';
import {Link} from 'react-router-dom';

const SingleUserView = (props) => {

  const {id, firstName, lastName, userName, password } = props.user;
  return (
    <div className="editUserDetails">
      <h4 className="name">
        {firstName} {lastName}
      </h4>
      <h6>Id: {id}</h6>
      <h6>User Name: {userName}</h6>
      <h6>Password: {password}</h6>
    </div>
  )
}

export default SingleUserView;
