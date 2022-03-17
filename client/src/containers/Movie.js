import React, { useState, useEffect } from 'react'

import fetchDataMovies from '../utils/fetchMovies'

const Movie = ({ search, setSearch }) => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [movieSearched, setMovieSearched] = useState([])

  async function fetchMovies(url, categories, api_key) {

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

        // if(search !== undefined && search.length > 0) {
        //   searchAll()
        // }

        // if(search !== undefined && search.length === 0) {
        //   setMovieSearched([])
        // }
      } 
      setLoading(false)

    } catch (err) {
      console.log(err)
    }
  }

  // function searchAll() {
  //   let test = []
  //   let results = [] 
    
  //   test.push(popular.filter(item => item.title.toLowerCase().includes(search)))
  //   test.push(upcoming.filter(item => item.title.toLowerCase().includes(search)))
  //   test.push(topRated.filter(item => item.title.toLowerCase().includes(search)))
  //   test.push(nowPlaying.filter(item => item.title.toLowerCase().includes(search)))

  //   test.forEach(items => items.forEach(item => results.push(item)))

  //   setMovieSearched(results)
  // }

  useEffect(() => {
    let isMounted = true
    
    fetchMovies()
        
    return function cleanup() {
      isMounted = false
    }
  }, [search])

  if (error) {
    return <div>Error: {error}</div>
  } 
  
  if(loading) {
    return <div>Loading...</div>
  }
  
  if(movieSearched.length >= 1) {
    return (
      <div>
        <div className='row'>
          <div className='col-3'>
            <h1>Movie Search Result</h1>
            <ul>
              {movieSearched.map(item => (
                  <li key={item.id}>
                    {`${item.id} ${item.title} ${item.release_date}`}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <h1>Upcoming Movies</h1>
          <ul>
            { upcoming.map(item => (
              <li key={item.id}>
              { `${item.id} ${item.title} ${item.release_date}`}
              </li>
              ))
            }
          </ul>
        </div>
        <div className='col-3'>
          <h1>Popular Movies</h1>
          <ul>
              { popular.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}` }</li>
                ))
              }
          </ul>
        </div>
        <div className='col-3'>
            <h1>Top Rated Movies</h1>
            <ul>
              { topRated.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}`}</li>
                ))
              }
            </ul>
        </div>
        <div className='col-3'>
            <h1>Now Playing Movies</h1>
            <ul>
              { nowPlaying.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}`}</li>
                ))
              }
            </ul>
        </div>
      </div>
    </div>
  )


  
}

export default Movie