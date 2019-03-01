import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => (
  <div>
    <h1>404</h1>
    <div>Sorry, we couldn't find this page.</div>
    <Link to='/'>Go to Home</Link>
  </div>
)

export default ErrorPage
