import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'
import {
  handleEditingPost, handleAddingPost, handleDeletingPost,
} from '../actions/shared'
import uuidv1 from 'uuid/v1'
import { Link } from 'react-router-dom'
import _ from 'lodash/string'

const testID = "8xf0y6ziyjabvozdd253nd"

class EditPost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
  }

  updateState = (post) => {
    const { categories } = this.props
    this.setState((prevState) => ({
      title: post.title,
      author: post.author,
      body: post.body,
      category: prevState.category === '' ? categories[0].name : post.category, // if it's still empty, means user just wants the first option!
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
    const headerText = inEditMode ? 'Edit Post' : 'Add Post'
    const pageText = inEditMode ? 'Save changes' : 'Add Post'
    const disabled = author === '' || title === '' || body === '' // don't check whether category

    return (
      <div>
        <h2 className='my-3 text-center'>{headerText}</h2>
        <form className='mx-4'>
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

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select value={category} onChange={this.handleChange} className="form-control" id="category">
              {
                categories.map(category => (
                  <option key={category.path} value={category.name}>{_.capitalize(category.name)}</option>
                ))
              }
            </select>
          </div>

          <br></br>


          <div className='row d-flex justify-content-end align-items-center'>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={disabled}
                onClick={this.handleClick}>
                  {
                    disabled
                      ? pageText
                      : (
                        <Link to={inEditMode ? `/posts/post/${id}` : `/`} className='save'>
                          {pageText}
                        </Link>
                      )
                  }
              </button>
            {
              inEditMode
                ? <Link to={`/posts/post/${id}`}><button type='button' className='btn btn-link'>Cancel</button></Link>
                : <Link to='/'><button type='button' className='btn btn-link'>Cancel</button></Link>
            }
            {
              inEditMode
                ? <button onClick={this.clickedDelete} type='button' className='btn btn-link delete'>Delete Post</button>
                : null
            }
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }, { match }) {
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
