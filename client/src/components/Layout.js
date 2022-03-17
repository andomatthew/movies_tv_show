import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className='container-fluid'>
        { children }
    </div>
  )
}

export default Layout