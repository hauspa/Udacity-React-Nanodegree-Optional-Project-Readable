import { url, headers } from './settings'

export const getCommentsForPost = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data) // =
