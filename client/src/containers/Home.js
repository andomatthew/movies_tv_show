import React from 'react'

import Movie from './Movie'
import TvShow from './TvShow'

const Home = ({ search, setSearch }) => {

  return (
    <div>
      <div className='row'>
        <h1>Movies</h1>
        <Movie search={search} setSearch={setSearch}  />
      </div>
      <div className='row'>
        <h1>Tv Shows</h1>
        <TvShow search={search} setSearch={setSearch} />
      </div>
    </div>
  )
}

export default Home