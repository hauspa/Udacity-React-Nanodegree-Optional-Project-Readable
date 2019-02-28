import {
  GET_ALL_POSTS,
  EDIT_POST, ADD_POST, VOTE_POST, DELETE_POST,
} from '../actions/posts'

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      // change data structure, to save as objects with ID as key
      let objects = {}
      action.posts.forEach(post => {
        const newObject = {
          [post.id]: post
        }
        objects = {...objects, ...newObject}
      })
      return {
        ...state,
        ...objects
      }
    case VOTE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote'
                      ? state[action.id].voteScore + 1
                      : state[action.id].voteScore - 1,
        }
      }
    default :
      return state
  }
}
