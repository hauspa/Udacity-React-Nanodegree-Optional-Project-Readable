import { getAllCategories } from './categories'
import { getAllPosts } from './posts'

export function handleInitialData() {
  return (dispatch) => {
    // return getInitialData() // use api method here to get all the data
      // .then(({ categories, posts}) => {
      //   dispatch(getAllCategories(categories))
      //   dispatch(getAllPosts(posts))
      // })
      // maybe use Promise.all()
  }
}
