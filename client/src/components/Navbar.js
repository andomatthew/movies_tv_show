import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = ({ search, setSearch, searchTitle }) => {
    const [searchTerm, setSearchTerm] = useState('')

    function passingSearch(e) {
        e.preventDefault()
        setSearchTerm(e.target.value)
        setSearch(e.target.value)
        searchTitle()
    }

  return (
    <>
        <nav className='navbar navbar-expand-lg fixed-top navbar-black bg-black'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>NotFlix</Link>
                <button className='navbar-toggler bg-primary' type='button' data-bs-toggle='collapse' data-bs-target='#NavigationBar' aria-controls='NavigationBar' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse position-relative' id='NavigationBar'>
                    <ul className='navbar-nav mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/movies' className='nav-link'>Movies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/tv-shows' className='nav-link'>Tv Shows</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/my-list' className='nav-link'>My List</Link>
                        </li>
                    </ul>
                    <form className='d-flex position-absolute end-0'>
                        <input 
                            className='form-control me-2 bg-dark color-white' 
                            type='text' 
                            placeholder={`Titles, Genres`} 
                            aria-label="Search" 
                            onChange={(e) => passingSearch(e)}
                            value={searchTerm}
                        />
                    </form>
                </div>
            </div>
        </nav>
        <div className='spacing'></div>
    </>
  )
}

export default Navbar