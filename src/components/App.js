import React, { Component } from 'react'
import '../App.css'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'

class App extends Component {

  componentDidMount = () => {

    // TESTING API!
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

    CommentsAPI.addComment(newComment)
      .then(response => console.log('Response Add Comments: ', response))

    CommentsAPI.getComment(commentID)
      .then(response => console.log('Response Get Single Comment: ', response))

    CommentsAPI.voteComment(commentID, voteOption)
      .then(response => console.log('Response Vote Comment: ', response))

  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
