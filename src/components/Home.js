import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Post from './Post'
import { IoIosAddCircleOutline } from 'react-icons/io'

class Home extends Component {

  state = {
    sortByVote: true,
    activeCategory: '',
  }

  setCategory = (e, category) => {
    console.log('Setting active category: ', category)
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
    return (
      <div>
        <br></br>
        <h1 className='text-center'>Readable</h1>
        <Categories onClickingCategory={this.setCategory} activeCategory={activeCategory} />

        <div className='row dude justify-content-center align-items-center'>
          <nav>
            <ul className="pagination justify-content-center">
              <li className={"page-item " + (sortByVote ? 'active' : '')} onClick={() => this.changeSorting(true)}><button className="page-link">Vote Score</button></li>
              <li className={"page-item " + (sortByVote ? '' : 'active')} onClick={() => this.changeSorting(false)}><button className="page-link">Date</button></li>
            </ul>
          </nav>
        </div>

        <div className='row wtf justify-content-center'>
          <div className='flex-column'>
            <Link to='/posts/add' className='bg-warning d-flex justify-content-center'><IoIosAddCircleOutline /></Link>
            <div className='bg-danger'>Add new post</div>
          </div>
        </div>


        <div className='row flex-column bg-warning align-items-center'>
          {
            this.sortPosts().map(post => (
              <Post post={post} />
            ))
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
