import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGettingComments } from '../actions/shared'
import CommentSwitch from './CommentSwitch'

const testID = "8xf0y6ziyjabvozdd253nd"


class Comments extends Component {

  state = {
    // showNewComment,
    isDisplayMode: true,
  }

  componentDidMount = () => {
    const { loadComments } = this.props
    loadComments(testID)
  }

  showNewComment = () => {

  }

  render(){
    const { comments } = this.props
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

                <button onClick={this.showNewComment}>Add Comment</button>

                <br></br>

                {/* <EditComment /> */}

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
