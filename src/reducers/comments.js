import {
  GET_COMMENTS_FOR_POST, ADD_COMMENT,
  GET_COMMENT, EDIT_COMMENT, DELETE_COMMENT,
  VOTE_COMMENT, PARENT_DELETED,
} from '../actions/comments'

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
    default :
      return state
  }
}
