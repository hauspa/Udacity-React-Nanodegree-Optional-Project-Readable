import { getAllCategories } from './categories'
import { getAllPosts } from './posts'
import { getCategories as CategoriesAPI }  from '../utils/api/categories'
import * as PostsAPI from '../utils/api/posts'
import * as CommentsAPI from '../utils/api/comments'

// export function handleInitialData() {
//   return (dispatch) => {
//     return getInitialData() // use api method here to get all the data
//       .then(({ categories, posts}) => {
//         dispatch(getAllCategories(categories))
//         dispatch(getAllPosts(posts))
//       })
//       maybe use Promise.all()
//   }
// }
