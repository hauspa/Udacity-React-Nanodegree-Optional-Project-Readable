// Redux actions
import { getAllCategories } from './categories'
import {
  getAllPosts, votePost, editPost, addPost, deletePost,
} from './posts'
import {
  getCommentsForPost, voteComment, editComment, addComment, deleteComment,
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

export function handleEditingPost(id, editedPost) {
  return (dispatch) => {
    return PostsAPI.editPost(id, editedPost)
      .then(() => dispatch(editPost(id, editedPost)))
    }
}

export function handleAddingPost(newPost) {
  return (dispatch) => {
    return PostsAPI.addPost(newPost)
      .then((post) => dispatch(addPost(post))) // use the object returned by API, as it will have additional data
  }
}

export function handleDeletingPost(id) {
  return (dispatch) => {
    return PostsAPI.deletePost(id)
      .then(() => dispatch(deletePost(id)))
  }
}

export function handleEditingComment(id, comment) {
  return (dispatch) => {
    return CommentsAPI.editComment(id, comment)
      .then(() => dispatch(editComment(id, comment)))
  }
}

export function handleAddingComment(comment) {
  return (dispatch) => {
    return CommentsAPI.addComment(comment)
      .then((comment) => dispatch(addComment(comment)))
  }
}

export function handleDeletingComment(id) {
  return (dispatch) => {
    return CommentsAPI.deleteComment(id)
      .then(() => dispatch(deleteComment(id)))
  }
}
