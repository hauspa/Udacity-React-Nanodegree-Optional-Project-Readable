import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'

const testID = "8xf0y6ziyjabvozdd253nd"

class PostDetail extends Component {

  state = {
    post: {},
    comments: {},
  }

  componentDidMount = () => {
    const { loadPost, loadComments } = this.props

    loadPost(testID)
      .then((post) => this.setState((prevState) => ({
        ...prevState,
        post
      })))

    loadComments(testID)
      .then((comments) => this.setState((prevState) => ({
        ...prevState,
        comments,
      })))
  }

  handleClick = (e) => {
    e.preventDefault()
    const vote = e.target.name
    console.log('Voted: ', vote)
    // vote === 'upVote' ? :
  }

  render(){
    const { post, comments } = this.state
    console.log('Post detail: ', post)
    console.log('Comments: ', comments)
    return (
      <div>
        {
          post === {}
            ? null
            : (
              <div>
                <h1>Post Detail</h1>
                <h2>{post.title || 'Title'}</h2>
                <h3>By {post.author || 'Author'} on {post.timestamp || 'Date'}, Category: {post.category || 'Category'}</h3>
                {/* TODO: Icon for voting up/down */}
                <button onClick={this.handleClick} name='upVote'>Vote Up</button>
                <button onClick={this.handleClick} name='downVote'>Vote Down</button>

                <p>{post.body}</p>

                <button>Edit this Post</button>
                <br></br>
                <br></br>

                {
                  comments.length === 0
                    ? <p>No Comments for this Post</p>
                    : (
                      <div>
                        <h3>{post.commentCount} comments</h3>
                        {
                          Object.values(comments).map(comment => (
                            <div key={comment.id}>
                               <div>Author: {comment.author}</div>
                               <div>Body: {comment.body}</div>
                               <button onClick={this.handleClick} name='upVote'>Vote Up</button>
                               <button onClick={this.handleClick} name='downVote'>Vote Down</button>
                               <br></br>
                               <br></br>
                            </div>
                          ))
                        }
                        <br></br>

                        <button>Add Comment</button>
                      </div>
                    )
                }

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
    loadPost: (id) => PostsAPI.getPost(id),
    loadComments: (id) => CommentsAPI.getCommentsForPost(id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
