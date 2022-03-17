import React from 'react'

import Movie from './Movie'
import TvShow from './TvShow'

const Home = ({ myList, setMyList }) => {

  return (
    <div>
      <div className='row'>
        <Movie myList={myList} setMyList={setMyList} />
      </div>
      <div className='row'>
        <TvShow myList={myList} setMyList={setMyList} />
      </div>
    </div>
  )
}

export default Home