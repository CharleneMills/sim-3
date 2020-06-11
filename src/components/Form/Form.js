import React, { Component } from "react"
import axios from 'axios'
import Nav from "../Nav/Nav"
import {connect} from 'react-redux'


class Form extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '',
        img: '',
        content: ''
      }
    }
  
  componentDidMount() {
   
  }

//handle function with input fileds

//button that calls an axios call - method 

//method needs to be an axios post that passes state + user id.

render() {

 console.log(this.props)   


    return (
    <div className="dashboard-container">
        <Nav />
            <div className="right-container">
        
                 <div className="post-container">
                        <input placeholder="Title"/>
                        <p>Image preview here</p>
                        <input placeholder="Image URL"/><br/>
                        <input type="text"/> 
                 </div>
            </div>         
    </div>
    )
  }




}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form)