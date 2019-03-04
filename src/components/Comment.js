import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleVotingComment } from '../actions/shared'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
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
      <div className='comment w-100 my-3'>
        <div className=''>
          <div className='bg-success'>
            {comment.author} commented on {moment(comment.timestamp).format('MMM Do YYYY')}
          </div>
          <div className='voting'>
            <div className='row flex-column'>
              <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')} className='btn'><FiChevronUp /></button>
              <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')} className='btn'><FiChevronDown /></button>
              <div>{comment.voteScore}</div>
            </div>
          </div>
        </div>
        <div className='flex-column'>
          <div className='py-3'>{comment.body}</div>
          <button onClick={onClickingEdit} type='button' className='btn bg-link'>Edit Comment</button>
        </div>
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
