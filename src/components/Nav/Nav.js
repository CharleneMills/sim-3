import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav sidebar">
      <Link to="/dashboard">Dashboard</Link><br/>
      <Link to="/">Logout</Link>
    </div>
  );
}

export default Nav;