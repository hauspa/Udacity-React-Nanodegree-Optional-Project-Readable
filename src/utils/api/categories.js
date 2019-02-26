import { url, headers } from './settings'

export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories) // = array of objects
