import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import EditComment from './EditComment'

class CommentSwitch extends Component {

  state = {
    isDisplayMode: true,
  }

  changeMode = () => {
    console.log('Changing Mode to Edit/Display Mode')
    this.setState((prevState) => ({
      // ...prevState,
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
            ? <Comment comment={comment} onClickingEdit={this.changeMode} />
            : <EditComment onClickingEdit={this.changeMode} id={comment.id} parent={comment.parentId} />
        }
      </div>
    )
  }
}

CommentSwitch.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentSwitch
