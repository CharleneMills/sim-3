import React, { Component } from "react"
import axios from 'axios';
// import axios from "axios"
import { connect } from "react-redux"
import { login } from "../../ducks/reducer"
import "./Auth.css"
import HeloLogo from "../../assets/helo_logo_black.png"

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = ({ name, value }) => this.setState({ [name]: value })


  login = () => {
    const {username, password} = this.state;
    axios.post("/auth/login", {username, password})
      .then(res => {
        console.log(res.data)
        this.props.login(res.data)
        this.props.history.push('/dashboard')
      }
    )
    .catch((err) => {
      console.log(err)
      alert('Login Information is Incorrect')
      }
    )
  }
  
  register = () => {
    const {username, password} = this.state;
    axios.post("/auth/register", {username, password})
      .then(res => {
        this.props.history.push('/dashboard')
        this.props.login(res.data)
      }
    )
    .catch((err) => {
      console.log(err)
      alert('Username is taken')
      }
    )
  }

  render() {
    return (
     <div className="auth-container">
      <div className="auth-box">
        <img src={HeloLogo}/>
        <h1>Helo</h1>
          <input placeholder="username" name="username" value={this.state.username} onChange={(e) => this.handleChange(e.target)}/><br/>
          <input placeholder="password" name="password" type="password" value={this.state.password} onChange={(e) => this.handleChange(e.target)}/><br/>
          <button onClick={this.login}>Login</button>
          <button onClick={this.register}>Register</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {login})(Auth)
