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
      <div className='row justify-content-center'>
        <ul className="nav nav-pills nav-fill m">
          {
            categories.map(category => (
              <li key={category.path} name='WTF' className="nav-item" onClick={this.setCategory}>
                <Link to={`/posts/category/${category.name}`} className="nav-link active">
                  <div>{category.name}</div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
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
