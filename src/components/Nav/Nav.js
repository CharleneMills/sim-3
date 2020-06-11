import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";
import { connect } from "react-redux"




function Nav(props) {

  console.log(props)

  return (
    <div className="Nav sidebar">
      <img className="profile-pic" src={props.reducer.user.profile_pic}/>
      <p>{props.reducer.user.username}</p>
      <Link to="/dashboard">Dashboard</Link><br/>
      <Link to="/form">New Post</Link><br/>
      <Link to="/">Logout</Link>
    </div>
  );
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav)