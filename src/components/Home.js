import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Post from './Post'
import { path_home, path_addPost } from '../utils/paths'

class Home extends Component {

  state = {
    sortByVote: true,
  }

  changeSorting = (byVote) => {
    this.setState((prevState) => ({
      ...prevState,
      sortByVote: byVote
    }))
  }

  sortPosts = () => {
    const { posts, category } = this.props
    const { sortByVote } = this.state
    let postsArray = Object.values(posts)
    if (category !== '') {
      // show only posts for active category
      postsArray = postsArray.filter(post => post.category === category)
    }
    // sort by votescore or date
    return sortByVote
      ? postsArray.sort((a,b) => b.voteScore - a.voteScore)
      : postsArray.sort((a,b) => b.timestamp - a.timestamp)
  }

  render() {
    const { sortByVote } = this.state
    const sortedPosts = this.sortPosts()
    return (
      <div>
        <Link to={path_home} className='logo'><h1 className='text-center my-2'>Readable</h1></Link>

        <Categories />

        <div className='row py-2 justify-content-center'>
          <nav className='d-flex align-items-center'>
            <ul className="pagination bg-primary">
              <li className={"page-item " + (sortByVote ? 'active' : '')} onClick={() => this.changeSorting(true)}><button className="page-link">Vote Score</button></li>
              <li className={"page-item " + (sortByVote ? '' : 'active')} onClick={() => this.changeSorting(false)}><button className="page-link">Date</button></li>
            </ul>
          </nav>
        </div>

        <div className='row d-flex justify-content-center my-1'>
          <Link to={path_addPost} className='addButton bg-primary text-center p-3'>
            Add new post
          </Link>
        </div>


        <div className='row flex-column align-items-center mb-4'>
          {
            sortedPosts.length > 0
              ? sortedPosts.map(post => (
                <Post post={post} key={post.id} />
              ))
              : <div className='my-3'>There are no posts under this category</div>
          }
        </div>
      </div>
    )
  }
}

// TODO: load comments here too, for isLoading?
function mapStateToProps({ categories, posts }, { match }) {
  const category = match.params.category
  return {
    posts,
    isLoading: categories.length < 1 || posts.length < 1,
    category: category === undefined ? '' : category
  }
}

export default connect(mapStateToProps)(Home)
