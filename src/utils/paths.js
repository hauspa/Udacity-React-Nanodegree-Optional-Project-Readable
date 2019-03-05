// List all link paths here, so that can change all paths in all Components all at once!

// Some paths are static read-only paths (mostly for React Router's Switch in App.js), others have to be actively set.

// Home
export const path_home = '/'

// Posts by Category
export const path_category = '/:category'
export const setPathCategory = (category) => `/${category}`

// Edit Post
export const path_editPost = '/posts/post/:id/edit'
export const setPathEditPost = (id) => `/posts/post/${id}/edit`

// Add Post
export const path_addPost = '/posts/add'

// Post in Detail
export const path_detailPost = '/:category/:id'
export const setPathDetailPost = (category, id) => `/${category}/${id}`
