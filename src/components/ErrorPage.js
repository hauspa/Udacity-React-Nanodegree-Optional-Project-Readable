import React from 'react'
import { Link } from 'react-router-dom'
import { path_home } from '../utils/paths'

const ErrorPage = () => (
  <div className='row'>
    <div className='col d-flex flex-column align-items-center justify-content-center py-5'>
      <h1>404</h1>
      <div>Sorry, we couldn't find this page.</div>
      <Link to={path_home} className='py-3'>Go back to Home</Link>
    </div>
  </div>
)

export default ErrorPage
