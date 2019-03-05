import React, { Component } from 'react'
import '../App.css'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

// Styling
import 'bootstrap/dist/css/bootstrap.css'
import '../style/style.css'

// Components
import Home from './Home'
import PostsByCategory from './PostsByCategory'
import EditPost from './EditPost'
import PostPage from './PostPage'
import ErrorPage from './ErrorPage'

import {
  handleInitialData,
} from '../actions/shared'

// save as property, so that when changing URL anytime, there's no problem!
const prefixForPosts = '/posts/post/'

class App extends Component {

  componentDidMount = () => {
    this.props.getInitialData()
  }

  render() {
    let { isLoading, isValidCategory, isValidPost } = this.props
    return (
      <div>
        {
          isLoading
            ? null
            : (
              <Switch>
                <Route exact path='/' component={Home} />
                {
                  // check whether Category exists
                  isValidCategory &&
                    <Route exact path='/:category' component={Home} />
                }
                <Route path={`${prefixForPosts}:id/edit`} component={EditPost} />
                <Route path={`/posts/add`} component={EditPost} />
                {
                  // before going to a page with id, check whether exists
                  isValidCategory && isValidPost &&
                    <Route path={`/:category/:id`} component={PostPage} />
                }
                <Route component={ErrorPage} />
              </Switch>
            )
        }
      </div>
    )
  }
}

// TODO: add comments in mapStateToProps as well? in case directly access post page?
function mapStateToProps({ categories, posts }, { location }) {
  // match is only in props when component is passed on via <Route>, so gotta use location & withRouter!
  const afterFirstSlash = location.pathname.substring('/'.length)
  const secondSlash = afterFirstSlash.indexOf('/')
  const paramCategory = afterFirstSlash.includes('/') ? afterFirstSlash.substring(0, secondSlash) : afterFirstSlash
  const paramId = afterFirstSlash.substring((secondSlash + 1))

  return {
    isLoading: categories.length < 1 || posts.length < 1,
    isValidCategory: categories.some(category => category.name === paramCategory),
    isValidPost: Object.keys(posts).includes(paramId),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
