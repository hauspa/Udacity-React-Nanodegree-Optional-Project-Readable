import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import {
  handleVotingPost,
} from '../actions/shared'
import Comments from './Comments'
import * as moment from 'moment'

const testID = "8xf0y6ziyjabvozdd253nd"

class PostPage extends Component {

  componentDidMount = () => {
    const { loadPost, loadComments } = this.props

    // TODO: maybe still use API with Redux??
    // loadPost(testID)
    //   .then((post) => this.setState((prevState) => ({
    //     ...prevState,
    //     post
    //   })))
  }

  handlePostVote = (e) => {
    e.preventDefault()
    const vote = e.target.name
    // TODO: can only once once per session/post.
      this.props.votePost(testID, vote)
  }

  render(){
    const { comments, post } = this.props
    return (
      <div>
        {
          post === undefined
            ? null
            : (
              <div>
                <h1>Post Page</h1>
                <h2>{post.title || 'Title'}</h2>
                <h3>By {post.author || 'Author'} on {moment(post.timestamp).format('MMM Do YYYY') || 'Date'}, Category: {post.category || 'Category'}</h3>
                {/* TODO: Icon for voting up/down */}
                <button onClick={this.handlePostVote} name='upVote'>Vote Up</button>
                <button onClick={this.handlePostVote} name='downVote'>Vote Down</button>
                <p>Vote Score: {post.voteScore}</p>

                <p>{post.body}</p>

                <button>Edit this Post</button>
                <br></br>
                <br></br>

                <h3>{post.commentCount} comments</h3>
                <Comments />
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  const post = Object.values(posts).filter(post => post.id === testID)[0]
  console.log('post: ', post)
  return {
    post, // TODO: Could use both API & Redux together!!!
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // use API to get post instead of mapStateToProps, because get comments count automatically!
    loadPost: (id) => PostsAPI.getPost(id),
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
