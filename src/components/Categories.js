import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash/string'

class Categories extends Component {

  render(){
    const { categories, activeCategory } = this.props
    return(
      <div className='row justify-content-center my-2 categories'>
        <ul className="nav nav-pills nav-fill">
          {
            categories.map(category => (
              <li key={category.path} className="nav-item px-4">
                <Link to={`/${category.path}`} className={"nav-link " + (activeCategory === category.name ? "active" : "")}>
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
  onClickingCategory: PropTypes.func,
  activeCategory: PropTypes.string,
}

function mapStateToProps({ categories }, { match }) {
  return {
    categories,
    activeCategory: match.params.category,
  }
}

export default withRouter(connect(mapStateToProps)(Categories))
