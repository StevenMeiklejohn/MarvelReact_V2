import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    if(!this.props.user){
      return(
        <ul>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/">Home</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/login">Login</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/new">New</Link>
          </li>
          </ul>
      )
    }


    if(this.props.user){
      return (
        <ul>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/">Home</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/logout">Logout</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/new">New</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/recommendations">My Recommendations</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/account">{this.props.user}</Link>
          </li>

        </ul>
      )
    }
  }

}

export default Navbar;
