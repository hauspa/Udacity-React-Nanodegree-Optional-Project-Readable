import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'

const testID = "8xf0y6ziyjabvozdd253nd"

class PostDetail extends Component {

  state = {
    post: {}
  }

  componentDidMount = () => {
    this.props.loadPost(testID)
      // .then((post) => console.log('DONE: ', post))
      .then((post) => this.setState(() => ({
        post
      })))
  }

  handleClick = (e) => {
    e.preventDefault()
    const vote = e.target.name
    console.log('Voted: ', vote)
    // vote === 'upVote' ? :
  }

  render(){
    const { post } = this.state
    return (
      <div>
        {
          post === {}
            ? null
            : (
              <div>
                <h1>Post Detail</h1>
                <h2>{post.title}</h2>
                <h3>By {post.author} on {post.timestamp}, Category: {post.category}</h3>
                {/* TODO: Icon for voting up/down */}
                <button onClick={this.handleClick} name='upVote'>Vote Up</button>
                <button onClick={this.handleClick} name='downVote'>Vote Down</button>

                <p>{post.body}</p>

                <br></br>
                <br></br>
                
                <h3>Comments</h3>
                <p>Amount of Comments</p>
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps() {
  return {
    // use API to get post instead of mapStateToProps, because get comments count automatically!
    loadPost: (id) => PostsAPI.getPost(id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
