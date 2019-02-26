import React, { Component } from 'react'
import '../App.css'
// import { getCategories, getAllPosts, getPostsForCategory } from '../utils/api'
import * as CategoriesAPI from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'

class App extends Component {

  componentDidMount = () => {

    CategoriesAPI.getCategories()
      .then(response => console.log('Response Categories: ', response))

    PostsAPI.getAllPosts()
      .then(response => console.log('Response Posts: ', response))

    PostsAPI.getPostsForCategory('redux')
      .then(response => console.log('Response Posts for Category: ', response))

    PostsAPI.getPost('8xf0y6ziyjabvozdd253nd')
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
  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
