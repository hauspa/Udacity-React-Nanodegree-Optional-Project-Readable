export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'


export function getCommentsForPost(comments) {
  return {
    type: GET_COMMENTS_FOR_POST,
    comments,
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  }
}

export function editComment(id, comment) {
  return {
    type: EDIT_COMMENT,
    id,
    comment
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}
