import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash/string'
import { path_home, setPathCategory } from '../utils/paths'

class Categories extends Component {

  isActive = (category) => {
    const { activeCategory } = this.props
    return activeCategory === category.name
  }

  render(){
    const { categories } = this.props
    return(
      <div className='row justify-content-center my-2 categories'>
        <ul className="nav nav-pills nav-fill">
          {
            categories.map(category => (
              <li key={category.path} className="nav-item px-4">
                {/* if already active, then go back home to include all categories! */}
                <Link to={this.isActive(category) ? path_home : setPathCategory(category.path)} className={"nav-link " + (this.isActive(category) ? "active" : "")}>
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

function mapStateToProps({ categories }, { match }) {
  return {
    categories,
    activeCategory: match.params.category,
  }
}

// need withRouter to use match prop
export default withRouter(connect(mapStateToProps)(Categories))
