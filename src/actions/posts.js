export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_FOR_CATEGORY = 'GET_POSTS_FOR_CATEGORY'
export const GET_POST = 'GET_POST'
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

export function getPostsForCategory(category) {
  return {
    type: GET_POSTS_FOR_CATEGORY,
    category,
  }
}

export function getPost(id) {
  return {
    type: GET_POST,
    id,
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

export function editPost(id, title, body) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  }
}
