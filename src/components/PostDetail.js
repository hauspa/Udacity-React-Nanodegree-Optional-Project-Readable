import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'
import { getCommentsForPost } from '../actions/comments'
import {
  handleGettingComments,
  handleVotingPost,
  handleVotingComment,
} from '../actions/shared'

const testID = "8xf0y6ziyjabvozdd253nd"
// const commentID = "894tuq4ut84ut8v4t8wun89g"

class PostDetail extends Component {

  componentDidMount = () => {
    const { loadPost, loadComments } = this.props

    // loadPost(testID)
    //   .then((post) => this.setState((prevState) => ({
    //     ...prevState,
    //     post
    //   })))

    loadComments(testID)
  }

  handlePostVote = (e) => {
    e.preventDefault()
    const vote = e.target.name
    // TODO: can only once once per session/post.
      this.props.votePost(testID, vote)
  }

  handleCommentVote = (e, id, vote) => {
    e.preventDefault()
    // const vote = e.target.name
    // const commentID = e.target.name
    // TODO: can only once once per session/comment.
    this.props.voteComment(id, vote)
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
                <h1>Post Detail</h1>
                <h2>{post.title || 'Title'}</h2>
                <h3>By {post.author || 'Author'} on {post.timestamp || 'Date'}, Category: {post.category || 'Category'}</h3>
                {/* TODO: Icon for voting up/down */}
                <button onClick={this.handlePostVote} name='upVote'>Vote Up</button>
                <button onClick={this.handlePostVote} name='downVote'>Vote Down</button>
                <p>Vote Score: {post.voteScore}</p>

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
                               <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')}>Vote Up</button>
                               <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')}>Vote Down</button>
                               <p>Vote Score: {comment.voteScore}</p>
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

function mapStateToProps({ posts, comments }) {
  // console.log('posts: ', Object.values(posts))
  // console.log('comments: ', Object.values(comments))
  // console.log('comments: ', comments) // -> is still empty!
  const post = Object.values(posts).filter(post => post.id === testID)[0]
  // const comments = Object.values(comments).filter(comment => comment.parentId === testID)
  console.log('post: ', post)
  return {
    post, // TODO: Could use both API & Redux together!!!
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // use API to get post instead of mapStateToProps, because get comments count automatically!
    loadPost: (id) => PostsAPI.getPost(id),
    loadComments: (id) => dispatch(handleGettingComments(id)),
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
    voteComment: (id, option) => dispatch(handleVotingComment(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
