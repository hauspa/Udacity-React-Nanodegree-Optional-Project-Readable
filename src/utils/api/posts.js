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

// export const addPost = () =>
//   fetch(`${url}/posts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.)

// export const votePost = (id) =>
//   fetch(`${url}/posts/${id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify()
//   })


// Comments
