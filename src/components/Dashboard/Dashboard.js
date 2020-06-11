import React, { Component } from "react"
import axios from 'axios'
import Nav from "../Nav/Nav"
import "./Dashboard.css";
import Post from "../Post/Post";
import { connect } from "react-redux"
import { setPosts } from "../../ducks/reducer"


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        posts: [],
        search:'',
        userposts: true,
        filter: ''
    }
  }

componentDidMount() {
  axios
  .get("/api/posts")
  .then((results) => {
    this.props.setPosts(results.data)
    this.setState({
      posts: results.data
    })
    console.log(results.data)
  })
  .catch((err) => console.log(err))
}


getSearch = () => {
  axios
  .get(`/api/posts?filter=${this.state.filter}`)
  .then((results) => {
    this.props.setPosts(results.data)
    this.setState({
      posts: results.data
    })
    console.log(results.data)
  })
  .catch((err) => console.log(err))
}


handleChange = (e) =>{
  const {name, value} = e.target;
  this.setState({
    [name]: value
  }) 
}


  render() {

    const posts = this.state.posts.map(thisPost => {
      console.log({thisPost})
      return (
           
           <div key={thisPost.id} className="post-card" onClick={() => this.props.history.push(`/post/${thisPost.id}`)}>

             <h2>{thisPost.title}</h2>
             <p><span>by {thisPost.username} </span><img className="profile-pic" src={thisPost.profile_pic} alt={`Profile picture for ${thisPost.username}`}/></p>

           </div>   
      
      )
    }) 


    return (
      <div className="dashboard-container">
          <Nav />
        <div className="right-container">
          
          <div className="post-container">
            <input className="search-field" placeholder="Search Posts" name="filter" value={this.state.filter} onChange={ (e) => this.handleChange(e)}/> 
            <button onClick={this.getSearch}>Icon</button> 
            <button className="search-reset">Reset</button> 
            Include My Posts <input className="search-check" type="checkbox"/>
          </div>

          <div className="post-container">
            {this.state.posts.length > 0 ? posts : null}
          </div> 
        
        
        </div>
      
      
            
      </div>
    )
  }
}



const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setPosts})(Dashboard)