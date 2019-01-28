import React  from 'react';
import {Link} from 'react-router-dom';

const User = (props) => {

  const { id, firstName, lastName, userName, password } = props.user;

  return (
    <div className="singleUserDetails">
      <h4 className="name">
      <Link to={"/users/" + id} className="name">
        {firstName} {lastName}
      </Link>
      </h4>
      <h6>Id: {id}</h6>
      <h6>User Name: {userName}</h6>
      <h6>Password: {password}</h6>
    </div>
  )
}

export default User;
