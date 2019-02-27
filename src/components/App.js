import React, { Component } from 'react'
import '../App.css'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'
import { connect } from 'react-redux'

// Components
import Home from './Home'
import PostsByCategory from './PostsByCategory'
import EditPost from './EditPost'
import PostDetail from './PostDetail'

import {
  handleInitialData,
} from '../actions/shared'


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

  render() {
    let { isLoading, categories, posts } = this.props
    return (
      <div>
        {
          isLoading
            ? null
            : (
              // <Home />
              // <PostsByCategory />
              // <EditPost />
              <PostDetail />
            )
        }
      </div>
    )
  }
}


function mapStateToProps({ categories, posts }) {
  return {
    isLoading: categories.length < 1 || posts.length < 1,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
