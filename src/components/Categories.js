import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash/string'

class Categories extends Component {

  render(){
    const { categories, activeCategory, onClickingCategory } = this.props
    return(
      <div className='row justify-content-center my-2 categories'>
        <ul className="nav nav-pills nav-fill">
          {
            categories.map(category => (
              <li key={category.path} className="nav-item px-4" onClick={(e)=> onClickingCategory(e, category.name)}>
                <Link to='' className={"nav-link " + (activeCategory === category.name ? "active" : "")}>
                  {_.capitalize(category.name)}
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
  onClickingCategory: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
}

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

export default connect(mapStateToProps)(Categories)
