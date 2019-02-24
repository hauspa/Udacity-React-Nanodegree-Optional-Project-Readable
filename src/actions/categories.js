export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export function getAllCategories(categories) {
  return {
    type: GET_ALL_CATEGORIES,
    categories,
  }
}
