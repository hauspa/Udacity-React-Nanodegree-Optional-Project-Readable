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
      console.log("COMMENTS ACTION", objects)
      return {
        ...state,
        ...objects
      }
      // return action.comments
    case VOTE_COMMENT :
      return {

      }
    default :
      return state
  }
}
