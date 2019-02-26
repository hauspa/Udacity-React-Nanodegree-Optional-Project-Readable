
const url = 'http://localhost:3001' || `${process.env.REACT_APP_BACKEND}`;

const headers = {
  'Authorization': 'whatever-you-want'
}

// Categories

export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)


// Posts
export const getAllPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)


// export const getPostsForCategory = (category) =>
//   fetch(`/${category}/posts`, { headers })
//     .then(res => res.json())
//     .then(data => data.posts)
//
//
// export const getPost = (id) =>
//   fetch(`/posts/${id}`, { headers })
//     .then(res => res.json)
//     .then(data => data.post)

// export const addPost = () =>
//   fetch(`/posts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.)

export const votePost = (id) =>
  fetch(`/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })


// Comments
