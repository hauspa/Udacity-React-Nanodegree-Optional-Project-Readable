import {
  GET_COMMENTS_FOR_POST, ADD_COMMENT,
  GET_COMMENT, EDIT_COMMENT, DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions/comments'
import _ from 'lodash'

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS_FOR_POST :
      // change data structure, to save as objects with ID as key
      let objects = {}
      action.comments.forEach(comment => {
        const newObject = {
          [comment.id]: comment
        }
        objects = {...objects, ...newObject}
      })
      return {
        ...state,
        ...objects
      }
    case VOTE_COMMENT :
      console.log('STATE comments: ', state)
      console.log('STATE comment ID: ', action.id)
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote'
                      ? state[action.id].voteScore + 1
                      : state[action.id].voteScore - 1,
        }
      }
    case EDIT_COMMENT :
      const { author, body, timestamp } = action.comment
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          author,
          body,
          timestamp,
        }
      }
    case ADD_COMMENT :
      let object = {
        [action.comment.id]: action.comment
      }
      return {
        ...state,
        ...object
      }
    case DELETE_COMMENT : // in API will only set property to deleted, but in Redux, just remove out of store!
      const filteredKeys = Object.keys(state).filter(key => key !== action.id)
      return _.pick(state, filteredKeys)
    default :
      return state
  }
}
