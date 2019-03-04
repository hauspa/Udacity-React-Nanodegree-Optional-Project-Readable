import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import {
  handleVotingPost,
} from '../actions/shared'
import Comments from './Comments'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

class PostPage extends Component {

  componentDidMount = () => {
    const { loadPost, loadComments } = this.props

    // TODO: maybe still use API with Redux??
    // loadPost(testID)
    //   .then((post) => this.setState((prevState) => ({
    //     ...prevState,
    //     post
    //   })))
  }

  handlePostVote = (e, vote) => {
    const { votePost, id } = this.props
    e.preventDefault()
    // TODO: can only once once per session/post.
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
              <div className='postPage'>
                <div className='bg-success'>
                  <div className='title'>{post.title || 'Title'}</div>
                  <div className='category'>{post.category || 'Category'}</div>
                  <div className='details'>by {post.author || 'Author'} on {moment(post.timestamp).format('MMM Do YYYY') || 'Date'}</div>
                  <div className='row voting py-3'>
                    <div className='col d-flex justify-content-end align-items-center'>
                      <div>{post.voteScore}</div>
                    </div>
                    <div className='col'>
                      <div className='row flex-column align-items-start'>
                        <button onClick={(e) => this.handlePostVote(e, 'upVote')} className='btn bg-warning'><FiChevronUp /></button>
                        <button onClick={(e) => this.handlePostVote(e, 'downVote')} className='btn bg-warning'><FiChevronDown /></button>
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

                <h3>{post.commentCount} comments</h3>
                <Comments id={id} />
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
  console.log('post: ', post)
  return {
    post, // TODO: Could use both API & Redux together!!!
    id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // use API to get post instead of mapStateToProps, because get comments count automatically!
    loadPost: (id) => PostsAPI.getPost(id),
    votePost: (id, option) => dispatch(handleVotingPost(id, option)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
