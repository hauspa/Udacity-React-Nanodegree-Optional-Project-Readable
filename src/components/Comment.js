import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleVotingComment } from '../actions/shared'
import * as moment from 'moment'

class Comment extends Component {

  handleCommentVote = (e, id, vote) => {
    e.preventDefault()
    // TODO: can only once once per session/comment.
    this.props.voteComment(id, vote)
  }

  render(){
    const { comment, onClickingEdit } = this.props
    return (
      <div>
         <div>Author: {comment.author}</div>
         <div>Body: {comment.body}</div>
         <div>commented on {moment(comment.timestamp).format('MMM Do YYYY')}</div>
         <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')}>Vote Up</button>
         <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')}>Vote Down</button>
         <div>Vote Score: {comment.voteScore}</div>
         <button onClick={onClickingEdit}>Edit</button>
         <br></br>
         <br></br>
         <br></br>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onClickingEdit: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (id, option) => dispatch(handleVotingComment(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
