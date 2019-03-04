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
    // TODO: can only once once per session/post.
    votePost(post.id, option)
  }

  render(){
    const { post } = this.props
    return(
        <div className='row post'>
          <div className='col flex-1'>
            <Link to={`/posts/post/${post.id}`}>
              <div className='title'>{post.title}</div>
              <h5>by</h5>
              <h4>{post.author}</h4>
            </Link>
          </div>
          <div className='col voting'>
            <div className='row flex-column'>
              <button onClick={(e) => this.handlePostVote(e, 'upVote')} className='btn'><FiChevronUp /></button>
              <button onClick={(e) => this.handlePostVote(e, 'downVote')} className='btn'><FiChevronDown /></button>
              <div>{post.voteScore}</div>
            </div>
          </div>
        </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
