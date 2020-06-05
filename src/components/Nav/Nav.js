import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div className="Nav">
      <Link to="/">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Nav;