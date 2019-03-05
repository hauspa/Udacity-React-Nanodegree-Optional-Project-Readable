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

  render(){
    const { comments } = this.props
    const { isAddMode } = this.state
    console.log('Comments: ', comments)
    const filteredComments = Object.values(comments).filter(comment => comment.deleted === false) // filter out the deleted comments
    return (
      <div>
        {
          filteredComments.length === 0
            ? <p>No Comments for this Post</p>
            : (
              <div className='comments mx-auto'>
                <h3>{filteredComments.length} comments</h3>
                {
                  filteredComments.map(comment => (
                    <CommentSwitch comment={comment} key={comment.id} />
                  ))
                }
                <br></br>

                {
                  isAddMode
                    ? <EditComment inEditMode={false} onClickingEdit={this.showNewCommentInput} />
                    : <button onClick={this.showNewCommentInput} className='btn btn-lg btn-success'>Add Comment</button>
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

function mapStateToProps({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: (id) => dispatch(handleGettingComments(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
