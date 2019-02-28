import { url, headers } from './settings'

export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) // array of objects of posts


export const getPostsForCategory = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) // = array of objects of posts


export const getPost = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data) // = object of requested post


export const addPost = (post) =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(post) // since post is an object, don't need extra curly brackets
  }).then(res => res.json())
    .then(data => data) // = object of new post


export const votePost = (id, option) =>
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ option }) // gotta be an object, so put the string inside curly brackets!
  }).then(res => res.json())
    .then(data => data) // = object of the updated post


export const editPost = (id, editedPost) => {
  const { author, title, body, category } = editedPost
  return fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ author, title, body, category })
  }).then(res => res.json())
    .then(data => data) // = object of edited post
}


export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }).then(res => res.json())
    .then(data => data)
