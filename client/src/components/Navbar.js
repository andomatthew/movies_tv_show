import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

const Navbar = ({ search, setSearch }) => {

    const navigate = useNavigate()

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-light bg-light'>
        <div className='container-fluid'>
            <Link to='/' className='navbar-brand'>Navbar</Link>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#NavigationBar' aria-controls='NavigationBar' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='NavigationBar'>
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
                <form className='d-flex'>
                    <input 
                        className='form-control me-2' 
                        type='search' 
                        placeholder={`Titles, Genres`} 
                        aria-label="Search" 
                        onInput={() => navigate('/search')}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </form>
            </div>
        </div>
    </nav>
  )
}

export default Navbar