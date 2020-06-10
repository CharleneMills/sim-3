import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";
import { getUser } from "../../ducks/reducer"
import { connect } from "react-redux"




function Nav(props) {

  console.log(props.data)

  return (
    <div className="Nav sidebar">
      <img className="profile-pic" src={props.profile_pic}/>
      <p>{props.username}</p>
      <Link to="/dashboard">Dashboard</Link><br/>
      <Link to="/">Logout</Link>
    </div>
  );
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Nav)