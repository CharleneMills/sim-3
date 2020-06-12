import React, { Component } from "react"
import axios from 'axios'
import {connect} from 'react-redux'
import './Form.css'


class Form extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '',
        img: '',
        content: '',
        user_id: this.props.reducer.user.id
      }
    }
  
newPost = () => {
      axios.post('/api/post/', this.state).then(res => {
        this.props.history.push('/dashboard');
      }).catch(error => {
        console.log(error)
      })
}

  handleChange = (e) =>{
    const {name, value} = e.target;
    this.setState({
      [name]: value
    }) 
  }



render() {

 console.log(this.props)   


    return (
    <div className="dashboard-container">
       
            <div className="right-container">
        
                 <div className="post-container">
                        <input className="form-input" name="title" value={this.state.title} placeholder="Title" onChange={ (e) => this.handleChange(e)}/>
                        <p>Image preview here</p>
                        <input className="form-input" name="img" value={this.state.img} placeholder="Image URL" onChange={ (e) => this.handleChange(e)}/><br/>
                        <input className="form-input comment-box" name="content" value={this.state.content} type="text" placeholder="content" onChange={ (e) => this.handleChange(e)}/> 
                        <br/>
                        <button onClick={() => this.newPost()}>Submit</button>
                 </div>
            </div>         
    </div>
    )
  }

}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form)