import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
//import { setPosts } from "../../ducks/reducer"
import Nav from "../Nav/Nav"
import "./Dashboard.css";


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        posts: [],
        search:'',
        userposts: true
    }
  }
  componentDidMount() {
    axios.get("/api/posts")
      .then((results) => {
        this.props.setPosts(results.data)
      })
      .catch((err) => console.log(err))
  }

  resetSearch(){
      this.setState = {
          search: ''
      }
  }

  render() {
    return (
      <div className="dashboard-container">
          <Nav />
        This is the Dashboard
            
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { posts: state.reducer.posts }
}

export default connect(mapStateToProps, {  })(Dashboard)