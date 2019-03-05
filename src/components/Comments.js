import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGettingComments } from '../actions/shared'
import CommentSwitch from './CommentSwitch'
import EditComment from './EditComment'
import PropTypes from 'prop-types'

class Comments extends Component {

  state = {
    isAddMode: false,
  }

  componentDidMount = () => {
    const { loadComments, id } = this.props
    loadComments(id)
  }

  showNewCommentInput = () => {
    this.setState((prevState) => ({
      isAddMode: !prevState.isAddMode
    }))
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
    const { postComments, id } = this.props
    const { isAddMode } = this.state
    const filteredComments = postComments.filter(comment => comment.deleted === false).sort((a, b) => a.timestamp - b.timestamp) // filter out the deleted comments
    return (
      <div>
        {
          filteredComments.length === 0
            ? (
              <div>
                <h3>No Comments for this Post</h3>
                {
                  isAddMode
                    ? (
                      <div className='comments mx-auto'>
                        <EditComment inEditMode={false} onClickingEdit={this.showNewCommentInput} parent={id} />
                      </div>
                    )
                    : <button onClick={this.showNewCommentInput} className='btn btn-lg btn-primary mb-3'>Add Comment</button>
                }
              </div>
            )
            : (
              <div className='comments mx-auto'>
                <h3>{this.displayCommentCount(filteredComments.length)}</h3>
                {
                  filteredComments.map(comment => (
                    <CommentSwitch comment={comment} key={comment.id} />
                  ))
                }
                <br></br>
                {
                  isAddMode
                    ? (
                      <div className='comments mx-auto'>
                        <EditComment inEditMode={false} onClickingEdit={this.showNewCommentInput} parent={id} />
                      </div>
                    )
                    : <button onClick={this.showNewCommentInput} className='btn btn-lg btn-primary mb-3'>Add Comment</button>
                }
                <br></br>
              </div>
            )
        }
      </div>
    )
  }
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
}

function mapStateToProps({ comments }, { id }) {
  console.log('ID: ', id)
  console.log('Comments: ', Object.values(comments))
  const onlyForThisPost = Object.values(comments).filter(comment => comment.parentId === id)
  console.log('Comments For this post: ', onlyForThisPost)
  return {
    postComments: onlyForThisPost,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: (id) => dispatch(handleGettingComments(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
