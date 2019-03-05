import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleVotingComment } from '../actions/shared'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import * as moment from 'moment'

class Comment extends Component {

  handleCommentVote = (e, id, vote) => {
    e.preventDefault()
    this.props.voteComment(id, vote)
  }

  render(){
    const { comment, onClickingEdit } = this.props
    return (
      <div className='comment row my-3 border'>
        <div className='col-10'>
          <div className='pt-2'>
            {comment.author} commented on {moment(comment.timestamp).format('MMM Do YYYY')}
          </div>
          <div className='py-4 body'>
            {comment.body}
          </div>
          <div>
            <button onClick={onClickingEdit} type='button' className='btn bg-link'>Edit Comment</button>
          </div>
        </div>
        <div className='col-2'>
          <div className='row voting py-3'>
            <div className='col mr-2'>
              <div className='row flex-column justify-content-center align-items-center'>
                <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')} className='btn bg-light'><FiChevronUp size={26} /></button>
                <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')} className='btn bg-light my-1'><FiChevronDown size={26} /></button>
              </div>
              <div className='col d-flex justify-content-center align-items-center'>
                <div>{comment.voteScore}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onClickingEdit: PropTypes.func.isRequired,
}

function mapStateToProps() {return {}}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (id, option) => dispatch(handleVotingComment(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
