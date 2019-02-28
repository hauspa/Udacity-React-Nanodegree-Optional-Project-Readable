import { getAllCategories } from './categories'
import {
  getAllPosts
} from './posts'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'
import { getCommentsForPost } from '../actions/comments'

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([
      CategoriesAPI(),
      PostsAPI.getAllPosts(),
    ]).then(([categories, posts]) => ({
        categories,
        posts,
      }))
      .then(({ categories, posts }) => {
          dispatch(getAllCategories(categories))
          dispatch(getAllPosts(posts))
      })
  }
}

export function handleGettingComments(id) {
  return (dispatch) => {
    return CommentsAPI.getCommentsForPost(id)
      // .then((comments) => console.log('SHARED: ', comments))
      .then((comments) => dispatch(getCommentsForPost(comments)))
  }
}
