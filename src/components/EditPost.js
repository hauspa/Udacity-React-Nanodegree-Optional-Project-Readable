import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import {
  handleEditingPost, handleAddingPost, handleDeletingPost,
} from '../actions/shared'
import uuidv1 from 'uuid/v1'
import { Link } from 'react-router-dom'

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
    const { getPost, inEditMode, id } = this.props

    // TODO: then when it's edit mode, fire the API method with .then to update the state to fill in the form!
    // TODO: make sure there is no bug/error in console when using API, when the ID doesn't exist!
    // TODO: if possible, instead of using API, use Redux store

    if (inEditMode) {
      // if it's in edit mode, populate fields with the post data
      getPost(id)
        .then((post) => this.updateState(post))
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
    const { inEditMode, editPost, addPost, id } = this.props

    let newPost = {
      author,
      title,
      body,
      category,
    }

    if (inEditMode) {
      editPost(id, newPost)
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
    const { deletePost, id } = this.props
    e.preventDefault()
    deletePost(id)
  }

  render(){
    const { inEditMode, id, categories } = this.props
    const { title, author, body, category } = this.state
    const pageText = inEditMode ? 'Save changes' : 'Add Post'

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
            <label htmlFor="body">Post</label>
            <textarea rows="3" className="form-control" id="body" placeholder="Write your post..." value={body} onChange={this.handleChange} />
          </div>

          <br></br>

          {/* <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" className="form-control" id="category" placeholder="Category" value={category} onChange={this.handleChange} />
          </div> */}

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select value={category} onChange={this.handleChange} className="form-control" id="category">
              {
                categories.map(category => (
                  <option key={category.path} value={category.name} >{category.name}</option>
                ))
              }
            </select>
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
            {
              inEditMode
                ? <Link to={`/posts/post/${id}`}><button>Cancel</button></Link>
                : <Link to='/'><button>Cancel</button></Link>
            }
          </div>
        </form>
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

function mapStateToProps({ posts, categories }, { match }) {
  console.log('MATCH edit: ', match)
  return {
    inEditMode: match.path.includes('edit'), // get from URL param whether /posts/add or /posts/:id/edit
    id: match.params.id,
    categories,
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
