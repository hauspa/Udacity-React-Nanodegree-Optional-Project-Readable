import React, { Component } from 'react'
import { connect } from 'react-redux'

class EditPost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
  }

  componentDidMount = () => {
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

  handleChange = (e) => {
    // e.preventDefault()

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
    const { inEditMode } = this.props
    let { title, author, body, category } = this.state
    console.log('Title in EditMode: ', title)
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
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  const id = '8xf0y6ziyjabvozdd253nd'
  const filteredPosts = Object.values(posts).filter(post => post.id === id)
  console.log('POSTS: ', posts)
  console.log('filtered posts: ', filteredPosts)

  return {
    post: filteredPosts[0],
    inEditMode: filteredPosts.length > 0 ? true : false
  }
}

export default connect(mapStateToProps)(EditPost)
