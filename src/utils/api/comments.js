import { url, headers } from './settings'

export const getCommentsForPost = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data) // =


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
    .then(data => data)
