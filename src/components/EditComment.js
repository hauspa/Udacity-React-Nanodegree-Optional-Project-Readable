import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentsAPI from '../utils/api/comments'
import {
  handleEditingComment, handleAddingComment, handleDeletingComment
} from '../actions/shared'
import uuidv1 from 'uuid/v1'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class EditComment extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount = () => {
    const { loadComment, inEditMode, id } = this.props

    if (inEditMode) {
      loadComment(id)
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
    const { id, deleteComment, onClickingEdit } = this.props
    e.preventDefault()
    deleteComment(id)
    onClickingEdit()
  }

  clickedCancel = (e) => {
    const { onClickingEdit } = this.props
    e.preventDefault()
    onClickingEdit()
  }

  render(){
    const { body, author } = this.state
    const { inEditMode } = this.props
    return (
      <div className='mt-4 border p-2 comment'>
        <h4>{inEditMode ? 'Edit Comment' : 'Add Comment'}</h4>
        <form className='py-3'>
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

          <div className='row d-flex align-items-center justify-content-end pt-2 pb-3'>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={ body === '' || author === '' }
              onClick={this.handleClick}>
                {
                  inEditMode ? 'Save changes' : 'Add Comment'
                }
            </button>
            <button onClick={this.clickedCancel} className='btn btn-link'>Cancel</button>
            {
              inEditMode
                ? <button onClick={this.clickedDelete} className='btn btn-link delete'>Delete</button>
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
  inEditMode: PropTypes.bool.isRequired,
}

function mapStateToProps() {return {}}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: (id) => CommentsAPI.getComment(id),
    editComment: (id, comment) => dispatch(handleEditingComment(id, comment)),
    addComment: (comment) => dispatch(handleAddingComment(comment)),
    deleteComment: (id) => dispatch(handleDeletingComment(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
