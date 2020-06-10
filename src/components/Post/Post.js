import React, { Component } from "react"
import axios from 'axios'
import Nav from "../Nav/Nav"

class Post extends Component {
    constructor(props) {
      super(props)
      this.state = {
          title: '',
          img:'',
          content: '',
          author: '',
          profilePic: ''
      }
    }
  
  componentDidMount() {
    axios
    .get('/api/posts/:id')
    .then((results) => {
      this.props.setPosts(results.data)
      this.setState({
        posts: results.data
      })
      console.log(results.data)
    })
    .catch((err) => console.log(err))
  }

render() {

    const {title, profilePic, img, content, author} = this.state;


    return (
    <div className="dashboard-container">
        <Nav />
            <div className="right-container">
        
                 <div className="post-container">
                    <div className="flex-row space-between">
                        <h2>{title}</h2>
                        <p><span>by {author} </span><img className="profile-pic" src={profilePic} alt={`Profile picture for ${author}`}/></p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img className="img" src={img} alt={'post image'}/>
                        </div>  
                        <div className="col-md-2">
                            <p>{content}</p>
                        </div>  
                    </div>  
                </div>
            </div>         
    </div>
    )
  }




}

export default Post;