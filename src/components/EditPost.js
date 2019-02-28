import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import {
  handleEditingPost, handleAddingPost, handleDeletingPost,
} from '../actions/shared'
import uuidv1 from 'uuid/v1'

const testID = "8xf0y6ziyjabvozdd253nd"

class EditPost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
  }

  updateState = (post) => {
    this.setState(() => ({
      title: post.title,
      author: post.author,
      body: post.body,
      category: post.category,
    }))
  }

  componentDidMount = () => {
    const { getPost, inEditMode } = this.props

    // TODO: get param id from Router, to see whether edit or add mode.
    // TODO: then when it's edit mode, fire the API method with .then to update the state to fill in the form!
    // TODO: make sure there is no bug/error in console when using API, when the ID doesn't exist!
    // TODO: if possible, instead of using API, use Redux store

    if (inEditMode) {
      // if it's in edit mode, populate fields with the post data
      getPost(testID)
        .then((post) => this.updateState(post))
      // getPost('006')
      // .catch(() => console.log('No Post with this ID available -> Edit Mode.'))
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const targetValue  = e.target.value
    const updatedField = e.target.id

    this.setState((prevState) => ({
      ...prevState,
      [updatedField]: targetValue
    }))
  }

  handleClick = (e) => {
    e.preventDefault()
    const { title, author, body, category } = this.state
    const { inEditMode, editPost, addPost } = this.props

    let newPost = {
      author,
      title,
      body,
      category,
    }
    console.log('Created/Edited Post: ', newPost)

    if (inEditMode) {
      editPost(testID, newPost)
    }
    else{ // = createPost method
      newPost = {
        ...newPost,
        id: uuidv1(),
        timestamp: Date.now(),
      }
      addPost(newPost)
    }
  }

  clickedDelete = (e) => {
    e.preventDefault()
    this.props.deletePost(testID)
  }

  log = () => {
    console.log('EDITED POST DUDE: ', this.props.post)
  }

  render(){
    const { inEditMode } = this.props
    const { title, author, body, category } = this.state
    const pageText = inEditMode ? 'Edit Post' : 'Add Post'

    return (
      <div>
        <h2>{pageText}</h2>
        <form>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="author">Author</label>
              <input type="text" className="form-control" id="author" placeholder="Author" value={author} onChange={this.handleChange} />
            </div>
          </div>

          <br></br>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Title" value={title} onChange={this.handleChange} />
          </div>

          <br></br>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input type="text" className="form-control" id="body" placeholder="Body" value={body} onChange={this.handleChange} />
          </div>

          <br></br>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" className="form-control" id="category" placeholder="Category" value={category} onChange={this.handleChange} />
          </div>

          <br></br>


          <div className='row'>
            <button
              type="submit"
              className="btn btn-primary btn-lg mx-auto"
              disabled={ author === '' || title === '' || body === '' || category === '' }
              onClick={this.handleClick}>
                {pageText}
            </button>
          </div>
        </form>
        <br></br>
        <button onClick={this.log}>LOG EDITED POST</button>
        <br></br>
        <br></br>
        {
          inEditMode
            ? <button onClick={this.clickedDelete}>Delete Post</button>
            : null
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    // TODO: get from URL param whether /posts/add or /posts/:id/edit
    inEditMode: false
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => PostsAPI.getPost(id),
    editPost: (id, editedPost) => dispatch(handleEditingPost(id, editedPost)),
    addPost: (newPost) => dispatch(handleAddingPost(newPost)),
    deletePost: (id) => dispatch(handleDeletingPost(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
