import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGettingComments } from '../actions/shared'
import CommentSwitch from './CommentSwitch'
import EditComment from './EditComment'

const testID = "8xf0y6ziyjabvozdd253nd"


class Comments extends Component {

  state = {
    isAddMode: false,
  }

  componentDidMount = () => {
    const { loadComments } = this.props
    loadComments(testID)
  }

  showNewCommentInput = () => {
    this.setState((prevState) => ({
      isAddMode: !prevState.isAddMode
    }))
  }

  render(){
    const { comments } = this.props
    const { isAddMode } = this.state
    return (
      <div>
        {
          comments.length === 0
            ? <p>No Comments for this Post</p>
            : (
              <div>
                {
                  Object.values(comments).map(comment => (
                    <CommentSwitch comment={comment} key={comment.id} />
                  ))
                }
                <br></br>

                {
                  isAddMode
                    ? <EditComment  />
                    : <button onClick={this.showNewCommentInput}>Add Comment</button>
                }

                <br></br>
              </div>
            )
        }
      </div>
    )
  }
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
