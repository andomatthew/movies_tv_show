import React, { useState, useEffect } from 'react'

import fetchDataMovies from '../utils/fetchMovies'
import Card from '../components/Card'

const Movie = ({ myList, addMyList, removeFromMyList }) => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])

  async function fetchMovies() {

    setLoading(true)

    try {

      const result = await fetchDataMovies()
      
      if(!result.dataPopular.ok || !result.dataUpcoming.ok || !result.dataTopRated.ok || !result.dataNowPlaying.ok) {
        
        let errorMessage = result.jsonPopular.status_message || result.jsonUpcoming.status_message || result.jsonTopRated.status_message || result.jsonNowPlaying.status_message
        
        setError(errorMessage)
        setLoading(false)
      }else {

        setPopular(result.jsonPopular.results)
        setUpcoming(result.jsonUpcoming.results)
        setTopRated(result.jsonTopRated.results)
        setNowPlaying(result.jsonNowPlaying.results)

      } 
      setLoading(false)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
    fetchMovies()
        
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  } 
  
  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container-fluid mt-5'>
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