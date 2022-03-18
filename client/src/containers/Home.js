import React from 'react'

import Movie from './Movie'
import TvShow from './TvShow'

const Home = ({ myList, addMyList, removeFromMyList, loading, error, movies, tvShows }) => {

  return (
    <div>
      <div className='row'>
        <Movie 
          loading={loading}
          error={error}
          movies={movies}
          myList={myList} 
          addMyList={addMyList} 
          removeFromMyList={removeFromMyList} 
        />
      </div>
      <div className='row'>
        <TvShow 
          loading={loading}
          error={error}
          tvShows={tvShows}
          myList={myList} 
          addMyList={addMyList} 
          removeFromMyList={removeFromMyList} />
      </div>
    </div>
  )
}

export default Home