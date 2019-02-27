import {
  GET_ALL_POSTS,
  EDIT_POST, ADD_POST, VOTE_POST, DELETE_POST,
} from '../actions/posts'

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      return {
        ...state,
        ...action.posts
      }
    
    default :
      return state
  }
}
