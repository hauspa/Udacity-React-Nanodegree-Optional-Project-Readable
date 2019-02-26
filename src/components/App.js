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

    
  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
