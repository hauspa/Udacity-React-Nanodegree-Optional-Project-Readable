import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import EditComment from './EditComment'

class CommentSwitch extends Component {

  state = {
    isDisplayMode: true,
  }

  switchMode = () => {
    this.setState((prevState) => ({
      isDisplayMode: !prevState.isDisplayMode
    }))
  }

  render(){
    const { isDisplayMode } = this.state
    const { comment } = this.props
    return (
      <div>
        {
          isDisplayMode
            ? <Comment comment={comment} onClickingEdit={this.switchMode} />
            : <EditComment onClickingEdit={this.switchMode} id={comment.id} parent={comment.parentId} inEditMode={true} />
        }
      </div>
    )
  }
}

CommentSwitch.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentSwitch
