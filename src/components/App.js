import React, { Component } from 'react'
import '../App.css'
import { getCategories, getAllPosts } from '../utils/api'


class App extends Component {

  componentDidMount = () => {

    getCategories()
      .then(response => console.log('Response Categories: ', response))

    getAllPosts()
      .then(response => console.log('Response Posts: ', response))
  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
