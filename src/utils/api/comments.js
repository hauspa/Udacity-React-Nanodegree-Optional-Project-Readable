import { url, headers } from './settings'

export const getCommentsForPost = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data) // = array of objects of comments


export const addComment = (comment) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
    .then(data => data) // = object of comment


export const getComment = (id) =>
  fetch(`${url}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data) // = object of comment


export const voteComment = (id, option) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data) // = object of comment

export const editComment = (id, timestamp, body) =>
  fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ id, timestamp, body })
  }).then(res => res.json())
    .then(data => data) // = object of comment


export const deleteComment = (id) =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }).then(res => res.json())
    .then(data => data) // = object of comment
