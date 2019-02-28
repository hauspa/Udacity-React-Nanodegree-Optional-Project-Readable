import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CommentsAPI from '../utils/api/comments'
import {
  handleEditingComment,
} from '../actions/shared'

const commentID = "894tuq4ut84ut8v4t8wun89g"

class EditComment extends Component {

  state = {
    body: '',
    author: '',
  }

  componentDidMount = () => {
    const { loadComment } = this.props
    loadComment(commentID)
      .then((comment) => this.updateState(comment))
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
    const { inEditMode, editComment, } = this.props

    let newComment = {
      author,
      body,
      timestamp: Date.now(),
    }

    editComment(commentID, newComment)

    // if (inEditMode) {
    //   editPost(testID, newPost)
    // }
    // else{ // = createPost method
    //   newPost = {
    //     ...newPost,
    //     id: uuidv1(),
    //     timestamp: Date.now(),
    //   }
    //   addPost(newPost)
    // }
  }

  render(){
    const { body, author } = this.state
    return (
      <div>
        <form>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="comment">Comment</label>
              <input type="text" className="form-control" id="comment" placeholder="Enter Comment" value={body} onChange={this.handleChange} />
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
                Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    // TODO: determine whether edit or add mode via url param id
    // inEditMode: false
    // comment:
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: (id) => CommentsAPI.getComment(id),
    editComment: (id, comment) => dispatch(handleEditingComment(id, comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
