import React from 'react'

import Card from '../components/Card'
import Spinner from '../components/Spinner'

const Movie = ({ myList, addMyList, removeFromMyList, loading, error, popular, upcoming, topRated, nowPlaying }) => {
  

  if (error) {
    return <div>Error: {error}</div>
  } 
  
  if(loading) {
    return (
      <div className='container justify-content-center position-absolute start-50'>
        <Spinner />
      </div>
    )
  }
  
  return (
    <div className='container-fluid'>
      <h1>Movies</h1>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Upcoming</h1>
          { upcoming.map((item) => (
              <Card 
                key={item.id}
                data={item}
                myList={myList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
              />
            ))
          }
      </div>
      <div className='row justify-content-center mt-5'>
        <h1 className='text-center'>Popular</h1>
        { popular.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
            />
          ))
        }
      </div>
      <div className='row justify-content-center mt-5'>
        <h1 className='text-center'>Top Rated</h1>
          { topRated.map(item => (
              <Card 
                key={item.id}
                data={item}
                myList={myList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
            />
            ))
          }
      </div>
      <div className='row justify-content-center mt-5'>
        <h1 className='text-center'> Now Playing</h1>
          { nowPlaying.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
            />
            ))
          }
      </div>
    </div>
  )


  
}

export default Movie