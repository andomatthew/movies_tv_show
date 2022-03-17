import React from 'react'

import Movie from './Movie'
import TvShow from './TvShow'

const Home = ({ myList, addMyList, removeFromMyList }) => {

  return (
    <div>
      <div className='row'>
        <Movie myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />
      </div>
      <div className='row'>
        <TvShow myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />
      </div>
    </div>
  )
}

export default Home