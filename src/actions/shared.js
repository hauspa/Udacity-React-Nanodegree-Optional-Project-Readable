// Redux actions
import { getAllCategories } from './categories'
import {
  getAllPosts, votePost,
} from './posts'
import { getCommentsForPost } from './comments'

// API methods
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

export function handleGettingComments(id) {
  return (dispatch) => {
    return CommentsAPI.getCommentsForPost(id)
      .then((comments) => dispatch(getCommentsForPost(comments)))
  }
}

export function handleVoteComment(id, option) {
  return (dispatch) => {
    return PostsAPI.votePost(id, option)
      // .then((post) => console.log('new Score: ', post.voteScore))
      .then(() => dispatch(votePost(id, option)))
  }
}
