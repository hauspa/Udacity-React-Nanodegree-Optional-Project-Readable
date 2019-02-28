export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export function getAllPosts(posts) {
  return {
    type: GET_ALL_POSTS,
    posts,
  }
}

export function addPost(id, timestamp, title, body, author, category) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  }
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    id,
    option,
  }
}

export function editPost(id, editedPost) {
  return {
    type: EDIT_POST,
    id,
    editedPost,
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  }
}
