import React, { Component } from "react"
import axios from 'axios'
import './Post.css';

class Post extends Component {
    constructor(props) {
      super(props)
      this.state = {
          post: {}
      }
    }
  
  componentDidMount() {
    axios
    .get(`/api/post/${this.props.match.params.id}`)
    .then((results) => {
      this.setState({
        post: results.data
      })
    })
    .catch((err) => console.log(err))
  }

render() {
  console.log(this.state.post)
    const {title, profile_pic, img, content, username} = this.state.post;


    return (
    <div className="dashboard-container">
        
            <div className="right-container">
        
                 <div className="post-container">
                    <div className="flex-row space-between">
                        <h2>{title}</h2>
                        <p><span>by {username} </span><img className="profile-pic" src={profile_pic} alt={`Profile picture for ${username}`}/></p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img className="post-image" src={img} alt={'post image'}/>
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