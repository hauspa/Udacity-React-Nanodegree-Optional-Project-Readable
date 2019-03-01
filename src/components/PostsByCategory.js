import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api/posts'

class PostsByCategory extends Component {

  state = {
    posts: [],
    isLoaded: false,
  }

  componentDidMount = () => {
    const { getPosts, category } = this.props

    getPosts(category)
      .then((filteredPosts) => this.setState({ posts: filteredPosts, isLoaded: true }))
  }

  render() {
    let { posts, isLoaded } = this.state
    return (
      <div>
        <p>Category</p>
        {
          isLoaded
            ? posts.length > 0
              ? (
                posts.map(post => (
                  <div key={post.id}>
                    <p>{post.title}</p>
                    <p>By {post.author}</p>
                  </div>
                ))
              )
              : <div>There are no posts under this category</div>
            : <div>Still loading data...</div>
        }
      </div>
    )
  }
}


function mapStateToProps(state, { match }) {
  return {
    category: match.params.category,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (category) => PostsAPI.getPostsForCategory(category), // don't need Redux for just getting an item, as that would modify the store!
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsByCategory)
