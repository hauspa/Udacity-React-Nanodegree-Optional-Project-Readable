import {
  GET_ALL_POSTS, VOTE_POST,
  EDIT_POST, ADD_POST, DELETE_POST,
} from '../actions/posts'
import _ from 'lodash'

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
    case EDIT_POST :
      const { author, title, body, category } = action.post
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          author,
          title,
          body,
          category,
        }
      }
    case ADD_POST :
      let object = {
        [action.post.id]: action.post
      }
      return {
        ...state,
        ...object
      }
    case DELETE_POST : // in API will only set property to deleted, but in Redux, just remove out of store!
      const filteredKeys = Object.keys(state).filter(key => key !== action.id)
      return _.pick(state, filteredKeys)
    default :
      return state
  }
}
