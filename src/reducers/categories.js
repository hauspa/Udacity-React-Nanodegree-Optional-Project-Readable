import { GET_ALL_CATEGORIES } from '../actions/categories'

// TODO: make sure the categories are an array and not object!
export default function categories(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES :
      return action.categories
    default :
      return state
  }
}
