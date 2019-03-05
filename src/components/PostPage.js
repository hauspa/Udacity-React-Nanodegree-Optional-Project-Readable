import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  handleVotingPost,
} from '../actions/shared'
import Comments from './Comments'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

class PostPage extends Component {

  handlePostVote = (e, vote) => {
    const { votePost, id } = this.props
    e.preventDefault()
    votePost(id, vote)
  }

  render(){
    const { comments, post, id } = this.props
    return (
      <div>
        {
          post === undefined
            ? null
            : (
              <div>
                <Link to='/' className='logo text-center my-4'><h1>Readable</h1></Link>
                <div className='postPage'>
                  <div className='bg-primary header'>
                    <div className='title'>{post.title || 'Title'}</div>
                    <div className='category'>{post.category || 'Category'}</div>
                    <div className='details'>by {post.author || 'Author'} on {moment(post.timestamp).format('MMM Do YYYY') || 'Date'}</div>
                    <div className='row voting py-3'>
                      <div className='col d-flex justify-content-end align-items-center'>
                        <div>{post.voteScore}</div>
                      </div>
                      <div className='col'>
                        <div className='row flex-column align-items-start'>
                          <button onClick={(e) => this.handlePostVote(e, 'upVote')} className='btn bg-light'><FiChevronUp /></button>
                          <button onClick={(e) => this.handlePostVote(e, 'downVote')} className='btn bg-light mt-1'><FiChevronDown /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='body pt-5 pb-2'>{post.body}</div>

                  <Link to={`/posts/post/${id}/edit`}>
                    <button type='button' className='btn btn-link'>Edit this Post</button>
                  </Link>
                  <br></br>
                  <br></br>
                  <br></br>

                  <Comments id={id} />
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }, { match }) {
  const id = match.params.id
  const post = Object.values(posts).filter(post => post.id === id)[0] // grab first object, since filter() returns an array
  return {
    post,
    id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // use API to get post instead of mapStateToProps, because get comments count automatically!
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
