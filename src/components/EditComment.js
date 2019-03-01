import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentsAPI from '../utils/api/comments'
import {
  handleEditingComment, handleAddingComment, handleDeletingComment
} from '../actions/shared'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'

// const testID = "8xf0y6ziyjabvozdd253nd"
// const commentID = "894tuq4ut84ut8v4t8wun89g"

class EditComment extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount = () => {
    const { loadComment, inEditMode, id } = this.props

    if (inEditMode) {
      loadComment(id)
      // loadComment('008')
      .then((comment) => this.updateState(comment))
    }
  }

  updateState = (comment) => {
    this.setState(() => ({
      author: comment.author,
      body: comment.body,
    }))
  }

  handleChange = (e) => {
    const targetValue  = e.target.value
    const updatedField = e.target.id

    this.setState((prevState) => ({
      ...prevState,
      [updatedField]: targetValue
    }))
  }

  handleClick = (e) => {
    e.preventDefault()
    const { body, author } = this.state
    const {
      inEditMode, editComment, addComment,
      onClickingEdit, id, parent,
    } = this.props

    let newComment = {
      author,
      body,
      timestamp: Date.now(),
    }

    if (inEditMode) {
      editComment(id, newComment)
        .then(() => onClickingEdit()) // go back to only displaying the comment
    }
    else{ // = createPost method
      newComment = {
        ...newComment,
        id: uuidv1(),
        parentId: parent,
      }
      addComment(newComment)
        .then(() => onClickingEdit()) // go back to only displaying the comment
    }
  }

  clickedDelete = (e) => {
    const { id } = this.props
    e.preventDefault()
    this.props.deleteComment(id)
  }

  render(){
    const { body, author } = this.state
    const { inEditMode } = this.props
    return (
      <div>
        <form>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="comment">Comment</label>
              <input type="text" className="form-control" id="body" placeholder="Enter Comment" value={body} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="author">Author</label>
              <input type="text" className="form-control" id="author" placeholder="Enter Author" value={author} onChange={this.handleChange} />
            </div>
          </div>

          <div className='row'>
            <button
              type="submit"
              className="btn btn-primary btn-lg mx-auto"
              disabled={ body === '' || author === '' }
              onClick={this.handleClick}>
                {
                  inEditMode ? 'Save changes' : 'Add Comment'
                }
            </button>
            {
              inEditMode
                ? <button onClick={this.clickedDelete}>Delete</button>
                : null
            }
          </div>
        </form>
      </div>
    )
  }
}

EditComment.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.string,
  onClickingEdit: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {
    // TODO: determine whether edit or add mode via url param id
    inEditMode: true,
    // commentID
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: (id) => CommentsAPI.getComment(id),
    editComment: (id, comment) => dispatch(handleEditingComment(id, comment)),
    addComment: (comment) => dispatch(handleAddingComment(comment)),
    deleteComment: (id) => dispatch(handleDeletingComment(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
