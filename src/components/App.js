import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import {
  path_home, path_category,
  path_editPost, path_addPost, path_detailPost,
} from '../utils/paths'

// Components
import Home from './Home'
import EditPost from './EditPost'
import PostPage from './PostPage'
import ErrorPage from './ErrorPage'

// Styling
import 'bootstrap/dist/css/bootstrap.css'
import '../style/style.css'


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
                <Route exact path={path_home} component={Home} />
                {
                  // check whether Category exists
                  isValidCategory &&
                    <Route exact path={path_category} component={Home} />
                }
                <Route path={path_editPost} component={EditPost} />
                <Route path={path_addPost} component={EditPost} />
                {
                  // before going to a page with id, check whether exists
                  isValidCategory && isValidPost &&
                    <Route path={path_detailPost} component={PostPage} />
                }
                <Route component={ErrorPage} />
              </Switch>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, comments }, { location }) {
  // match is only in props when component is passed on via <Route>, so gotta use location & withRouter!
  const afterFirstSlash = location.pathname.substring('/'.length)
  const secondSlash = afterFirstSlash.indexOf('/')
  const paramCategory = afterFirstSlash.includes('/') ? afterFirstSlash.substring(0, secondSlash) : afterFirstSlash
  const paramId = afterFirstSlash.substring((secondSlash + 1))

  return {
    isLoading: categories.length < 1 || posts.length < 1 || comments.length < 1,
    isValidCategory: categories.some(category => category.name === paramCategory),
    isValidPost: Object.keys(posts).includes(paramId),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData()),
  }
}

// need withRouter to use location prop
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
