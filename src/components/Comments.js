import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  handleGettingComments,
  handleVotingComment,
} from '../actions/shared'
import EditComment from './EditComment'

const testID = "8xf0y6ziyjabvozdd253nd"


class Comments extends Component {

  componentDidMount = () => {
    const { loadComments } = this.props
    loadComments(testID)
  }

  handleCommentVote = (e, id, vote) => {
    e.preventDefault()
    // TODO: can only once once per session/comment.
    this.props.voteComment(id, vote)
  }

  render(){
    const { comments } = this.props
    return (
      <div>
        {
          comments.length === 0
            ? <p>No Comments for this Post</p>
            : (
              <div>
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

                <br></br>
                
                <EditComment />

                <br></br>
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: (id) => dispatch(handleGettingComments(id)),
    voteComment: (id, option) => dispatch(handleVotingComment(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
