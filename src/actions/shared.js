import { getAllCategories } from './categories'
import {
  getAllPosts
} from './posts'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'

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
