import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash/string'
import { path_home, setPathCategory } from '../utils/paths'

// class Categories extends Component {
const Categories = (props) => {
  const { categories, activeCategory } = props
  return(
    <div className='row justify-content-center my-2 categories'>
      <ul className="nav nav-pills nav-fill">
        {
          categories.map(category => (
            <li key={category.path} className="nav-item px-4">
              {/* if already active, then go back home to include all categories! */}
              <Link to={isActive(category, activeCategory) ? path_home : setPathCategory(category.path)} className={"nav-link " + (isActive(category, activeCategory) ? "active" : "")}>
                {_.capitalize(category.name)}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const isActive = (category, activeCategory) => {
  return activeCategory === category.name
}


function mapStateToProps({ categories }, { match }) {
  return {
    categories,
    activeCategory: match.params.category,
  }
}

// need withRouter to use match prop
export default withRouter(connect(mapStateToProps)(Categories))
