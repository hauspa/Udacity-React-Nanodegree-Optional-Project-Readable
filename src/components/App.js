import React, { Component } from 'react'
import '../App.css'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'
import { connect } from 'react-redux'

import { getAllCategories } from '../actions/categories'
import { getAllPosts } from '../actions/posts'
import { handleInitialData } from '../actions/shared'

class App extends Component {

  componentDidMount = () => {
    // TESTING API!
    // this.testAPI()

    this.props.getInitialData()
  }

  testAPI = () => {
    const testID = "8xf0y6ziyjabvozdd253nd"
    const voteOption = "upVote"
    const commentID = "894tuq4ut84ut8v4t8wun89g"

    CategoriesAPI()
      .then(response => console.log('Response Categories: ', response))

    PostsAPI.getAllPosts()
      .then(response => console.log('Response Posts: ', response))

    PostsAPI.getPostsForCategory('redux')
      .then(response => console.log('Response Posts for Category: ', response))

    PostsAPI.getPost(testID)
      .then(response => console.log('Response Single Post: ', response))

    let newPost = {
      id: '007',
      timestamp: Date.now(),
      title: 'New Post Title',
      body: 'New Post Body dude',
      author: 'Michael Scarn',
      category: 'redux'
    }

    PostsAPI.addPost(newPost)
      .then(response => console.log('Response Add Post: ', response))

    PostsAPI.votePost(testID, voteOption)
      .then(response => console.log('Response Vote Post: ', response))

    PostsAPI.editPost(testID, 'BETTER TITLE', 'BETTER BODY for this post, mofo!')
      .then(response => console.log('Response Edit Post: ', response))

    // PostsAPI.deletePost('007')
    //   .then(response => console.log('Response Delete Post: ', response))


    //Comments
    CommentsAPI.getCommentsForPost(testID)
      .then(response => console.log('Response Get Comments: ', response))

    const newComment = {
      id: '008',
      timestamp: Date.now(),
      body: "Yo, I'm a comment, dude!",
      author: 'Michael Scarn',
      parentId: testID,
    }

    // CommentsAPI.addComment(newComment)
    //   .then(response => console.log('Response Add Comments: ', response))

    CommentsAPI.getComment(commentID)
      .then(response => console.log('Response Get Single Comment: ', response))

    CommentsAPI.voteComment(commentID, voteOption)
      .then(response => console.log('Response Vote Comment: ', response))

    CommentsAPI.editComment(commentID, Date.now(), 'YOOO NEW COMMENT, DUDE')
      .then(response => console.log('Response Edit Comment: ', response))

    CommentsAPI.deleteComment('008')
      .then(response => console.log('Response Delete Comment: ', response))
  }

  log = () => {
    console.log('LOG: ', Object.values(this.props.posts))
  }

  render() {
    let { categories, posts, isLoading } = this.props
    console.log('RENDER CATEGORIES: ', categories)
    console.log('isLoading: ', isLoading)
    return (
      <div>
        <p>App</p>
        <p>Categories</p>
        {
          isLoading
            ? <p>Still loading data...</p>
            : categories.map(category => (
              <div key={category.path}>{category.name}</div>
            ))
        }
        <br></br>
        <p>Posts</p>
        {
          isLoading
            ? <p>Still loading data...</p>
            : Object.values(posts).map(post => (
              <div key={post.id}>{post.title}</div>
            ))
        }
        <button onClick={this.log}>Log Categories</button>
      </div>
    )
  }
}


function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts,
    isLoading: categories.length < 1 || posts.length < 1,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
