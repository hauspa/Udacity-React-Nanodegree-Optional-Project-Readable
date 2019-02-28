// Redux actions
import { getAllCategories } from './categories'
import {
  getAllPosts, votePost, editPost,
} from './posts'
import {
  getCommentsForPost, voteComment,
} from './comments'

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

export function handleVotingPost(id, option) {
  return (dispatch) => {
    return PostsAPI.votePost(id, option)
      .then(() => dispatch(votePost(id, option)))
  }
}

export function handleVotingComment(id, option) {
  return (dispatch) => {
    return CommentsAPI.voteComment(id, option)
      .then(() => dispatch(voteComment(id, option)))
  }
}

export function handleEditingPost(id, newPost) {
  return (dispatch) => {
    return PostsAPI.editPost(id, newPost)
      .then(() => dispatch(editPost(id, newPost)))
    }
}
