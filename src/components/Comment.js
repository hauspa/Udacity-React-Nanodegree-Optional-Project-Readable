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
      // <div className='comment w-100 my-3'>
      //   <div className=''>
      //     <div className=' bg-success'>
      //       {comment.author} commented on {moment(comment.timestamp).format('MMM Do YYYY')}
      //     </div>
      //     <div className='row voting py-3'>
      //       <div className='col d-flex justify-content-end align-items-center'>
      //         <div>{comment.voteScore}</div>
      //       </div>
      //       <div className='col'>
      //         <div className='row flex-column align-items-start'>
      //           <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')} className='btn bg-warning'><FiChevronUp /></button>
      //           <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')} className='btn bg-warning'><FiChevronDown /></button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className='flex-column'>
      //     <div className='py-3'>{comment.body}</div>
      //     <button onClick={onClickingEdit} type='button' className='btn bg-link'>Edit Comment</button>
      //   </div>
      // </div>
      <div className='comment row py-3'>
        <div className='col-11 bg-primary'>
          <div className='bg-secondary'>
            {comment.author} commented on {moment(comment.timestamp).format('MMM Do YYYY')}
          </div>
          <div className='bg-danger py-4'>
            {comment.body}
          </div>
          <div>
            <button onClick={onClickingEdit} type='button' className='btn bg-link'>Edit Comment</button>
          </div>
        </div>
        <div className='col-1 bg-success'>
          <div className='row voting py-3'>
            <div className='col'>
              <div className='row flex-column justify-content-center align-items-center'>
                <button onClick={(e) => this.handleCommentVote(e, comment.id, 'upVote')} className='btn bg-warning'><FiChevronUp /></button>
                <button onClick={(e) => this.handleCommentVote(e, comment.id, 'downVote')} className='btn bg-warning'><FiChevronDown /></button>
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
