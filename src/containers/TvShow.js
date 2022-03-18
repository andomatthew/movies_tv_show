import React, { useState, useEffect } from 'react'

import fetchDataTvShow from '../utils/fetchTvShow'

import Card from '../components/Card'
import Spinner from '../components/Spinner'

const TvShow = ({ myList, setMyList, addMyList, removeFromMyList, error, loading, popularTShow, topRatedTShow, airingToday, onTheAir }) => {

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
          { popularTShow.map(item => (
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
        { topRatedTShow.map(item => (
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
        { onTheAir.map(item => (
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
        { airingToday.map(item => (
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