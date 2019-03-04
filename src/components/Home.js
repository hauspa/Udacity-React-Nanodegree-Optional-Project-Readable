import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Post from './Post'

class Home extends Component {

  sortPosts = () => {
    const { posts } = this.props
    // TODO: sort by date & voteScore
    return Object.values(posts).sort((a,b) => b.voteScore - a.voteScore)
  }

  render() {
    let { categories } = this.props
    return (
      <div>
        <br></br>
        <h1 className='text-center'>Posts</h1>
        <Categories />





        <div className='row flex-column bg-warning align-items-center'>
          {
            this.sortPosts().map(post => (
              <Post post={post} />
            ))
          }
        </div>
        {/* TODO: add plus icon  */}
        <Link to='/posts/add'><button>Add New Post</button></Link>
      </div>
    )
  }
}

// TODO: load comments here too, for isLoading?
function mapStateToProps({ categories, posts }) {

  return {
    posts,
    isLoading: categories.length < 1 || posts.length < 1,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps)(Home)
