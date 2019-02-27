import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'

const testID = "8xf0y6ziyjabvozdd253nd"

class EditPost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
  }

  updateState = () => {
    const { post, inEditMode } = this.props
    // if it's in edit mode, populate fields with the post data
    if (inEditMode) {
      this.setState(() => ({
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category,
      }))
    }
  }

  componentDidMount = () => {
    const { getPost } = this.props

    // let promise = new Promise(resolve, reject) {
    //
    // }

    // TODO: get param id from Router, to see whether edit or add mode.
    // TODO: then when it's edit mode, fire the API method with .then to update the state to fill in the form!
    // TODO: make sure there is no bug/error in console when using API, when the ID doesn't exist!

    getPost(testID)
    // getPost('006')
      .then(() => this.updateState())
      .catch(() => console.log('No Post with this ID available -> Edit Mode.'))
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

  handleClick = () => {
    const { title, author, body, category } = this.state

    const newPost = {
      title,
      author,
      body,
      category,
    }
    console.log('Created/Edited Post: ', newPost)
  }

  render(){
    const { post, inEditMode, isLoading } = this.props
    const { title, author, body, category } = this.state
    const pageText = inEditMode ? 'Edit Post' : 'Add Post'

    return (
      <div>
        {
          // isLoading
          post === undefined
            ? null
            : (
              <div>
                <h2>{pageText}</h2>
                <p>Title: {post.title}</p>
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
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  const filteredPosts = Object.values(posts).filter(post => post.id === testID)
  console.log('POSTSS: ', posts)
  const hello = Object.values(posts).includes(testID)

  return {
    isLoading: filteredPosts.length < 1,
    post: filteredPosts[0],
    inEditMode: filteredPosts.length > 0 ? true : false
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => PostsAPI.getPost(id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
