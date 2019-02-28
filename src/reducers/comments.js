import { GET_COMMENTS_FOR_POST } from '../actions/comments'

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS_FOR_POST :
      return action.comments
    default :
      return state
  }
}
