import React, { Component } from "react"
// import axios from "axios"
import { connect } from "react-redux"
import { setUser, login, register } from "../../ducks/reducer"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = ({ name, value }) => this.setState({ [name]: value })
  login = () => {
    const {username, password} = this.state
    this.props.login({username, password})
    this.props.history.push('/dashboard')
  }
  
  register = () => {
    const {username, password} = this.state
      this.props.register({username, password})
      this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div>
        <input name="username" value={this.state.username} onChange={(e) => this.handleChange(e.target)}/>
        <input name="password" type="password" value={this.state.password} onChange={(e) => this.handleChange(e.target)}/>
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>
    )
  }
}

export default connect(null, { setUser, login, register })(Login)
