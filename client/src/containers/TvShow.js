import React, { useState, useEffect } from 'react'

import fetchDataTvShow from '../utils/fetchTvShow'

import Card from '../components/Card'
import Spinner from '../components/Spinner'

const TvShow = ({ myList, setMyList, addMyList, removeFromMyList, error, loading, tvShows }) => {

  if(error) {
    return <div>Error: ${error}</div>
  }
  if(loading) {
    return (
      <div className='container-fluid position-absolute start-50'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='container-fluid'>
      <h1>Tv Shows</h1>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Popular Tv Show</h1>
          { tvShows.popular.map(item => (
              <Card 
                key={item.id}
                data={item}
                myList={myList}
                setMyList={setMyList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
            />
            ))
          }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Top Rated</h1>
        { tvShows.topRated.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>On The Air</h1>
        { tvShows.onTheAir.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Airing Today</h1>
        { tvShows.airingToday.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
    </div>
  )
}

export default TvShow