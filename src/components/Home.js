import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    let { categories, posts } = this.props
    return (
      <div>
        <p>Categories</p>
        <div>
          {
            categories.map(category => (
              <Link to={`/posts/category/${category.name}`} key={category.path}><div>{category.name}</div></Link>
            ))
          }
        </div>
        <br></br>
        <p>Posts</p>
        {/* TODO: add plus icon  */}
        <Link to='/posts/add'><button>Add New Post</button></Link>
        <br></br>
        <br></br>
        <div>
          {
            Object.values(posts).map(post => (
              <Link to={`/posts/post/${post.id}`} key={post.id}><div>{post.title}</div></Link>
            ))
          }
        </div>
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
