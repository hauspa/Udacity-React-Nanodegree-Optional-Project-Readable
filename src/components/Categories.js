import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Categories extends Component {

  state = {
    activeCategory: '',
  }

  setCategory = (e) => {
    const category = e.target.name
    this.setState(() => ({
      activeCategory: category
    }))
    console.log('Category: ', category)
  }

  render(){
    const { categories } = this.props
    return(
      <ul className="nav nav-pills nav-fill">
        {
          categories.map(category => (
            <li key={category.path} name='WTF' className="nav-item" onClick={this.setCategory}>
              <Link name='dude' to={`/posts/category/${category.name}`} className="nav-link active">
                <div>{category.name}</div>
              </Link>
            </li>
          ))
        }
      </ul>
    )
  }
}

Categories.propTypes = {

}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

export default connect(mapStateToProps)(Categories)
