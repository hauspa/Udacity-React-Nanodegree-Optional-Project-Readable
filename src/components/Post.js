import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { handleVotingPost } from '../actions/shared'

class Post extends Component {

  handlePostVote = (e, option) => {
    const { votePost, post } = this.props
    e.preventDefault()
    votePost(post.id, option)
  }

  displayCommentCount = (count) => {
    switch (true) {
      case count === 1:
        return `1 comment`
      case count === 0:
        return `No comments`
      default:
        return `${count} comments`
    }
  }

  render(){
    const { post } = this.props
    return(
        <div className='row post bg-primary'>
          <div className='col flex-1 d-flex align-items-center justify-content-center'>
            <Link to={`/${post.category}/${post.id}`}>
              <div className='title'>{post.title}</div>
              <h5>by</h5>
              <h4>{post.author}</h4>
              <h4 className='mt-5'>{this.displayCommentCount(post.commentCount)}</h4>
            </Link>
          </div>
          <div className='col voting d-flex justify-content-center align-items-end'>
            <div className='row flex-column'>
              <button onClick={(e) => this.handlePostVote(e, 'upVote')} className='btn btn-light'><FiChevronUp size={26} /></button>
              <button onClick={(e) => this.handlePostVote(e, 'downVote')} className='btn btn-light my-1'><FiChevronDown size={26} /></button>
              <div>{post.voteScore}</div>
              <Link to={`/posts/post/${post.id}/edit`} className='mt-5'>
                <button type='button' className='btn btn-link edit'>Edit</button>
              </Link>
            </div>
          </div>
        </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

function mapStateToProps() {return {}}

function mapDispatchToProps(dispatch){
  return {
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
