import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <ul>
    <li>
      <Link style={{ textDecoration: 'none', color:'white' }} to="/">Home</Link>
    </li>
    <li>
      <Link style={{ textDecoration: 'none', color:'white' }} to="/login">Login</Link>
    </li>
    <li>
      <Link style={{ textDecoration: 'none', color:'white' }} to="/account">Account</Link>
    </li>
    <li>
      <Link style={{ textDecoration: 'none', color:'white' }} to="/new">New</Link>
    </li>
    <li>
      <Link style={{ textDecoration: 'none', color:'white' }} to="/recommendations">Recommendations</Link>
    </li>
  </ul>
);

export default Navbar;
