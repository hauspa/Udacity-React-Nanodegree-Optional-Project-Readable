import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Post from './Post'

class Home extends Component {

  state = {
    sortByVote: true,
    activeCategory: '',
  }

  setCategory = (e, category) => {
    this.setState((prevState) => ({
      ...prevState,
      // if category is already active, then set to null again!
      activeCategory: prevState.activeCategory === category ? '' : category
    }))
  }

  changeSorting = (byVote) => {
    this.setState((prevState) => ({
      ...prevState,
      sortByVote: byVote
    }))
  }

  sortPosts = () => {
    const { posts } = this.props
    const { sortByVote, activeCategory } = this.state
    let postsArray = Object.values(posts)
    if (activeCategory !== '') {
      // show only posts for active category
      postsArray = postsArray.filter(post => post.category === activeCategory)
    }
    // sort by votescore or date
    return sortByVote
      ? postsArray.sort((a,b) => b.voteScore - a.voteScore)
      : postsArray.sort((a,b) => b.timestamp - a.timestamp)
  }

  render() {
    const { categories } = this.props
    const { sortByVote, activeCategory } = this.state
    const sortedPosts = this.sortPosts()
    return (
      <div>
        <h1 className='text-center my-2'>Readable</h1>
        <Categories onClickingCategory={this.setCategory} activeCategory={activeCategory} />

        <div className='row py-2 justify-content-center'>
          <nav className='d-flex align-items-center'>
            <ul className="pagination bg-primary">
              <li className={"page-item " + (sortByVote ? 'active' : '')} onClick={() => this.changeSorting(true)}><button className="page-link">Vote Score</button></li>
              <li className={"page-item " + (sortByVote ? '' : 'active')} onClick={() => this.changeSorting(false)}><button className="page-link">Date</button></li>
            </ul>
          </nav>
        </div>

        <div className='row d-flex justify-content-center my-1'>
          <Link to='/posts/add' className='addButton bg-primary text-center p-3'>
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
