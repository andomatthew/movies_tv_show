import React from 'react'

import Movie from './Movie'
import TvShow from './TvShow'

const Home = ({ myList, addMyList, removeFromMyList, loading, error, popular, upcoming, topRated, nowPlaying, popularTShow, topRatedTShow, onTheAir, airingToday }) => {

  return (
    <div>
      <div className='row'>
        <Movie 
          loading={loading}
          error={error}
          popular={popular}
          upcoming={upcoming}
          topRated={topRated}
          nowPlaying={nowPlaying}
          myList={myList} 
          addMyList={addMyList} 
          removeFromMyList={removeFromMyList} 
        />
      </div>
      <div className='row'>
        <TvShow 
          loading={loading}
          error={error}
          popularTShow={popularTShow}
          topRatedTShow={topRatedTShow}
          onTheAir={onTheAir}
          airingToday={airingToday}
          myList={myList} 
          addMyList={addMyList} 
          removeFromMyList={removeFromMyList} />
      </div>
    </div>
  )
}

export default Home