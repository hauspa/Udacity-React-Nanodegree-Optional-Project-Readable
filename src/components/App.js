import React, { Component } from 'react'
import '../App.css'
import { getHelp, getCategories } from '../utils/api'


class App extends Component {

  componentDidMount = () => {

    getHelp()
      .then(response => console.log('Response Help: ', response))

    getCategories()
      .then(response => console.log('Response Categories: ', response))
  }

  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
