import {
  GET_ALL_POSTS, GET_POSTS_FOR_CATEGORY,
  GET_POST, EDIT_POST, ADD_POST, VOTE_POST, DELETE_POST,
} from '../actions/posts'

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      return {
        ...state,
        ...action.posts
      }
    // case GET_POSTS_FOR_CATEGORY :
    //   return state
    // case GET_POST :
      // return state[]
    default :
      return state
  }
}
