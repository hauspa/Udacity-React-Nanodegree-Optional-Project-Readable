import { url, headers } from './settings'

export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) // array of objects


export const getPostsForCategory = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) // = array of objects


export const getPost = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data) // = object


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
    .then(data => data) // = object


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
    .then(data => data) // =
