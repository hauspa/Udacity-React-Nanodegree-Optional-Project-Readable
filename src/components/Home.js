import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {

  log = () => {
    const { posts } = this.props
    console.log('LOG: ', Object.values(posts))

  }

  render() {
    let { categories, posts } = this.props
    return (
      <div>
        <p>Categories</p>
        <div>
          {
            categories.map(category => (
              <div key={category.path}>{category.name}</div>
            ))
          }
        </div>
        <br></br>
        <p>Posts</p>
        <div>
          {
            Object.values(posts).map(post => (
              <div key={post.id}>{post.title}</div>
            ))
          }
        </div>
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

  }
}

export default connect(mapStateToProps)(Home)
