import React  from 'react';
import {Link} from 'react-router-dom';

const User = (props) => {

  const { id, firstName, lastName, userName, password } = props.user;

  return (
    <div className="component">
      <p className="name">
      <Link to={"/users/" + id} className="name">
        {firstName} {lastName}
      </Link>
      </p>
      <p>Id: {id}</p>
      <p>User Name: {userName}</p>
      <p>Password: {password}</p>
    </div>
  )
}

export default User;
