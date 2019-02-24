export const PARENT_DELETED = 'PARENT_DELETED'
export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'


export function parentDeleted(id) {
  return {
    type: PARENT_DELETED,
    id,
  }
}

export function getCommentsForPost(id) {
  return {
    type: GET_COMMENTS_FOR_POST,
    id,
  }
}

export function addComment(id, timestamp, body, author, parentId) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId,
  }
}

export function getComment(id) {
  return {
    type: GET_COMMENT,
    id,
  }
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  }
}

export function editComment(id, timestamp, body) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body,
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}
